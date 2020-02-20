# Depencencies

import json
import requests
import os
import pandas as pd

# Load spotify key
with open("data/login_token.json") as token_file:
    spotify_token = json.load(token_file)["spotify_token"]

print(os.getcwd())
print(spotify_token)

url = "https://api.spotify.com/v1/search"

title = '"Bohemian Rhapsody"'
artist = "Queen"
year = 1975

# Set header for spotify api
headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer {}".format(spotify_token)
}

# search_query = {'q': 'track:"{}"+artist:{}%20year:{}'.format(title, artist, year),
#                 'type': 'track', 'offset': 0, 'limit': 1}

# print(search_query['q'])

query = "https://api.spotify.com/v1/search?query=track:{}+artist:{}+year:{}&type=track&offset=0&limit=1".format(
            title,
            artist,
            year
        )

response = requests.get(
    query,
    headers=headers,
    # params=search_query
)
# Test printing response


def jprint(obj):
    # create a formatted string of the Python JSON object
    text = json.dumps(obj, sort_keys=True, indent=4)
    print(text)


jprint(response.json())

print("id= ",response.json()["tracks"]["items"][0]["id"])