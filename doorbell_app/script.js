const images = [
    {
        name: "door-image-1.png",
        ai: "door-image-1-ai.png",
        attributes: "Face #1: Face mask: no. Face#2: Face mask: no.",
        objects: "door-image-1-objects.png"
    },
    {
        name: "door-image-2.png",
        ai: "door-image-2-ai.png",
        attributes: "Face #1: Face mask: no.",
        objects: "door-image-2-objects.png"
    },
    {
        name: "door-image-3.png",
        ai: "door-image-3-ai.png",
        attributes: "Face #1: Face mask: no.",
        objects: "door-image-3-objects.png"
    },
    {
        name: "door-image-4.png",
        ai: "door-image-4.png",
        attributes: "-",
        objects: "door-image-4-objects.png"
    }
];

const uploadBtn = document.getElementById('uploadBtn');
const fileDialog = document.getElementById('fileDialog');
const analyzingDiv = document.getElementById('analyzing');
const infoTable = document.getElementById('infoTable');

uploadBtn.onclick = function() {
    fileDialog.innerHTML = `<ul>${images.map((img, idx) => `
        <li><span class="file-icon"></span> ${img.name} <button class="file-select-btn" data-idx="${idx}">Select</button></li>
    `).join('')}</ul>`;
    fileDialog.style.display = 'block';
    analyzingDiv.style.display = 'none';
    infoTable.style.display = 'none';
};

fileDialog.onclick = function(e) {
    if (e.target.classList.contains('file-select-btn')) {
        const idx = e.target.getAttribute('data-idx');
        const img = images[idx];
        fileDialog.style.display = 'none';
        analyzingDiv.style.display = 'block';
        infoTable.style.display = 'none';
        setTimeout(() => {
            analyzingDiv.style.display = 'none';
            infoTable.innerHTML = `
                <table class="info-table">
                    <tr>
                        <th>Original Image</th>
                        <th>Face Analysis</th>
                        <th>Detected attributes</th>
                        <th>Objects detected</th>
                    </tr>
                    <tr>
                        <td><img src="images/${img.name}" alt="${img.name}" style="max-width:120px;max-height:120px;"></td>
                        <td><img src="images/${img.ai}" alt="${img.ai}" style="max-width:120px;max-height:120px;"></td>
                        <td>${img.attributes}</td>
                        <td><img src="images/${img.objects}" alt="${img.objects}" style="max-width:120px;max-height:120px;"></td>
                    </tr>
                </table>
            `;
            infoTable.style.display = 'block';
        }, 3000);
    }
};
