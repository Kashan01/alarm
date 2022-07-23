'use strict';

const clock = document.getElementById('clock');
const input = document.getElementById('input');
const setBtn = document.querySelector('.set-alarm');
const alarmContainer = document.getElementById('alarm-list');
const audio = new Audio(
  'https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3'
);
audio.loop = true;
const alarmList = new Array();
let alarmTime = null;
let alarmTimeout = null;

// format time
const formatTime = time => {
  if (time < 10) return '0' + time;
  return time;
};

// Rendered the clock
setInterval(function () {
  const audio = new Audio('./tiktikaudio.mp3');
  const date = new Date();
  let hours = date.getHours();
  const zone = hours < 12 ? 'AM' : 'PM';
  if (hours > 12) hours = hours % 12;
  hours = formatTime(hours);
  let minutes = formatTime(date.getMinutes());
  let seconds = formatTime(date.getSeconds());

  clock.innerText = `${hours}:${minutes}:${seconds} ${zone}`;
  audio.play();
}, 1000);

// Get time value
function setAlarmTime(value) {
  alarmTime = value;
}

// Setting an Alarm
function setAlarm() {
  if (alarmTime) {
    const current = new Date();
    const timeToAlarm = new Date(alarmTime);
    const para = document.createElement('p');
    const resetButton = document.createElement('button');
    resetButton.classList.add('button');
    resetButton.className += ' reset-alarm';
    resetButton.textContent = 'Delete';

    if (timeToAlarm > current) {
      para.innerText = timeToAlarm;
      para.appendChild(resetButton);
      para.classList.add('para');
      alarmContainer.appendChild(para);
      alert('Alarm set');
      const timeout = timeToAlarm.getTime() - current.getTime();
      alarmTimeout = setTimeout(() => audio.play(), timeout);
    } else {
      alert('Alarm time should be in future!');
    }

    // Onclick delete the alarm
    resetButton.addEventListener('click', function () {
      audio.pause();
      if (alarmTimeout) {
        clearTimeout(alarmTimeout);
      }
      para.classList.add('hidden');
    });
  }
}
