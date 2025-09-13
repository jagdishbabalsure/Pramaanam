# KMRL Portal File Upload & Summary Feature Setup

## Overview
This feature adds document upload and AI-powered summary capabilities to the Operations Manager Dashboard. Users can upload PDF, DOCX, or TXT files and receive instant operational summaries.

## Installation & Setup

### 1. Install Backend Dependencies
```bash
cd server
npm install
```

### 2. Start the Backend Server
```bash
# Development mode with auto-reload
npm run dev

# Or production mode
npm start
```
The backend server will run on `http://localhost:3001`

### 3. Start the Frontend Development Server
```bash
# In the root directory
npm run dev
```
The frontend will run on `http://localhost:5173`

## Features

### Frontend Features
- ✅ Drag-and-drop file upload interface
- ✅ File type validation (PDF, DOCX, TXT)
- ✅ File size validation (10MB limit)
- ✅ Loading spinner during processing
- ✅ Responsive design with Tailwind CSS
- ✅ Multilingual support (English/Malayalam)
- ✅ Error handling and user feedback
- ✅ Clean, modern UI using Radix UI components

### Backend Features
- ✅ Express.js server with file upload endpoint
- ✅ Multer middleware for handling multipart/form-data
- ✅ File type and size validation
- ✅ Simulated operational summaries
- ✅ CORS enabled for frontend integration
- ✅ Error handling and logging
- ✅ Health check endpoint

## API Endpoints

### POST /api/upload-summary
Upload a file and receive an operational summary.

**Request:**
- Method: POST
- Content-Type: multipart/form-data
- Body: File upload (field name: 'file')

**Response:**
```json
{
  "success": true,
  "summary": "Detailed operational summary...",
  "metadata": {
    "filename": "document.pdf",
    "filesize": 1024000,
    "filetype": "application/pdf",
    "processedAt": "2024-01-15T10:30:00.000Z",
    "summaryType": "safety_compliance"
  }
}
```

### GET /api/health
Health check endpoint to verify server status.

## File Upload Specifications

### Supported File Types
- PDF (.pdf)
- Microsoft Word (.docx)
- Plain Text (.txt)

### File Size Limit
- Maximum: 10MB per file

### Validation
- Client-side validation for immediate feedback
- Server-side validation for security
- MIME type checking
- File size verification

## Simulated Summary Types

The backend generates realistic operational summaries in these categories:

1. **Safety Compliance** - Urgent safety audit reports and compliance requirements
2. **Maintenance Alerts** - Equipment maintenance schedules and critical updates
3. **Operational Updates** - Daily performance metrics and operational status
4. **Financial Reviews** - Budget performance and financial indicators
5. **HR Compliance** - Staffing updates and training requirements

## Integration with Existing Dashboard

The file upload component is integrated into the Operations Manager Dashboard as a new section called "Document Analysis". It maintains consistency with the existing design system and follows the established patterns.

## Future Enhancements

### Ready for ML Integration
The current implementation uses simulated summaries, but the architecture is designed to easily integrate with real ML models:

1. Replace the `getRandomSummary()` function with actual ML API calls
2. Add document parsing for different file types
3. Implement context-aware summarization based on document content
4. Add summary customization options

### Potential ML Services Integration
- OpenAI GPT API
- Google Cloud Document AI
- AWS Textract + Comprehend
- Azure Cognitive Services

## Security Considerations

- File type validation prevents malicious uploads
- File size limits prevent DoS attacks
- CORS configuration restricts cross-origin requests
- Memory storage (files not saved to disk)
- Input sanitization and error handling

## Testing the Feature

1. Start both frontend and backend servers
2. Navigate to Operations Manager Dashboard
3. Scroll to the "Document Analysis" section
4. Upload a test file (PDF, DOCX, or TXT)
5. Click "Generate Summary"
6. View the simulated operational summary

## Troubleshooting

### Common Issues

**Backend not starting:**
- Check if port 3001 is available
- Verify Node.js version (requires Node 14+)
- Run `npm install` in the server directory

**File upload fails:**
- Check file size (must be under 10MB)
- Verify file type (PDF, DOCX, TXT only)
- Ensure backend server is running

**CORS errors:**
- Verify Vite proxy configuration
- Check backend CORS settings
- Ensure both servers are running

## Development Notes

### Code Structure
- `src/components/FileUploadSummary.tsx` - Main upload component
- `server/server.js` - Backend Express server
- `vite.config.ts` - Updated with API proxy configuration

### Styling
- Uses existing Tailwind CSS classes
- Consistent with Radix UI design system
- Responsive design for mobile and desktop

### State Management
- Local component state using React hooks
- No external state management required
- Clean separation of concerns

This implementation provides a solid foundation for document analysis capabilities while maintaining the high-quality standards of the existing KMRL Portal system.