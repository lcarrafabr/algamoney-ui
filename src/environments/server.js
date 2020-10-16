const express = require('express');
const app = express();

app.use(express.static(__dirname + '/dist/algamoney-ui'));

app.get('/*', function(req, res) {
    res.sendFile(__dirname + '/dist/index.html');
});

app.listen(process.env.PORT || 4200, '0.0.0.0', function() {
    console.log('A porta sendo usada é: ' + process.env.PORT || 4200);
});