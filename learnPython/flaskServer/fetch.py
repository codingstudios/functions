import requests, json

response = requests.get("https://api.github.com/users/leecheeyong")
user = response.json();

print(user)
