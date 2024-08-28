import React, { useState } from "react";
import { auth, provider } from "../firebase-config.js";
import { signInWithPopup } from "firebase/auth";
import Cookies from "universal-cookie";
import styled from "styled-components";
import video from "../Assets/video/earth.mp4"

const cookies = new Cookies();

const AuroraBackground = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  overflow: hidden;
`;

const AuthContent = styled.div`
  z-index: 1;
  background: rgba(0, 0, 0, 0.6);
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);

  p {
    margin-bottom: 20px;
    font-size: 1.2rem;
  }

  button {
    background-color: #4285f4;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s;

    &:hover {
      background-color: #357ae8;
    }

    &:disabled {
      background-color: #999;
      cursor: not-allowed;
    }
  }
`;

export const Auth = ({ setIsAuth }) => {
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(""); // Error state

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, provider);
      cookies.set("auth-token", result.user.refreshToken);
      setIsAuth(true);
    } catch (err) {
      console.error(err);
      setError("Failed to sign in. Please try again.");
    } finally {
      setLoading(false); // Stop loading regardless of success/failure
    }
  };

  return (
    <><div className="overlay"></div><video src={video} autoPlay loop muted /><AuroraBackground>
      <AuthContent>
        <p>Sign In With Google To Continue</p>
        <button onClick={signInWithGoogle} disabled={loading}>
          {loading ? "Signing In..." : "Sign In"}
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </AuthContent>
    </AuroraBackground></>
  );
};
