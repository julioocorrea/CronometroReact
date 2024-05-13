import React, { useState, useRef } from 'react';
import './App.css';

function App() {
  const [timer, setTimer] = useState({ hours: 0, minutes: 0, seconds: 0, milliseconds: 0 });
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);

  const startTimer = () => {
    setIsRunning(true);
    timerRef.current = setInterval(() => {
      setTimer((prevTimer) => {
        const newMilliseconds = prevTimer.milliseconds + 1;
        if (newMilliseconds === 1000) {
          const newSeconds = prevTimer.seconds + 1;
          const newMinutes = prevTimer.minutes + Math.floor(newSeconds / 60);
          const newHours = prevTimer.hours + Math.floor(newMinutes / 60);
          return {
            hours: newHours,
            minutes: newMinutes % 60,
            seconds: newSeconds % 60,
            milliseconds: 0
          };
        } else {
          return { ...prevTimer, milliseconds: newMilliseconds };
        }
      });
    }, 1); // Intervalo de 1 milissegundo para atualizar os milissegundos
  };

  const stopTimer = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
  };

  const resetTimer = () => {
    clearInterval(timerRef.current);
    setTimer({ hours: 0, minutes: 0, seconds: 0, milliseconds: 0 });
    setIsRunning(false);
  };

  const formatTime = (time) => {
    const { hours, minutes, seconds, milliseconds } = time;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
  };

  return (
    <div className="App">
      <h1>Cronômetro</h1>
      <div className="timer">{formatTime(timer)}</div>
      <div className="buttons">
        {!isRunning ? (
          <button onClick={startTimer}>Start</button>
        ) : (
          <>
            <button onClick={stopTimer}>Stop</button>
            <button onClick={resetTimer}>Reset</button>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
