import express from 'express';
import multer from 'multer';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain'
    ];
    
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF, DOCX, and TXT files are allowed.'));
    }
  }
});

// Simulated operational summaries - exactly as requested
const operationalSummaries = [
  "🚨 Safety compliance report for Water Metro Line Blue needs urgent submission by 5 PM today. Delay may impact system safety audit.",
  "🔧 Maintenance alert: HVAC system requires inspection at Aluva station before morning operations.",
  "📊 Daily operational report: Average train punctuality 96%, minor delays at Kaloor station due to signaling.",
  "💰 Finance update: Budget review for Q3 scheduled tomorrow at 11 AM.",
  "👥 HR compliance: Staff training module on emergency protocols must be completed this week.",
  "🚨 Emergency drill scheduled for all stations this Friday at 2 PM. All staff must participate.",
  "🔧 Track maintenance completed at Edappally station. Normal operations resumed.",
  "📊 Passenger feedback analysis: 94% satisfaction rate, improvement needed in ticketing speed.",
  "💰 Revenue collection exceeded target by 8% this month. Cost optimization measures effective.",
  "👥 New safety officer training program starts Monday. 15 staff members enrolled."
];

// Utility function to get random operational summary
const getRandomSummary = () => {
  const randomIndex = Math.floor(Math.random() * operationalSummaries.length);
  return operationalSummaries[randomIndex];
};

// File upload and summary endpoint
app.post('/api/upload-summary', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded. Please select a file.' });
    }

    // Simulate processing time (1-2 seconds)
    const processingTime = Math.random() * 1000 + 1000;
    await new Promise(resolve => setTimeout(resolve, processingTime));

    // Get a random operational summary
    const summary = getRandomSummary();
    
    res.json({ summary });
  } catch (error) {
    console.error('Error processing file:', error);
    res.status(500).json({ 
      error: 'Failed to process document. Please try again.' 
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'KMRL Portal Backend'
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File size too large. Maximum size is 10MB.' });
    }
  }
  
  console.error('Server error:', error);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`🚀 KMRL Portal Backend Server running on port ${PORT}`);
  console.log(`📁 File upload endpoint: http://localhost:${PORT}/api/upload-summary`);
  console.log(`🏥 Health check: http://localhost:${PORT}/api/health`);
});