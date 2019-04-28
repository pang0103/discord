//Bot Code

const Disocrd = require('discord.js');
const { prefix, token} = require('./config.json');
const client = new Disocrd.Client();

let csTeam  ={
    memberID: [],
    memberName: [],
    number: 0,
    joinTeam: function(playerID, playerName){
        this.memberID.push(playerID);
        this.memberName.push(playerName);
        this.number++;
    },
    dismissTeam: function(){
        this.memberID = [];
        this.memberName = [];
        this.number = 0;
    }
};

client.once('ready', ()=>{
    console.log('ready')
})

client.on('message' , message=>{
    if(message.content.startsWith(`${prefix}cs`||`${prefix}CS`)){
        //check if the user inside a squad
        if(csTeam.memberID.includes(`${message.member.id}`)){
            message.channel.send(`${message.member.displayName}`+ " in squad already");
        }else if(csTeam.number == 5){
            message.channel.send("```The Squad is FULL, Ready to GO```");
        }else{
            //Player join the team
            var ID, NAME;
            ID = message.member.id;
            NAME = message.member.displayName;
            csTeam.joinTeam(ID, NAME);

            var announcement = "CS 召集 \n\n```";
            for(var i=0 ; i< 5 ; i++){
                var name;
                if(csTeam.memberName[i]==null){
                    name="";
                }else{
                    name = csTeam.memberName[i];
                }
                announcement += `${i+1}.  ${name}\n\n`;
            }
            if(csTeam.number == 5 ){
                announcement += "開GAME啦屌你老母";
            }
            message.channel.send(announcement+"```");
        }
    }

    if(message.content.startsWith(`${prefix}dismiss`)){
        csTeam.dismissTeam();
    }

    if(message.content.startsWith(`${prefix}lol`||`${prefix}LOL`)){
        //lol
    }
})

client.login(token);