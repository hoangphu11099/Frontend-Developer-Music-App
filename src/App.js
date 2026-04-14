import { useRef, useState } from "react";
import "./App.css";
import musicAPI from "./MusicData";
function App() {
  const [currentMusicDetails, setCurrentMusicDetails] = useState({
    songName: "NGÀY MAI NGƯỜI TA LẤY CHỒNG",
    songArtist: "VOI BẢN ĐÔN",
    songSrc: "./Assets/songs/ngaymainguoitalaychong.mp3",
    songAvatar: "./Assets/Images/image1.jpg",
  });
  //UseStates Variables
  const [audioProgress, setAudioProgress] = useState(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [musicIndex, setMusicIndex] = useState(0);
  const [musicTotalLength, setMusicTotalLength] = useState("05 : 38");
  const [musicCurrentTime, setMusicCurrentTime] = useState("00 : 00");
  const [videoIndex, setVideoIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaylistVisible, setIsPlaylistVisible] = useState(false);

  const togglePlaylist = () => {
    setIsPlaylistVisible(!isPlaylistVisible);
  };
  const handlePlaylistItemClick = (selectedSong) => {
    // Dừng âm thanh hiện tại nếu đang phát
    if (isAudioPlaying) {
      handleAudioPlay();
    }
    const index = musicAPI.findIndex((song) => song.id === selectedSong.id);
    if (index !== -1) {
      // Cập nhật trạng thái âm thanh và hiển thị chi tiết bài hát
      setMusicIndex(index);
      updateCurrentMusicDetails(index);
    }
    setIsPlaylistVisible(false);
  };

  const currentAudio = useRef();

  const handleMusicProgressBar = (e) => {
    setAudioProgress(e.target.value);
    currentAudio.current.currentTime =
      (e.target.value * currentAudio.current.duration) / 100;
  };

  //Change Avatar Class
  let avatarClass = ["objectFitCover", "objectFitContain", "none"];
  const [avatarClassIndex, setAvatarClassIndex] = useState(0);
  const handleAvatar = () => {
    if (avatarClassIndex >= avatarClass.length - 1) {
      setAvatarClassIndex(0);
    } else {
      setAvatarClassIndex(avatarClassIndex + 1);
    }
  };

  //Play Audio Function
  const handleAudioPlay = () => {
    if (currentAudio.current.paused) {
      currentAudio.current.play();
      setIsAudioPlaying(true);
    } else {
      currentAudio.current.pause();
      setIsAudioPlaying(false);
    }
  };

  const handleNextSong = () => {
    if (musicIndex >= musicAPI.length - 1) {
      let setNumber = 0;
      setMusicIndex(setNumber);
      updateCurrentMusicDetails(setNumber);
    } else {
      let setNumber = musicIndex + 1;
      setMusicIndex(setNumber);
      updateCurrentMusicDetails(setNumber);
    }
  };

  const handlePrevSong = () => {
    if (musicIndex === 0) {
      let setNumber = musicAPI.length - 1;
      setMusicIndex(setNumber);
      updateCurrentMusicDetails(setNumber);
    } else {
      let setNumber = musicIndex - 1;
      setMusicIndex(setNumber);
      updateCurrentMusicDetails(setNumber);
    }
  };

  const updateCurrentMusicDetails = (number) => {
    let musicObject = musicAPI[number];
    currentAudio.current.src = musicObject.songSrc;
    currentAudio.current.play();
    setCurrentMusicDetails({
      songName: musicObject.songName,
      songArtist: musicObject.songArtist,
      songSrc: musicObject.songSrc,
      songAvatar: musicObject.songAvatar,
    });
    setIsAudioPlaying(true);
  };

  const handleAudioUpdate = () => {
    //Input total length of the audio
    let minutes = Math.floor(currentAudio.current.duration / 60);
    let seconds = Math.floor(currentAudio.current.duration % 60);
    let musicTotalLength0 = `${minutes < 10 ? `0${minutes}` : minutes} : ${
      seconds < 10 ? `0${seconds}` : seconds
    }`;
    setMusicTotalLength(musicTotalLength0);

    //Input Music Current Time
    let currentMin = Math.floor(currentAudio.current.currentTime / 60);
    let currentSec = Math.floor(currentAudio.current.currentTime % 60);
    let musicCurrentT = `${currentMin < 10 ? `0${currentMin}` : currentMin} : ${
      currentSec < 10 ? `0${currentSec}` : currentSec
    }`;
    setMusicCurrentTime(musicCurrentT);

    const progress = parseInt(
      (currentAudio.current.currentTime / currentAudio.current.duration) * 100,
    );
    setAudioProgress(isNaN(progress) ? 0 : progress);
  };

  const vidArray = [
    "./Assets/Videos/video1.mp4",
    "./Assets/Videos/video2.mp4",
    "./Assets/Videos/video3.mp4",
    "./Assets/Videos/video4.mp4",
    "./Assets/Videos/video5.mp4",
    "./Assets/Videos/video6.mp4",
  ];

  const handleChangeBackground = () => {
    if (videoIndex >= vidArray.length - 1) {
      setVideoIndex(0);
    } else {
      setVideoIndex(videoIndex + 1);
    }
  };
  const handleMute = () => {
    setIsMuted((prevIsMuted) => !prevIsMuted);
    if (isMuted) {
      currentAudio.current.muted = false;
    } else {
      currentAudio.current.muted = true;
    }
  };
  const handleReplay = () => {
    if (currentAudio.current) {
      currentAudio.current.currentTime = 0; // Đặt lại thời gian phát lại về 0
      currentAudio.current.play(); // Bắt đầu phát lại âm thanh
      setIsAudioPlaying(true); // Đặt trạng thái phát lại
    }
  };
  return (
    <>
      <div className="container">
        <audio
          src="./Assets/songs/ngaymainguoitalaychong.mp3"
          ref={currentAudio}
          onEnded={handleNextSong}
          onTimeUpdate={handleAudioUpdate}></audio>
        <video
          src={vidArray[videoIndex]}
          loop
          muted
          autoPlay
          className="backgroundVideo"></video>
        <div className="blackScreen"></div>
        <div className="music-Container">
          <div className="musicInfo">
            <p className="musicPlayer">Music Player</p>
            <p className="music-Head-Name">{currentMusicDetails.songName}</p>
            <p className="music-Artist-Name">
              {currentMusicDetails.songArtist}
            </p>

            <img
              src={currentMusicDetails.songAvatar}
              className={avatarClass[avatarClassIndex]}
              onClick={handleAvatar}
              alt="song Avatar"
              id="songAvatar"
            />
          </div>
          <div className="musicTimerDiv">
            <p className="musicCurrentTime">{musicCurrentTime}</p>
            <p className="musicTotalLenght">{musicTotalLength}</p>
          </div>
          <input
            type="range"
            name="musicProgressBar"
            className="musicProgressBar"
            value={audioProgress}
            onChange={handleMusicProgressBar}
          />
          <div className="musicControlers">
            <i
              className="fa-solid fa-redo musicControler "
              onClick={handleReplay}></i>
            <i
              className="fa-solid fa-backward musicControler"
              onClick={handlePrevSong}></i>
            <i
              className={`fa-solid ${
                isAudioPlaying ? "fa-pause-circle" : "fa-circle-play"
              } playBtn`}
              onClick={handleAudioPlay}></i>
            <i
              className="fa-solid fa-forward musicControler"
              onClick={handleNextSong}></i>
            <i
              className={`fa-solid ${
                isMuted ? "fa-volume-mute" : "fa-volume-up"
              } volumeBtn`}
              onClick={handleMute}></i>
          </div>
        </div>
        <div className="changeBackBtn" onClick={handleChangeBackground}>
          Change Background
        </div>
        {isPlaylistVisible && (
          <div className="playlist">
            <h1>Playlist</h1>
            <div className="song-list">
              {musicAPI.map((song) => (
                <div
                  key={song.id}
                  className="song-item"
                  onClick={() => handlePlaylistItemClick(song)}>
                  <img src={song.songAvatar} alt={`${song.songName} `} />
                  <div>
                    <p className="songName">{song.songName}</p>
                    <p className="songArtist">{song.songArtist}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="playlistBtn" onClick={togglePlaylist}>
          Playlist
        </div>
      </div>
    </>
  );
}

export default App;
