class ClientPage{
    constructor(socket){
        var buttonPlusOne  = createButton('+1');
        this.socket = socket;
        buttonPlusOne.position(0, 200);
        buttonPlusOne.mousePressed(() => this.plusQuota(1));
    }

    show(){
        background(220);
        ellipse(mouseX, mouseY, 60, 60);
        text("you are the client", 50, 50);
    }

    //send a plus one 
    plusQuota(plus){
        socket.emit('plus_quota', {value: plus});
    }
    
    //mouse pressed
    mousePressed(){

    }
    //RESIZE
    Resize(){}
}