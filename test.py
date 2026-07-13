import requests

url = "https://enrichlayer.com/api/v2/profile"
headers = {"Authorization": "Bearer GkgpQtT-S-U9eX3y2m3i3Q"}

params = {
    "profile_url": "https://www.linkedin.com/in/chanchalkmaurya/",
    "use_cache": "if-recent",
}


response = requests.get(url, params=params, headers=headers)
print(response)
