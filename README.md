# InfoVis Group 7
* Rens Gingnagel
* Joey Spronck
* Stijn Veken
* Joris van der Vorst
* Sander van Wickeren
* Guido Visser

# Setup

## Prerequisites
This project is made with the following software. It may work on older version but we don't guarantee it.

* Nodejs 12.16.0
* Python 3.8.0
* npm or yarn

## Setup

```shell script
npm install  # Install node dependencies
pip install -r requirements.txt  # Install python dependencies
```

# Developing

To work on the projects you need to run two commands. The javascript is bundled by parcel, it rebundles files on change serves them.

```shell script
npm start  # this starts parcel which transpiles and serves the javascript files
```

## Chart Development

Each chart/visualization should be in its own javascript file next to `index.js`, for example `barChart.js`.

The chart should be a class. Yes, javascript has classes! Read about them [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes).

The constructor should have the following signature:

`constructor(selector, onClick)`

The selector will be used by D3 to initialize the chart. 

The onClick is a function that should be called when you click on a chart. 

Next, each chart should have an `init()` function that should build the chart but without data.

Next, each chart should have an `update(data)` function. This will update the chart with data. 

An example class is shown here.

```javascript
export default class BarChart {
    constructor(selector, onClick) {
        this.selector = selector;
        this.onClick = onClick;
    }
    
    init() {
        // init the chart here
        this.chart = chart // Save the chart svg here
    }

    update(data) {
        // update the chart
    }   
}
```

# Meeting notes

## InfoVis Meeting 05-3
We discussed our presentation and demo. 

### Feedback
* We are well structured team
* He likes our progress
* Artclouds shared
* Meet next week at wednesday 9.30 (put on canvas)
* 

## InfoVis Meeting 26-2

### Ideas:
* Artclouds: aggregate images in a circle
-> pick a songs from a genre bubble
* Decision, how to go from small sphere to larger sphere
	* Hover and larger sphere + album art
* More than 1 radar chart ->  Onmieyes -> as surface, not lines
* Streamchart: not stacked, but behind each other using alpha

- [ ] Forward radio 2 mail to TA
- [ ] Speak with producer radio 2
- [ ] Get artclouds javascript from discussion
	- [ ] Replace metadata
- [ ] Next week: functional prototype

### Taakverdeling
- [x] Verwerken ideeën in design (Rens)
- [x] Radar chart (Sander)
- [x] Componenten combineren (Stijn)
	* Spec voor elk component
	* Elke chart een functie init+updaten
- [x] Data prepareren (Joris + Joey)
	* FEATURES + links albumart + genre + lengte
	* link liedjes (30 sec preview)
	* Unit value normalisatie
- [ ] Timeline (Guido + Stijn)
	* Afspelen
- [x] Flask uit python envoirment + presentatie (Stijn)

### Timeline
* 5-3: 50% componenten
* 12-3: 100% componenten
* 19-3: Alles samenwerken

## Meeting notes 20-2
Reaction TA to proposal: There is a lot of information (and trends and individual songs and artists) you want to show, this may be too much to visualize.  For now focus on one or two things and add on later.
Scrolling though a page might be boring and focus of course is not on an article.
-> For now we will focus on trends instead of individual items

### Ideas:
* Gapminder buble chart
* Screen with regions, line/constant visualization (energy level) on bottom
* Glyph icons for selection
* Zooming into areas with dynamic adjustment of bottom line chart
* If we want a different view to show use parallax, but this is not the focus for now
Next view, parallax, but this is an add on

### Tasks for next week
- [ ] Get functional prototype running in appropriate format
- [x] Two spaces
- [x] Think on colors, what shapes and sizes represent which features
- [x] Placement of components
- [x] Data understanding


## Meeting notes 13-2
* Notes from each TA meeting will be added to the readme file in the Gihub.

### Project proposal: Music Project
This interactive dashboard lets you dive into the music genres, topics and emotions over the years. An example of a question that our dashboard might answer is: Was the music around 9/11 more negative or was it actually more positive to act as a counter movement?
Inspired by pudding.cool [Best Year in Music project](https://pudding.cool/projects/music-history/)  ([Github](https://github.com/the-pudding/music-taste-2019))

* Earlier projects have been done with Spotify and Deezer, but no Top 2000.
* We have historic data of the ranking for all 20 years, these will be combined with additional information using the Spotify API. The Spotify endpoint includes objects like “audio features”: this includes song properties like danceability, energy, tempo, valence(positive or negative).
* We will send an email to Radio 2 to request additional demographic data on the voting. Gjorgji will be cc’ed in that mail

### Goals
Our goal for next week 20-02 will be:
- [x] Have one or two visualisations.
- [x] Think of three questions the users want to answer using the visualisation.
	* Main question: How has the Top 2000 (and by extension, the opinion on music itself) changed over time
		1. How long do numbers/artists stay in the Top 2000 and how does their ranking change over time?
		2. How did style and characteristics of tracks in the Top 2000 change over time
		3. What songs are in the Top 2000?
- [x] How do we want to show ? Shapes, colours transitions?
	* Expecting custom components for the final end product
- [x] Think of a Name. 
Plot2000
- [x] Plot out most interesting parts of the dataset.

### Ideas
* Circular design
“Simon says game”
Energy levels as colors
Burst that fills up screen
Multiple interaction levels (center and corners)

* Directed graphs
Different (data) dimensions (genre/year of release) as different paths between edges

Tasks for this week:
- [x] Everyone create a couple of suggestions for the questions above.
- [x] Study spotify api on types of data available.
- [x] Mail to radio 2
- [x]  Combine top 2000 list
- [x] Merge top 2000 list with spotify id's
- [x] Think on extra sources (scrape radio 2 website?/ Scrape big events over the years (artist deaths))
- [x] Decide on development envoirment.
- [x] Mail to [Gjorgji](mailto:g.strezoski@uva.nl) on adding Guido to the group 
