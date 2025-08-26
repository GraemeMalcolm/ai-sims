const translations = {
    en: {
        title: "Margie's Travel - Audio Memo Analyzer",
        folder: "Media Folder",
        analyzing: "Analyzing audio...",
        selectedFile: "Selected file",
        transcript: "Transcript",
        summary: "Text Summary",
        entities: "Named Entities",
        sentiment: "Sentiment",
        files: [
            {
                name: 'voice-memo-1.wav',
                transcript: "Hi there! I’m planning a solo trip to Portugal next month and I’d love some advice. I’m into local culture and food, and I want to avoid super touristy spots. Do you have recommendations for places that are safe but still authentic? Also, any tips on getting around without renting a car?",
                summary: "Planning a solo trip to Portugal, seeking advice on authentic, safe places and transportation without a car.",
                entities: "Portugal, next month, local culture, food, touristy spots, car",
                sentiment: "Positive – curious, excited, open-minded"
            },
            {
                name: 'voice-memo-2.wav',
                transcript: "Hi, I’m organizing a business trip to Tokyo and I’d appreciate help with logistics. I’ll need a hotel near the Shibuya area, preferably with good Wi-Fi and meeting facilities. Also, could you advise on airport transfers and whether I should get a local SIM or pocket Wi-Fi?",
                summary: "Organizing a business trip to Tokyo, needs hotel near Shibuya with Wi-Fi and meeting space, plus help with airport transfers and connectivity.",
                entities: "Tokyo, Shibuya, hotel, Wi-Fi, meeting facilities, airport transfers, SIM, pocket Wi-Fi",
                sentiment: "Neutral to Positive – professional, focused, planning-oriented"
            },
            {
                name: 'voice-memo-3.wav',
                transcript: "Hey there! My girlfriends and I are planning a getaway to Greece! We’re thinking Santorini, but we’re open to other islands too. We want beaches and maybe a little adventure. What’s the best time to go for good weather but fewer crowds? And can you help us find a cute villa?",
                summary: "Planning a girls’ getaway to Greece, considering Santorini and other islands, looking for beaches, adventure, and a cute villa.",
                entities: "Greece, Santorini, islands, beaches, villa, good weather, crowds",
                sentiment: "Positive – enthusiastic, playful, adventurous"
            }
        ]
    },
    zh: {
        title: "玛吉旅行社 - 语音备忘录分析器",
        folder: "媒体文件夹",
        analyzing: "分析音频...",
        selectedFile: "所选文件",
        transcript: "抄本",
        summary: "文本摘要",
        entities: "命名实体",
        sentiment: "情绪",
        files: [
            {
                name: 'translated-1.wav',
                transcript: "你好！我计划下个月独自去葡萄牙旅行，我希望得到一些建议。我喜欢当地的文化和美食，我想避开超级旅游景点。您对安全但仍然真实的地方有建议吗？另外，有什么关于不租车出行的提示吗？",
                summary: "计划独自前往葡萄牙，寻求有关真实、安全的地方和无车交通的建议。",
                entities: "葡萄牙，下个月，当地文化，美食，旅游景点，汽车",
                sentiment: "积极 – 好奇、兴奋、思想开放"
            },
            {
                name: 'translated-2.wav',
                transcript: "嗨，我正在组织一次去东京的商务旅行，我将不胜感激后勤方面的帮助。我需要一家靠近涩谷地区的酒店，最好有良好的 Wi-Fi 和会议设施。另外，您能否就机场接送以及我是否应该购买本地 SIM 卡或袖珍 Wi-Fi 提供建议？",
                summary: "组织前往东京的商务旅行，需要涩谷附近的酒店，提供 Wi-Fi 和会议空间，以及机场接送和连接方面的帮助。",
                entities: "东京，涩谷，酒店，Wi-Fi，会议设施，机场接送，SIM 卡，袖珍 Wi-Fi",
                sentiment: "中性到积极 – 专业、专注、以规划为导向"
            },
            {
                name: 'translated-3.wav',
                transcript: "嘿！我和我的朋友们正计划去希腊度假！我们考虑的是圣托里尼岛，但我们也对其他岛屿持开放态度。我们想要海滩，也许还有一点冒险。天气好但人群较少的最佳时间是什么时候？你能帮我们找到一栋可爱的别墅吗？",
                summary: "计划朋友去希腊度假，考虑圣托里尼岛和其他岛屿，寻找海滩、冒险和可爱的别墅。",
                entities: "希腊，圣托里尼岛，岛屿，海滩，别墅，好天气，人群",
                sentiment: "积极 – 热情、俏皮、冒险"
            }
        ]
    }
};

