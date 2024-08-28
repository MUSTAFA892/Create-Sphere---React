import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { auth } from "./firebase-config";
import Cookies from "universal-cookie";
import Navbar from "./Navbar.js";
import Home from "./components/Home.js";
import { Auth } from "./components/Auth.js";
import TextToImage from "./components/models/text_image.js";
import TextToVideo from "./components/models/text_video.js";
import LipSync from "./components/models/lip_sync.js";
import TextToSound from "./components/models/text_sound.js";
import "./App.css"; // Import CSS file for styling
import video from "./Assets/video/earth2.mp4"; // Ensure this path is correct
import 'bootstrap/dist/css/bootstrap.min.css';
import { ThemeProvider } from '@material-tailwind/react';
import GameWidget from './components/GameWidget.js';
import Particles from "../src/components/ParticlesComponent.js";

const cookies = new Cookies();

function App() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserInfo({
          displayName: user.displayName,
          photoURL: user.photoURL,
        });
        cookies.set("auth-token", user.refreshToken);
        setIsAuth(true);
      } else {
        setUserInfo({});
        cookies.remove("auth-token");
        setIsAuth(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      cookies.remove("auth-token");
      setIsAuth(false);
      setUserInfo({});
    } catch (error) {
      console.error("Sign-out error:", error);
    }
  };

  return (
    <Router>
      <div className="App">
        {/* Video background */}
        <video autoPlay muted loop id="background-video" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: -1 }}>
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Profile image */}
        {isAuth && userInfo.photoURL && (
          <div className="profile-container">
            <img src={userInfo.photoURL} alt="Profile" className="profile-image" />
          </div>
        )}

        {isAuth ? (
          <>
            <Navbar userInfo={userInfo} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/text_image" element={<TextToImage />} />
              <Route path="/lip_sync" element={< LipSync />} />
              <Route path="/text_video" element={<TextToVideo />} />
              <Route path="/text_sound" element={<TextToSound />} />
            </Routes>
            <GameWidget/>
            <Particles/>
          </>
        ) : (
          <Auth setIsAuth={setIsAuth} />
        )}
      </div>
    </Router>
  );
}

export default App;
