//Bot Code

const Disocrd = require('discord.js');
const { prefix, token} = require('./config.json');
const client = new Disocrd.Client();

let csTeam  ={
    memberID: [],
    memberName: [],
    number: 0,
    announcement: "",
    joinTeam: function(playerID, playerName){
        this.memberID.push(playerID);
        this.memberName.push(playerName);
        this.number++;
    },
    dismissTeam: function(){
        this.memberID = [];
        this.memberName = [];
        this.number = 0;
    },
    makeAnnouncement: function(){
        this.announcement = ":gun::gun::gun:                                 CS 召集                                 :gun::gun::gun: \n\n```";
        for(var i=0 ; i< 5 ; i++){
            var name;
            if(csTeam.memberName[i]==null){
                name="";
            }else if(i == 0){
                name = csTeam.memberName[i]+"           Captain";
            }else{
                name = csTeam.memberName[i];
            }
            this.announcement += `${i+1}.  ${name}\n\n`;
        } this.announcement+= "```";
    }
};

client.once('ready', ()=>{
    console.log('ready')
})

client.on('message' , message=>{
    if(message.content.startsWith(`${prefix}cs`)){
        //check if the user inside a squad
        if(csTeam.memberID.includes(`${message.member.id}`)){
            message.channel.send(`${message.member}`+ " in squad already");
        }else if(csTeam.number == 5){
            message.channel.send("```The Squad is FULL, Ready to GO```");
        }else{
            //Player join the team
            var ID, NAME;
            ID = message.member.id;
            NAME = message.member.displayName;
            csTeam.joinTeam(ID, NAME);
            csTeam.makeAnnouncement();
            message.channel.send(csTeam.announcement);
        }
    }

    if(message.content.startsWith(`${prefix}dismiss`)){
        if(csTeam.memberID.includes(`${message.member.id}`)){
            if(csTeam.memberID[0] == `${message.member.id}`){
                csTeam.dismissTeam();
                message.channel.send("```Squad dismissed```");
            }else{
                message.channel.send("```Only Captain is allowed to dismiss the squad```");
            }
        }
    }

    if(message.content.startsWith(`${prefix}quit`)){
        if(csTeam.memberID.includes(`${message.member.id}`)){
            var i = csTeam.memberID.indexOf(message.member.id);
            csTeam.memberID.splice( i , 1);
            csTeam.memberName.splice(i , 1);
            csTeam.number--;
            message.channel.send(":wave:"+`  ${message.member.displayName} left the cs squad`);
        }
    }

    if(message.content.startsWith(`${prefix}status`)){
        if(csTeam.memberID.length == 0){
            message.channel.send("No squad built");
        }else{
            message.channel.send(csTeam.announcement);
        }
    }

    if(message.content == (`${prefix}help`)){
        var helpMsg;
        helpMsg = "```1. !cs\t\t\t - build cs squad\n";
        helpMsg += "2. !status\t\t\t - check squad status\n";
        helpMsg += "3. !quit\t\t\t - quit squad\n";
        helpMsg += "4. !dismiss\t\t\t - dismiss the squad\n";
        helpMsg += "5. !lol\t\t\t - want to play lol\n"
        helpMsg += "```";
        message.channel.send(helpMsg);
    }

    if(message.content.startsWith(`${prefix}overwatch`)){
        message.channel.send(`${message.member} 好後悔買左Overwatch :sob: 有冇人玩下 :sob:`);
    }

    if(message.content == (`${prefix}lol`)){
        message.channel.send(`${message.member} 好想打 LOL , 有冇人陪佢 :sob:`);
    }
})

client.login(token);