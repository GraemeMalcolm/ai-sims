// Simulated .wav files in the calls folder
const callFiles = [
    {
        name: 'call-1.wav',
        transcript: "Hi! I'm calling to complain about the terrible service I received in your Seattle store last week. The assistant that served me was rude and unhelpful. I won't be returning.",
        namesLocations: "Seattle",
        sentiment: "Negative"
    },
    {
        name: 'call-2.wav',
        transcript: "Hi! This is Amanda. I'm just calling to say a big thank you to Matt Jones in your Bellevue location. He helped me find the right products, and even advised me on how to use them. Thanks for the really great customer service.",
        namesLocations: "Amanda, Matt Jones, and Bellevue",
        sentiment: "Positive"
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
        callFiles.map((file, idx) => `<li><span class="file-icon"></span><button class="file-select-btn" data-idx="${idx}">${file.name}</button></li>`).join('') +
        '</ul>';
    fileDialog.style.display = 'block';
};

fileDialog.onclick = function(e) {
    if (e.target.classList.contains('file-select-btn')) {
        const idx = e.target.getAttribute('data-idx');
        const file = callFiles[idx];
        // Display audio player
        audioPlayer.src = `calls/${file.name}`;
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
        <tr><th>Names and locations</th><td>${file.namesLocations}</td></tr>
        <tr><th>Sentiment</th><td>${file.sentiment === 'Positive' ? '👍' : '👎'}</td></tr>
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
