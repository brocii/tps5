let stringa;
let righe = [];
let tabella = [];
let datiNumerici = [];
let json;
let dati;
let stringhe=[];





function leggi() {
    
    const req = new XMLHttpRequest();
    req.open("GET",'5Einf.json',true);
    req.send();
    req.onload = function(){
    json = JSON.parse(req.responseText);
    console.log(json);
    inserisci(json);
    
}



   
}

function inserisci(file) {
    document.getElementById("titolo").innerHTML = "Informazioni del file";
    let tab = document.getElementById("tabella");
    
    let intestazione = Object.keys(file[0]);
    let Header = tab.insertRow();
    for (let chiave of intestazione) {
        const cella = Header.insertCell();
        cella.innerHTML = `<b>${chiave}</b>`;
    }


    for (let i of file) {
        const riga = tab.insertRow();
        for (let chiave of intestazione) {
            const cella = riga.insertCell();
            cella.innerHTML = i[chiave];
        }
    }

   
   
}

function salvaStringhe(parametro, valore){
    if(parametro.equals("cognome")||parametro.equals("nome")){
        let rispettano=[];
        for(let i of json){
        stringa=JSON.stringify(json.i.parametro)
        id=JSON.stringify(json.i.id)
        stringhe.push(stringa+","+id)
    }
        for(let t of stringhe){
            if(stringhe[t].startsWith(valore)){
                for(let i of json){
                    splittato=stringhe[t].split(",");
                    ids=splittato[1];
                    if(json.i.id.equals(ids)){
                        rispettano.push(json.i)
                    }
                }
            }
            else{
                stringhe.pop(stringhe[i]);
                i--;
            }
        }
       inserisci(rispettano) 
    }


    else if(parametro.equals("minorenni")){
        let età=[];
        for(let i of json){
            if(json.i.età<18){
                età.push(json.i);
            }
        }
        inserisci(età)
    }
    
}

