import React from "react";
import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const ParticlesComponent = () => {
  const particlesInit = useCallback(async (engine) => {
    // Load the full tsparticles engine
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    // Callback once the particles are loaded
  }, []);

  const particlesOptions = {
    fpsLimit: 60,
    particles: {
      number: {
        value: 80,
        density: {
          enable: true,
          value_area: 800,
        },
      },
      color: {
        value: "#ffffff",
      },
      shape: {
        type: "circle",
      },
      opacity: {
        value: 0.6
      },
      size: {
        value: 4,
        random: false,
      },
      move: {
        enable: true,
        speed: 2,
        out_mode: "out",
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: "#ffffff",
        opacity: 0.4,
        width: 1,
      },
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: {
          enable: true,
          mode: "grab",
        },
        onclick: {
          enable: true,
          mode: "push",
        },
        resize: true,
      },
      modes: {
        grab: {
          distance: 140,
          line_linked: {
            opacity: 1,
          },
        },
        push: {
          particles_nb: 4,
        },
      },
    },
    retina_detect: true,
  };

  return (
    <Particles id="tsparticles" init={particlesInit} loaded={particlesLoaded} options={particlesOptions} />
  );
};

export default ParticlesComponent;
