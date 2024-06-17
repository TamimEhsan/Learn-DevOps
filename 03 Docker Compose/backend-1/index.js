const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

const port =  process.env.PORT || 8080;

app.get('/:message', (req, res) => {
    console.log(req.params.message);
    res.send("echo: " + req.params.message);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});