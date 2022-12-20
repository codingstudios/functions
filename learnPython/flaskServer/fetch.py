import requests, json

response = requests.get("https://api.github.com/users/leecheeyong", headers={"Accept": "application/json"})
user = response.json();

print(user)
