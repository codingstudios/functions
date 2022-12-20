from flask import Flask, request

app = Flask(__name__)

@app.route("/process", methods=["POST"])
def process():
  form = request.form;
  return form;
@app.route('/')
def index():
  page = """<form method = "post" action="/process">
    <p>Name: <input type="text" name="username" required> </p>
    <p>Email: <input type="Email" name="email"> </p>
    <p>Website: <input type="url" name="website"> </p>
    <p>Age: <input type="number" name="age"> </p>
    <input type="hidden" name="userID" value="232"> </p>

    <button type="submit">Save Data</button>
  </form>
    """
  return page


app.run(host='0.0.0.0', port=81)
