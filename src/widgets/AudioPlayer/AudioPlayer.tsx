import { useEffect, useRef, useState } from "react";
import classNames from 'classnames/bind';

import styles from './audio-player.module.scss'
import './input.css'

const cx = classNames.bind(styles);

interface IAudioPlayerProps {
  track: string
}

export const AudioPlayer = ({ track }: IAudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currenTime, setCurrenTime] = useState(0);
  const [duration, setDuration] = useState('0');
  const [formattedCurrentTime, setFormattedCurrentTime] = useState('0');

  const audioRef = useRef<any>(null);

  const handleSeek = (e: any) => {
    audioRef.current.currentTime = e.target.value;
    setCurrenTime(e.target.value);
  }

  const handleTimeUpdate = () => {
    setCurrenTime(audioRef.current.currentTime);
    setFormattedCurrentTime(formateDuration(audioRef.current.currentTime));
  }

  const handlePlay = () => {
    audioRef.current.play();
    setIsPlaying(true);
  }

  const handlePause = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  }

  const handlePlayPause = () => {
    if (isPlaying) {
      handlePause();
    } else {
      handlePlay();
    }
  }

  const formateDuration = (durationSeconds: number) => {
    const minutes = Math.floor(durationSeconds / 60);
    const seconds = Math.floor(durationSeconds % 60);
    const formattedSeconds = seconds.toString().padStart(2, '0');

    return `${minutes}:${formattedSeconds}`
  }

  const onLoadedMetadata = () => {
    const seconds = formateDuration(audioRef.current.duration)
    setDuration(seconds);
  }

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
      }
    }
  }, [])

  return (
    <div className={styles.wrapper}>
      <div className={styles.trackDuration}>
        <p>{duration ? duration : null}</p>
      </div>

      <button className={cx(styles.playButton, { [styles.pauseButton]: isPlaying })} onClick={handlePlayPause}></button>

      <input
        className={'inputRange'}
        type="range"
        min={0}
        max={duration}
        value={currenTime}
        onChange={handleSeek}
      />
      <audio ref={audioRef} src={track} onLoadedMetadata={onLoadedMetadata} />

      <div className={styles.upload}></div>
      <div className={styles.close}></div>
      <div className={styles.currenTime}>
        {currenTime ? formattedCurrentTime : null}
      </div>
    </div>
  )
}