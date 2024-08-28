import React, { useState, useRef } from 'react'; // Added useRef to the import statement
import axios from 'axios';
import { motion } from "framer-motion";
import './text_video.css'; // Import the CSS file
import text from "../../Assets/image/text_video.png"


import cardImage1 from '../../Assets/image/space.jpeg';
import cardImage2 from '../../Assets/image/lion.jpeg';
import cardImage3 from '../../Assets/image/bike.jpeg';
import cardImage4 from '../../Assets/image/festival.jpeg';
import cardImage5 from '../../Assets/image/building.jpeg';
import cardImage6 from '../../Assets/image/sample6.webp';
import cardImage7 from '../../Assets/image/sample7.webp';
import cardImage8 from '../../Assets/image/sample8.webp';
import cardImage9 from '../../Assets/image/sample9.webp';
import cardImage10 from '../../Assets/image/sample10.webp';


const TextToVideo = () => {
    const [prompt, setPrompt] = useState('');
    const [modelId, setModelId] = useState('');
    const [inputModelId, setInputModelId] = useState('');
    const [videoUrl, setVideoUrl] = useState('');
    const [loadingModelId, setLoadingModelId] = useState(false);
    const [loadingVideo, setLoadingVideo] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const btnRef = useRef(null); // useRef defined
    const spotlightRef = useRef(null); // useRef defined

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

    const handleGenerateModelId = async () => {
        setLoadingModelId(true);
        try {
            const response = await axios.post('http://127.0.0.1:5000/generate_model_id', { prompt });
            setModelId(response.data.model_id);
            setInputModelId(response.data.model_id); // Set modelId to inputModelId
            console.log('Model ID generated:', response.data.model_id);
        } catch (error) {
            console.error('Error generating model ID:', error);
        } finally {
            setLoadingModelId(false);
        }
    };

    const handleGetVideo = async () => {
        setLoadingVideo(true);
        try {
            const response = await axios.post('http://localhost:5001/get_video_url', {
                model_id: inputModelId // Use inputModelId for the request
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log('Full API Response:', response);

            if (response.data && response.data.output_url) {
                setVideoUrl(response.data.output_url);
                console.log('Video URL retrieved:', response.data.output_url);
            } else {
                console.error('No video URL found in response:', response.data);
            }
        } catch (error) {
            console.error('Error retrieving video:', error);
        } finally {
            setLoadingVideo(false);
        }
    };

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


      ];

    return (
        <div className="text-to-video-container">
            <div style={{ marginTop: '-150px', position: 'relative', textAlign: 'center', padding: '0' }}>
                <img src={text} alt="Text Image" style={{ maxWidth: '100%', height: 'auto' }} />
            </div>
            
            <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter your video description"
                className='video-input'
            />
            
            <button
                onClick={handleVoiceRecognition}
                style={{
                    margin: '10px',
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
            
            <div>
                <motion.button
                    whileTap={{ scale: 0.985 }}
                    onClick={handleGenerateModelId}
                    ref={btnRef}
                    className="video-button"
                    disabled={loadingModelId}
                >
                    <span className="button-text">
                        {loadingModelId ? 'Generating Model ID...' : 'Generate Model ID'}
                    </span>
                    <span
                        ref={spotlightRef}
                        className="video-effect"
                    />
                </motion.button>
            </div>

            {modelId && (
                <div>
                    <p style ={{color:'white', marginLeft:'530px',marginTop:'15px'}}> Your Model ID: {modelId}</p>
                    <input
                        type="text"
                        value={inputModelId}
                        onChange={(e) => setInputModelId(e.target.value)}
                        placeholder="Enter Model ID to get video"
                        className="video-input"
                        style={{textAlign:'center'}}
                    />
                    <motion.button
                        whileTap={{ scale: 0.985 }}
                        onClick={handleGetVideo}
                        ref={btnRef}
                        className="video-button"
                        disabled={loadingVideo}
                    >
                        <span className="button-text">
                            {loadingVideo ? 'Generating...' : 'Generate Video'}
                        </span>
                        <span
                            ref={spotlightRef}
                            className="video-effect"
                        />
                    </motion.button>
                </div>
            )}

            {videoUrl && (
                <div className="output-container" >
                    <video src={videoUrl} controls className="output-player" />
                 </div>
            )}
        <h1 style = {{color:'white' , marginLeft:'610px',marginTop:'25px',marginBottom:'25px'}}>Sample Outputs</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' , marginTop:'20px'}}>
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
};

export default TextToVideo;
