const { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder } = require('discord.js');

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers]
});

const commands = [
  new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Tes apakah bot aktif')
].map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  await rest.put(
    Routes.applicationCommands(process.env.CLIENT_ID),
    { body: commands }
  );

  console.log('Slash command berhasil didaftarkan!');
})();

client.once('ready', () => {
  console.log(`Bot aktif sebagai ${client.user.tag}`);
});

client.login(process.env.DISCORD_TOKEN);
