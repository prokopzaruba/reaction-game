import { useEffect, useRef, useState } from "react";
import Tile from "./Tile";

const Game = () => {
  const [tileArray, setTileArray] = useState<number[]>([]);
  const [tileIndexArray, setTileIndexArray] = useState<number[]>([]);
  const populateTiles = () => {
    const newNumbers = Array.from({ length: 25 }, (_, index) => 0);
    setTileArray(() => newNumbers);
  };
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      timerRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 10); // Update interval to 10 milliseconds
    }
  };

  const stopTimer = () => {
    if (isRunning && timerRef.current) {
      setIsRunning(false);
      clearInterval(timerRef.current);
    }
  };

  const resetTimer = () => {
    stopTimer();
    setTime(0);
  };

  const formatTime = (seconds: number): string => {
    const formattedSeconds = seconds.toString();
    const milliseconds = (time % 100).toString().padStart(2, "0");
    return `${formattedSeconds}.${milliseconds}`;
  };

  const populateTileIndexes = () => {
    const newNumbers = Array.from({ length: 25 }, (_, index) => index);
    setTileIndexArray(() => newNumbers);
  };

  useEffect(() => {
    populateTiles();
    populateTileIndexes();
  }, []);

  const randomTile = (tilesLeft: number) => {
    return Math.floor(Math.random() * (tilesLeft - 0 + 1)) + 0;
  };

  const startGame = () => {
    const returnedIndex = randomTile(tileIndexArray.length - 1);
    const tileIndex = tileIndexArray[returnedIndex];
    resetTimer();
    startTimer();

    setTileArray((previousArray) => [
      ...previousArray.slice(0, tileIndex),
      1,
      ...previousArray.slice(tileIndex + 1),
    ]);
    setTileIndexArray((previousArray) => [
      ...previousArray.slice(0, returnedIndex),
      ...previousArray.slice(returnedIndex + 1),
    ]);
  };

  const stopGame = () => {
    resetTimer();
    populateTiles();
    populateTileIndexes();
  };

  const changeTile = (i: number) => {
    const returnedIndex = randomTile(tileIndexArray.length - 1);
    const tileIndex = tileIndexArray[returnedIndex];

    setTileArray((previousArray) => [
      ...previousArray.slice(0, i),
      2,
      ...previousArray.slice(i + 1),
    ]);

    setTileArray((previousArray) => [
      ...previousArray.slice(0, tileIndex),
      1,
      ...previousArray.slice(tileIndex + 1),
    ]);

    setTileIndexArray((previousArray) => [
      ...previousArray.slice(0, returnedIndex),
      ...previousArray.slice(returnedIndex + 1),
    ]);

    if (tileIndexArray.length === 0) {
      populateTiles();
      populateTileIndexes();
      stopTimer();
    }
  };

  return (
    <div className="game">
      <div className="button-and-timer-container">
        {tileIndexArray.length === 25 ? (
          <button className="start-button" onClick={() => startGame()}>
            Start
          </button>
        ) : (
          <button className="end-button" onClick={() => stopGame()}>
            Stop
          </button>
        )}
        <div className="timer">{formatTime(Math.floor(time / 100))}</div>
      </div>
      <div className="tiles">
        {tileArray.map((v, i) => (
          <Tile key={i} color={v} changeTile={changeTile} i={i} />
        ))}
      </div>
    </div>
  );
};

export default Game;
