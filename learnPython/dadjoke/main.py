import requests, json, os,time;
file = open("jokes.txt", "r+");
data = list(json.loads(file.readline()));

while True:
  result = requests.get("https://icanhazdadjoke.com/", headers={"accept":"application/json"}) 
  joke = result.json()
  print(f"{joke['joke']}");
  print("")
  print("1. Slave jokes")
  print("2. Load Old Jokes")
  print("3. Load New Jokes")
  choice = input("> ");
  if(choice == "1"):
    data.append(joke["joke"]); 
    file.write(json.dumps(data));
    print("Joke saved !!")
  elif(choice == "2"):
    for joke in range(len(data)):
      print(f"{joke} : {data[joke]}");
  elif(choice != "3"):
    print("Invalid choice");

  time.sleep(3);
  os.system("clear");
