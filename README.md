# Events Hub

**Events Hub** is a full-stack web application for managing and viewing events. It features user authentication, event CRUD operations, and role-based access control (user/admin).

## 🚀 Features

-   User authentication (register/login)
-   View upcoming events
-   Search and filter events
-   Create, edit, and delete events (admin only)
-   User profile management

## 📦 Prerequisites

-   Node.js (v14 or higher)
-   SQLite3
-   Modern web browser

## ⚙️ Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd EventHub
```

2. Install server dependencies:

```bash
cd server
npm install
```

## 🗓️ Database Setup

The database initializes automatically on first server run and includes:

-   Users Table – handles user accounts and roles
-   Events Table – stores all event information

## 🖥️ Running the Application

1. Start the backend server:

```bash
cd server
npm start
```

The server runs on: [http://localhost:3000](http://localhost:3000)

2. Open the frontend:

-   Option 1: Open `client/index.html` directly in your browser
-   Option 2: Serve it via a local web server (e.g., Live Server in VSCode)

## 👥 User Guide

### Register

1. Click **Register** on the login screen
2. Fill in the form:

    - Username
    - Email
    - Password
    - Select role (user/admin)

3. Submit to create your account

### Login

1. Enter your email and password
2. Click **Login**

### Viewing Events

-   All events are listed on the dashboard
-   Use the **search bar** to find events by title
-   Use the **filter** to sort by category

### Admin Event Management

1. Navigate to your **Profile Page**
2. Click **Edit Events**
3. In the admin panel, you can:

    - Create events
    - Edit events
    - Delete events

### Profile Management

1. Click your **username** (top-right)
2. On the Profile Page, you can:

    - Update username/email
    - Delete your account
    - Log out

## 📁 Project Structure

```
EventHub/
├── server/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   └── server.js
├── client/
│   ├── icon/
│   ├── page/
│   ├── script/
│   ├── style/
│   └── index.html
└── README.md
```

## 🔍 Feature Details

### Authentication

-   Email validation on registration
-   Passwords hashed with bcrypt
-   Role-based access (user vs. admin)
-   Session stored with `localStorage`

### Event Management

-   Full CRUD support (admin only)
-   Search events by title
-   Filter by category
-   Popup for event details

### User Profile

-   Update personal information
-   Account deletion
-   Admin access to event tools

## 🔐 Security

-   Password hashing with `bcrypt`
-   Input validation and sanitization
-   Centralized error handling middleware
-   Secure DB operations using parameterized queries

## 💪 Tech Stack

**Frontend:**

-   HTML5
-   CSS3 (with CSS variables)
-   Vanilla JavaScript
-   Font Awesome

**Backend:**

-   Node.js
-   Express.js
-   SQLite3
-   bcrypt

## ⚠️ Error Handling

Handles various scenarios:

-   Invalid login credentials
-   Duplicate email registration
-   Missing or invalid form fields
-   Database read/write failures
-   General server errors
