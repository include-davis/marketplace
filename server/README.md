# Marketplace Server

Backend API server for the Marketplace application with Express, MongoDB, and Socket.IO for real-time messaging.

## Prerequisites

- Node.js (v16 or higher)
- MongoDB Atlas account or local MongoDB instance
- npm or yarn package manager

## Setup Instructions

### 1. Navigate to Server Folder

```bash
cd server
```

**Important:** Make sure you're in the `server` folder before running any commands.

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages including:
- Express.js
- MongoDB driver
- Mongoose
- Socket.IO
- TypeScript
- And other dependencies

### 3. Create Environment File

Create a `.env` file in the `server` folder with the following variables:

```env
MONGO_CONNECTION_STRING=your_mongodb_connection_string_here
JWT_SECRET=your_jwt_secret_here
PORT=3000
```

**Example:**
```env
MONGO_CONNECTION_STRING=mongodb+srv://username:password@cluster0.mongodb.net/?appName=Cluster0
JWT_SECRET=my_super_secret_key_123
PORT=3000
```

> **Note:** Never commit the `.env` file to version control. It's already included in `.gitignore`.

### 4. Run the Server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

You should see:
```
JWT_SECRET loaded: true
listening on port 3000
Mongoose connected to MongoDB
Pinged your deployment. You successfully connected to MongoDB!
```

## API Endpoints

Once the server is running, the following endpoints are available:

- `POST /auth/register` - Register new user
- `POST /auth/login` - User login
- `GET /users` - Get all users
- `GET /listings` - Get all listings (requires auth)
- `POST /listings` - Create listing (requires auth)
- `GET /conversations` - Get user conversations (requires auth)
- `GET /messages/:conversationId` - Get messages for a conversation (requires auth)
- `POST /messages` - Create new message (requires auth)

## Testing Live Messaging Feature

The server includes real-time messaging via Socket.IO. Here's how to test it:

### Method 1: HTML Test Page (Recommended)

1. **Make sure the server is running** (`npm run dev`)

2. **Open the test file:**
   - Locate `test-socket.html` in the `server` folder
   - Right-click the file → "Reveal in File Explorer"
   - Double-click to open it in your browser

3. **Open a second browser tab:**
   - Press `Ctrl + T` (Windows) or `Cmd + T` (Mac)
   - Open the same `test-socket.html` file again
   - Or copy the file path from the first tab's address bar

4. **Test the messaging:**
   - **In Tab 1 (User A):**
     - Leave default IDs as is
     - Click "Join Room"
     - Type a message and click "Send"
   
   - **In Tab 2 (User B):**
     - Optionally swap the Sender/Receiver IDs
     - Click "Join Room"
     - Type a message and click "Send"
   
   - **Result:** Messages appear in BOTH tabs instantly! 🎉

### Method 2: Browser Console

You can also test the live messaging feature using this URL.

http://localhost:3000/messages/test/feature

### Socket.IO Events

Your server listens for these events:

**Client → Server:**
- `join_room` - Join a conversation room
  ```javascript
  socket.emit('join_room', conversationId);
  ```

- `send_message` - Send a new message
  ```javascript
  socket.emit('send_message', {
    conversationId: '507f1f77bcf86cd799439011',
    senderId: '507f191e810c19729de860ea',
    receiverIds: ['507f191e810c19729de860eb'],
    message: 'Hello!',
    image: null // optional
  });
  ```

**Server → Client:**
- `receive_message` - Receive a new message
  ```javascript
  socket.on('receive_message', (data) => {
    console.log('New message:', data);
  });
  ```

- `error` - Receive error notifications
  ```javascript
  socket.on('error', (error) => {
    console.error('Error:', error);
  });
  ```

### Valid Test IDs (MongoDB ObjectIDs)

Use these 24-character hex strings for testing:
- Conversation ID: `507f1f77bcf86cd799439011`
- Sender ID: `507f191e810c19729de860ea`
- Receiver ID: `507f191e810c19729de860eb`

## Troubleshooting

### Server won't start
- ✅ Check that you're in the `server` folder
- ✅ Verify `.env` file exists with correct MongoDB connection string
- ✅ Run `npm install` to ensure all dependencies are installed

### "Cannot GET /"
- This is normal! The server has no root route defined
- Test the API endpoints listed above or use the messaging test page

### WebSocket connection failed
- ✅ Make sure the server is running on port 3000
- ✅ Use the Socket.IO client (not raw WebSocket)
- ✅ Check that CORS is enabled (it is by default)

### Database connection issues
- ✅ Verify MongoDB connection string in `.env` file
- ✅ Check that your IP address is whitelisted in MongoDB Atlas
- ✅ Ensure database username/password are correct

## Project Structure

```
server/
├── auth/                  # Authentication routes and middleware
├── controllers/           # Request handlers
├── models/               # Mongoose models
├── routes/               # API route definitions
├── services/             # Business logic and database operations
├── app.ts                # Main application entry point
├── socket.ts             # Socket.IO configuration and handlers
├── test-socket.html      # HTML test page for live messaging
├── .env                  # Environment variables (create this)
└── package.json          # Dependencies and scripts
```

## Tech Stack

- **Runtime:** Node.js + TypeScript
- **Framework:** Express.js
- **Database:** MongoDB (with Mongoose ODM)
- **Real-time:** Socket.IO
- **Authentication:** JWT (JSON Web Tokens)

## Development

The server uses `tsx watch` for hot-reloading during development. Any changes to TypeScript files will automatically restart the server.

## Support

If you encounter issues:
1. Check the terminal for error messages
2. Verify all prerequisites are installed
3. Ensure `.env` file is properly configured
4. Check MongoDB connection is active
