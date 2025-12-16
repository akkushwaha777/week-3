# Framboxx IT - Backend

This is the backend API server for the **Framboxx IT** platform. It handles data processing, API endpoints, and communication with the frontend.

## Overview

The server is built with Node.js and Express. It currently serves mock data for the team directory but is structured effectively for expansion to a real database.

## Features

- **REST API**: Standard endpoints for data retrieval.
- **CORS Enabled**: Configured to allow requests from the frontend application.
- **Logging**: Simple request logging for easier debugging.

## API Endpoints

- `GET /api/users` - Retrieve the list of team members.
- `POST /api/users` - Create a new user.
  - Request body: `{ "name": "string", "role": "string", "mobile": "string" (optional), "email": "string" (optional) }`
  - Response: `{ "success": true, "message": "User created successfully", "data": {...} }`
- `PUT /api/users/:id` - Update an existing user.
- `DELETE /api/users/:id` - Delete a user.
- `GET /` - Health check.

## Setup & Run

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the server (Development mode):
   ```bash
   npm run dev
   ```

3. Server runs on `http://localhost:5000` by default.
