import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from './contexts/UserContext';

import SignupPage from './pages/SignupPage';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import CreatePostPage from './pages/CreatePostPage';
import PostPage from './pages/PostPage';
import EditPostPage from './pages/EditPostPage';


function App() {
  const { user } = useContext(UserContext);

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* <Route path="/" element={<HomePage />} />
          <Route path='/create' element={user ? <CreatePostPage /> : <Navigate to='/login' />} />
          <Route path='/post/:id' element={<PostPage />} />
          <Route path='/edit/:id' element={user ? <EditPostPage /> : <Navigate to='/login' />} />
          <Route path='/signup' element={!user ? <SignupPage /> : <Navigate to='/' />} />
          <Route path='/login' element={!user ? <LoginPage /> : <Navigate to='/' />} />
          <Route path='/profile' element={user ? <ProfilePage /> : <Navigate to='/login' />} /> */}
          <Route path="/" element={<HomePage />} />
          <Route path='/signup' element={!user ? <SignupPage /> : <Navigate to='/' />} />
          <Route path='/login' element={!user ? <LoginPage /> : <Navigate to='/' />} />
          <Route path='/post/:id' element={<PostPage />} />
          <Route path='/edit/:id' element={user ? <EditPostPage /> : <Navigate to='/login' />} />
          <Route path='/create' element={user ? <CreatePostPage /> : <Navigate to='/login' />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
