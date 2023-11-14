const fs = require('fs');

function logUserActivity(userInput, userIp) {
  const logEntry = `${new Date().toISOString()} - User Input: ${userInput}, IP: ${userIp}\n`;

  fs.appendFile('user_logs.txt', logEntry, (err) => {
    if (err) {
      console.error('Error writing to log file:', err);
    }
  });
}

module.exports = logUserActivity;
