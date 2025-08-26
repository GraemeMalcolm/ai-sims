// List of available voice memos in the media folder
const voiceMemos = [
    { name: 'voice-memo-1.wav', transcript: "Hi there! I’m planning a solo trip to Portugal next month and I’d love some advice. I’m into local culture and food, and I want to avoid super touristy spots. Do you have recommendations for places that are safe but still authentic? Also, any tips on getting around without renting a car?" },
    { name: 'voice-memo-2.wav', transcript: "Hi, I’m organizing a business trip to Tokyo and I’d appreciate help with logistics. I’ll need a hotel near the Shibuya area, preferably with good Wi-Fi and meeting facilities. Also, could you advise on airport transfers and whether I should get a local SIM or pocket Wi-Fi?" },
    { name: 'voice-memo-3.wav', transcript: "Hey there! My girlfriends and I are planning a getaway to Greece! We’re thinking Santorini, but we’re open to other islands too. We want beaches and maybe a little adventure. What’s the best time to go for good weather but fewer crowds? And can you help us find a cute villa?" }
];

const uploadBtn = document.getElementById('uploadBtn');
const fileDialog = document.getElementById('fileDialog');
const audioContainer = document.getElementById('audioContainer');
const audioPlayer = document.getElementById('audioPlayer');
const transcriptDiv = document.getElementById('transcript');

uploadBtn.onclick = function() {
    // Simulate file dialog
    fileDialog.innerHTML = '<h3>Select a voice memo:</h3>' +
        '<ul>' +
        voiceMemos.map((memo, idx) => `<li><button class="file-select-btn" data-idx="${idx}">${memo.name}</button></li>`).join('') +
        '</ul>';
    fileDialog.style.display = 'block';
};

fileDialog.onclick = function(e) {
    if (e.target.classList.contains('file-select-btn')) {
        const idx = e.target.getAttribute('data-idx');
        const memo = voiceMemos[idx];
        // Display audio and transcript
        audioPlayer.src = `media/${memo.name}`;
        transcriptDiv.textContent = memo.transcript;
        audioContainer.style.display = 'block';
        fileDialog.style.display = 'none';
    }
};
