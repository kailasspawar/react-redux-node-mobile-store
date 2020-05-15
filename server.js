const express = require('express')
const fileUpload = require('express-fileupload');
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 5000

app.use(bodyParser.json())
app.use(cors())
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

const Users = require('./router/routes/Users')
const Products = require('./router/routes/Products')

app.use('/users', Users)
app.use('/products', Products)
app.use(fileUpload());

// Upload Endpoint
app.post('/upload', (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }

  const file = req.files.file;

  file.mv(`${__dirname}/client/public/img/${file.name}`, err => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    res.json({ fileName: file.name, filePath: `/img/${file.name}` });
  });
});

app.listen(port, function() {
  console.log('Server is running on port: ' + port)
})