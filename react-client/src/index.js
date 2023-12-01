import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import App from './App';
import { UserContextProvider } from './contexts/UserContext';
import { PostsContextProvider } from './contexts/PostsContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserContextProvider>
      <PostsContextProvider>
        <App />
      </PostsContextProvider>
    </UserContextProvider>
  </React.StrictMode>
);


