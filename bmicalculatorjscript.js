document.addEventListener('DOMContentLoaded', () => {
    const weightInput = document.getElementById('weight');
    const heightInput = document.getElementById('height');
    const calculateButton = document.getElementById('calculate');
    const resultDiv = document.getElementById('result');

    calculateButton.addEventListener('click', () => {
        const weight = parseFloat(weightInput.value);
        const height = parseFloat(heightInput.value) / 100; // Convert cm to meters

        if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
            resultDiv.textContent = 'Please enter valid weight and height values.';
            return;
        }

        const bmi = weight / (height * height);
        let category;

        if (bmi < 18.5) {
            category = 'Underweight';
        } else if (bmi < 24.9) {
            category = 'Normal weight';
        } else if (bmi < 29.9) {
            category = 'Overweight';
        } else {
            category = 'Obesity';
        }

        resultDiv.textContent = `Your BMI is ${bmi.toFixed(2)} (${category}).`;
    });
});
