var fs = require('fs');
var path = require("path");

exports.startListen = function (source,target) {
	if (fs.existsSync(source) && fs.existsSync(target)) {
        console.log('Source Folder: ' + source + ' exists!');
        console.log('Target Folder: ' + target + ' exists!');
        console.log('Started Listening!');
        fs.readdir(source, (err, files) => {
            files.forEach(file => {
              console.log(file);
              moveFile(file,source,target);
            });
          })
    }
    else {
        console.log('Error: Paths doesnt exist');
    }
}

exports.stopListen = function () {
    console.log('Stopped Listening!');
}

function moveFile (file,source,target) {
    var spath = path.resolve(source + '\\' + file);
    var tpath = path.resolve(target + '\\' + file);
    spath = spath.replace(new RegExp('\\' + path.sep, 'g'), '/');
    tpath = tpath.replace(new RegExp('\\' + path.sep, 'g'), '/');
    fs.rename(spath, tpath,function (err) {
        //if (err) throw err;
        if (err) console.log(err);
        else console.log('Moved');
      });
}