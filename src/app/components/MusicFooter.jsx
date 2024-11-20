'use client';
import React, { useState, useEffect } from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Repeat,
  Volume2,
  Volume1,
  VolumeX,
  RefreshCcw,
} from 'lucide-react';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [volume, setVolume] = useState(100);
  const [player, setPlayer] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isPlayerReady, setIsPlayerReady] = useState(false);

  const playlist = [
    {
      title: 'NF - HOPE',
      artist: 'NF',
      videoId: 'hQsZUVMwEls',
    },
    {
      title: 'The Search',
      artist: 'NF',
      videoId: 'cXIlJYw_r74',
    },
    {
      title: 'Let You Down',
      artist: 'NF',
      videoId: 'A71knrRCiJ0',
    },
  ];

  useEffect(() => {
    // Similar YouTube API setup as before
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    window.onYouTubeIframeAPIReady = () => {
      if (!player) {
        const newPlayer = new window.YT.Player('youtube-player', {
          height: '0',
          width: '0',
          videoId: playlist[currentTrack].videoId,
          playerVars: {
            playsinline: 1,
            controls: 0,
            autoplay: 0,
          },
          events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange,
          },
        });
        setPlayer(newPlayer);
      }
    };

    if (window.YT && !player) {
      window.onYouTubeIframeAPIReady();
    }

    return () => {
      if (player && player.destroy) {
        player.destroy();
      }
    };
  }, []);

  const onPlayerReady = (event) => {
    setIsPlayerReady(true);
    event.target.setVolume(volume);
  };

  const onPlayerStateChange = (event) => {
    if (event.data === window.YT?.PlayerState?.PLAYING) {
      setIsPlaying(true);
    } else if (event.data === window.YT?.PlayerState?.PAUSED) {
      setIsPlaying(false);
    } else if (event.data === window.YT?.PlayerState?.ENDED) {
      playNext();
    }
  };

  useEffect(() => {
    let interval;
    if (isPlaying && player && player.getCurrentTime) {
      interval = setInterval(() => {
        try {
          const currentTime = player.getCurrentTime();
          const duration = player.getDuration();
          setProgress((currentTime / duration) * 100);
        } catch (error) {
          console.error('Error updating progress:', error);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, player]);

  const togglePlay = () => {
    if (player && isPlayerReady) {
      try {
        if (isPlaying) {
          player.pauseVideo();
        } else {
          player.playVideo();
        }
      } catch (error) {
        console.error('Error toggling play state:', error);
      }
    }
  };

  const playNext = () => {
    if (player && isPlayerReady) {
      const nextTrack = (currentTrack + 1) % playlist.length;
      setCurrentTrack(nextTrack);
      try {
        player.loadVideoById(playlist[nextTrack].videoId);
      } catch (error) {
        console.error('Error playing next track:', error);
      }
    }
  };

  const playPrevious = () => {
    if (player && isPlayerReady) {
      const prevTrack = (currentTrack - 1 + playlist.length) % playlist.length;
      setCurrentTrack(prevTrack);
      try {
        player.loadVideoById(playlist[prevTrack].videoId);
      } catch (error) {
        console.error('Error playing previous track:', error);
      }
    }
  };

  const handleVolumeChange = () => {
    if (player && isPlayerReady) {
      const newVolume = volume === 0 ? 100 : 0;
      setVolume(newVolume);
      try {
        player.setVolume(newVolume);
      } catch (error) {
        console.error('Error changing volume:', error);
      }
    }
  };

  return (
    <div className="bg-[#4AA9AD] px-4 py-2 flex flex-col md:flex-row items-center justify-between h-auto md:h-20 gap-4">
      {/* Hidden YouTube player */}
      <div id="youtube-player" className="hidden"></div>

      {/* Track Info */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center">
          <span className="text-white text-xl">NF</span>
        </div>
        <div className="text-white text-center md:text-left">
          <div className="text-sm font-medium">{playlist[currentTrack].title}</div>
          <div className="text-xs opacity-75">{playlist[currentTrack].artist}</div>
        </div>
      </div>

      {/* Controls and Progress Bar */}
      <div className="flex-1 max-w-full md:max-w-2xl w-full px-4">
        <div className="flex items-center justify-center gap-4 mb-2">
          <button className="text-white hover:text-blue-200 transition-colors">
            <RefreshCcw size={20} />
          </button>
          <button
            onClick={playPrevious}
            className="text-white hover:text-blue-200 transition-colors"
          >
            <SkipBack size={24} />
          </button>
          <button
            onClick={togglePlay}
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-blue-100 transition-colors"
          >
            {isPlaying ? (
              <Pause size={24} className="text-teal-500" />
            ) : (
              <Play size={24} className="text-teal-500 ml-1" />
            )}
          </button>
          <button
            onClick={playNext}
            className="text-white hover:text-blue-200 transition-colors"
          >
            <SkipForward size={24} />
          </button>
          <button className="text-white hover:text-blue-200 transition-colors">
            <Repeat size={20} />
          </button>
        </div>
        <div className="bg-teal-600 h-1 rounded-full w-full">
          <div
            className="bg-white h-full rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Volume Control */}
      <button
        onClick={handleVolumeChange}
        className="text-white hover:text-blue-200 transition-colors"
      >
        {volume === 0 ? (
          <VolumeX size={24} />
        ) : volume < 50 ? (
          <Volume1 size={24} />
        ) : (
          <Volume2 size={24} />
        )}
      </button>
    </div>
  );
};

export default MusicPlayer;
