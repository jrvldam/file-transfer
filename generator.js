const fs = require('fs');

function fileBody() {
  var bodyLength = Math.floor((Math.random() * 10000000) / 1000);
  return randomString(bodyLength);
}

function fileName() {
  var nameLength = 5;
  return randomString(nameLength);
}

function randomString(len) {
  var str = '';

  function randomchar() {
    var n= Math.floor(Math.random() * 62);

    if (n < 10) return n; //1-10

    if (n < 36) return String.fromCharCode(n + 55); //A-Z

    return String.fromCharCode(n + 61); //a-z
  }

  while (str.length < len) str += randomchar();

  return str;
}

try {
  fs.mkdirSync('ftp-files', 0o777);
} catch (err) {
  console.log('ftp-files', err.code);
}

try {
  fs.mkdirSync('old-files', 0o777);
} catch (err) {
  console.log('old-files', err.code);
}

fs.mkdir('new-files', function (err) {
  if (err) console.log('new-files', err.code);
  
  for (let i = 0; i < 15; ++i) {
    let body = fileBody();
    let name = fileName();

    fs.writeFile('./new-files/' + name, body, function (err) {
      if (err) return console.error(err);

      console.log(`0k: ${name}, ${body.length} chars.`);
    });
  }
});
