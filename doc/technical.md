# Technical Documentation

## Database Schema

### Users Table

```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    role TEXT NOT NULL,
    password TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Events Table

```sql
CREATE TABLE events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL,
    date TEXT NOT NULL,
    time TEXT NOT NULL,
    location TEXT NOT NULL,
    user_id INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

## API Routes

### User Routes

#### POST `/users/register`

Register a new user.

-   Request body:
    ```json
    {
        "username": "string",
        "email": "string",
        "role": "string",
        "password": "string"
    }
    ```
-   Response: `201 Created`
    ```json
    {
        "id": "number",
        "message": "User created successfully"
    }
    ```

#### POST `/users/login`

Authenticate user.

-   Request body:
    ```json
    {
        "email": "string",
        "password": "string"
    }
    ```
-   Response: `200 OK`
    ```json
    {
        "id": "number",
        "message": "Login successful"
    }
    ```

#### GET `/users`

Get all users.

-   Response: `200 OK`
    ```json
    [
        {
            "id": "number",
            "username": "string",
            "email": "string",
            "role": "string",
            "created_at": "string"
        }
    ]
    ```

#### GET `/users/:id`

Get user by ID.

-   Response: `200 OK`
    ```json
    {
        "id": "number",
        "username": "string",
        "email": "string",
        "role": "string",
        "created_at": "string"
    }
    ```

#### PUT `/users/:id`

Update user.

-   Request body:
    ```json
    {
        "username": "string",
        "email": "string"
    }
    ```
-   Response: `200 OK`
    ```json
    {
        "message": "User updated successfully"
    }
    ```

#### DELETE `/users/:id`

Delete user and their events.

-   Response: `200 OK`
    ```json
    {
        "message": "User deleted successfully"
    }
    ```

### Event Routes

#### POST `/events`

Create new event.

-   Request body:
    ```json
    {
        "title": "string",
        "description": "string",
        "category": "string",
        "date": "string",
        "time": "string",
        "location": "string",
        "user_id": "number"
    }
    ```
-   Response: `201 Created`
    ```json
    {
        "message": "Event created successfully"
    }
    ```

#### GET `/events`

Get all events.

-   Response: `200 OK`
    ```json
    [
        {
            "id": "number",
            "title": "string",
            "description": "string",
            "category": "string",
            "date": "string",
            "time": "string",
            "location": "string",
            "user_id": "number",
            "created_at": "string"
        }
    ]
    ```

#### GET `/events/:id`

Get events by user ID.

-   Response: `200 OK`
    ```json
    [
        {
            "id": "number",
            "title": "string",
            "description": "string",
            "category": "string",
            "date": "string",
            "time": "string",
            "location": "string",
            "user_id": "number",
            "created_at": "string"
        }
    ]
    ```

#### GET `/events/event/:id`

Get event by event ID.

-   Response: `200 OK`
    ```json
    {
        "id": "number",
        "title": "string",
        "description": "string",
        "category": "string",
        "date": "string",
        "time": "string",
        "location": "string",
        "user_id": "number",
        "created_at": "string"
    }
    ```

#### PUT `/events/:id`

Update event.

-   Request body:
    ```json
    {
        "title": "string",
        "description": "string",
        "category": "string",
        "date": "string",
        "time": "string",
        "location": "string"
    }
    ```
-   Response: `200 OK`
    ```json
    {
        "message": "Event updated successfully"
    }
    ```

#### DELETE `/events/:id`

Delete event.

-   Response: `200 OK`
    ```json
    {
        "message": "Event deleted successfully"
    }
    ```

## Error Handling

All routes include error handling that returns appropriate HTTP status codes:

-   `400` Bad Request - Invalid input
-   `401` Unauthorized - Invalid credentials
-   `404` Not Found - Resource not found
-   `500` Internal Server Error - Server-side errors

Errors are returned in JSON format:

```json
{
    "error": "Error message"
}
```
