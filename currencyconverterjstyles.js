document.addEventListener('DOMContentLoaded', () => {
    const amountInput = document.getElementById('amount');
    const fromCurrency = document.getElementById('from-currency');
    const toCurrency = document.getElementById('to-currency');
    const convertButton = document.getElementById('convert');
    const resultDiv = document.getElementById('result');

    const apiKey = 'YOUR_API_KEY'; // Replace with your actual API key
    const apiURL = `https://openexchangerates.org/api/latest.json?app_id=${apiKey}`;

    // Fetch the list of currencies and populate the select elements
    fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            const currencies = Object.keys(data.rates);
            currencies.forEach(currency => {
                const optionFrom = document.createElement('option');
                optionFrom.value = currency;
                optionFrom.textContent = currency;
                fromCurrency.appendChild(optionFrom);

                const optionTo = document.createElement('option');
                optionTo.value = currency;
                optionTo.textContent = currency;
                toCurrency.appendChild(optionTo);
            });
        })
        .catch(error => {
            console.error('Error fetching currency list:', error);
        });

    // Convert the currency when the button is clicked
    convertButton.addEventListener('click', () => {
        const amount = parseFloat(amountInput.value);
        const from = fromCurrency.value;
        const to = toCurrency.value;

        if (isNaN(amount)) {
            resultDiv.textContent = 'Please enter a valid amount.';
            return;
        }

        fetch(apiURL)
            .then(response => response.json())
            .then(data => {
                const fromRate = data.rates[from];
                const toRate = data.rates[to];
                const convertedAmount = (amount / fromRate) * toRate;
                resultDiv.textContent = `${amount} ${from} = ${convertedAmount.toFixed(2)} ${to}`;
            })
            .catch(error => {
                console.error('Error fetching exchange rates:', error);
                resultDiv.textContent = 'Error fetching exchange rates. Please try again later.';
            });
    });
});
