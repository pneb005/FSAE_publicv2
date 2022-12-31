import { token, guildId, clientId } from './config.json';
import { REST, SlashCommandBuilder, Routes } from 'discord.js';

const commands = [
    new SlashCommandBuilder().setName('weekly').setDescription("lists events for the week")
]

    .map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(token);

export function deployCommands(){
    rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands})
    .then((data:any) => console.log(`Successfully registered ${data.length} application commands`))
    .catch(console.error)
};

