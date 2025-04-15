var previousTouchOne = false;
var previousTouchTwo = false;
var previousTouchFive = false;
var previousTouchTen = false;
var previousTouchPlus = false;

class ClientPage{
    constructor(socket, nome){
        this.nomeSquadra = nome;
        this.socket = socket;

        this.inputBox = createInput("");

        if(isMobile()){

            this.buttonPlusOne = new ButtonClient(windowWidth/4, windowWidth/4, "+1", windowWidth/5, color(173, 255, 122));
            this.buttonPlusTwo = new ButtonClient(windowWidth * 3/4, windowWidth/4, "+2", windowWidth/5, color(255));
            this.buttonPlusFive = new ButtonClient(windowWidth/4, windowWidth * 6/8, "+5", windowWidth/5, color(255));
            this.buttonPlusTen = new ButtonClient(windowWidth * 3/4, windowWidth * 6/8, "+10", windowWidth/5, color(173, 255, 122));
            this.buttonPlus = new ButtonClient(windowWidth * 3/4 + windowWidth/10, windowWidth * 10/8 - windowWidth/10, "+", windowWidth/10, color(173, 255, 122));

            this.inputBox.position(windowWidth/4 - windowWidth/5, windowWidth * 10/8 - windowWidth/5);
            this.inputBox.size(windowWidth * 3/5, windowWidth/5);
            this.inputBox.style("font-size", 0.8 * windowWidth/10 + "px");

        } else{

            this.buttonPlusOne = new ButtonClient(windowWidth/4 - 0.12 * windowWidth - 10, windowWidth/5, "+1", 0.06 * windowWidth, color(173, 255, 122));
            this.buttonPlusTwo = new ButtonClient(windowWidth/4 + 10, windowWidth/5, "+2", 0.06 * windowWidth, color(255));
            this.buttonPlusFive = new ButtonClient(windowWidth/4 - 0.12 * windowWidth - 10, windowWidth/5 + 0.12 * windowWidth + 10, "+5", 0.06 * windowWidth, color(255));
            this.buttonPlusTen = new ButtonClient(windowWidth/4 + 10, windowWidth/5 + 0.12 * windowWidth + 10, "+10", 0.06 * windowWidth, color(173, 255, 122));
            this.buttonPlus = new ButtonClient(windowWidth/4 + 10, windowWidth/5 + 0.21 * windowWidth + 10, "+", 0.03 * windowWidth, color(173, 255, 122));

            this.inputBox.position(windowWidth/4 - 0.16 * windowWidth - 10, windowWidth/5 + 0.185 * windowWidth + 10);
            this.inputBox.size(0.03 * windowWidth * 4, 0.03 * windowWidth * 2 * 0.5);
            this.inputBox.style("font-size", 0.03 * windowWidth + "px");
        }

        this.inputBox.attribute('type', 'number');
        this.inputBox.style("border", "none");
        this.inputBox.style("background", "white");
        this.inputBox.style("padding", "14px");
        this.inputBox.style("border-radius", "999px");

        inputBox.input(function() {
            let value = inputBox.value();
            // Verifica se il valore non è un intero o se è vuoto
            if (!Number.isInteger(parseFloat(value)) || value === "") {
                inputBox.value("");
            }
        });
    }

    show(){
        background(37, 48, 49);

        if(!isMobile()){
            textSize(0.07 * windowWidth);
            var margin = textWidth(this.nomeSquadra);
            fill(255);
            text(this.nomeSquadra, windowWidth/2, windowHeight/10);
            textSize(12);
        }

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
    Resize(){
        if(!isMobile()){
            this.buttonPlusOne.resize(windowWidth/4 - 0.12 * windowWidth - 10, windowWidth/5, 0.06 * windowWidth);
            this.buttonPlusTwo.resize(windowWidth/4 + 10, windowWidth/5, 0.06 * windowWidth);
            this.buttonPlusFive.resize(windowWidth/4 - 0.12 * windowWidth - 10, windowWidth/5 + 0.12 * windowWidth + 10, 0.06 * windowWidth);
            this.buttonPlusTen.resize(windowWidth/4 + 10, windowWidth/5 + 0.12 * windowWidth + 10, 0.06 * windowWidth);
            this.buttonPlus.resize(windowWidth/4 + 10, windowWidth/5 + 0.21 * windowWidth + 10, 0.03 * windowWidth);

            this.inputBox.position(windowWidth/4 - 0.16 * windowWidth - 10, windowWidth/5 + 0.185 * windowWidth + 10);
            this.inputBox.size(0.03 * windowWidth * 4, 0.03 * windowWidth * 2 * 0.5);
            this.inputBox.style("font-size", 0.03 * windowWidth + "px");
        }
    }
}