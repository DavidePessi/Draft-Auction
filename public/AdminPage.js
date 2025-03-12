class AdminPage{
    constructor(socket){
        //var buttonLoadCSV  = createButton('Load CSV');
        this.socket = socket;
        this.currentQuota = 0;
        this.teams = [];
        this.CSVButton = new Button(windowWidth - 300, 50, 170, 50, "importa listone");

        //buttonLoadCSV.position(0, 200);

        //BUTTON CSV

    }

    show(){
        background(59);

        //stampo i bottoni
        this.CSVButton.show();

        //stampo i team
        for(var i = 0; i < this.teams.length; i++){
            this.teams[i].show(windowWidth/10 * i, windowHeight - 560);
        }

        fill(0);
        text("you are the admin", 50, 50);
        text(this.currentQuota.toString(), 50, 100);

        //CHECK CLICK ON BUTTON CSV
    }

    //RESIZE
    Resize(){
        for(var i = 0; i < this.teams.length; i++){
            this.teams[i].Resize();
        }
    }

    //CLICK BUTTON FUNCTIONS
    mousePressed(){
        if(this.CSVButton.hover){
            this.askForFile();
        }
    }

    //CAMBIARE LA QUOTA IN BASE A QUANTO HANNO AGGIUNTO
    AddQuota(value){
        this.currentQuota += value;
    }

    //AGGIUNGE UN TEAM A QUELLI PRESENTI
    AddTeam(name){
        this.teams.push(new Team(name));
    }

    //ASKING THE CSV FILE
    askForFile() {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = ".csv";

        input.addEventListener("change", (event) => {
            const file = event.target.files[0];

            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const fileContent = event.target.result;
                    const parsedData = this.parseCSV(fileContent);
                    this.displayData(parsedData);
                };
                reader.readAsText(file);
            } else {
                alert("Nessun file selezionato.");
            }
        });

        input.click();
    }

    parseCSV(csvContent) {
        const rows = csvContent.split("\n");
        const headers = rows[0].split(",");
        const data = rows.slice(1).map(row => {
            const values = row.split(",");
            let rowData = {};
            headers.forEach((header, index) => {
                rowData[header] = values[index];
            });
            return rowData;
        });
        return data;
    }

    displayData(data) {
        console.log("Parsed Data:");
        data.forEach((row, index) => {
            console.log(`Row ${index + 1}:`, row);  // Print each row of parsed data
        });
    }
}