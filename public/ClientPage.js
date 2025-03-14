class ClientPage{
    constructor(socket, nome){
        var buttonPlusOne  = createButton('+1');
        this.nomeSquadra = nome;
        this.socket = socket;
        buttonPlusOne.position(0, 200);
        buttonPlusOne.mousePressed(() => this.plusQuota(1));
    }

    show(){
        background(220);

    }

    //send a plus one 
    plusQuota(plus){
        socket.emit('plus_quota', {value: plus, name: this.nomeSquadra});
    }
    
    //mouse pressed
    mousePressed(){

    }
    //RESIZE
    Resize(){}
}