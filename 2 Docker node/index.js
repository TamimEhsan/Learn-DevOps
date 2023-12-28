const express = require('express');

const app = express();
const port =  process.env.PORT || 3005;

app.get('/:message', (req, res) => {
    console.log(req.params.message);
    res.send("echo: " + req.params.message);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});