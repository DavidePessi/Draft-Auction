var socket;
var buttonAdmin;
var buttonClient;
var inputBox;
var currentScreen = "home";
var page;
var previousTouchAdmin = false;
var previousTouchClient = false;
//----------------------------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------- NOTE ------------------------------------------------------------//
//------------BEFORE STARTING THE APPLICATION MAKE SURE TO CHANGE THE IP ADDRESS TO THE CURRENT ONE OF THE PC ----------------//
//----------------------------------------------------------------------------------------------------------------------------//

function setup() {
    createCanvas(windowWidth, windowHeight);
    socket = io.connect('http://localhost:3000');

    //initializing buttons
    this.AdminButton = new Button(windowWidth/2 + 100, windowHeight * 9/24, 100, "Admin", 0.8 * windowWidth/10, 100);
    this.ClientButton = new Button(150, windowHeight * 9/24, 100, "Client", 0.8 * windowWidth/10, 100);

    //casella di testo
    inputBox = createInput("");
        inputBox.position(windowWidth/2 - windowWidth * 4/10, windowWidth/3);
        inputBox.size(windowWidth * 4/5, windowWidth/5);
        inputBox.style("font-size", 0.8 * windowWidth/10 + "px");
        inputBox.style("border", "none");
        inputBox.style("background", "white");
        inputBox.style("padding", "14px");
        inputBox.style("border-radius", "999px");

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

        this.AdminButton.show();
        this.ClientButton.show();
        checkTouch();
    } else{
        page.show(socket);
    }
}

//HOME DRAW
function showHomeScreen(){
    background(59);

    fill(255);
    textSize(150);
    text("FantaDraft", windowWidth/2 - 340, windowHeight/20 + 80);
    textSize(12);
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
    inputBox.hide();

    socket.emit('user_role', {role: 'admin', name: ''});
    page = new AdminPage(socket);
    currentScreen = "admin";
}

//function to redirect to client page
function redirectClient(){
    inputBox.hide();

    nomeSquadra = inputBox.value();
    
    socket.emit('user_role', {role: 'client', name: nomeSquadra});
    page = new ClientPage(socket, nomeSquadra);
    currentScreen = "client";
}

function mousePressed(){
    if(currentScreen === "admin"){
        page.mousePressed();
    } if(currentScreen === "home"){
        if(this.AdminButton.hover){
            redirectAdmin();
        } if(this.ClientButton.hover){
            redirectClient();
        }
    }
}

function isMobile() {
    return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

function checkTouch(){
    if(previousTouchAdmin === false && this.AdminButton.hover === true && isMobile()){
        redirectAdmin();
    }else if(previousTouchClient === false && this.ClientButton.hover === true && isMobile()){
        redirectClient();
    }

    previousTouchAdmin = this.AdminButton.hover;
    previousTouchClient = this.ClientButton.hover;
}