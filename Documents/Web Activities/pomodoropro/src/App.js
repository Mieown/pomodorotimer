import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {

const [second, setSecond] = useState('00');
const [minute, setMinute] = useState('25');
const [isActive, setIsActive] = useState(false);
const [counter, setCounter] = useState(0);
const [header, setHeader] = useState('Let\'s be productive!');
const [background, setBackground] = useState(true);

function ResetTimer() {
  setSecond('00');
  setMinute('25');
  setCounter(0);
  setIsActive(false);
  setHeader('Let\'s be productive!');
  setBackground(true);
  }

  function Pause() {
    setSecond('00');
    setMinute('05');
    setCounter(0);
    setIsActive(false);
    setHeader('Now it\'s break time!');
    setBackground(false);
    }

  useEffect(() => {
    let intervalId;

    if (isActive) {
      intervalId = setInterval(() => {
        
        let secondCounter = parseInt(second);
        let minuteCounter = parseInt(minute);

        if (secondCounter == 0 && minuteCounter == 0) {
          setIsActive(false);
          if (header == 'Let\'s be productive!') {
            Pause();
          }   
          else if (header == 'Now it\'s break time!') {
            ResetTimer();
          }   
        } 
          else {
            if (secondCounter == 0) {
              secondCounter = parseInt(second);
              minuteCounter = parseInt(minute);
              minuteCounter = minuteCounter - 1;
              secondCounter = 59;
              const computedSecond = String(secondCounter).length === 1 ? `0${secondCounter}`: secondCounter;
              const computedMinute = String(minuteCounter).length === 1 ? `0${minuteCounter}`: minuteCounter;
              setMinute(computedMinute);
              setSecond(computedSecond);
            }
            else {
            secondCounter = secondCounter - 1;
            const computedSecond = String(secondCounter).length === 1 ? `0${secondCounter}`: secondCounter;
            setSecond(computedSecond);
          }
      }

        setCounter(counter => counter - 1);
      }, 1000)
    }

    return () => clearInterval(intervalId);
  }, [isActive, counter])


  return (
    <div className={background ? 'background-red' : 'background-blue'}>
    <div className="container">
    <h1>Pomodoro Timer</h1>
    <h2>{header}</h2>
      <div className="time">
        <span className="minute">{minute}</span>
        <span>:</span>
        <span className="second">{second}</span>
      </div>
      <div className="buttons">
        <button onClick={() => setIsActive(!isActive)} className= {isActive ? 'yellow' : 'green'}>{isActive ? "Pause": "Start"}</button>
        <button onClick={ResetTimer} className="reset">Reset</button>
      </div>
    </div>
    </div>
  )
}

export default App;
