const fromCurrency = document.getElementById('from-currency');
const fromAmount = document.getElementById('from-amount');
const toCurrency = document.getElementById('toCurrency');
const toAmount = document.getElementById('to-amount');

const rateEl = document.getElementById('rate');
const swap = document.getElementById('swap');

// Fetch exchange rate & update DOM
function exchange() {
  const from_currency = fromCurrency.value;
  const to_currency = toCurrency.value;

  fetch(`https://api.exchangeratesapi.io/latest?base=${from_currency}`)
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
      const rate = data.rates[to_currency];

      rateEl.innerText = `1 ${from_currency} = ${rate} ${to_currency}`;

      toAmount.value = (fromAmount.value * rate).toFixed(2);
    });
}

// Event Listeners
fromCurrency.addEventListener('change', exchange);
fromAmount.addEventListener('input', exchange);
toCurrency.addEventListener('change', exchange);
toAmount.addEventListener('input', exchange);

exchange();