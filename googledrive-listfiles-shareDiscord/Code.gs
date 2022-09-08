function myFunction() {
  const folderName = 'FOLDER_NAME';
  const folders = DriveApp.getFoldersByName(folderName);
  const folder = folders.next();
  const files = folder.getFiles();
  const webhook = 'DISCORD_WEBHOOK_URI';

  var file;
  var name;
  var link;
  var download;
  const array = [];

  while(files.hasNext()) {
    file = files.next();
    name = file.getName();
    link = file.getUrl();
    download = file.getDownloadUrl();
    array.push({ name: encodeURIComponent(name), link, download });
  }
  
  function encode(s) {
    var dict = {};
    var data = (s + "").split("");
    var out = [];
    var currChar;
    var phrase = data[0];
    var code = 256;
    for (var i=1; i<data.length; i++) {
        currChar=data[i];
        if (dict[phrase + currChar] != null) {
            phrase += currChar;
        }
        else {
            out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
            dict[phrase + currChar] = code;
            code++;
            phrase=currChar;
        }
    }
    out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
    for (var i=0; i<out.length; i++) {
        out[i] = String.fromCharCode(out[i]);
    }
    return out.join("");
}
// Send through a third party server, then to Discord, Google Appscript doesn't support Buffer
  UrlFetchApp.fetch('', {
    "method": 'POST',
    "contentType": 'application/json',
    "payload": JSON.stringify({
      content: `${new Date()}`,
      text: `${encode(`${JSON.stringify(array)}`)}`,
      url: webhook
    })
  })
}

myFunction()
