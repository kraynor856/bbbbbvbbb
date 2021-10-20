const Discord = require("discord.js");
const { MessageEmbed } = require('discord.js');



const ytdl = require("ytdl-core");
const yts = require("yt-search");
const client = new Discord.Client();

const queue = new Map();
const prefix ="!";

client.once("ready", () => {
  console.log("Ready!");
});

client.once("reconnecting", () => {
  console.log("Reconnecting!");
});

client.once("disconnect", () => {
  console.log("Disconnect!");
});

client.on("message", async message => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  const serverQueue = queue.get(message.guild.id);

  if (message.content.startsWith(`${prefix}play`)) {
    execute(message, serverQueue);
    return;
  } else if (message.content.startsWith(`${prefix}skip`)) {
    skip(message, serverQueue);
    return;
  } else if (message.content.startsWith(`${prefix}stop`)) {
    stop(message, serverQueue);
    return;

  }else if (message.content.startsWith(`${prefix}fs`)){
    skip(message, serverQueue);
    return;
  }else if(message.content.startsWith(`${prefix}p`)){
    execute(message, serverQueue);
    return;
  }else if(message.content.startsWith(`${prefix}show image`)) {
    message.channel.send("💩A work of fart!💩", {files: ["https://cdn.discordapp.com/attachments/807016099992043530/887061856202653706/Fartbot_icon2.png"]});
        
    }else{
       message.channel.send("💩💩Command not found💩💩");
    }
});

async function execute(message, serverQueue) {
  const args = message.content.split(" ");

  const voiceChannel = message.member.voice.channel;
  if (!voiceChannel)
    return message.channel.send(
      "You need to be in a voice channel to play music!"
    );
  const permissions = voiceChannel.permissionsFor(message.client.user);
  if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
    return message.channel.send(
      "I need the permissions to join and speak in your voice channel!"
    );
  }



  let song;
  if (ytdl.validateURL(args[1])) {
    const songInfo = await ytdl.getInfo(args[1]);
    song = {
      title: songInfo.title,
      url: songInfo.video_url,
    };
  } else {
    const {videos} = await yts(args.slice(1).join(" "));
    if (!videos.length) return message.channel.send("No songs were found!");
    song = {
      title: videos[0].title,
      url: videos[0].url,
      length: videos.length
    };
  }
  if (!serverQueue) {
    const queueContruct = {
      textChannel: message.channel,
      voiceChannel: voiceChannel,
      connection: null,
      songs: [],
      volume: 5,
      playing: true
    };

    queue.set(message.guild.id, queueContruct);

    queueContruct.songs.push(song);


  


    try {
      var connection = await voiceChannel.join();
      queueContruct.connection = connection;
      play(message.guild, queueContruct.songs[0]);
    } catch (err) {
      console.log(err);
      queue.delete(message.guild.id);
      return message.channel.send(err);
    }
  } else {
    serverQueue.songs.push(song);
    const musiclist_box2 = new MessageEmbed()  
    .setColor('#0099ff')
    .setTitle('Song added to list!')
    .setURL(`${song.url}`)
    .setAuthor('Some name', 'https://cdn.discordapp.com/attachments/872049772175982603/887065656774758430/Fartbot_icon2.png', `${song.url}`)
    .setThumbnail('https://cdn.discordapp.com/attachments/872049772175982603/887065656774758430/Fartbot_icon2.png')
    .addFields(
    { name: 'songtitle', value: `${song.title}` },
    { name: 'songlenght ', value: `${song.title}` },
    { name: 'songlink ', value: `${song.url}` }
    
    )
    return message.channel.send(musiclist_box2);
  }
}

function skip(message, serverQueue) {
  if (!message.member.voice.channel)
    return message.channel.send(
      "💩You have to be in a voice channel to stop the music!💩"
    );
  if (!serverQueue)
    return message.channel.send("There is no song that I could skip!");
  serverQueue.connection.dispatcher.end();
}

function stop(message, serverQueue) {
  if (!message.member.voice.channel)
    return message.channel.send(
      "You have to be in a voice channel to stop the music!"
    );
  serverQueue.songs = [];
  serverQueue.connection.dispatcher.end();
}

function play(guild, song) {
  const serverQueue = queue.get(guild.id);
  if (!song) {
    serverQueue.voiceChannel.leave();
    queue.delete(guild.id);
    return;
  }


const musiclist_box = new MessageEmbed()  
.setColor('#0099ff')
.setTitle('FartBot')
.setURL('https://discord.js.org/')
.setAuthor('Some name', 'https://cdn.discordapp.com/attachments/872049772175982603/887065656774758430/Fartbot_icon2.png', 'https://discord.js.org')
.setThumbnail('https://cdn.discordapp.com/attachments/872049772175982603/887065656774758430/Fartbot_icon2.png')
.addFields(
{ name: 'songtitle', value: `${song.title}` },
{ name: 'songlenght ', value: `${song.length}` },
{ name: 'songlink ', value: `${song.url}` }

)










  const dispatcher = serverQueue.connection
    .play(ytdl(song.url))
    .on("finish", () => {
      serverQueue.songs.shift();
      play(guild, serverQueue.songs[0]);
    })
    .on("error", error => console.error(error));
  dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
  serverQueue.textChannel.send(musiclist_box);
}





