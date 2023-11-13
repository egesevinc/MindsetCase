const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');  // Import the cors middleware
const fs = require('fs');

const app = express();
const port = 3001;

app.use(cors());  // Enable CORS for all routes
app.use(bodyParser.json());

app.post('/logUserActivity', (req, res) => {
  const { userInput, userIp } = req.body;

  // Create a log entry with timestamp, user input, and IP address
  const logEntry = `${new Date().toISOString()} - User Input: ${userInput}, IP: ${userIp}\n`;

  // Append the log entry to the TXT file
  fs.appendFile('user_logs.txt', logEntry, (err) => {
    if (err) {
      console.error('Error writing to log file:', err);
      res.status(500).send('Error writing to log file');
    } else {
      console.log('User activity logged successfully');
      res.status(200).send('User activity logged successfully');
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
