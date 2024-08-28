import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import textImage from "../../Assets/image/text_voice.png"; // Import the image
import cardImage1 from '../../Assets/image/obama.jpg';
import cardImage2 from '../../Assets/image/Tom.jpg';
import cardImage3 from '../../Assets/image/elon_musk.jpg';
import cardImage4 from '../../Assets/image/jack.webp';
import cardImage5 from '../../Assets/image/jacob.webp';
import cardImage6 from '../../Assets/image/trump.jpg';
import cardImage7 from '../../Assets/image/morgan.avif';
import cardImage8 from '../../Assets/image/snoop.jpg';
import cardImage9 from '../../Assets/image/oprah.jpg';
import elon from "../../Assets/audio/elon.mp3";
import obama from "../../Assets/audio/obama.mp3";
import jack from "../../Assets/audio/jack.mp3";
import morgan from "../../Assets/audio/morgan.mp3";
import tom from "../../Assets/audio/tom.mp3"
import oprah from "../../Assets/audio/oprah.mp3"
import jacob from "../../Assets/audio/jacob.mp3"
import trump from "../../Assets/audio/trump.mp3"
import snoop from "../../Assets/audio/snoop.mp3"


export default function TextSound() {
  const [prompt, setPrompt] = useState("");
  const [voiceId, setVoiceId] = useState("jack_sparrow");
  const [audioUrl, setAudioUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isListening, setIsListening] = useState(false);
  const btnRef = useRef(null);
  const spotlightRef = useRef(null);

  // Handle voice recognition
  const handleVoiceRecognition = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Your browser does not support speech recognition.');
      return;
    }

    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };
    recognition.onresult = (event) => {
      if (event.results.length > 0) {
        setPrompt(event.results[0][0].transcript);
      }
    };

    if (isListening) {
      recognition.stop();
    } else {
      recognition.start();
    }
  };

  const handleGenerateClick = async () => {
    setLoading(true);
    setErrorMessage(""); // Clear any previous error message

    const data = {
      key: "rmdSrQJUKHovRSBkX6FqTUbP9pxGreSV3Hac3qNydafl0zIi7g4UNBOlToU1",
      // xjPvYiDHC65HnnHWhSxYhAa05VxYW9jsZKgsTvX75rsNKICOFfAJKktIxm75
      prompt: prompt,
      voice_id: voiceId,
      decoder_iterations: 30,
      webhook: null,
      track_id: null,
    };

    try {
      const response = await axios.post(
        "https://stablediffusionapi.com/api/v5/text_to_voice",
        data
      );

      if (response.data.status === "success") {
        const generatedAudioUrl = response.data.output[0]; // Extract the URL from the response
        setAudioUrl(generatedAudioUrl); // Set it to state for playback
        console.log("Generated Audio URL:", generatedAudioUrl); // Log the URL to the console
      } else {
        setErrorMessage("Failed to generate sound.");
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle specific error responses
      if (error.code === "ERR_NETWORK_CHANGED") {
        setErrorMessage(
          "Network changed. Please check your connection and try again."
        );
      } else if (error.response && error.response.status === 404) {
        setErrorMessage("API endpoint not found. Please check the endpoint URL.");
      } else if (error.response && error.response.status === 400) {
        setErrorMessage("Bad request. Please check your input data.");
      } else {
        setErrorMessage("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Add event listener for spotlight effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { width, height, top, left } = e.target.getBoundingClientRect();
      const offsetX = e.clientX - left;
      const offsetY = e.clientY - top;
      
      if (spotlightRef.current) {
        spotlightRef.current.style.left = `${(offsetX / width) * 100}%`;
        spotlightRef.current.style.top = `${(offsetY / height) * 100}%`;
      }
    };

    const btn = btnRef.current;

    if (btn) {
      btn.addEventListener("mousemove", handleMouseMove);

      return () => {
        btn.removeEventListener("mousemove", handleMouseMove);
      };
    }
  }, []);

  // Array of card data
  const cardData = [
    { image: cardImage1, header: "Audio Outputs:-", audio:obama },
    { image: cardImage2, header: "Audio Outputs:-", audio:tom},
    { image: cardImage3, header: "Audio Outputs:-", audio:elon },  // Replace with actual path to Elon Musk's audio
    { image: cardImage4, header: "Audio Outputs:-", audio: jack },
    { image: cardImage5, header: "Audio Outputs:-", audio:jacob},
    { image: cardImage6, header: "Audio Outputs:-", audio:trump },  // Replace with actual path to Obama's audio
    { image: cardImage7, header: "Audio Outputs:-", audio:morgan },
    { image: cardImage8, header: "Audio Outputs:-", audio: snoop},
    { image: cardImage9, header: "Audio Outputs:-", audio:oprah},
  ];

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      {/* Display the image above the input box */}
      <div style={{ marginTop: '-120px', position: 'relative' }}>
        <img src={textImage} alt="Text Image" style={{ maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }} />
      </div>

      {/* Input box and voice recognition button */}
      <input
        type="text"
        placeholder="Enter your prompt"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="stylish-input"
        style={{ width: '300px', marginBottom: '10px' }}
      />
      <br />

      {/* Voice recognition button */}
      <button
        onClick={handleVoiceRecognition}
        style={{
          backgroundColor: isListening ? '#f44336' : '#4CAF50',
          marginLeft:'7px',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          padding: '10px',
          cursor: 'pointer',
          marginBottom: '20px'
        }}
      >
        {isListening ? 'Stop Listening' : 'Start Listening'}
      </button>

      <select
        value={voiceId}
        onChange={(e) => setVoiceId(e.target.value)}
        style={{
          padding: "10px",
          marginBottom: "20px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          marginLeft:'10px'
        }}
      >
        <option value="jack_sparrow">Jack Sparrow</option>
        <option value="tom_hank">Tom Hanks</option>
        <option value="snoop_dogg">Snoop Dogg</option>
        <option value="morgan_freeman">Morgan Freeman</option>
        <option value="elon_mask">Elon Musk</option>
        <option value="obama">Obama</option>
        <option value="oprah_winfrey">Oprah Winfrey</option>
        <option value="jacob">Jacob</option>
        <option value="trumpty">Trumpty</option>
        <option value="elon">Elon</option>
      </select>

      <br />

      <motion.button
        whileTap={{ scale: 0.985 }}
        onClick={handleGenerateClick}
        ref={btnRef}
        className="spotlight-button"
        disabled={loading}
      >
        <span className="button-text">
          {loading ? 'Generating...' : 'Generate Sound'}
        </span>
        <span
          ref={spotlightRef}
          className="spotlight-effect"
        />
      </motion.button>

      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      {audioUrl && (
        <div style={{ marginTop: "20px", padding: '10px', border: '10px solid #333', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', width: '80%', maxWidth: '500px',marginLeft:'520px', display: 'block', backgroundColor: '#fff' }}>
          <h3>Generated Sound</h3>
          <audio controls src={audioUrl} type="audio/wav">
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
      
      <h1 style={{ margin: '25px', color: 'white' }}>Sample Outputs</h1>

      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {cardData.map((card, index) => (
          <div
            key={index}
            style={{
              width: '330px',
              margin: '10px',
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '8px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              backgroundColor: '#fff',
              textAlign: 'left'
            }}
          >
            <img src={card.image} alt={`Sample ${index + 1}`} style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '8px' }} />
            <div style={{ marginTop: '10px' }}>
              <strong>{card.header}</strong>
            </div>
            <div style={{ marginTop: '10px' }}>
              {card.audio ? (
                <audio controls src={card.audio} type="audio/mp3">
                  Your browser does not support the audio element.
                </audio>
              ) : (
                <p>{card.body}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
