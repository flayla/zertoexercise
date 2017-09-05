var http = require('http');
var formidable = require("formidable");
var util = require('util');
const filesmover = require('./filesmover.js')

console.log('Started.');

var server = http.createServer(function (req, res) {
	if (req.method.toLowerCase() == 'get') {
		console.log('Recieved GET');
        displayForm(res);
    }
	else if (req.method.toLowerCase() == 'post') {
		console.log('Processing POST');
		processForm(req,res);
		//displayForm(res);
    }
});

server.listen(8080);

function displayForm (res) {
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write('<html><head><title>Exercise</title></head><body><form method="post" enctype="multipart/form-data">Source:<input type="text" id ="source" value="C:\\Source" name="source"><br>Target:<input type="text" id="target" value="C:\\Target" name=target><br><input type="submit" value="Start Listening" name="action"><br><input type="submit" value="Stop Listening" name="action"></form></body></html>');
	res.end();
}

function processForm(req, res) {
    var form = new formidable.IncomingForm();

    form.parse(req, function (err, fields) {
        //res.writeHead(200, { 'content-type': 'text/plain' });
		//res.write(fields.action);
		res.write('\n\n');
        res.end(util.inspect({
            fields: fields,
        }));
        if (fields.action == 'Start Listening') {
            filesmover.startListen(fields.source,fields.target);
        }
        else if (fields.action == 'Stop Listening') {
            filesmover.stopListen();
        }
        else {
            console.log('Unknown or undefined action!');
        }
    });
}
