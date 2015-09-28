var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));

var port = process.env.PORT || 3000;

app.listen(port, function(){
    console.log("App runing on port %d", port);
})
