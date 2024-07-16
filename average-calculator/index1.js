const express = require('express');
const axios = require('axios');
const { performance } = require('perf_hooks');

const app = express();
const PORT = 9876;

// Window size for storing numbers
const windowSize = 10;
let numberWindow = [];

// Function to calculate average of numbers in the window
function calculateAverage(numbers) {
    if (numbers.length === 0) return 0;
    const sum = numbers.reduce((acc, num) => acc + num, 0);
    return sum / numbers.length;
}

// Middleware to handle requests to /numbers/:numberid
app.get('/numbers/:numberid', async (req, res) => {
    const numberid = req.params.numberid.toLowerCase();
    let response = {
        windowPrevState: [...numberWindow],
        windowCurrState: [],
        numbers: [],
        avg: 0
    };

    let apiEndpoint, numbersResponse;
    switch (numberid) {
        case 'p':
            apiEndpoint = 'http://20.244.56.144/test/primes';
            break;
        case 'f':
            apiEndpoint = 'http://20.244.56.144/test/fibo';
            break;
        case 'e':
            apiEndpoint = 'http://20.244.56.144/test/even';
            break;
        case 'r':
            apiEndpoint = 'http://20.244.56.144/test/rand';
            break;
        default:
            return res.status(400).json({ error: 'Invalid numberid. Must be one of: p, f, e, r' });
    }

    try {
        const startTime = performance.now();
        // Fetch numbers from third-party server
        const response = await axios.get(apiEndpoint, { timeout: 500 });
        const endTime = performance.now();

        // Check response time
        const elapsedTime = endTime - startTime;
        if (elapsedTime > 500) {
            return res.status(500).json({ error: 'Response time exceeded 500ms' });
        }

        numbersResponse = response.data.numbers || [];

        // Ensure numbers are unique and handle window size
        numbersResponse.forEach(num => {
            if (!numberWindow.includes(num)) {
                if (numberWindow.length === windowSize) {
                    // Remove oldest element
                    numberWindow.shift();
                }
                // Add new number
                numberWindow.push(num);
                // Add to response windowCurrState and numbers
                response.windowCurrState.push(num);
                response.numbers.push(num);
            }
        });

        // Calculate average of numbers in window
        response.avg = calculateAverage(numberWindow);

        // Send response
        res.json(response);

    } catch (error) {
        console.error('Error fetching numbers:', error.message);
        res.status(500).json({ error: 'Error fetching numbers from third-party server' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Average Calculator microservice running on http://localhost:${PORT}`);
});