var arr1 = new Array();
var kyle = [
"A wet one by kyle is playing now",
"A loud one by kyle will now play",
"Here is a banger from kyle",
"Incoming fart by kyle ",
"Fart by kyle coming right up!",
"Is that a earthquake.... no its kyle shitting his self! ",
"ALERT, ALERT! A SONIC BOOM FROM KYLE IS NEAR",
"Fresh from the battyhole of Kyle",
"Kyle has definitely been brewing this one for some time!"


]

var arr1 = new Array();
var kyle_file = [
  "fart1.mp3",
  "fart2.mp4",
  "rickroll.mp3",
  "fart3.mp4",
  "fart4.mov",
  "fart5.mp4",
  "fart6.mp4",
  "fart7.mp4",
  "fart8.mp4",
  "fart9.mp4",
  "fart10.mp4",
  "fart11.mp4",
  "fart12.mp4",
  "fart13.mp4",
  "fart14.mp4",
  "fart15.mp4",
  "Fart16.mov",
  "Fart17.mov",
  "Fart18.mov",
  "Fart19.mov",
  "Fart20.mov",
  

]



var arr1 = new Array();
var evan = [
"A wet one by evan is playing now",
"A loud one by evan will now play",
"Here is a banger from evan",
"Incoming fart by evan ",
"evan is gonna rip one",
"Fart by evan coming up",
"Is that a earthquake.... no its evan shitting his self! ",
"ALERT, ALERT! A SONIC BOOM FROM EVAN IS NEAR",
"Evan has definitely been brewing this one for some time!",
"Fresh from the battyhole of Evan"
]


var arr1 = new Array();
var evan_file = [
  "evan1.mov",
  "evan2.mov",
  "evan3.mov",
  "evan4.mov",
  "evan5.mov",
  "evan6.mov",
  "evan7.mov",
  "evan8.mov",
  "evan9.mov",
  "evan10.mov",
  "evan11.mov",
  "evan13.mov",
  "evan14.mov",
  "evan15.mov",
  "evan16.mov"
]

var arr1 = new Array();
var henry = [
"A wet one by henry is playing now",
"A loud one by henry will now play",
"Here is a banger from henry",
"Incoming fart by henry ",
"henry is gonna rip one",
"Fart by henry coming up",
"Is that a earthquake.... no its henry shitting his self! ",
"That was a creamy one by herny",
"ALERT, ALERT! A SONIC BOOM FROM HENRY IS NEAR",
"Fresh from the battyhole of henry",
"Henry has definitely been brewing this one for some time!"
]


var arr1 = new Array();
var henry_file = [
  "henry1.mov",
  "henry2.mov",
  "henry3.mov",
  "henry4.mov",
  "henry5.mov",
  "henry6.mov",
  "henry7.mov",
  "henry8.mov",
  "henry9.mov",
  "henry10.mov",
  "henry11.mov",
  "henry12.mov",
  "henry13.mov",
  "henry14.mov",
  "henry15.mov",
  "henry16.mov",
  "henry17.mp4",
  "henry18.mp4",
  "henry19.mp4",
  "henry20.mp4"


]


var arr1 = new Array();
var quote_fart = [
   "quote1.png",
   "Quote2.png",
    "quote3.jpg",
    "quote4.jpg",
    "quote5.jgp",
    "quote6.jgp"

]



var arr1 = new Array();
var random_fart = [
  "henry1.mov",
  "henry2.mov",
  "henry3.mov",
  "henry4.mov",
  "henry5.mov",
  "henry6.mov",
  "henry7.mov",
  "henry8.mov",
  "henry9.mov",
  "henry10.mov",
  "henry11.mov",
  "henry12.mov",
  "henry13.mov",
  "henry14.mov",
  "henry15.mov",
  "henry16.mov",
  "fart1.mp3",
  "fart2.mp4",
  "rickroll.mp3",
  "fart3.mp4",
  "fart4.mov",
  "fart5.mp4",
  "fart6.mp4",
  "fart7.mp4",
  "fart8.mp4",
  "fart9.mp4",
  "fart10.mp4",
  "fart11.mp4",
  "fart12.mp4",
  "fart13.mp4",
  "fart14.mp4",
  "fart15.mp4",
  "Fart16.mov",
  "Fart17.mov",
  "Fart18.mov",
  "Fart19.mov",
  "Fart20.mov",
  "evan1.mov",
  "evan2.mov",
  "evan3.mov",
  "evan4.mov",
  "evan5.mov",
  "evan6.mov",
  "evan7.mov",
  "evan8.mov",
  "evan9.mov",
  "evan10.mov",
  "evan11.mov",
  "evan13.mov",
  "evan14.mov",
  "evan15.mov",
  "evan16.mov"


]


