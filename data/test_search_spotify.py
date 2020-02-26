from search_spotify import *

# Test
title = 'Bohemian Rhapsody'
artist = "Queen"
year = 1975

print(search_query(title, artist, year, use_year=False))
response= spotify_api(search_query(title, artist, year))

print(response.status_code==200)
response = response.json()

jprint(response)

if len(response['tracks']['items'])>0:
    print(f"Result Found, ID: {response['tracks']['items'][0]['id']}")
else:
    print(f"No result found, output: \n {response}")

id = ["7tFiyTwD0nx5a1eklYtX2J"]

print(info_track(id))
response_track= spotify_api(info_track(id))

print(response_track.status_code==200)
response_track = response_track.json()

jprint(response_track)

print(info_track(id, type='features'))
response_feat= spotify_api(info_track(id, type='features'))

print(response_feat.status_code==200)
response_feat = response_feat.json()

jprint(response_feat)

print(info_track(id, type='analysis'))
response_ann= spotify_api(info_track(id, type='analysis'))

print(response_ann.status_code==200)
response_ann = response_ann.json()

jprint(response_ann)