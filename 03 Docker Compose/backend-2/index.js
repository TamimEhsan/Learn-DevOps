const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
app.use(cors());

const port =  process.env.PORT || 8088;
const baseURL =  process.env.baseURL || "http://localhost:8080";
app.get('/:message', (req, res) => {
    console.log(req.params.message);
    const url = `${baseURL}/${req.params.message}`;
    console.log(url);
    axios.get(url)
      .then(response => {
        res.send(response.data);
      }).catch(err => {
        res.send("can not connect to backend");
      })
    
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});