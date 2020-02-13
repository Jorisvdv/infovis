# InfoVis Group 7
* Rens Gingnagel
* Joey Spronck
* Stijn Veken
* Joris van der Vorst
* Sander van Wickeren
* Guido Visser

## Suggestions
For the information visualization project we have two possible projects that live at the interaction of data storytelling and visual analytics.

## Music Project
This interactive dashboard lets you dive into the music genres, topics and emotions over the years. An example of a question that our dashboard might answer is: Was the music around 9/11 more negative or was it actually more positive to act as a counter movement?
Inspired by pudding.cool [Best Year in Music project](https://pudding.cool/projects/music-history/) [Github](https://github.com/the-pudding/music-taste-2019)

### Data used in this dashboard:
* Scrape the music top 2000 over x years. Scrape the names, artists and lyrics of these songs.
* Do topic analysis on the text.
* Take the emotions and other properties of the songs through the Spotify API. The Spotify endpoint includes objects like “audio features”: this includes song properties like danceability, energy, tempo, valence(positive or negative).
* Scrape big events over the years (artist deaths)


## Healthy neighbourhoods
Combining neighbourhoods level health statistics with GIS data

This dashboard centered around an interactive map tells the story of income inequality and the effect that that has on kids growing up. Data shows that poor neighborhoods have less places to buy healthy food, less good schools and less places to do sports. Poor neighborhoods include more convenience stores, fastfood and other negative influences. This lack of opportunity keeps inequality in its place.

We let users explore this interactively layer by layer. Next to the Mapbox map we will use D3 to build interactive components to control the dashboard.


### Questions:
Does proximity to sport parks and access to fast food influcence the health of citizens in a neighbourhood?


### Data used in this dashboard:
* Mapbox API
* Data from the [city of Amsterdam](https://data.amsterdam.nl), [Central Bureau of Statistics](https://www.cbs.nl)
- School data
- Income data
- Housing data
* (PanorAMS dataset)
