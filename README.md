🚀 User Management CRUD Application

React | TypeScript | Vite

🔍 Project Overview

This project is a User Management CRUD application developed using React, TypeScript, and Vite.

The application allows users to:

Create new users

View user details

Edit existing users

Delete users

The code follows a parent–child component architecture, keeping App.tsx lightweight and separating business logic for better maintainability.

🌐 Live Demo

🚀 Deployed using Vercel
🔗 (Add your deployment URL here)

🛠 Tech Stack

⚛️ React

🟦 TypeScript

⚡ Vite

🎨 Material UI (MUI)

📋 React Hook Form

🔔 React Toastify

🧪 JSON Server (Mock API)

☁️ Vercel (Deployment)

📁 Folder Structure
src/
 ├── api/
 │    └── userApi.ts        // API calls
 ├── components/
 │    ├── UserForm.tsx      // Create / Edit form
 │    ├── UserList.tsx      // User table
 │    └── UserDialog.tsx    // Dialog popup
 ├── hooks/
 │    └── useUsers.ts       // State & logic
 ├── types/
 │    └── user.ts           // Type definitions
 ├── App.tsx                // Root component
 └── main.tsx

✨ Features
🧑 User CRUD Operations

Create user

View users

Edit user details

Delete user

✅ Form Validation

Required field checks

Email format validation

Phone number must be 10 digits

Character length validation

Inline error messages

🔁 Duplicate Validation

Prevents duplicate entries for:

Email

Phone number

First name

Errors are shown using toast notifications.

📊 User Table

Serial number column

Pagination (5 / 10 rows)

Edit & delete actions

Empty state message when no data is available

🔔 Notifications

Success and error messages using React Toastify

🧱 Architecture & Design

Minimal logic inside App.tsx

Business logic handled using custom hooks

UI split into reusable components

Clear separation of concerns

This design helps in easy scaling and future enhancements.

⚙️ Local Setup Instructions
1️⃣ Clone the Repository
git clone <your-repository-url>
cd user-management-app

2️⃣ Install Dependencies
npm install

3️⃣ Start Mock Backend
npx json-server --watch db.json --port 3001


Sample db.json:

{
  "users": []
}

4️⃣ Run the Application
npm run dev

☁️ Deployment (Vercel)

The application is deployed using Vercel.

🚀 Deployment Steps

Push code to GitHub

Import repository in Vercel

Use the following settings:

Build Command

npm run build