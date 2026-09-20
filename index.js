const {
  Client,
  GatewayIntentBits,
  REST,
  Routes,
  SlashCommandBuilder
} = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers
  ]
});

const token = process.env.DISCORD_TOKEN;
const clientId = process.env.CLIENT_ID;

if (!token || !clientId) {
  console.error("DISCORD_TOKEN atau CLIENT_ID belum diatur.");
  process.exit(1);
}

const commands = [
  new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Mengecek apakah bot aktif.")
].map(command => command.toJSON());

const rest = new REST({ version: "10" }).setToken(token);

async function registerCommands() {
  try {
    console.log("Mendaftarkan slash command...");

    await rest.put(
      Routes.applicationCommands(clientId),
      { body: commands }
    );

    console.log("Slash command berhasil didaftarkan.");
  } catch (error) {
    console.error("Gagal mendaftarkan command:", error);
  }
}

client.once("ready", () => {
  console.log(`Bot aktif sebagai ${client.user.tag}`);
});

client.on("interactionCreate", async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "ping") {
    await interaction.reply("Pong! AURI Website Bot aktif.");
  }
});

async function start() {
  await registerCommands();
  await client.login(token);
}

start();
