# Fanta-Draft
Fanta-Draft is a web application that can be used with FantaCalcio.it to draft the teams for a fantasy football.

The application allow you to:
- Have a draft with maximum 10 players with 500 credits.
- Export the draft so that the file can be imported in the Fantacalcio.it app.
- Export a draft and resume the draft whenever you want.

## How to set up
download Node and clone the repo, then from a command line inside the project folder:
```
npm install
```
```
npm start
```
And the server should be running on the device.

## How to use
before starting the server make sure all the devices are connected to the same wi fi and retrieve the IP address of the device on which the server will run.

now modify the file `sketch.js` at line 18 in the following way:

```
socket = io.connect('http://IP_DEVICE:3000');
```

where `IP_DEVICE` is the IP address retrieved before.

In order to connect search on a browser: `http://IP_DEVICE:3000` and connect as admin or client.

## Resume previous draft
If you want to resume instead a previous draft make sure that every player is already connected to the application with their respective name and then use the button `riprendi asta` to load the previous draft.
