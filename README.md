# SoundTrends

**SoundTrends** **SoundTrends** is a platform designed to foster interaction and engagement within the audio tech community. It allows users to create and share posts, comment on content, and engage with others through likes. The platform features a registration and login system, enabling users to contribute to discussions. Whether you're sharing insights, asking questions, or simply engaging with others, SoundTrends provides a space for audio tech enthusiasts to connect and share ideas.

## Key Features

- **Registration/Login**: Users can create an account and log in to access the platform.
- **Post Management**: Users can read, create, edit, and delete posts.
- **Comments**: Each post can receive comments from users.
- **Likes**: Users can like posts to save them and express appreciation.

## Prerequisites

Before starting, ensure you have the following installed on your machine:

- [Node.js]
- [npm]
- [React]
- [MongoDB]

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/r0-ch/soundtrends.git
   cd soundtrends

2. **Install dependencies**:

  ```bash
  npm install
  ```

3. **Configure environment**:

  ```
  DATABASE_URL=mongodb://localhost:27017/soundtrends
  JWT_SECRET=your_jwt_secret_key
  ```

4. **Run the application**:

   ```bash
   cd server/
   npm run start
   cd react-client/
   npm run start
   ```
The application will be accessible at http://localhost:3000.

## Project Structure

- `src/` : Contains the main source code.
  - `models/` : Data models for users, posts, comments, and likes.
  - `routes/` : Routes for handling registration, login, post creation, comments, and likes.
  - `controllers/` : Logic for handling user actions (creating posts, commenting, etc.).
- `public/` : Static files such as CSS and JS assets.

## Contributing


## Author


## License

