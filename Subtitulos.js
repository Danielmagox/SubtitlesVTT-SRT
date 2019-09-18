const fs = require('fs')

let regex = /[0-9][0-9]:[0-9][0-9],[0-9][0-9][0-9]\s-->\s[0-9][0-9]:[0-9][0-9],[0-9][0-9][0-9]/;
let retornado;
var reloj = "03:20,220 --> 03:22,050"
var newData = ""
var ceros = "00:"

const readFile = function(){
    try{
        const dataBuffer = fs.readFileSync('1. Applications of Machine Learning.srt')
        const data = dataBuffer.toString()
        return data;
    }catch(e){
        return[]
    }
}

const Parser = function(data){
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

var final = Parser(readFile())
fs.writeFileSync('1. Applications of Machine Learning.srt',final)
//console.log(regex.test(reloj))