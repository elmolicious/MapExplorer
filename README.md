# Map Explorer Webapp #

This Html5/Angular app is my entry for the Riot Api Challenge

## Technology Used ##

* AngularJS (A Javascript MVC Framework) https://www.angularjs.org/
* HTML5
* D3.js http://d3js.org/
* Twitter Bootstrap for Visualisation http://getbootstrap.com/
* My own backend as a data provider (Also included in another repository

## What does it do? ###

This Single-Page-Application provides the service of a map replay,
select a game and go through the time intervalls of a game to see the current
stats, positions and events (not jet implemented) of all the players

## How do I get it to run? ##

Copy the repository to your machine and open the index hmtl in the project root dir.
It should display three different options to choose a game from

Also the backend has to be running (see the Readme of the backend repository)

## Features ##

It works only for EUW games at the moment ... well this is rather an missing feature than a feature ... sorry,
I may fix that if I am home early enough

Game Selection :
* Random Urf Game (due to time issues just a random game out of 1 bucket (see backend))
* From a players match history
* Via a match id (Riot match id (The input can just be retrieved via the api ?!?)) mainly for debugging purpose

Replay:

* Click a player champion image to focus the champion on the side and on the map
* Controlls to change the Intervall (in Minutes(due to the interval length returned from the api)
* Animated Movement of the Champions

Caching:

* I use the html5 local storage feature to cache all the static data client side
* Also the match data with the id as the key
* Currently there is no Expiration for the static data

All other features should be self-explanatory

## Roadmap ##

I couldnt finish or start a lot of features i wanted to implement, here is a list which things i will finish in the future

* Handle events returned by the api (wards placed, monsters killed, kills ...) and visualise them
* Enhance the UI (I should get some help there ...)
* Tidy up the code (There is some redundant code which could be moved out of controllers), also some controllers are way to
  crowded
* Implemenet an error handling with a good description about it
* Move some code to the server which doesnt have to be client handled
* Apply more correct angular to this app
* Serverside caching
* At some points I did use data dragon urls directly because I had not enough time left to go via the static data api
* ...
