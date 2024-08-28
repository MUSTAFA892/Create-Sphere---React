import React, { useState } from 'react';
import axios from 'axios';
import './lip_sync.css'; // Import the CSS file
import text from "../../Assets/image/lip_sync.png"

const LipSync = () => {
  const [image, setImage] = useState(null);
  const [audio, setAudio] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [error, setError] = useState(null);

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleAudioChange = (event) => {
    setAudio(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!image || !audio) {
      setError('Please select both image and audio files.');
      return;
    }

    const formData = new FormData();
    formData.append('image', image);
    formData.append('audio', audio);

    try {
      const result = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setVideoUrl(result.data.output.output_video); // Set the video URL
      setError(null);
    } catch (err) {
      setError(err.response ? err.response.data.error : 'An error occurred');
      setVideoUrl(null);
    }
  };

  return (
    <div className="upload-container">
      <div style={{ marginTop: '-170px', position: 'relative' }}>
        <img src={text} alt="Text Image" style={{ maxWidth: '100%', height: 'auto' }} />
      </div>
      <form onSubmit={handleSubmit} className="upload-form">
        <div className="input-container">
          <h5>Click below button to add image:</h5>
          <label>
            Image
            <input type="file" accept="image/*" onChange={handleImageChange} style={{ marginTop: '10px' }} />
          </label>
          {image && (
            <>
              <h6 style={{ marginTop: '10px' }}>Preview:</h6>
              <img src={URL.createObjectURL(image)} alt="Selected" className="preview-image" />
            </>
          )}
        </div>
        <div className="input-container">
          <h5>Click below button to add audio:</h5>
          <label>
            Audio
            <input type="file" accept="audio/*" onChange={handleAudioChange} />
          </label>
          {audio && (
            <div className="audio-preview">
              <p className="file-name">{audio.name}</p>
              <audio controls className="preview-audio">
                <source src={URL.createObjectURL(audio)} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          )}
        </div>
        <button type="submit" className="upload-button">Upload</button>
      </form>
      {videoUrl && (
        <>
          <h2 style={{ marginTop: '10px' }}>Generated media:</h2>
          <div className="output-container">
            <video className="output-player" controls>
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default LipSync;
