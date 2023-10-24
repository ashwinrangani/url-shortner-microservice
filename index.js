require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const isUrl = require('is-url')

// Basic Configuration
const port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors());
app.use('/public', express.static(`${process.cwd()}/public`));
app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});





let counter = 0;
let urlMappings = {};


app.post('/api/shorturl', (req, res) => {
  const { url } = req.body;

  if(!isUrl(url)){
    res.json({error: 'invalid url'});
    return;
  }
       
   counter += 1;
   urlMappings[counter] = url;
   console.log(urlMappings);
   res.json({oringal_url: url, short_url: counter}) 
})



app.get('/api/shorturl/:shortUrl', (req, res) => {
  const { shortUrl } = req.params;
  const originalUrl = urlMappings[shortUrl];
console.log(urlMappings[1])
  if (originalUrl) {
    res.redirect(originalUrl);
  } else {
    res.status(404).json({ error: 'Short URL not found' });
  }
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
