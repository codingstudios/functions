from flask import Flask 
import datetime;

app = Flask(__name__)

@app.route("/")
def res():
  return (f"{datetime.date.today()}")
  
 
app.run(host='0.0.0.0', port=81) 
