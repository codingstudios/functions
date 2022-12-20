from flask import Flask, request

app = Flask(__name__);


@app.route('/', methods=["GET"])
def index():
  if request.args["name"].lower() == "david":
    return "Hello baldie"
  return "haha"

app.run(host='0.0.0.0', port=81)
