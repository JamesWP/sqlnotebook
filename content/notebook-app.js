var textAreas = document.getElementsByTagName('textarea');
var textAreaObjects = [];

for(var ti=0;ti<textAreas.length;ti++){
  var ta = textAreas[ti]; 
  textAreaObjects.push({ta:ta});
}
for(var ti=0;ti<textAreaObjects.length;ti++){
  var tao = textAreaObjects[ti];
  tao.cm = CodeMirror.fromTextArea(tao.ta,{
    mode:'text/x-mssql',
    lineNumbers:true
  });
}