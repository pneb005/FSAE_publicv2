"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deployCommands = void 0;
const config_json_1 = require("./config.json");
const discord_js_1 = require("discord.js");
const commands = [
    new discord_js_1.SlashCommandBuilder().setName('weekly').setDescription("lists events for the week")
]
    .map(command => command.toJSON());
const rest = new discord_js_1.REST({ version: '10' }).setToken(config_json_1.token);
function deployCommands() {
    rest.put(discord_js_1.Routes.applicationGuildCommands(config_json_1.clientId, config_json_1.guildId), { body: commands })
        .then((data) => console.log(`Successfully registered ${data.length} application commands`))
        .catch(console.error);
}
exports.deployCommands = deployCommands;
;
//# sourceMappingURL=deployCommands.js.map