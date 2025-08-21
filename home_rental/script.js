document.addEventListener('DOMContentLoaded', ()=>{
  const postalEl = document.getElementById('postal');
  const sizeEl = document.getElementById('size');
  const sizeValueEl = document.getElementById('size-value');
  const predictBtn = document.getElementById('predict');
  const resultEl = document.getElementById('result');

  const bedroomEls = document.getElementsByName('bedrooms');

  function getBedrooms(){
    for(const el of bedroomEls){
      if(el.checked) return Number(el.value);
    }
    return 0;
  }

  sizeEl.addEventListener('input', ()=>{
    sizeValueEl.textContent = sizeEl.value;
  });

  function formatUSD(amount){
    return amount.toLocaleString('en-US', {style:'currency', currency:'USD'});
  }

  predictBtn.addEventListener('click', ()=>{
    const postal = postalEl.value;
    const size = Number(sizeEl.value);
    const bedrooms = getBedrooms();

    let multiplier = 1;
    if(postal === '0002') multiplier = 1.2;
    if(postal === '0003') multiplier = 1.5;

    const rent = size * multiplier + (300 * bedrooms);

    resultEl.textContent = `Estimated monthly rent: ${formatUSD(rent)}`;
  });
});
