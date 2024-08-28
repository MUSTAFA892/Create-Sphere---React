import React, { useState, useRef } from 'react';
import './GameWidget.css'; // Import the CSS for styling

const GameWidget = () => {
  const [showGame, setShowGame] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [position, setPosition] = useState({ top: 670, left: 1460 });
  const buttonRef = useRef(null);

  const toggleGame = () => {
    setShowGame(!showGame);
  };

  const onMouseDown = (e) => {
    setDragging(true);
  };

  const onMouseMove = (e) => {
    if (dragging) {
      const newLeft = e.clientX - buttonRef.current.offsetWidth / 2;
      const newTop = e.clientY - buttonRef.current.offsetHeight / 2;
      setPosition({ top: newTop, left: newLeft });
    }
  };

  const onMouseUp = () => {
    setDragging(false);
  };

  React.useEffect(() => {
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, [dragging]);

  return (
    <div>
      <button
        id="gameButton"
        onClick={toggleGame}
        ref={buttonRef}
        style={{ top: position.top, left: position.left }}
        onMouseDown={onMouseDown}
      >
        {showGame ? 'Close Game' : 'Play Game'}
      </button>

      {showGame && (
        <div id="game-container" className="open-animation">
          <iframe
            id="game"
            name="game"
            title="game-frame"
            className="style-module_game__YAtiy"
            frameBorder="0"
            src="https://www.gamezop.com/game-files/B1fSpMkP51m/index.html?id=cfuucl7YgA&amp;lang=en"
            loading="eager"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
            sandbox="allow-downloads allow-top-navigation allow-storage-access-by-user-activation allow-orientation-lock allow-modals allow-scripts allow-same-origin allow-pointer-lock allow-popups allow-forms"
            style={{ height: '100%', width: '100%' }}
            allow="microphone"
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default GameWidget;
