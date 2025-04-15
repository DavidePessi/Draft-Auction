var socket;
var buttonAdmin;
var buttonClient;
var inputBox;
var currentScreen = "home";
var page;
var fontTitle;
var fontText;
var previousTouchAdmin = false;
var previousTouchClient = false;
//----------------------------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------- NOTE ------------------------------------------------------------//
//------------BEFORE STARTING THE APPLICATION MAKE SURE TO CHANGE THE IP ADDRESS TO THE CURRENT ONE OF THE PC ----------------//
//----------------------------------------------------------------------------------------------------------------------------//

function setup() {
    createCanvas(windowWidth, windowHeight);
    socket = io.connect('http://172.20.10.2:3000');

    this.inputBox = createInput("");
    //initializing buttons
    if(isMobile()){
        textSize(0.06 * windowWidth);
        var margin = textWidth("Admin") + 40;
        textSize(12);
        
        this.AdminButton = new Button(windowWidth/2 + margin/2, windowHeight * 9/24, 100, "Admin", 0.8 * windowWidth/10, 100);
        this.ClientButton = new Button(windowWidth/2 - windowWidth * 4/10 + 55, windowHeight * 9/24, 100, "Client", 0.8 * windowWidth/10, 100);

        this.inputBox.position(windowWidth/2 - windowWidth * 4/10, windowWidth/3);
        this.inputBox.size(windowWidth * 4/5, windowWidth/5);
        this.inputBox.style("font-size", 0.8 * windowWidth/10 + "px");
    } else{
        textSize(0.03 * windowWidth);
        var margin = textWidth("Admin") + 40;
        textSize(12);

        this.AdminButton = new Button(windowWidth - margin - windowWidth/3, windowHeight * 0.25, windowWidth/20, "Admin", 0.03 * windowWidth, 100);
        this.ClientButton = new Button(windowWidth/3, windowHeight * 0.25, windowWidth/20, "Client", 0.03 * windowWidth, 100); 

        this.inputBox.position(windowWidth/2 - windowWidth / 5, windowWidth/4);
        this.inputBox.size(windowWidth * 2/5, windowWidth/20);
        this.inputBox.style("font-size", 0.06 * windowWidth + "px");
    }

    this.inputBox.style("font-family", "Outfit");
    this.inputBox.style("font-weight", "500");
    this.inputBox.style("border", "none");
    this.inputBox.style("background", "white");
    this.inputBox.style("padding", "14px");
    this.inputBox.style("border-radius", "999px");
    this.inputBox.style("outline", "none");
    this.inputBox.style("box-shadow", "none");
    this.inputBox.elt.addEventListener("focus", () => {
        this.inputBox.style("box-shadow", "0 0 0 3px black");
    });
    this.inputBox.elt.addEventListener("blur", () => {
        this.inputBox.style("box-shadow", "none");
    });
        

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

function preload() {
    fontTitle = loadFont('fonts/RacingSansOne-Regular.ttf');
    fontText = loadFont('fonts/Outfit-Medium.ttf');
}

function draw() {
    if(currentScreen === "home"){
        showHomeScreen();
        checkTouch();
    } else{
        page.show(socket);
    }
}

//HOME DRAW
function showHomeScreen(){
    background(37, 48, 49);

    fill(255);
    textStyle(NORMAL);
    textSize(150);
    textFont(fontTitle);

    textSize(windowHeight/20 + 80);
    var lunghezzaTesto = textWidth("FantaDraft");

    text("FantaDraft", windowWidth/2 - lunghezzaTesto/2, windowHeight/20 + 80);
    textSize(12);
    textStyle(BOLD);
    textFont(fontText);
    this.AdminButton.show();
    this.ClientButton.show();
}


//RESIZE OF THE PAGE FUNCTION
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    if(currentScreen === "admin"){
        page.Resize();
    } else if(currentScreen === "client"){
        page.Resize();
    } else {
        if(!isMobile()){
            textSize(0.03 * windowWidth);
            var margin = textWidth("Admin") + 40;
            textSize(12);

            this.AdminButton.resize(windowWidth - margin - windowWidth/3, windowHeight * 0.25, windowWidth/20, 0.03 * windowWidth);
            this.ClientButton.resize(windowWidth/3, windowHeight * 0.25, windowWidth/20, 0.03 * windowWidth); 

            this.inputBox.position(windowWidth/2 - windowWidth / 5, windowWidth/4);
            this.inputBox.size(windowWidth * 2/5, windowWidth/20);
            this.inputBox.style("font-size", 0.06 * windowWidth + "px");
        }
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