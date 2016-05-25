var Converter = require("csvtojson").Converter;
var converter = new Converter({});
var Known = require('./known');
var ToHtml = require('./to_html');
var fs = require('fs');
var js = require('jsonfile')

// Process gradle license report output into grouped format
// with standardized license names

converter.on("end_parsed", function (licenses) {
  result = {}
  for (var i in licenses) {
    var lic = licenses[i]
    if(lic.moduleLicense == "" && lic.moduleLicenseUrl == "") {
      console.warn("Skipped due to missing license info: " + lic.artifact)
      continue;
    }
    var match = Known.match(lic.moduleLicense, lic.moduleLicenseUrl)
    if (!match) {
      throw("Unmatched license: " + JSON.stringify(lic))
    }
    if (!(match in result)) {
      result[match] = []
    }
    var parts = lic.artifact.split(":")
    var groupId = parts[0];
    var artifactId = parts[1];
    var version = parts[2];
    result[match].push({name: groupId + ":" + artifactId, version})
  }
  var json_path = "./build/reports/dependency-license/licenses.json";
  var html_path = "./build/reports/dependency-license/licenses.html";
  js.writeFile(json_path, result, {spaces: 2}, function(err) {
    console.log("Wrote JSON output to " + json_path);
    var html = ToHtml.process(json_path);
    fs.writeFile(html_path, html);
    console.log("Wrote HTML output to " + html_path);
  })
});

fs.createReadStream("build/reports/dependency-license/licenses.csv").pipe(converter);