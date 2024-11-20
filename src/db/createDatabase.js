const mysql = require('mysql2');

// Create a connection to the MySQL server
const connection = mysql.createConnection({
  host: 'localhost',     // or use your MySQL host
  user: 'root',          // MySQL username
  password: '250108Ken$' // MySQL password
});

// Connect to MySQL server
connection.connect((err) => {
  if (err) {
    console.error('Error connecting: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL as id ' + connection.threadId);
  
  // Create a new database if it doesn't exist
  const databaseName = 'mydb';
  connection.query(`CREATE DATABASE IF NOT EXISTS ${databaseName}`, (err, results) => {
    if (err) {
      console.error('Error creating database: ' + err.message);
    } else {
      console.log(`Database '${databaseName}' created successfully.`);
      
      // Use the newly created database
      connection.query(`USE ${databaseName}`, (err) => {
        if (err) {
          console.error('Error selecting database: ' + err.message);
        } else {
          console.log(`Using database: ${databaseName}`);
        }

        // Close the connection
        connection.end((err) => {
          if (err) {
            console.error('Error closing the connection: ' + err.stack);
          } else {
            console.log('Connection closed.');
          }
        });
      });
    }
  });
});
