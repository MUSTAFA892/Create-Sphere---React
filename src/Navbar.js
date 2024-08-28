import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Cookies from "universal-cookie";
import { auth } from "./firebase-config";
import "./Navbar.css";

const cookies = new Cookies();

function NavBar() {
  const [firebaseUser, loading] = useAuthState(auth); // Firebase user state
  const [user, setUser] = useState(null); // Local state to cache user data
  const [click, setClick] = useState(false);
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));

  useEffect(() => {
    if (!loading && firebaseUser) {
      // Store the user data once when fetched
      setUser({
        displayName: firebaseUser.displayName,
        photoURL: firebaseUser.photoURL,
      });
    }
  }, [firebaseUser, loading]);

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      cookies.remove("auth-token");
      setIsAuth(false);
      setUser(null); // Clear the user data on sign out
    } catch (error) {
      console.error("Sign-out error:", error);
    }
  };

  const handleClick = () => setClick(!click);

  return (
    <nav className="navbar">
      {/* {user && (
        <div className="nav-profile">
          <img
            src={user.photoURL}
            alt="Profile"
            className="nav-profile-img"
          />
        </div>
      )} */}
      <div className="nav-container">
        <ul className={click ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <a href="/" className="nav-links" onClick={handleClick}>
              Home
            </a>
          </li>
          <li className="nav-item">
            <a href="/text_image" className="nav-links" onClick={handleClick}>
              Text-to-image
            </a>
          </li>
          <li className="nav-item">
            <a href="/text_video" className="nav-links" onClick={handleClick}>
              Text-to-video
            </a>
          </li>
          <li className="nav-item">
            <a href="/lip_sync" className="nav-links" onClick={handleClick}>
              Audio-Align
            </a>
          </li>
          <li className="nav-item">
            <a href="/text_sound" className="nav-links" onClick={handleClick}>
              Text-to-voice
            </a>
          </li>
          <li className="nav-item">
          <a href = "#"className="nav-links" onClick={handleSignOut}>Sign Out</a>
          </li>
        </ul>
        <div className="nav-icon" onClick={handleClick}>
          {click ? (
            <span className="icon">&#10005;</span> // 'X' icon for menu close
          ) : (
            <span className="icon">&#9776;</span> // '☰' icon for menu open
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
