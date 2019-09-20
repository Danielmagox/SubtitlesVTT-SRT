const fs = require('fs')
const vttFolder = 'C:/Users/daniel/Desktop/Subtitulos/VttFolder'

let regex = /[0-9][0-9]:[0-9][0-9],[0-9][0-9][0-9]\s-->\s[0-9][0-9]:[0-9][0-9],[0-9][0-9][0-9]/; //not necesary g because we use regex in loop
let retornado;
var reloj = "03:20,220 --> 03:22,050"
var newData = ""
var ceros = "00:"
var puntos = /\./g; //g , because is for all the data in 1 iteration
var ruta = 'VttFolder/'
var ruta2 = 'SrtFolder/'
var data = "";

const readDir = function(){
fs.readdirSync(vttFolder).forEach(file => {
    file = ruta.concat(file);
    data = ""
    data = readFile(file);
    data = NativeData(data);
    data = Parser(data);
    file = file.replace(ruta,ruta2);
    fs.writeFileSync(file.replace(".vtt",".srt"),data);
  });
}

const readFile = function(file){
    try{
        const dataBuffer = fs.readFileSync(file)
        const data = dataBuffer.toString()
        return data;
    }catch(e){
        return[]
    }
}

const NativeData = function(data){
    DataNet = data.replace("WEBVTT","")
    DataNet = DataNet.replace(puntos,",");
    return DataNet;
}

const Parser = function(data){
    newData = "";
    var str = data.split(/\n/)
    var i;
    for(i = 0; i < str.length; i++){
        if(regex.test(str[i])){
            var str2 = str[i].split(" ");
            aux1 = ceros.concat(str2[0])
            aux2 = ceros.concat(str2[2])
            str[i] = aux1 + " --> " + aux2
        }
       newData = newData.concat(str[i] + "\n");
    }
    return newData;  
}



readDir();

//var used = NativeData(readFile())
//var final = Parser(used);

//fs.writeFileSync(process.argv[2].replace(".vtt",".srt"),final)
//console.log(regex.test(reloj))