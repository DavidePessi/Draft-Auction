class Timer{
    constructor(circleX, circleY, circleH, textSize){
        this.circleX = circleX;
        this.circleY = circleY;
        this.circleH = circleH;

        this.textSize = textSize;

        this.time = 15;
        this.timeOut = false;
        this.isPaused = false;
        this.timerInterval = null;
    }

    show(){
        fill(173, 255, 122);
        circle(this.circleX, this.circleY, this.circleH);
        noStroke();

        fill(0);
        textSize(this.textSize);
        var NumberToText = this.time.toString(); 
        text(NumberToText, this.circleX  - (textWidth(NumberToText)/2), this.circleY + this.textSize/2 - (this.textSize/10));
        textSize(12);
    }

    updateOffsetX(newOffsetX){
        this.circleX = newOffsetX;
    }

    startTimer(){
        this.time = 15;
        this.timeOut = false;
        this.isPaused = false;

        if (this.timerInterval) {
            clearInterval(this.timerInterval);
        }

        this.timerInterval = setInterval(() => {
            if(!this.isPaused){
                this.time--;

                if (this.time <= 0) {
                    clearInterval(this.timerInterval);
                    this.timeOut = true;
                }
            }
        }, 1000); 
    }

    pauseTimer(){
        this.isPaused = true;
    }

    resumeTimer(){
        if (this.time > 0 && this.isPaused) {
            this.isPaused = false;
        }
    }
}