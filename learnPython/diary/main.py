import datetime, os, time;

password = "password";
authed = False;

def add():
  currentTime = datetime.date.today();
  if(os.path.isfile(f"./diary/{str(currentTime)}.txt")):
    print("You've wrote a diary today")
  else:
    value = input("Write your diary: ");
    file = open(f"./diary/{str(currentTime)}.txt", "w+");
    file.write(f"{value}");
    print("Done");

def view():
  currentTime = datetime.date.today();
  files = os.listdir("diary");
  for file in range(len(files)):
    print(f"Today's date {currentTime}")
    print("")
    print(f"{file}. {files[file][:-4]}")

while True:
  print("Personal Diary");
  if(authed == False):
      inputPassword = input("Enter your password: ");
      if(inputPassword != password):
        print("Wrong password!");
        exit();
      else:
        authed = True;
        print("You have successfully logged in!");
  else:
    if(os.path.isdir("diary") == False):
      os.mkdir("diary");
    print("")
    print("1. Write Diary")
    print("2. View Diary")
    print("3. Exit")
    choice = input("Select an option > ");
    if(choice == "1"):
      add()
    elif(choice == "2"):
      view()
    elif(choice == "3"):
      print("Bye..")
      exit();
    else:
      print("Invalid option!");
    time.sleep(3)
    os.system("clear");
    
