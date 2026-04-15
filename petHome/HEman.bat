@echo off
title PetHome - Full Auto Setup ^& Launcher
color 0b
echo.
echo ================================================
echo        PetHome - Complete Auto Installer
echo ================================================
echo.

:: ====================== CHECK NODE.JS ======================
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is NOT installed!
    echo Please download and install Node.js from: https://nodejs.org
    pause
    exit /b
) else (
    echo [OK] Node.js is installed.
)

:: ====================== CHECK MONGODB ======================
echo.
echo [CHECK] Checking MongoDB...

net start | find "MongoDB" >nul
if %errorlevel% equ 0 (
    echo [OK] MongoDB service is running.
) else (
    echo [WARNING] MongoDB is not running.
    echo.
    echo Do you want to try starting MongoDB service now? (Y/N)
    set /p startMongo=^> 
    if /i "%startMongo%"=="Y" (
        net start MongoDB >nul 2>&1
        if %errorlevel% equ 0 (
            echo [OK] MongoDB service started.
        ) else (
            echo [ERROR] Could not start MongoDB automatically.
            echo Please start MongoDB manually and press any key to continue...
            pause >nul
        )
    )
)

:: ====================== BACKEND SETUP ======================
echo.
echo ================================================
echo Setting up Backend...
echo ================================================
cd /d "%~dp0backend"

if not exist "node_modules" (
    echo Installing backend dependencies...
    call npm install
) else (
    echo [OK] Backend dependencies already installed.
)

if not exist "uploads" mkdir uploads
echo [OK] uploads folder ready.

:: ====================== FRONTEND SETUP ======================
echo.
echo ================================================
echo Setting up Frontend...
echo ================================================
cd /d "%~dp0frontend"

if not exist "node_modules" (
    echo Installing frontend dependencies...
    call npm install
) else (
    echo [OK] Frontend dependencies already installed.
)

:: ====================== START SERVERS ======================
echo.
echo ================================================
echo Starting PetHome Servers...
echo ================================================
echo.

echo [1/2] Starting Backend Server...
start cmd /k "cd /d %~dp0backend && npm run dev"

timeout /t 8 /nobreak >nul

echo [2/2] Starting Frontend Server...
start cmd /k "cd /d %~dp0frontend && npm run dev"

echo.
echo ================================================
echo Opening PetHome in your browser...
echo ================================================
timeout /t 6 /nobreak >nul
start http://localhost:5173

echo.
echo ================================================
echo PetHome is now running! Enjoy! 🐾
echo.
echo Backend  → http://localhost:5000
echo Frontend → http://localhost:5173
echo ================================================
pause