const fs = require('fs');

function logUserActivity(userInput, userIp) {
  // Create a log entry with timestamp, user input, and IP address
  const logEntry = `${new Date().toISOString()} - User Input: ${userInput}, IP: ${userIp}\n`;

  // Append the log entry to the TXT file
  fs.appendFile('user_logs.txt', logEntry, (err) => {
    if (err) {
      console.error('Error writing to log file:', err);
    }
  });
}

module.exports = logUserActivity;
