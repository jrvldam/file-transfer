const fs = require('fs');
const new_files = `./new-files/`;
const old_files = `./old-files/`;
const ftp_files = `./ftp-files/`;

function processFile(name) {
  fs.readFile(new_files + name, function (err, body) {
    if (err) return console.error(err);

    fs.appendFile(ftp_files + name, body, 'utf8', function (err) {
      if (err) return console.error(err);

      fs.unlink(new_files + name, function (err) {
        if (err) return console.error(err);

        fs.appendFile(old_files + name, body, 'utf8', function (err) {
          if (err) return console.error(err);

          console.log(`0k ${name}`);
        });
      });
    });
  });
}

fs.readdir(new_files, function (err, files) {
  if (err) return console.error(err);

  for (let i = 0; i < files.length; ++i) {
    let name = files[i];

    processFile(name);
  }
});
