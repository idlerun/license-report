---
page: https://idle.run/license-report
title: "License Report Generation"
tags: gradle license
date: 2016-05-25
---

Create a summary for all project dependency licenses.
Right now just takes the `Gradle-License-Report` plugin output and cleans
it up to a standardized JSON dictionary format and an HTML format.


## Generate Gradle Dependencies

Generate a CSV report using Gradle-License-Report Plugin

Uses the jk1 fork of the plugin documented [here](https://github.com/jk1/Gradle-License-Report)

### `build.gradle`

Add the following to the top of `build.gradle` 
(the `plugins` section must come before any other `build.gradle` statements)

```gradle
plugins {
  id 'com.github.jk1.dependency-license-report' version '0.3.4'
}
import com.github.jk1.license.render.*
licenseReport {
    renderer = new CsvReportRenderer()
    configurations = ['compile']
}
```

Now you have a CSV report at
`build/reports/dependency-license/licenses.csv`


### Process Output to JSON

Convert to JSON and group up by normalized licenses.

I could have done this by modifying the Gradle plugin, but I also want to leave 
open the option of processing non-gradle output.

### [process_gradle.js](https://github.com/idlerun/license-report/blob/master/process_gradle.js)
Run from the project folder. Will read in licenses.csv and output a licenses.json and license.html


#### JSON Output

```json
{
  "BSD 3-Clause": [
    {
      "name": "antlr:antlr",
      "version": "2.7.7"
    },
    {
      "name": "org.antlr:stringtemplate",
      "version": "3.2.1"
    }
  ],
  "Public Domain": [
    {
      "name": "aopalliance:aopalliance",
      "version": "1.0"
    }
  ],
  "Apache 2.0": [
    {
      "name": "com.fasterxml.jackson.core:jackson-annotations",
      "version": "2.7.2"
    },
...
```

#### HTML Output ([to_html.js](https://github.com/idlerun/license-report/blob/master/to_html.js))

Takes the standardized JSON generated above and creates an HTML formatted report.

<style>
table {
  border-collapse: collapse;
}
tbody {
  vertical-align: top;
}
.licenseName {
  font-weight: bold;
}
.licenseName, .artifacts {
  padding: 10px;
}
.licenseRow {
  border-bottom: 1pt solid black;
}
.artifactName, .artifactVersion {
  padding: 0 10px;
}
</style>
<table>
<tbody>
<tr class="licenseRow">
  <td class="licenseName">BSD 3-Clause</td>
  <td class="artifacts">
    <table>
    <tbody>
        <tr>
        <td class="artifactName">
          antlr:antlr
        </td>
        <td class="artifactVersion">
          2.7.7
        </td>
        </tr>
        <tr>
        <td class="artifactName">
          org.antlr:stringtemplate
        </td>
        <td class="artifactVersion">
          3.2.1
        </td>
        </tr>
    </tbody>
    </table>
  </td>
</tr>
<tr class="licenseRow">
  <td class="licenseName">Public Domain</td>
  <td class="artifacts">
    <table>
    <tbody>
        <tr>
        <td class="artifactName">
          aopalliance:aopalliance
        </td>
        <td class="artifactVersion">
          1.0
        </td>
        </tr>
    </tbody>
    </table>
  </td>
</tr>
<tr class="licenseRow">
  <td class="licenseName">Apache 2.0</td>
  <td class="artifacts">
    <table>
    <tbody>
        <tr>
        <td class="artifactName">
          com.fasterxml.jackson.core:jackson-annotations
        </td>
        <td class="artifactVersion">
          2.7.2
        </td>
        </tr>
    </tbody>
  </td>
</tr>
</tbody>
</table>
