@echo off
title PetHome - Quick Start
echo Starting PetHome...

start cmd /k "cd backend && npm install && npm run dev"
timeout /t 6 >nul
start cmd /k "cd frontend && npm install && npm run dev"
timeout /t 4 >nul
start http://localhost:5173