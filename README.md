# Events Hub

Events Hub is a web application for managing and viewing events. It features user authentication, event management, and different roles (user/admin).

## Features

-   User authentication (register/login)
-   View all upcoming events
-   Search and filter events
-   Create, edit, and delete events (admin)
-   User profile management

## Prerequisites

-   Node.js (v14 or higher)
-   SQLite3
-   Web browser

## Installation

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

## Database Setup

The database will be automatically created when you start the server for the first time. It includes:

-   Users table (for authentication and user management)
-   Events table (for storing event information)

## Running the Application

1. Start the server:

```bash
cd server
npm start
```

The server will run on http://localhost:3000

2. Access the web application:
   Open the client/index.html file in your web browser or serve it using a local development server.

## Usage

### User Registration

1. Click "Register" on the login page
2. Fill in your details:
    - Username
    - Email
    - Role (user/admin)
    - Password
3. Submit the registration form

### Logging In

1. Enter your email and password
2. Click "Login"

### Viewing Events

-   All events are displayed on the dashboard
-   Use the search bar to find events by title
-   Use the filter dropdown to view events by category

### Managing Events (Admin Only)

1. Go to your profile page
2. Click "Edit events" button
3. In the admin panel you can:
    - Create new events
    - Edit existing events
    - Delete events

### Profile Management

1. Click on your username in the top right
2. In the profile page you can:
    - Edit your username/email
    - Delete your account
    - Log out

## File Structure

```
EventHub/
├── server/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   └── server.js
├── client/
|   ├── icon/
│   ├── page/
│   ├── script/
│   ├── style/
│   └── index.html
└── README.md
```

## Features in Detail

### Authentication

-   User registration with email validation
-   Secure password hashing with bcrypt
-   Role selection (user/admin)
-   Session management with localStorage

### Event Management

-   View all upcoming events
-   Search events by title
-   Filter events by category
-   Admin panel for event CRUD operations
-   Event details popup

### User Profile

-   View and edit profile information
-   Change username/email
-   Account deletion
-   Admin access to event management

## Security Features

-   Password hashing with bcrypt
-   Input validation and sanitization
-   Error handling middleware
-   Secure database operations

## Tech Stack

-   Frontend:
    -   Vanilla JavaScript
    -   CSS3 with CSS Variables
    -   HTML5
    -   Font Awesome icons
-   Backend:
    -   Node.js
    -   Express.js
    -   SQLite3
    -   bcrypt for password hashing

## Error Handling

Comprehensive error handling for:

-   Invalid credentials
-   Duplicate email registration
-   Missing required fields
-   Database operations
-   Server errors
