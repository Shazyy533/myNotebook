const connectToMongo = require("./db");
const express = require("express");

// Connect to MongoDB
connectToMongo();

const app = express();
const port = 5000;

app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));


// Start the server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
