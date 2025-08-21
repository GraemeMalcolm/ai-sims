document.addEventListener('DOMContentLoaded', ()=>{
  const files = ['image1.jpg','image2.jpg','image3.jpg'];
  const captions = {
    'image1.jpg': 'A giraffe standing in the savannah',
    'image2.jpg': 'An elephant with large tusks',
    'image3.jpg': 'A lion in long grass'
  };

  // tiny SVG placeholders encoded as data URLs
  function svgDataUrl(label, color, width=640, height=360){
    const svg = `<?xml version="1.0" encoding="UTF-8"?><svg xmlns='http://www.w3.org/2000/svg' width='${width}' height='${height}' viewBox='0 0 ${width} ${height}'>`+
      `<rect width='100%' height='100%' fill='${color}'/>`+
      `<text x='50%' y='50%' font-size='36' fill='#ffffff' text-anchor='middle' dominant-baseline='middle' font-family='Arial, Helvetica, sans-serif'>${label}</text>`+
      `</svg>`;
    return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
  }

  const thumbs = {
    'image1.jpg': svgDataUrl('Giraffe', '#f59e0b', 320, 180),
    'image2.jpg': svgDataUrl('Elephant', '#10b981', 320, 180),
    'image3.jpg': svgDataUrl('Lion', '#ef4444', 320, 180)
  };

  const uploadBtn = document.getElementById('upload-btn');
  const dialog = document.getElementById('file-dialog');
  const fileList = document.getElementById('file-list');
  const dialogClose = document.getElementById('dialog-close');
  const dialogCancel = document.getElementById('dialog-cancel');

  const preview = document.getElementById('preview');
  const previewImg = document.getElementById('preview-img');
  const captionEl = document.getElementById('caption');

  function openDialog(){
    fileList.innerHTML = '';
    files.forEach(fn => {
      const li = document.createElement('li');
      li.className = 'file-item';
      li.setAttribute('role','option');
      li.tabIndex = 0;
      li.dataset.filename = fn;

      li.innerHTML = `\
        <img class=\"thumb\" src=\"${thumbs[fn]}\" alt=\"\">\
        <div class=\"meta\">\
          <div class=\"name\">${fn}</div>\
        </div>`;

      li.addEventListener('click', ()=> selectFile(fn));
      li.addEventListener('keydown', (e)=>{ if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); selectFile(fn); } });
      fileList.appendChild(li);
    });

    dialog.hidden = false;
    // focus first item for keyboard users
    const first = fileList.querySelector('.file-item');
    if(first) first.focus();
  }

  function closeDialog(){ dialog.hidden = true; }

  function selectFile(filename){
    const src = thumbs[filename] || '';
    previewImg.src = src;
    previewImg.alt = filename;
    captionEl.textContent = captions[filename] || '';
    preview.hidden = false;
    closeDialog();
  }

  uploadBtn.addEventListener('click', openDialog);
  dialogClose.addEventListener('click', closeDialog);
  dialogCancel.addEventListener('click', closeDialog);
  // click on backdrop closes
  dialog.addEventListener('click', (e)=>{ if(e.target === dialog) closeDialog(); });

});
