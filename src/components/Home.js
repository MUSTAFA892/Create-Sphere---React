import React, { useState, useEffect } from 'react';
import { auth } from '../firebase-config'; // Adjust the path if necessary
import './Home.css'; // Import your CSS file

export default function Home() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        setUser({
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Optionally show a loading message
  }

  return (
    <div style={{ position: 'relative', color: 'white' }}>
      {user ? (
        <div className="welcome-message">
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '5vh', textAlign: 'center' }}>
  <h4 style={{ marginTop: '-20px' }}>Welcome, {user.displayName}!</h4>
</div>


          {/* Display the typewriter effect text */}
          <div className="typewriter-container">
            <div className="typewriter">
              <div className="typewriter-text">
                Welcome to <span style={{ color: '#FFD700' }}>CreateSphere</span>
              </div>
              <h1></h1>
            </div>
          </div>
          <div className="ttypewriter-container">
            <div className="ttypewriter">
              <div className="typewriter-text">
              At <span style={{ color: '#FFD700' }}>Generational</span>, we're excited to introduce <span style={{ color: '#FFD700' }}>Create Sphere</span>, your ultimate tool for <span style={{ color: '#FFD700' }}>transforming text</span> into a multitude of creative outputs.
              </div>
              <h1></h1>
            </div>
          </div>
          <div className="tttypewriter-container">
            <div className="tttypewriter">
              <div className="typewriter-text">
            Whether you’re looking to generate stunning <span style={{ color: '#FFD700' }}>images, lifelike voices, immersive sound effects, or more</span>, Create Sphere 
              </div>
              <h1></h1>
            </div>
          </div>
          <div className="ttttypewriter-container">
            <div className="ttttypewriter">
              <div className="typewriter-text">
              brings your ideas to life with <span style={{ color: '#FFD700' }}>cutting-edge technology.</span>
              </div>
              <h1></h1>
            </div>
          </div>

          {/* Typewriter effect for the paragraph */}
          <div className="paragraph-container">
            <div className="paragraph">
              {/* <h5>
              At CreateSphere, we empower you to unleash your creativity with cutting-edge generative tools. Whether generating stunning images or crafting engaging text, our platform offers a seamless experience with intuitive interfaces and state-of-the-art AI technology. 
              </h5> */}
            </div>
          </div>

          {/* Display the GIF below the typewriter text */}
          <img
            // src={gif}
            // alt="Welcome Gif" 
            style={{ width: '300px', marginTop: '20px' }}
          />
        </div>
      ) : (
        <div>No user logged in</div>
      )}
    </div>
  );
}
