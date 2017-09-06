var fs = require('fs');
var path = require("path");
var status = 'Ready to listen';
var isListen = false;

exports.startListen = function (source,target) {
    if (isListen == true) {
        status = 'Already listening, please stop current listen';
        return true;
    }
	if (fs.existsSync(source) && fs.existsSync(target)) {
        console.log('Validated Paths.');
        console.log('Started Listening...');
        fs.readdir(source, (err, files) => {
            files.forEach(file => {
              console.log(file);
              moveFile(file,source,target);
            });
          })
        isListen = true;
        status = 'Currently listening to ' + source;
        watcher = fs.watch(source, (eventType, filename) => {
            if(isListen==false) {
                watcher.close();
                return true;
            }
            console.log(`event type is: ${eventType}`);
            if (filename) {
              console.log(`filename provided: ${filename}`);
              moveFile(filename,source,target);
            } else {
              console.log('filename not provided');
            }
          });
          
    }
    else {
        console.log('Error: Source or Target Path does not exist');
        status = 'Error: Source or Target Path does not exist';
    }
}

exports.stopListen = function () {
    isListen = false;
    status = 'Ready to listen';
    console.log('Stopped Listening!');
}

function moveFile (file,source,target) {
    var spath = source + '/' + file;
    var tpath = target + '/' + file;

    if (path.extname(file) != '.txt') {
        tpath = target + '/' + appendToFilename(file,timestamp());
    }
    spath = spath.replace(new RegExp('\\' + path.sep, 'g'), '/');
    tpath = tpath.replace(new RegExp('\\' + path.sep, 'g'), '/');

    if (fs.existsSync(spath)) {
        if (fs.lstatSync(spath).isDirectory()) { 
            console.log('Ignoring Directory: ' + file);
            return true;
        }
        fs.rename(spath, tpath,function (err) {
            if (err) console.log(err);
            else console.log('Moved');
          });
    }
}

function timestamp(){
    function pad(n) {return n<10 ? "0"+n : n}
    d=new Date()
    dash="-"
    underscore="_"
    return d.getFullYear()+dash+
    pad(d.getMonth()+1)+dash+
    pad(d.getDate())+dash+
    pad(d.getHours())+underscore+
    pad(d.getMinutes())+underscore+
    pad(d.getSeconds())
  }

  function appendToFilename(filename, string){
    var dotIndex = filename.lastIndexOf(".");
    if (dotIndex == -1) return filename + string;
    else return filename.substring(0, dotIndex) + string + filename.substring(dotIndex);
} 

exports.getStatus = function () {
    return status;
}