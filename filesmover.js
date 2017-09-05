var fs = require('fs');
exports.startListen = function (source,target) {
	if (fs.existsSync(source) && fs.existsSync(target)) {
        console.log('Source Folder: ' + source + ' exists!');
        console.log('Target Folder: ' + target + ' exists!');
        console.log('Started Listening!');
    }
    else {
        console.log('Error: Paths doesnt exist');
    }
}

exports.stopListen = function () {
    console.log('Stopped Listening!');
}