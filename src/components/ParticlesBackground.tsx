'use client'; // Required for tsparticles interaction

import { useEffect, useMemo, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { type Container, type ISourceOptions } from '@tsparticles/engine';
// Import the slim build if you installed it, otherwise use the full build
import { loadSlim } from '@tsparticles/slim'; // Corrected import path

const ParticlesBackground = () => {
  const [init, setInit] = useState(false);

  // Initialize the tsparticles engine once
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      // Load the slim engine (or full engine if needed)
      await loadSlim(engine);
      // You can add custom shapes or presets here if needed
    }).then(() => {
      setInit(true);
    });
  }, []);

  // Prefix 'container' with '_' as it's not used
  const particlesLoaded = async (_container?: Container): Promise<void> => {
    // console.log('Particles container loaded', container);
  };

  const options: ISourceOptions = useMemo(
    () => ({
      background: {
        color: {
          // Use a dark background color that matches your theme or the previous gradient's base
          value: '#0f172a', // Example: dark slate color
        },
      },
      fpsLimit: 120, // Higher FPS limit for smoother animations
      interactivity: {
        events: {
          onClick: {
            enable: false, // Disable click events for simplicity
            mode: 'push',
          },
          onHover: {
            enable: true, // Enable hover events
            mode: 'grab', // Particles connect with a line to the cursor
          },
          resize: { // Changed from resize: true
            enable: true,
          }
        },
        modes: {
          push: {
            quantity: 4,
          },
          repulse: {
            distance: 150,
            duration: 0.4,
          },
          grab: {
            distance: 200,
            links: { // Changed from link_linked
                opacity: 0.6, // Increased grab link opacity
            }
          }
        },
      },
      particles: {
        color: {
          value: '#ffffff', // White particles
        },
        links: { // Changed from line_linked to links
          color: '#ffffff',
          distance: 150,
          enable: true,
          opacity: 0.4, // Increased link opacity
          width: 1.5, // Increased link width
        },
        move: {
          direction: 'none',
          enable: true,
          outModes: { // Changed from out_mode to outModes
            default: 'out', // Particles disappear when going out of bounds
          },
          random: true, // Random movement
          speed: 1, // Slow movement speed
          straight: false,
        },
        number: {
          density: {
            enable: true,
            area: 800, // Adjust density based on screen area
          },
          value: 80, // Increased particle count
        },
        opacity: {
          value: 0.7, // Increased particle opacity
        },
        shape: {
          type: 'circle', // Circle shaped particles
        },
        size: {
          value: { min: 1, max: 3 }, // Random size between 1 and 3
        },
      },
      detectRetina: true, // Improves rendering on high-density displays
    }),
    [],
  );

  if (init) {
    return (
      <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={options}
        className="absolute inset-0 -z-10" // Position behind other content
      />
    );
  }

  return <></>; // Return empty fragment while initializing
};

export default ParticlesBackground; 