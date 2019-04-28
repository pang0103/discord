//Bot Code

const Disocrd = require('discord.js');
const { prefix, token} = require('./config.json');
const client = new Disocrd.Client();

var number = 0;
var member = [];
var memberID = [];

client.once('ready', ()=>{
    console.log('ready')
})

client.on('message' , message=>{
    if(message.content.startsWith(`${prefix}cs`)){

        if(memberID.includes(`${message.member.id}`)){
            message.channel.send(`${message.member.displayName}`+ " in squad already");

        }else if(number == 5){
            message.channel.send("The squad is full")

        }else{
            memberID[number] = message.member.id;
            member[number] = message.member.displayName;
            number = number + 1;

            var announcement = "CS CALL\n\n";
            for(var i = 0; i< 5 ; i++){
                announcement += `${i+1}. ${member[i]}\n`;
            }
            message.channel.send(announcement);
        }
    }

    if(message.content.startsWith(`${prefix}dismiss`)){
        number = 0;
        member = [];
        memberID = [];
    }
})

client.login(token);