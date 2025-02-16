import React, { createContext, useContext, useState, useEffect } from 'react';

export const SOUNDTRACKS = {
  default: 'Default Theme',
  hourly: 'Hourly Music',
  kk: 'K.K. Slider Songs'
};

const AudioContext = createContext();

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
}



export const AudioProvider = ({ children }) => {
  const [isBackgroundMusicEnabled, setIsBackgroundMusicEnabled] = useState(() => {
    const stored = localStorage.getItem('backgroundMusicEnabled');
    return stored ? JSON.parse(stored) : true;
  });
  const [isAmbientEnabled, setIsAmbientEnabled] = useState(() => {
    const stored = localStorage.getItem('ambientEnabled');
    return stored ? JSON.parse(stored) : false;
  });
  const [currentTrack, setCurrentTrack] = useState(null);
  const [audioElement, setAudioElement] = useState(null);
  const [ambientElement, setAmbientElement] = useState(null);
  const [selectedSoundtrack, setSelectedSoundtrack] = useState(() => {
    const stored = localStorage.getItem('selectedSoundtrack');
    return stored || 'legacy';
  });

  // Initialize ambient sound
  useEffect(() => {
    const loadAmbientSound = async () => {
      try {
        const ambient = new Audio('/audio/ambient/rain.mp3');
        ambient.loop = true;
        ambient.volume = 0.3;
        await ambient.load();
        setAmbientElement(ambient);
      } catch (error) {
        console.error('Error loading ambient sound:', error);
      }
    };
    loadAmbientSound();
    return () => {
      if (ambientElement) {
        ambientElement.pause();
        ambientElement.src = '';
      }
    };
  }, []);

  useEffect(() => {
    localStorage.setItem('backgroundMusicEnabled', JSON.stringify(isBackgroundMusicEnabled));

    if (audioElement) {
      if (isBackgroundMusicEnabled) {
        audioElement.play().catch(console.error);
      } else {
        audioElement.pause();
      }
    }
  }, [isBackgroundMusicEnabled, audioElement]);

  useEffect(() => {
    localStorage.setItem('ambientEnabled', JSON.stringify(isAmbientEnabled));

    if (ambientElement) {
      if (isAmbientEnabled) {
        ambientElement.play().catch(console.error);
      } else {
        ambientElement.pause();
      }
    }
  }, [isAmbientEnabled, ambientElement]);

  const loadAndPlayTrack = async (trackPath) => {
    if (audioElement) {
      audioElement.pause();
    }

    const audio = new Audio(trackPath);
    audio.loop = true;
    audio.volume = 0.5;
    setAudioElement(audio);
    setCurrentTrack(trackPath);

    if (isBackgroundMusicEnabled) {
      try {
        await audio.play();
      } catch (error) {
        console.error('Error playing audio:', error);
      }
    }
  };

  const toggleBackgroundMusic = () => {
    setIsBackgroundMusicEnabled(prev => !prev);
  };

  const toggleAmbientSound = () => {
    setIsAmbientEnabled(prev => !prev);
  };

  useEffect(() => {
    localStorage.setItem('selectedSoundtrack', selectedSoundtrack);
  }, [selectedSoundtrack]);

  return (
    <AudioContext.Provider
      value={{
        isBackgroundMusicEnabled,
        toggleBackgroundMusic,
        currentTrack,
        loadAndPlayTrack,
        selectedSoundtrack,
        setSelectedSoundtrack,
        isAmbientEnabled,
        toggleAmbientSound
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};