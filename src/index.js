const express = require('express');
const dotenv = require('dotenv');
const routes = require('./Web/routes');


dotenv.config();
console.log("PIPEFY_API_URL:", process.env.PIPEFY_API_URL);
console.log("PIPEFY_API_TOKEN:", process.env.PIPEFY_API_TOKEN);

const app = express();
app.use(express.json());
app.use(routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});