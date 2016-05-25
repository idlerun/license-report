const fs = require('fs');
const swig = require('swig');

function process(path) {
  var licenses = JSON.parse(fs.readFileSync(path));
  const content = swig.renderFile(__dirname + '/template.html.swig', { licenses });
  return content;
}

module.exports = { process }