const express = require('express');
const helmet = require('helmet');
const { WebhookClient, MessageAttachment } = require('discord.js');
const fetch = require('node-fetch');
const app = express();

app.use(helmet());
app.use(express.json());

const message = (e) => { return { message: `${e}` } };
app.get('/', (req,res) => {
  res.send("OK")
});

app.post('/', async(req,res) => {
  try {
    var { url, content, text } = req.body;
    if(!url) return res.send(message("Please provide a webhook URI"));
    if(!content) return res.send(message("Please provide a message content"));
    const webhook = new WebhookClient({ url });
    await webhook.send({
      content: `${content}`,
      files: [new MessageAttachment(Buffer.from(`${decode(text)}`, 'utf-8'), 'file.txt')]
    }).then(() => res.send("Done"))
  }catch(e) {
    res.send(message("Something went wrong"));
    console.log(e)
  }
})

function decode(s) {
    var dict = {};
    var data = (s + "").split("");
    var currChar = data[0];
    var oldPhrase = currChar;
    var out = [currChar];
    var code = 256;
    var phrase;
    for (var i=1; i<data.length; i++) {
        var currCode = data[i].charCodeAt(0);
        if (currCode < 256) {
            phrase = data[i];
        }
        else {
           phrase = dict[currCode] ? dict[currCode] : (oldPhrase + currChar);
        }
        out.push(phrase);
        currChar = phrase.charAt(0);
        dict[code] = oldPhrase + currChar;
        code++;
        oldPhrase = phrase;
    }
    return out.join("");
}
app.listen(3000);
