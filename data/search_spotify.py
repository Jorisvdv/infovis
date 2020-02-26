# To add a new cell, type '# %%'
# To add a new markdown cell, type '# %% [markdown]'
# %% [markdown]
# Interaction spotify API

# %%
# Depencencies

import json
import requests
from requests_oauthlib import OAuth2Session
from oauthlib.oauth2 import BackendApplicationClient
import os.path


# %%
# Load credentials
# client_id = os.getenv("spotify_client_id")
# client_secret = os.getenv("spotify_client_secret")
# ids ={
#     "client_id":client_id, "client_secret":client_secret
# }

with open(os.path.join(os.path.dirname(__file__), 'login_token.json')) as id_file:
    ids = json.load(id_file)

# Get authentication token
token_url = "https://accounts.spotify.com/api/token"
client = BackendApplicationClient(client_id=ids["client_id"])
oauth = OAuth2Session(client=client)
token = oauth.fetch_token(token_url=token_url, client_id=ids["client_id"], client_secret=ids["client_secret"])


# %%
url_search = "https://api.spotify.com/v1/search"
url_track = "https://api.spotify.com/v1/tracks"
# ids	Required. A comma-separated list of the Spotify IDs for the tracks.
# Maximum: 50 IDs.
url_features = "https://api.spotify.com/v1/audio-features" 
# ids	Required. A comma-separated list of the Spotify IDs for the tracks.
# Maximum: 100 IDs.
url_audioAnalysis = "https://api.spotify.com/v1/audio-analysis"
# Max 1 ID

# Set header for spotify api
headers = {
    "Content-Type": "application/json"
}


def search_query(title, artist, year=None, use_year=True, quotation_marks=True, formatting = False):
    if use_year & quotation_marks:
        return r'https://api.spotify.com/v1/search?query=track:"{}"+artist:"{}"+year:{}&type=track&offset=0&limit=1'.format(
            title.replace(" ","%20"),
            artist.replace(" ","%20"),
            year)
    elif use_year:
        return r'https://api.spotify.com/v1/search?query=track:"{}"+artist:"{}"&type=track&offset=0&limit=1'.format(
            title.replace(" ","%20"),
            artist.replace(" ","%20"))
    elif formatting:
        return r'https://api.spotify.com/v1/search?query=track:{}+artist:{}&type=track&offset=0&limit=1'.format(
            title.replace(" ","%20"),
            artist.replace(" ","%20"))
    else:
        return r'https://api.spotify.com/v1/search?query={}%20{}&type=track&offset=0&limit=1'.format(
            title.replace(" ","%20"),
            artist.replace(" ","%20"))

def info_track(ids, type="tracks"):
    if type == "tracks":
        # Test if max length not exceeded
        if len(ids) > 50:
            assert BaseException("More than 50 ids given")
        if len(ids) == 1:
            return f"{url_track}/{ids[0]}"
        # Return track id query
        return f"{url_track}?ids="+",".join(ids)
    
    if type == "features":
        # Test if max length not exceeded
        if len(ids) > 100:
            assert BaseException("More than 100 ids given")
        if len(ids) == 1:
            return f"{url_features}/{ids[0]}"
        # Return track id query
        return f"{url_features}?ids="+",".join(ids)
    
    if type == "analysis":
        # Test if max length not exceeded
        if len(ids) > 1:
            assert BaseException("More than 1 id given")
        # Return track id query
        return f"{url_audioAnalysis}/{ids[0]}"


# %%
def spotify_api(query):
    response = oauth.get(
        query,
        headers=headers)
    return response


# %%
def jprint(obj):
    # create a formatted string of the Python JSON object
    text = json.dumps(obj, sort_keys=True, indent=4)
    print(text)

