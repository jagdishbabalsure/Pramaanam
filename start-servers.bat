@echo off
echo 🚀 Starting KMRL Portal with File Upload Feature...
echo.

echo 📦 Installing backend dependencies...
cd server
call npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install backend dependencies
    pause
    exit /b 1
)

echo.
echo 📡 Starting backend server...
start "KMRL Backend" cmd /k "npm run dev"

echo.
echo ⏳ Waiting for backend to start...
timeout /t 3 /nobreak > nul

echo.
echo 🌐 Starting frontend server...
cd ..
start "KMRL Frontend" cmd /k "npm run dev"

echo.
echo ✅ Both servers are starting!
echo 📡 Backend: http://localhost:5000
echo 🌐 Frontend: http://localhost:5173
echo.
echo Press any key to close this window...
pause > nul