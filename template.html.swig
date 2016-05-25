<html>
<head>
<title>Dependency License Report</title>
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
</head>
<body>
<h1>Dependency License Report</h1>

<table>
<tbody>
{% for lic in licenses %}
<tr class="licenseRow">
  <td class="licenseName">{{ loop.key }}</td>
  <td class="artifacts">
    <table>
    <tbody>
      {% for artifact in lic %}
        <tr>
        <td class="artifactName">
          {{ artifact.name }}
        </td>
        <td class="artifactVersion">
          {{ artifact.version }}
        </td>
        </tr>
      {% endfor %}
    </tbody>
    </table>
  </td>
</tr>
{% endfor %}
</tbody>
</table>
</body>
</html>

