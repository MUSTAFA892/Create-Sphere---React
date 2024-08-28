import React, { useState, useRef, useEffect } from 'react';
import { motion } from "framer-motion";
import './text_image.css'; // Import the CSS file for custom styles
import text from "../../Assets/image/text_image.png";

import cardImage1 from '../../Assets/image/sample1.webp';
import cardImage2 from '../../Assets/image/sample2.webp';
import cardImage3 from '../../Assets/image/sample3.webp';
import cardImage4 from '../../Assets/image/sample4.webp';
import cardImage5 from '../../Assets/image/sample5.webp';
import cardImage6 from '../../Assets/image/sample6.webp';
import cardImage7 from '../../Assets/image/sample7.webp';
import cardImage8 from '../../Assets/image/sample8.webp';
import cardImage9 from '../../Assets/image/sample9.webp';
import cardImage10 from '../../Assets/image/sample10.webp';
import cardImage11 from '../../Assets/image/sample11.webp';
import cardImage12 from '../../Assets/image/sample12.webp';

export default function TextImage() {
  const [prompt, setPrompt] = useState(''); // State to store user prompt input
  const [imageUrl, setImageUrl] = useState(''); // State to store generated image URL
  const [loading, setLoading] = useState(false); // State to manage loading
  const [isListening, setIsListening] = useState(false); // State to manage voice recognition status
  const btnRef = useRef(null);
  const spotlightRef = useRef(null);

  // Function to handle voice recognition start and stop
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

  // Function to call the Stability AI API for image generation
  const handleGenerateClick = async () => {
    setLoading(true);

    try {
      const response = await fetch(
        `https://api.stability.ai/v1/generation/stable-diffusion-v1-6/text-to-image`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer sk-KCInz1yhIYnrj3mTrM1TFKU9cRxCV4anOC3N7EV91I2VwJGY`,
            // sk-hIdxMRU9rC65MG3eyaV9xTG0aPsqqHFgSIkIvInuPQoaG7lV
          },
          body: JSON.stringify({
            text_prompts: [{ text: prompt }],
            cfg_scale: 7, // You can adjust this value for variation in image generation
            height: 512, // Image height
            width: 512, // Image width
            steps: 30, // Number of steps for diffusion
            samples: 1, // Number of images to generate
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Non-200 response: ${await response.text()}`);
      }

      const responseJSON = await response.json();
      const generatedImage = responseJSON.artifacts[0].base64;

      setImageUrl(`data:image/png;base64,${generatedImage}`);
    } catch (error) {
      console.error('Error generating image:', error);
    } finally {
      setLoading(false);
    }
  };

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


  const cardData = [
    { image: cardImage1, header: "Prompts:-", body: "digital wallpaper portrait of brutal cyberpunk samurai, anime, in the style of marvel comics, dark, muted colors, brutal epic composition, dramatic, digital painting, very intricate" },
    { image: cardImage2, header: "Prompts:-", body: "digital wallpaper portrait of brutal cyberpunk samurai, anime, in the style of marvel comics, dark, muted colors, brutal epic composition, dramatic, digital painting, very intricate" },
    { image: cardImage3, header: "Elon Musk's Voice", body:"Spiderman, sharp focus, tight ferrofluid suit, texture, Gotham City, highest quality rich color photo, dark, shadow, high contrast, 8k" },
    { image: cardImage4, header: "Prompts:-", body: "sketches blueprint of futuristic sci-fi huge spacecraft, warp engines, formulas and annotations, schematic by parts, golden ratio, fake detail, trending pixiv fanbox, acrylic palette knife, style of makoto shinkai studio ghibli genshin impact james gilleard greg rutkowski chiho aoshima" },
    { image: cardImage5, header: "Prompts:-", body: "Close up portrait of God of War Kratos, hyperrealism, epic compostion, brutal, mist, octane render, 8k, maximum details, volumetric lighting, hdr, high quality" },
    { image: cardImage6, header: "Prompts:-", body: "conceptual 3D render bioluminescence man with artificial intelligence playing at the DJ console super highly detailed, professional digital painting, artstation, concept art, smooth, sharp focus, extreme illustration, Unreal Engine 5, Photorealism, HD quality, 8k resolution, cinema 4d, 3D, beautiful, cinematic, art by artgerm and greg rutkowski and alphonse mucha" },
    { image: cardImage7, header: "Prompts:-", body: "Hyperrealistic portrait of a stunning Korean kpop idol with a white braided ponytail, full sleeve tattoo, and red lips, wearing a tight all-black sleeveless body suit amidst a breathtaking cherry blossom landscape. Canon R5, 200mm lens, sharp focus, and shot in RAW format. The photograph showcases an intricate, photorealistic, and highly detailed face in 8k HD quality." },
    { image: cardImage8, header: "Prompts:-", body: "delicious ice cream in a half sphere waffle with berries and toppings" },
    { image: cardImage9, header: "Prompts:-", body: "National Geographic award winning wildlife medium shot photo of a stalking snow leopard, snowy rocky mountain forest on a cloudy day, covered with snow, full body view, highly detailed, high resolution, look at viewer with intense gaze, predatory, hyper detailed eyes, crisp focus, natural lighting" },
    { image: cardImage10, header: "Prompts:-", body: "RAW Photo Portrait of 40 year old baggy-figured ((african american) :1. 5) woman with (Ginger) with flowers in her hair, with a ethereal garden in the background, inspired by Anna Dittmann, featured on cgsociety, fantasy art, detailed photo, made of flowers, The (medium wide shot:1.4) , one-shot, is taken from a dutch angle, with a Cinestill hasselblad 85 mm" },
    { image: cardImage11, header: "Prompts:-", body: "8bit, tilt shift photography, New York" },
    { image: cardImage12, header: "Prompts:-", body: "Christmas decorated house, cinematic wallpaper HD quality" }
  ];

  return (
    <div style={{ textAlign: 'center', padding: '0' }}>
      <div style={{ marginTop: '-100px', position: 'relative' }}>
        <img src={text} alt="Text Image" style={{ maxWidth: '100%', height: 'auto' }} />
      </div>

      <div className="stylish-input-container">
        <input
          type="text"
          placeholder="Enter your prompt here"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)} // Update prompt state
          className="stylish-input"
          style={{ width: '300px', marginRight: '10px' }}
        />
        <button
          onClick={handleVoiceRecognition}
          style={{
            margin: '',
            backgroundColor: isListening ? '#f44336' : '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            padding: '10px',
            cursor: 'pointer'
          }}
        >
          {isListening ? 'Stop Listening' : 'Start Listening'}
        </button>
      </div>

      <br />

      <motion.button
        whileTap={{ scale: 0.985 }}
        onClick={handleGenerateClick}
        ref={btnRef}
        className="spotlight-button"
        disabled={loading}
      >
        <span className="button-text">
          {loading ? 'Generating...' : 'Generate Image'}
        </span>
        <span
          ref={spotlightRef}
          className="spotlight-effect"
        />
      </motion.button>

      <div style={{ marginTop: '20px' }}>
        {imageUrl && (
          <>
            <div style={{
              padding: '10px',
              border: '10px solid #333', // Outer border
              borderRadius: '10px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              display: 'inline-block',
              backgroundColor: '#fff', // White background for better contrast
              position: 'relative'
            }}>
              <div style={{
                border: '5px solid #fff', // Inner border (double border effect)
                borderRadius: '5px',
                padding: '5px',
                display: 'inline-block',
              }}>
                <img src={imageUrl} alt="Generated" style={{
                  width: '512px', // Fixed width for the image
                  height: '512px', // Fixed height for the image
                  borderRadius: '5px',
                  display: 'block'
                }} />
              </div>
            </div>
            <br />
            {/* Download button */}
            <a
              href={imageUrl}
              download="generated_image.png"
              className="download-button"
              style={{
                display: 'inline-block',
                padding: '10px 20px',
                backgroundColor: '#4CAF50',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '5px',
                fontSize: '16px',
                marginTop: '10px'
              }}
            >
              Download Image
            </a>
          </>
        )}
      </div>
      <h1 style={{ color: 'White', margin: '30px' }}>Sample Outputs</h1>

      {/* Cards Section */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {cardData.map((card, index) => (
          <div
            key={index}
            style={{
              width: '250px',
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
              <p>{card.body}</p>
            </div>
            {card.audio && (
              <div style={{ marginTop: '10px' }}>
                <audio controls>
                  <source src={card.audio} type="audio/mp3" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
