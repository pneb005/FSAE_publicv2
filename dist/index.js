"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const discord_js_2 = require("discord.js");
const config_json_1 = require("./config.json");
const client = new discord_js_1.Client({ intents: [discord_js_1.GatewayIntentBits.Guilds] });
const googleapis_1 = require("googleapis");
const node_schedule_1 = __importDefault(require("node-schedule"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: 'src/.env' });
const deployCommands_js_1 = require("./deployCommands.js");
client.on('ready', () => {
    console.log(client.user.tag);
    (0, deployCommands_js_1.deployCommands)();
});
let GOOGLE_PRIVATE_KEY = process.env.private_key;
GOOGLE_PRIVATE_KEY = GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n");
const GOOGLE_CLIENT_EMAIL = process.env.client_email;
const GOOGLE_PROJECT_NUMBER = process.env.project_number;
const GOOGLE_CALENDAR_ID = process.env.calendar_id;
const SCOPES = ["https://www.googleapis.com/auth/calendar"];
const jwtClient = new googleapis_1.google.auth.JWT(GOOGLE_CLIENT_EMAIL, null, GOOGLE_PRIVATE_KEY, SCOPES);
const calendar = googleapis_1.google.calendar({
    version: "v3",
    auth: jwtClient,
});
const auth = new googleapis_1.google.auth.GoogleAuth({
    keyFile: "./keys.json",
    scopes: SCOPES,
});
class eventWeekly {
    constructor(i_num, channel) {
        this.i_num = i_num;
        this.channel = channel;
    }
    combination(i) {
        let title = i[this.i_num].summary;
        let desc = i[this.i_num].description;
        let time = i[this.i_num].start.dateTime;
        console.log(title + " " + desc + " " + time);
        const date = new Date(time);
        const formatOptions = {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        };
        let dateString = date.toLocaleDateString('en-US', formatOptions);
        dateString = dateString.replace(',', '')
            .replace('PM', 'p.m.')
            .replace('AM', 'a.m.');
        const embed = new discord_js_2.EmbedBuilder()
            .setTitle(title)
            .setDescription(desc + '\n' + '```' + dateString + '```');
        async function announce(channelId) {
            console.log('worked');
            const channel = await client.channels.fetch(channelId); //channel
            await channel.send({ embeds: [embed] }); //send embed
        }
        announce(this.channel);
    }
}
let x;
let a;
function listCalendarEvents(channel) {
    var d = new Date();
    d.setDate(d.getDate() + (7 - d.getDay()) % 7 + 1);
    calendar.events.list({
        calendarId: GOOGLE_CALENDAR_ID,
        timeMin: new Date().toISOString(),
        timeMax: d,
        maxResults: 10,
        singleEvents: true,
        orderBy: "startTime",
    }, (error, result1) => {
        if (error) {
            console.log("Something went wrong: ", error); // If there is an error, log it to the console
            console.log("trying again....");
            listCalendarEvents(channel);
        }
        else {
            if (result1.data.items.length > 0) {
                let data1 = result1.data.items; //let data equal api result
                const o = data1; //assign to variable
                console.log('calender events listed');
                var ch1 = 'description'; //string to look for
                a = JSON.stringify(o); //convert data to string
                var count = a.split(ch1).length - 1; //count number of occurances
                let u = 0; //initial value
                const delay = async (ms = 1000) => new Promise(resolve => setTimeout(resolve, ms));
                while (u < count) { //while z is less than number of entries
                    x = new eventWeekly(u, channel); //initialize class with current value
                    x.combination(o); //send message
                    u++; //add to u
                }
            }
            else {
                console.log("No upcoming events found."); // If no events are found
            }
        }
    });
}
function sendmsg(data) {
    let title = data.summary;
    let description = data.description;
    function sendLocation(keyword) {
        let titleKeyword = keyword.toLowerCase();
        let meetingTitle;
        let channelID;
        let roleID;
        if (titleKeyword.includes('2023 team leads')) {
            meetingTitle = keyword;
            channelID = '1056011941279178842';
            roleID = '1055924215733309440';
        }
        else if (titleKeyword.includes('2024 team leads')) {
            meetingTitle = keyword;
            channelID = '1056017912923684955';
            roleID = '1055924298730197012';
        }
        else if (titleKeyword.includes('chassis')) {
            meetingTitle = keyword;
            channelID = '1056018027902152744';
            roleID = '1055924393043300433';
        }
        else if (titleKeyword.includes('powertrain')) {
            meetingTitle = keyword;
            channelID = '1056018154972786739';
            roleID = '1055924422659293245';
        }
        else if (titleKeyword.includes('vehicle dynamics')) {
            meetingTitle = keyword;
            channelID = '1056018323692859502';
            roleID = '1055924455370661888';
        }
        else if (titleKeyword.includes('ergonomics')) {
            meetingTitle = keyword;
            channelID = '1056018516140113943';
            roleID = '1055924485213126656';
        }
        else if (titleKeyword.includes('low voltage electronics')) {
            meetingTitle = keyword;
            channelID = '1056018644196397096';
            roleID = '1055924491504599060';
        }
        else if (titleKeyword.includes('brakes')) {
            meetingTitle = keyword;
            channelID = '1056018767177588836';
            roleID = '1055924496294486026';
        }
        else if (titleKeyword.includes('aerodynamics')) {
            meetingTitle = keyword;
            channelID = '1056019015954346014';
            roleID = '1055924562526752929';
        }
        else if (titleKeyword.includes('aero')) {
            meetingTitle = keyword;
            channelID = '1056019015954346014';
            roleID = '1055924562526752929';
        }
        else if (titleKeyword.includes('areo')) {
            meetingTitle = keyword;
            channelID = '1056019015954346014';
            roleID = '1055924562526752929';
        }
        else if (titleKeyword.includes('vd')) {
            meetingTitle = keyword;
            channelID = '1056018323692859502';
            roleID = '1055924455370661888';
        }
        else if (titleKeyword.includes('ergo')) {
            meetingTitle = keyword;
            channelID = '1056018516140113943';
            roleID = '1055924485213126656';
        }
        else if (titleKeyword.includes('low voltage')) {
            meetingTitle = keyword;
            channelID = '1056018644196397096';
            roleID = '1055924491504599060';
        }
        else if (titleKeyword.includes('lv')) {
            meetingTitle = keyword;
            channelID = '1056018644196397096';
            roleID = '1055924491504599060';
        }
        else {
            meetingTitle = keyword;
            channelID = '1056017728374321232';
            roleID = '917926628561150043';
        }
        return [meetingTitle, channelID, roleID];
    }
    let sendTarget = sendLocation(title);
    let messageTitle = sendTarget[0]; //get values from keyword function
    let channelID = sendTarget[1];
    let roleID = sendTarget[2];
    const data_embed = new discord_js_2.EmbedBuilder() //build embed
        .setTitle(messageTitle + ' starting in 10 minutes!')
        .setDescription(description);
    return [data_embed, channelID, roleID]; //return embed with IDs
}
async function sendAlarm(embed, channelID, roleID) {
    console.log('worked');
    const channel = await client.channels.fetch(channelID); //channel
    await channel.send({ embeds: [embed] }); //send embed
    await channel.send('<@&' + roleID + '>');
}
let obj = {
    table: []
};
const updates = class {
    constructor(i_num) {
        this.i_num = i_num;
    }
    check(i) {
        let startTime1 = i[this.i_num].start.dateTime; //get start time from api response
        var diff = new Date(startTime1).getTime() - Date.now(); //get time difference in ms
        var minutes = Math.floor((diff / 1000) / 60); //convert to minutes
        if (minutes == 10) {
            if (!obj.table.includes(i[this.i_num].summary)) { //if meeting isn't inside object
                obj.table.push(i[this.i_num].summary); //add it
                let info = sendmsg(i[this.i_num]); //send announcement message
                let embed = info[0]; //construct embed
                let channelID = info[1];
                let roleID = info[2];
                sendAlarm(embed, channelID, roleID); //send message
            }
        }
        if (minutes !== 10) { //if meeting no longer in 10 minutes
            if (obj.table.includes(i[this.i_num].summary)) {
                for (var q = 0; q < obj.table.length; q++) { //search through object
                    if (obj.table[q] === q[this.i_num.summary]) { //if meeting in object
                        obj.table.splice(q, 1); //remove it
                    }
                }
            }
        }
    }
};
let t;
function eventUpdates() {
    calendar.events.list({
        calendarId: GOOGLE_CALENDAR_ID,
        timeMin: new Date().toISOString(),
        maxResults: 10,
        singleEvents: true,
        orderBy: "startTime",
    }, (error, result) => {
        if (error) {
            console.log("Something went wrong: ", error); // If there is an error, log it to the console
            eventUpdates(); //retry
        }
        else {
            if (result.data.items.length > 0) {
                let data = result.data.items; //let data equal api result
                const i = data; //assign to variable
                var ch = 'description'; //string to look for
                a = JSON.stringify(i); //convert data to string
                var count = a.split(ch).length - 1; //count number of occurances
                let z = 0; //initial value
                while (z < count) { //while z is less than number of entries
                    t = new updates(z); //initialize class with current value
                    t.check(i); //check if its time to send message
                    z++; //add to z
                }
                // If there are events, print them out
            }
            else {
                console.log("No upcoming events found."); // If no events are found
            }
        }
    });
}
;
async function redef() {
    eventUpdates();
}
const rule = new node_schedule_1.default.RecurrenceRule();
rule.hour = 22;
rule.minute = 0;
rule.tz = 'Etc/UTC';
node_schedule_1.default.scheduleJob(rule, listCalendarEvents);
setInterval(redef, 10000); //check if its time for event announcement every 10 seconds
client.on('interactionCreate', async (interaction) => {
    const { commandName } = interaction;
    if (commandName === 'weekly') {
        let channel;
        channel = interaction.channelId;
        console.log(channel);
        listCalendarEvents(channel);
        return interaction.reply("Listing events....");
    }
});
client.login(config_json_1.token);
//# sourceMappingURL=index.js.map