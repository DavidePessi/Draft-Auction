class AdminPage{
    constructor(socket){
        //var buttonLoadCSV  = createButton('Load CSV');
        this.socket = socket;
        this.currentQuota = 0;
        this.currentPlayer = "Gosens";
        this.currentSquadra = "Ata";
        this.currentSquadraVincente = "Jeff";


        //definisco i team
        this.teams = [];

        //definisco i testi
        this.PlayerName = new Medallion(windowWidth/4, windowHeight/12, 100, this.currentPlayer, 64);
        this.Squadra = new Medallion(windowWidth/4 + this.PlayerName.GetWidth() + 20, windowHeight/12, 100, this.currentSquadra, 64);
        this.Crediti = new Medallion(windowWidth/4, windowHeight/12 + this.PlayerName.GetHeight() + 20, 100, this.currentQuota, 64);
        this.SquadraVincente = new Medallion(windowWidth/4 + this.Crediti.GetWidth() + 20, windowHeight/12 + this.PlayerName.GetHeight() + 20, 100, this.currentSquadraVincente, 64);

        //definisco i pulsanti
        this.CSVButton = new Button(windowWidth - 300, windowHeight/12, 50, "importa listone", 20, 30);
        this.DownloadButton = new Button(windowWidth - 470, windowHeight/12, 50, "scarica rose", 20, 30);
        this.Assegna = new Button(windowWidth/4 + this.Crediti.GetWidth() + 40 + this.SquadraVincente.GetWidth(), windowHeight/12 + this.PlayerName.GetHeight() + 20, 100, "[■]", 64, 100);
    }

    show(){
        background(59);

        //stampo i bottoni
        this.CSVButton.show();
        this.DownloadButton.show();
        this.Assegna.show();

        //stampo la parte dell'asta
        this.PlayerName.show();
        this.Squadra.show();
        this.Crediti.show();
        this.SquadraVincente.show();

        //stampo i team
        for(var i = 0; i < this.teams.length; i++){
            this.teams[i].show(windowWidth/10 * i, windowHeight - 560);
        }
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
    AddQuota(value, nomeSquadra){
        this.currentSquadraVincente = nomeSquadra;
        this.SquadraVincente.updateText(this.currentSquadraVincente);
        this.SquadraVincente.updateWidth();

        this.currentQuota += value;
        this.Crediti.updateText(this.currentQuota);
        this.Crediti.updateWidth();
        
        this.SquadraVincente.updateOffsetX(windowWidth/4 + this.Crediti.GetWidth() + 20);
        this.Assegna.updateOffsetX(windowWidth/4 + this.Crediti.GetWidth() + 40 + this.SquadraVincente.GetWidth());

    }

    //AGGIUNGE UN TEAM A QUELLI PRESENTI
    AddTeam(name){
        var _exist = false;
        for(var i = 0; i < this.teams.length; i++){
            if(this.teams[i].GetName() === name){
                _exist = true;
            }
        }
        if(!_exist){
            this.teams.push(new Team(name));
        }
        else{
        }
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