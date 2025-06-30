# Draft-Auction
A web application that can be used with FantaCalcio.it to have an auction, and export the file on the application

# How to use
before starting the server make sure all the devices are connected to the same wi fi and retrieve the IP address of the device on which the server will run.
now modify the file sketch.js at line 18 in the following way:

'socket = io.connect('http://IP_DEVICE:3000');'

where 'IP_DEVICE' is the IP address retrieved before

With this change you can open a command line on the device that will run as server go to the directory where server.js is and use the command:
'node server.js'
