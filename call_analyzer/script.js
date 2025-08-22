document.addEventListener('DOMContentLoaded', ()=>{
  const uploadBtn = document.getElementById('upload-btn');
  const dialog = document.getElementById('file-dialog');
  const fileList = document.getElementById('file-list');
  const dialogClose = document.getElementById('dialog-close');
  const dialogCancel = document.getElementById('dialog-cancel');
  const dialogOpen = document.getElementById('dialog-open');

  const playerArea = document.getElementById('player-area');
  const audioPlayer = document.getElementById('audio-player');
  const analyzingEl = document.getElementById('analyzing');
  const resultsEl = document.getElementById('results');
  const fileNameEl = document.getElementById('file-name');
  const transcriptEl = document.getElementById('transcript');
  const entitiesEl = document.getElementById('entities');
  const sentimentEl = document.getElementById('sentiment');
  const sentimentEmojiEl = document.getElementById('sentiment-emoji');

  const FILES = {
    'call-1.wav': {
      transcript: "Hi! I'm calling to complain about the terrible service I received in your Seattle store last week. The assistant that served me was rude and unhelpful. I won't be returning.",
      entities: 'Seattle',
      sentiment: 'Negative'
    },
    'call-2.wav': {
      transcript: "Hi! This is Amanda. I'm just calling to say a big thank you to Matt Jones in your Bellevue location. He helped me find the right products, and even advised me on how to use them. Thanks for the really great customer service.",
      entities: 'Amanda, Matt Jones, and Bellevue',
      sentiment: 'Positive'
    }
  };

  function listFilesFromFolder(){
    return fetch('calls/')
      .then(res => { if(!res.ok) throw new Error('Unable to fetch calls folder'); return res.text(); })
      .then(html => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const anchors = Array.from(doc.querySelectorAll('a'));
        return anchors.map(a => a.getAttribute('href')).filter(h=>h && !h.endsWith('/')).filter(h=>/\.wav$/i.test(h));
      });
  }

  function setSelected(li){
    const prev = fileList.querySelector('.file-item.selected');
    if(prev && prev !== li){ prev.classList.remove('selected'); prev.removeAttribute('aria-selected'); }
    if(li){ li.classList.add('selected'); li.setAttribute('aria-selected','true'); li.focus(); dialogOpen.disabled = false; }
    else { dialogOpen.disabled = true; }
  }

  function createListItem(fn){
    const li = document.createElement('li');
    li.className = 'file-item';
    li.tabIndex = 0;
    li.dataset.filename = fn;
    li.innerHTML = `<span class="icon" aria-hidden="true">🔊</span><div class="name">${fn}</div>`;
    li.addEventListener('click', ()=> setSelected(li));
    li.addEventListener('dblclick', ()=> { setSelected(li); selectFile(fn); });
    li.addEventListener('keydown', (e)=>{ 
      if(e.key === 'Enter'){ e.preventDefault(); selectFile(fn); }
      else if(e.key === 'ArrowDown'){ e.preventDefault(); if(li.nextElementSibling) setSelected(li.nextElementSibling); }
      else if(e.key === 'ArrowUp'){ e.preventDefault(); if(li.previousElementSibling) setSelected(li.previousElementSibling); }
    });
    return li;
  }

  function openDialog(){
    fileList.innerHTML = '';
    dialogOpen.disabled = true;
    listFilesFromFolder().then(files => {
      files.forEach(fn => { fileList.appendChild(createListItem(fn)); });
      const first = fileList.querySelector('.file-item'); if(first) setSelected(first);
      dialog.hidden = false;
    }).catch(err => {
      ['call-1.wav','call-2.wav'].forEach(fn => { fileList.appendChild(createListItem(fn)); });
      const first = fileList.querySelector('.file-item'); if(first) setSelected(first);
      dialog.hidden = false;
    });
  }

  function closeDialog(){ dialog.hidden = true; }

  function selectFile(filename){
    closeDialog();
    // show audio player
    playerArea.hidden = false;
    audioPlayer.src = `calls/${filename}`;
    fileNameEl.textContent = filename;

    // show analyzing message, then results after 3 seconds
    resultsEl.hidden = true;
    analyzingEl.hidden = false;

    setTimeout(()=>{
      analyzingEl.hidden = true;
      resultsEl.hidden = false;
      const info = FILES[filename] || {};
      // type transcript
      transcriptEl.textContent = '';
      typeText(transcriptEl, info.transcript || 'No transcript available.').then(()=>{
        entitiesEl.textContent = info.entities || '';
        sentimentEl.textContent = info.sentiment || 'Neutral';
        sentimentEmojiEl.textContent = (info.sentiment === 'Positive') ? '👍' : (info.sentiment === 'Negative' ? '👎' : '');
      });

    }, 3000);
  }

  // tiny typing effect
  function typeText(el, text, speed=20){
    return new Promise(resolve => {
      el.textContent = '';
      let i = 0;
      const t = setInterval(()=>{
        el.textContent += text.charAt(i);
        i++;
        if(i >= text.length){ clearInterval(t); resolve(); }
      }, speed);
    });
  }

  uploadBtn.addEventListener('click', openDialog);
  dialogClose.addEventListener('click', closeDialog);
  dialogCancel.addEventListener('click', closeDialog);
  dialogOpen.addEventListener('click', ()=>{
    const sel = fileList.querySelector('.file-item[aria-selected="true"]') || fileList.querySelector('.file-item');
    if(sel) selectFile(sel.dataset.filename);
  });

  dialog.addEventListener('click', (e)=>{ if(e.target === dialog) closeDialog(); });

});
