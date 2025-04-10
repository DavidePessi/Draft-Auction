var previousTouchOne = false;
var previousTouchTwo = false;
var previousTouchFive = false;
var previousTouchTen = false;
var previousTouchPlus = false;

class ClientPage{
    constructor(socket, nome){
        this.nomeSquadra = nome;
        this.socket = socket;

        this.buttonPlusOne = new ButtonClient(windowWidth/4, windowWidth/4, "+1", windowWidth/5, color(173, 255, 122));
        this.buttonPlusTwo = new ButtonClient(windowWidth * 3/4, windowWidth/4, "+2", windowWidth/5, color(255));
        this.buttonPlusFive = new ButtonClient(windowWidth/4, windowWidth * 6/8, "+5", windowWidth/5, color(255));
        this.buttonPlusTen = new ButtonClient(windowWidth * 3/4, windowWidth * 6/8, "+10", windowWidth/5, color(173, 255, 122));
        this.buttonPlus = new ButtonClient(windowWidth * 3/4 + windowWidth/10, windowWidth * 10/8 - windowWidth/10, "+", windowWidth/10, color(173, 255, 122));


        inputBox = createInput("");
        inputBox.position(windowWidth/4 - windowWidth/5, windowWidth * 10/8 - windowWidth/5);
        inputBox.size(windowWidth * 3/5, windowWidth/5);
        inputBox.style("font-size", 0.8 * windowWidth/10 + "px");
        inputBox.attribute('type', 'number');
        inputBox.style("border", "none");
        inputBox.style("background", "white");
        inputBox.style("padding", "14px");
        inputBox.style("border-radius", "999px");

        inputBox.input(function() {
            let value = inputBox.value();
            // Verifica se il valore non è un intero o se è vuoto
            if (!Number.isInteger(parseFloat(value)) || value === "") {
                inputBox.value("");
            }
        });
    }

    show(){
        background(59);
        this.buttonPlusOne.show();
        this.buttonPlusTwo.show();
        this.buttonPlusFive.show();
        this.buttonPlusTen.show();
        this.buttonPlus.show();

        this.checkTouch();
    }

    checkTouch(){
        if(previousTouchOne === false && this.buttonPlusOne.hover === true){
            this.plusQuota(1);
        }else if(previousTouchTwo === false && this.buttonPlusTwo.hover === true){
            this.plusQuota(2);
        }else if(previousTouchFive === false && this.buttonPlusFive.hover === true){
            this.plusQuota(5);
        }else if(previousTouchTen === false && this.buttonPlusTen.hover === true){
            this.plusQuota(10);
        }else if(previousTouchPlus === false && this.buttonPlus.hover === true){
            if (inputBox.value() !== "" && inputBox.value() !== null) {
                let inputValue = parseInt(inputBox.value(), 10);
                if (!isNaN(inputValue)) {
                    this.plusQuota(inputValue);
                }
            }
        }

        previousTouchOne = this.buttonPlusOne.hover;
        previousTouchTwo = this.buttonPlusTwo.hover;
        previousTouchFive = this.buttonPlusFive.hover;
        previousTouchTen = this.buttonPlusTen.hover;
        previousTouchPlus = this.buttonPlus.hover;
    }

    //send a plus one 
    plusQuota(plus){
        socket.emit('plus_quota', {value: plus, name: this.nomeSquadra});
    }
    

    //RESIZE
    Resize(){}
}