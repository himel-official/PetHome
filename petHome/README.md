# PetHome

**PetHome** is a full-stack web application that connects pets in need with loving adopters, pet owners, caregivers, and pet walkers. Built with modern technologies, it allows users to browse pets, post pets for adoption, manage profiles, and connect with caregivers.

---

## Features

### Authentication
- User registration and login (JWT-based)
- Role-based system: `adopter`, `petowner`, `caregiver`, `petwalker`

### Pet Management
- Browse available pets with search & filter
- Post new pets for adoption (with multiple images)
- View detailed pet profiles
- My Pets dashboard

### User Profile
- Edit profile with profile picture upload
- Manage multiple roles
- Add bio, location, and contact info

### Caregivers
- Browse trusted caregivers and shelters
- View caregiver profiles

### Smart Chatbot
- Interactive assistant named **Pawly**

### Modern UI/UX
- Beautiful, responsive design with Tailwind CSS
- Mobile-friendly interface

---

## Tech Stack

### **Backend**
- **Node.js** + **Express**
- **MongoDB** + **Mongoose**
- **JWT** Authentication
- **Multer** (file uploads)
- **bcryptjs** (password hashing)
- **dotenv** & **CORS**

### **Frontend**
- **React 18**
- **Vite** (build tool)
- **Tailwind CSS**
- **Axios** (API calls)
- **React Router DOM**

---

## Project Structure
PetHome/
├── backend/                  # Node.js + Express Backend
│   ├── controllers/
│   ├── models/
│   ├── middleware/
│   ├── routes/
│   ├── uploads/              # Stores pet & profile images
│   ├── .env
│   └── server.js
│
├── frontend/                 # React + Vite Frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   └── ...
│   └── vite.config.js
│
├── start.bat                 # One-click start for Windows
└── README.md
text


---

## Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/himel-official/pethome.git
cd pethome
