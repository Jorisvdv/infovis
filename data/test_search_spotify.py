from search_spotify import spotify_api, search_query, jprint

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