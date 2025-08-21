document.addEventListener('DOMContentLoaded', ()=>{
  const messagesEl = document.getElementById('messages');
  const form = document.getElementById('chat-form');
  const input = document.getElementById('chat-input');
  const sendBtn = document.getElementById('send-btn');

  // Responses (exact text comes from the spec)
  const RESPONSES = {
    meal: 'The maximum allowable expense for a meal is $75.00.',
    hotel: 'The maximum allowable expense for accommodation is $200.00 per night.',
    submit: 'Send details and scanned receipts to expenses@contoso.com.'
  };

  // normalize text for matching
  function normalize(text){
    return text.toLowerCase().replace(/["'`]/g, '').replace(/[^\w\s]/g, ' ').replace(/\s+/g, ' ').trim();
  }

  // basic intent matching with tolerant rules
  function matchIntent(text){
    const t = normalize(text);

    const has = (re) => re.test(t);

    // Meal-related: contains meal/food and a question about maximum/claim
    if(has(/\b(meal|meals|food|lunch|dinner|snack)\b/) && has(/\b(max|maximum|allow|allowable|claim|limit|how much)\b/)){
      return 'meal';
    }

    // Hotel-related: hotel, accommodation, stay, room, lodging
    if(has(/\b(hotel|accommodation|stay|room|lodging)\b/) && has(/\b(max|maximum|allow|allowable|claim|limit|night|per night)\b/)){
      return 'hotel';
    }

    // Submit-related: how to submit / where to send / receipt(s)
    if((has(/\b(submit|how do i submit|how to submit|how to|where do i|send|file|process)\b/) && has(/\b(expense|claim|receipt|receipts|expense claim)\b/)) || has(/\b(expense claim|how to submit an expense)\b/)){
      return 'submit';
    }

    return null;
  }

  // create and append a message element
  function appendMessage(role, text){
    const li = document.createElement('li');
    li.className = 'message ' + (role === 'user' ? 'user' : 'assistant');
    li.setAttribute('role','listitem');
    li.innerHTML = `<div class="bubble"></div>`;
    const bubble = li.querySelector('.bubble');
    messagesEl.appendChild(li);
    messagesEl.scrollTop = messagesEl.scrollHeight;
    return bubble;
  }

  // animate typing effect into element
  function typeText(el, text, speed=20){
    return new Promise(resolve => {
      el.textContent = '';
      let i = 0;
      const timer = setInterval(()=>{
        el.textContent += text.charAt(i);
        i++;
        messagesEl.scrollTop = messagesEl.scrollHeight;
        if(i >= text.length){
          clearInterval(timer);
          resolve();
        }
      }, speed);
    });
  }

  // show typing indicator
  function showTyping(){
    const bubble = appendMessage('assistant', '');
    bubble.classList.add('assistant');
    const typing = document.createElement('div');
    typing.className = 'typing';
    typing.innerHTML = '<span></span><span></span><span></span>';
    bubble.appendChild(typing);
    messagesEl.scrollTop = messagesEl.scrollHeight;
    return bubble;
  }

  async function respondTo(text){
    // determine intent
    const intent = matchIntent(text);
    const response = intent ? RESPONSES[intent] : "I'm sorry. I didn't understand your question. Please try rewording it.";

    // show typing indicator
    const typingEl = showTyping();

    // simulate a short delay before typing
    await new Promise(r => setTimeout(r, 500));

    // remove typing indicator and type response
    typingEl.remove();
    const bubble = appendMessage('assistant', '');
    const bubbleText = document.createElement('div');
    bubble.appendChild(bubbleText);

    // type the response
    await typeText(bubbleText, response, 28);
  }

  form.addEventListener('submit', async (e)=>{
    e.preventDefault();
    const text = input.value.trim();
    if(!text) return;
    // add user message
    const userBubble = appendMessage('user', '');
    userBubble.textContent = text;
    input.value = '';
    input.disabled = true;
    sendBtn.disabled = true;

    await respondTo(text);

    input.disabled = false;
    sendBtn.disabled = false;
    input.focus();
  });

  // allow enter in input to submit
  input.addEventListener('keydown', (e)=>{ if(e.key === 'Enter' && !e.shiftKey){ e.preventDefault(); form.requestSubmit(); } });

  // initial prompt
  (async ()=>{
    const bubble = appendMessage('assistant', '');
    const bubbleText = document.createElement('div');
    bubble.appendChild(bubbleText);
    await typeText(bubbleText, 'Hello — ask me about expense limits or how to submit a claim.', 24);
  })();

});
