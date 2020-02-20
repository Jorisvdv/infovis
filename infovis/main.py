from flask import Flask
from flask import send_file, jsonify
import json, os

app = Flask(__name__, static_folder="public/dist", static_url_path="/",)


@app.route("/")
def route_index():
    """This route exists purely to serve index.html to the root"""
    return send_file("public/dist/index.html")
