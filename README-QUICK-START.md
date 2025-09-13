# KMRL Portal - File Upload Feature Quick Start

## 🚀 Quick Setup (Windows)

### Option 1: Automatic Setup (Recommended)
Double-click `start-servers.bat` - this will:
1. Install backend dependencies
2. Start backend server (port 3001)
3. Start frontend server (port 5173)

### Option 2: Manual Setup
```bash
# 1. Install backend dependencies
cd server
npm install

# 2. Start backend server (in one terminal)
npm run dev

# 3. Start frontend server (in another terminal)
cd ..
npm run dev
```

### Option 3: Node.js Script
```bash
npm run start:all
```

## 🧪 Testing the Feature

1. Open http://localhost:5173
2. Login as "Operations Manager"
3. Scroll to "Document Analysis" section
4. Upload any PDF, DOCX, or TXT file
5. Click "Generate Summary"
6. View the simulated operational summary!

## 📁 Test Files

Create test files to upload:
- **test.txt**: Any text file
- **document.pdf**: Any PDF file
- **report.docx**: Any Word document

## 🔧 Troubleshooting

### Backend Issues
- **Port 3001 in use**: Kill any process using port 3001
- **Dependencies missing**: Run `cd server && npm install`
- **Server won't start**: Check Node.js version (requires 14+)

### Frontend Issues
- **Port 5173 in use**: Vite will automatically use next available port
- **API calls failing**: Ensure backend is running on port 3001
- **CORS errors**: Check Vite proxy configuration

### File Upload Issues
- **File too large**: Maximum 10MB per file
- **Unsupported format**: Only PDF, DOCX, TXT allowed
- **Upload fails**: Check browser console for errors

## 📊 Expected Behavior

When you upload a file, you should see:
1. ✅ File validation and preview
2. 🔄 Loading spinner during processing
3. 📄 Realistic operational summary (simulated)
4. 🎯 Professional UI with proper error handling

## 🔗 API Endpoints

- **Health Check**: http://localhost:3001/api/health
- **File Upload**: http://localhost:3001/api/upload-summary

## 📝 Sample Summary Types

The backend generates realistic summaries for:
- 🚨 Safety compliance reports
- 🔧 Maintenance alerts
- 📊 Operational updates
- 💰 Financial reviews
- 👥 HR compliance

## 🎯 Next Steps

Once this is working, you can:
1. Replace simulated summaries with real ML models
2. Add more file type support
3. Implement user authentication
4. Add summary history/storage
5. Integrate with existing KMRL systems

---

**Need Help?** Check the console logs in both terminal windows for detailed error messages.