const PREFIX = "#";

client.on('message', (message) =>  {
  console.log(message.content)
if(message.content.startsWith(PREFIX)){
    const [cmd_name, ...args] = message.content
    .trim()
    .substring(PREFIX.length)
    .split(/\s+/);
    console.log(cmd_name)
    console.log(args)
    if(cmd_name == 'dofart' && args =="random" || args == "r"){
      var random_fart_file = random_fart[Math.floor(Math.random() * random_fart.length)];
       var voiceChannel = message.member.voice.channel;
       message.member.voice.channel.join()
       .then(connection => { 
        const dispatcher = connection.play(require("path").join(__dirname, random_fart_file));
         dispatcher.on("end", end => {
           voiceChannel.leave()

         })
       })
    }else if(cmd_name == "dofart" && args == "quote" || args == "q" ){
      var channel = message.channel
      var random_quote_fart = quote_fart[Math.floor(Math.random() * quote_fart.length)];
      message.channel.send("Enjoy", {files: [random_quote_fart]});
    }else if(cmd_name == 'dofart' && args == "henry" || args == "Henry" || args == "h"){
      var henry_random = henry[Math.floor(Math.random() * henry.length)];
      var random_henry_file = henry_file[Math.floor(Math.random() * henry_file.length)];
      message.reply(henry_random)
      var voiceChannel = message.member.voice.channel;
      message.member.voice.channel.join()
      .then(connection => { 
       const dispatcher = connection.play(require("path").join(__dirname, random_henry_file));
        dispatcher.on("end", end => {
          voiceChannel.leave()
        })
      })
       
    }else if(cmd_name == 'dofart' && args == "evan"|| args =="Evan"|| args =="e" ){
      var random_evan = evan_file[Math.floor(Math.random() * evan_file.length)];
      var random_evan_file = evan[Math.floor(Math.random() * evan.length)];
      message.reply(random_evan_file)
      var voiceChannel = message.member.voice.channel;
      message.member.voice.channel.join()
      .then(connection => { 
       const dispatcher = connection.play(require("path").join(__dirname, random_evan));
        dispatcher.on("end", end => {
          voiceChannel.leave()
        })
      })
    }else if(cmd_name == 'dofart' && args == "kyle" ||  args == "Kyle" ||  args == "k") {
      var random_kyle = kyle[Math.floor(Math.random() * kyle.length)];
      var random_kyle_file = kyle_file[Math.floor(Math.random() * kyle.length)];
      message.reply(random_kyle)
      var voiceChannel = message.member.voice.channel;
      message.member.voice.channel.join()
      .then(connection => { 
       const dispatcher = connection.play(require("path").join(__dirname, random_kyle_file));
        dispatcher.on("end", end => {
          voiceChannel.leave()

        })
      })
    }else if(cmd_name == 'dofart' && args == "help" ||  args == "h"){
      const exampleEmbed = new MessageEmbed()
	   .setColor('#0099ff')
	   .setTitle('FartBot')
	   .setURL('https://discord.js.org/')
	   .setAuthor('Some name', 'https://cdn.discordapp.com/attachments/872049772175982603/887065656774758430/Fartbot_icon2.png', 'https://discord.js.org')
	   .setDescription('🌩 Farting up a storm! 🌩')
     .setDescription('🌩 Developers: Kyle, Henry 🌩')
	  .setThumbnail('https://cdn.discordapp.com/attachments/872049772175982603/887065656774758430/Fartbot_icon2.png')
	   .addFields(
		{ name: 'Command list', value: 'for Farts not music' },
		{ name: '\u200B', value: '\u200B' },
		{ name: '#dofart', value: 'kyle', inline: true },
		{ name: '#dofart', value: 'evan', inline: true },
	  )
	   .addField('#dofart', 'henry', true)
	   .setImage('https://cdn.discordapp.com/attachments/872049772175982603/887065656774758430/Fartbot_icon2.png')
	   .setTimestamp()
	   .setFooter('Some footer text here', 'https://cdn.discordapp.com/attachments/872049772175982603/887065656774758430/Fartbot_icon2.png');
     message.channel.send(exampleEmbed);
  }
}
})

client.login("ODg3MDI5NTc5NTMxODMzMzU0.YT-Mqw.FYxVevUkNJ_mF7xp4Ou-NUskxL0")
