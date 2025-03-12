var socket;
var buttonAdmin;
var buttonClient;
var currentScreen = "home";
var page;
//----------------------------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------- NOTE ------------------------------------------------------------//
//------------BEFORE STARTING THE APPLICATION MAKE SURE TO CHANGE THE IP ADDRESS TO THE CURRENT ONE OF THE PC ----------------//
//----------------------------------------------------------------------------------------------------------------------------//

function setup() {
    createCanvas(windowWidth, windowHeight);
    socket = io.connect('http://192.168.1.14:3000');

    //initializing buttons
    buttonAdmin = createButton('Admin');
    buttonAdmin.position(0, 100);
    buttonAdmin.mousePressed(redirectAdmin);

    buttonClient = createButton('Client');
    buttonClient.position(100, 100);
    buttonClient.mousePressed(redirectClient);

    //------------------------------------------------------ MESSAGES ---------------------------------------------------------//
    //ON CLIENT CONNECTED
    socket.on('new_client', (data) => {
        if(currentScreen === "admin"){
            page.AddTeam("jonnyjonnyjonny");
        }
        console.log('New client connected: ' + data.clientId);
    })

    socket.on('plus_quota', (data) => {
        if(currentScreen === "admin"){
            page.AddQuota(data.value);
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

    socket.emit('user_role', {role: 'admin'});
    page = new AdminPage(socket);
    currentScreen = "admin";
}

//function to redirect to client page
function redirectClient(){
    buttonAdmin.hide();
    buttonClient.hide();

    socket.emit('user_role', {role: 'client'});
    page = new ClientPage();
    currentScreen = "client";
}

function mousePressed(){
    if(currentScreen === "admin" || currentScreen === "client"){
        page.mousePressed();
    }
}