let currentLang = 'en';

const langToggle = document.getElementById('langToggle');
const mainTitle = document.getElementById('mainTitle');
const folderTitle = document.getElementById('folderTitle');
const simulatedFolder = document.getElementById('simulatedFolder');
const audioContainer = document.getElementById('audioContainer');
const audioPlayer = document.getElementById('audioPlayer');
const analyzingDiv = document.getElementById('analyzing');
const infoTable = document.getElementById('infoTable');

langToggle.onchange = function() {
    currentLang = langToggle.value;
    updateUI();
    // Update mainTitle according to language
    if (mainTitle) {
        mainTitle.textContent = currentLang === 'zh'
            ? '玛吉旅行社 - 语音备忘录分析器'
            : "Margie's Travel - Audio Memo Analyzer";
    }
    // Clear infoTable contents
    if (infoTable) {
        infoTable.innerHTML = '';
        infoTable.style.display = 'none';
    }
    setTimeout(() => {
        const folderHeader = document.querySelector('.folder-header');
        if (folderHeader) {
            folderHeader.innerText = currentLang === 'zh' ? '媒体文件夹' : 'Media Folder';
        }
    }, 0);
};

function updateUI() {
    const t = translations[currentLang];
    simulatedFolder.innerHTML = '';
    renderSimulatedFolder();
    if (analyzingDiv) analyzingDiv.textContent = t.analyzing;
}

function renderSimulatedFolder() {
    const t = translations[currentLang];
    let prefix = currentLang === 'zh' ? 'translated' : 'voice-memo';
    const filteredFiles = t.files.filter(memo => memo.name.startsWith(prefix));
    simulatedFolder.innerHTML = '<div class="folder-window"><div class="folder-header">' + t.folder + '</div>' +
        '<ul class="folder-list">' +
        filteredFiles.map((memo, idx) => `<li class="folder-item"><span class="file-icon"></span><button class="file-select-btn" data-idx="${idx}">${memo.name}</button></li>`).join('') +
        '</ul></div>';

}

simulatedFolder.onclick = function(e) {
    if (e.target.classList.contains('file-select-btn')) {
        const idx = e.target.getAttribute('data-idx');
        const memo = translations[currentLang].files[idx];
        audioPlayer.src = `media/${memo.name}`;
        audioContainer.style.display = 'block';
        infoTable.style.display = 'none';
        analyzingDiv.style.display = 'block';
        analyzingDiv.textContent = translations[currentLang].analyzing;
        setTimeout(() => {
            analyzingDiv.style.display = 'none';
            showInfoTable(memo);
        }, 3000);
    }
};

renderSimulatedFolder();

function showInfoTable(memo) {
    const t = translations[currentLang];
    infoTable.innerHTML = `<table class="info-table">
        <tr><th>${t.selectedFile}</th><td>${memo.name}</td></tr>
        <tr><th>${t.transcript}</th><td id="typedTranscript"></td></tr>
        <tr><th>${t.summary}</th><td>${memo.summary}</td></tr>
        <tr><th>${t.entities}</th><td>${memo.entities}</td></tr>
        <tr><th>${t.sentiment}</th><td>${getSentimentEmoji(memo.sentiment)} ${memo.sentiment}</td></tr>
    </table>`;
    infoTable.style.display = 'block';
    typeTranscript(memo);
}

function typeTranscript(memo) {
    const transcriptTd = document.getElementById('typedTranscript');
    transcriptTd.textContent = '';
    // Set and play audio
    if (audioPlayer) {
        audioPlayer.src = `media/${memo.name}`;
        audioPlayer.play();
    }
    let i = 0;
    function type() {
        if (i < memo.transcript.length) {
            transcriptTd.textContent += memo.transcript[i];
            i++;
            setTimeout(type, 30);
        }
    }
    type();
}

function getSentimentEmoji(sentiment) {
    if (sentiment.toLowerCase().includes('positive') || sentiment.includes('积极')) return '👍';
    if (sentiment.toLowerCase().includes('negative') || sentiment.includes('中性') || sentiment.includes('消极')) return '👎';
    return '🤔';
}
