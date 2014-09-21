var flo = require('fb-flo'),
    path = require('path'),
    fs = require('fs');

var debugLog = false;

var server = flo(
  ".", // actual directory
  {
    port: 8888,
    host: 'localhost',
    verbose: false,
    useFilePolling: true, // for win
    pollingInterval: 100, // for win
    glob: [
      'js/**/*.js',
      'css/**/*.css'
    ]
  },
  function resolver(filepath, callback) {
    var shouldReload = (path.extname(filepath) == ".js") ? true : false; // reload only javascripts changes
    if(debugLog) console.log("filepath " + filepath + " base: " + path.basename(filepath) + " shouldReload: " + shouldReload);
    callback({
      resourceURL: path.basename(filepath),
      // any string-ish value is acceptable. i.e. strings, Buffers etc.
      contents: fs.readFileSync(filepath),
      reload: shouldReload,
      update: function(_window, _resourceURL) {
        // this function is executed in the browser, immediately after the resource has been updated with new content
        // perform additional steps here to reinitialize your application so it would take advantage of the new resource
        //console.log("Resource " + _resourceURL + " has just been updated with new content");
      }
    });
  }
);

server.once('ready', function() {
  console.log('Fb-flo server is ready!');
});
