var Converter = require("csvtojson").Converter;
var converter = new Converter({});
var Known = require('./known');
var fs = require('fs');

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
  var path = "build/reports/dependency-license/licenses.json";
  var output = JSON.stringify(result, null, '  ');
  fs.writeFile(path, output);
  console.log("Wrote JSON output to " + path)
});

fs.createReadStream("build/reports/dependency-license/licenses.csv").pipe(converter);