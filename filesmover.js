var fs = require('fs');
exports.startListen = function (source,target) {
	if (fs.existsSync(source) && fs.existsSync(target)) {
        console.log('Source Folder: ' + source + ' exists!');
    }
    console.log('Started Listening!');
}

exports.stopListen = function () {
    console.log('Stopped Listening!');
}