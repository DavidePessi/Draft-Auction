var socket;
var buttonAdmin;
var buttonClient;
var inputBox;
var currentScreen = "home";
var page;
//----------------------------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------- NOTE ------------------------------------------------------------//
//------------BEFORE STARTING THE APPLICATION MAKE SURE TO CHANGE THE IP ADDRESS TO THE CURRENT ONE OF THE PC ----------------//
//----------------------------------------------------------------------------------------------------------------------------//

function setup() {
    createCanvas(windowWidth, windowHeight);
    socket = io.connect('http://localhost:3000');

    //initializing buttons
    buttonAdmin = createButton('Admin');
    buttonAdmin.position(0, 100);
    buttonAdmin.mousePressed(redirectAdmin);

    buttonClient = createButton('Client');
    buttonClient.position(100, 100);
    buttonClient.mousePressed(redirectClient);


    //casella di testo
    inputBox = createInput();
    inputBox.position(100, 80); // Posizione sulla canvas
    inputBox.size(200);

    //------------------------------------------------------ MESSAGES ---------------------------------------------------------//
    //ON CLIENT CONNECTED
    socket.on('new_client', (data) => {
        if(currentScreen === "admin"){
            page.AddTeam(data.name);
        }
        console.log('New client connected: ' + data.clientId);
    })

    socket.on('plus_quota', (data) => {
        if(currentScreen === "admin"){
            page.AddQuota(data.value, data.name);
        }
    })
};

function draw() {
    if(currentScreen === "home"){
        showHomeScreen();
    } else{
        page.show(socket);
    }
}

//HOME DRAW
function showHomeScreen(){
    background(59);
}

//RESIZE OF THE PAGE FUNCTION
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    if(currentScreen === "admin"){
        page.Resize();
    }
}

//function to redirect to admin page
function redirectAdmin(){
    buttonAdmin.hide();
    buttonClient.hide();
    inputBox.hide();

    socket.emit('user_role', {role: 'admin', name: ''});
    page = new AdminPage(socket);
    currentScreen = "admin";
}

//function to redirect to client page
function redirectClient(){
    buttonAdmin.hide();
    buttonClient.hide();
    inputBox.hide();

    nomeSquadra = inputBox.value();
    
    socket.emit('user_role', {role: 'client', name: nomeSquadra});
    page = new ClientPage(socket, nomeSquadra);
    currentScreen = "client";
}

function mousePressed(){
    if(currentScreen === "admin"){
        page.mousePressed();
    }
}
