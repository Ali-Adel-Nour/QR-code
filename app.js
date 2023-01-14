const express = require('express')
const qrcode = require('qrcode')
const fileUpload = require('express-fileupload')

const app = express()
app.use(fileUpload())


app.get('/qr', (req, res) => {
    const url = req.query.url
    if (!url) {
      return res.status(400).send({
        message: 'URL parameter is required'
      })
    }
    // Generate QR code
    qrcode.toFile('./qr.png', url, {
        color: {
            dark: '#00F', // Blue dots
            light: '#0000' // Transparent background
        }
    }, function (err) {
        if (err) throw err
        // Send QR code as response
        res.sendFile(__dirname + '/qr.png');
    });
});

app.listen(4000, () => {
    console.log('Server started on port 4000')
});
