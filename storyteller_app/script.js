// Simulated .wav files in the stories folder
const storyFiles = [
    {
        name: 'story-1.wav',
        transcript: "I was in Tokyo when the earthquake struck in 2011. I remember how the ground shook violently, and buildings swayed like trees in the wind. We spent the night in a shelter, unsure of what tomorrow would bring.",
        entities: "Tokyo, earthquake, 2011, shelter, tomorrow",
        sentiment: "Negative – fear, uncertainty, trauma"
    },
    {
        name: 'story-2.wav',
        transcript: "When the Apollo 11 landing was broadcast, my mother sat with her father in their living room in São Paulo. They watched in awe as Neil Armstrong stepped onto the Moon. She said it was a moment of wonder and possibility.",
        entities: "Apollo 11, Neil Armstrong, Moon, father, São Paulo, living room",
        sentiment: "Positive – awe, inspiration, hope"
    },
    {
        name: 'story-3.wav',
        transcript: "During the famine in Gujarat, my family survived on rice and water for weeks. My father traded his watch for a sack of grain. We were hungry, but together.",
        entities: "famine, Gujarat, family, father, watch, grain",
        sentiment: "Mixed – hardship and resilience"
    }
];

const uploadBtn = document.getElementById('uploadBtn');
const fileDialog = document.getElementById('fileDialog');
const audioContainer = document.getElementById('audioContainer');
const audioPlayer = document.getElementById('audioPlayer');
const analyzingDiv = document.getElementById('analyzing');
const infoTable = document.getElementById('infoTable');

uploadBtn.onclick = function() {
    // Simulate Windows-style file dialog
    fileDialog.innerHTML = '<h3>Open File</h3>' +
        '<ul>' +
        storyFiles.map((file, idx) => `<li><span class="file-icon"></span><button class="file-select-btn" data-idx="${idx}">${file.name}</button></li>`).join('') +
        '</ul>';
    fileDialog.style.display = 'block';
};

fileDialog.onclick = function(e) {
    if (e.target.classList.contains('file-select-btn')) {
        const idx = e.target.getAttribute('data-idx');
        const file = storyFiles[idx];
        // Display audio player
        audioPlayer.src = `stories/${file.name}`;
        audioContainer.style.display = 'block';
        fileDialog.style.display = 'none';
        infoTable.style.display = 'none';
        analyzingDiv.style.display = 'block';
        // Show analyzing for 3 seconds
        setTimeout(() => {
            analyzingDiv.style.display = 'none';
            showInfoTable(file);
        }, 3000);
    }
};

function showInfoTable(file) {
    infoTable.innerHTML = `<table class="info-table">
        <tr><th>Selected file</th><td>${file.name}</td></tr>
        <tr><th>Transcript</th><td id="typedTranscript"></td></tr>
        <tr><th>Named Entities</th><td>${file.entities}</td></tr>
        <tr><th>Sentiment</th><td>${file.sentiment}</td></tr>
    </table>`;
    infoTable.style.display = 'block';
    typeTranscript(file.transcript);
}

function typeTranscript(text) {
    const transcriptTd = document.getElementById('typedTranscript');
    transcriptTd.textContent = '';
    let i = 0;
    function type() {
        if (i < text.length) {
            transcriptTd.textContent += text[i];
            i++;
            setTimeout(type, 30);
        }
    }
    type();
}
