const videoPlayer = document.getElementById('moviePlayer');
const playPauseBtn = document.getElementById('playPauseBtn');
const progressBar = document.getElementById('progressBar');
const currentTimeDisplay = document.getElementById('currentTime');
const durationDisplay = document.getElementById('duration');
const chatArea = document.getElementById('chatArea');
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');
const participantList = document.getElementById('participantList');

let isPlaying = false;

videoPlayer.src = 'your-movie.mp4';

playPauseBtn.addEventListener('click', () => {
  if (isPlaying) {
    videoPlayer.pause();
    playPauseBtn.textContent = 'Play';
  } else {
    videoPlayer.play();
    playPauseBtn.textContent = 'Pause';
  }
  isPlaying = !isPlaying;
});

videoPlayer.addEventListener('loadedmetadata', () => {
  const duration = formatTime(videoPlayer.duration);
  durationDisplay.textContent = duration;
  progressBar.max = videoPlayer.duration;
});

videoPlayer.addEventListener('timeupdate', () => {
  const currentTime = formatTime(videoPlayer.currentTime);
  currentTimeDisplay.textContent = currentTime;
  progressBar.value = videoPlayer.currentTime;
});

progressBar.addEventListener('input', () => {
  videoPlayer.currentTime = progressBar.value;
});

sendBtn.addEventListener('click', () => {
  const message = messageInput.value.trim();
  if (message) {
    displayMessage('You', message); 
    messageInput.value = '';
  }
});

function displayMessage(sender, text) {
  const messageDiv = document.createElement('div');
  messageDiv.textContent = ${sender}: ${text};
  chatArea.appendChild(messageDiv);
  chatArea.scrollTop = chatArea.scrollHeight; // Scroll to the latest message
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60).toString().padStart(2, '0');
  return ${minutes}:${remainingSeconds};
}

function updateParticipantList(participants) {
  participantList.innerHTML = '<h3>Participants:</h3>';
  const ul = document.createElement('ul');
  participants.forEach(participant => {
    const li = document.createElement('li');
    li.textContent = participant;
    ul.appendChild(li);
  });
  participantList.appendChild(ul);
}

const initialParticipants = ['User1', 'User2', 'You'];
updateParticipantList(initialParticipants);
const data = null;

const xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener('readystatechange', function () {
	if (this.readyState === this.DONE) {
		console.log(this.responseText);
	}
});

xhr.open('GET', 'https://streaming-availability.p.rapidapi.com/shows/%7Btype%7D/%7Bid%7D');
xhr.setRequestHeader('x-rapidapi-key', '91d16a88f6mshb310510dfc0a2b7p184efbjsn6bb43bf01c60');
xhr.setRequestHeader('x-rapidapi-host', 'streaming-availability.p.rapidapi.com');

xhr.send(data);
