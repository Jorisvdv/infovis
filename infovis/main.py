from flask import Flask
from flask import send_file, jsonify
import json, os

app = Flask(__name__, static_folder="public/dist", static_url_path="/",)


@app.route("/")
def route_index():
    """This route exists purely to serve index.html to the root"""
    return send_file("public/dist/index.html")


@app.route("/music_age", methods=["GET", "POST"])
def route_music_age():
    with open(os.path.join(os.getcwd(), "data", "year_distribution_per_edition.json")) as jsonfile:
        return jsonify(json.load(jsonfile))
