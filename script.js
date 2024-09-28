const axios = require("axios");
const cheerio = require("cheerio");
require("dotenv").config();
const { Client, GatewayIntentBits, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');

// Create a new Discord client
const client = new Client({ 
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] 
});

let SKUS = [6588397]; // Initial SKUs to monitor
const DISCORD_CHANNEL_ID = process.env.DISCORD_CHANNEL_ID; // Ensure you have a Discord channel ID in .env

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

// Log in your bot
client.login(process.env.DISCORD_TOKEN);

// Function to scrape the product page for a specific SKU
const scrapeProduct = async (sku) => {
    const URL = `https://www.bestbuy.com/site/pokemon-trading-card-game-scarlet-violet-stellar-crown-6pk-booster-bundle/${sku}.p?skuId=${sku}`;
    try {
        const response = await axios.get(URL, {
            headers: {
                "User-Agent":
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
            },
        });

        // Load the HTML into Cheerio
        const $ = cheerio.load(response.data);

        // Extract product details (e.g., price, availability, etc.)
        const productName = $(".sku-title h1").text().trim();
        const price = $("div.priceView-hero-price span").first().text();
        let availability = $("button.add-to-cart-button").text().trim();
        
        if (availability == "Add to Cart") {
            availability = "in-stock ✅"
        } else {
            availability = "out of stock ❌"
        }

        const imageURL = $('img.primary-image').attr('src');
        console.log(`Product: ${productName}, Price: ${price}, Availability: ${availability}, SKU: ${sku}`);

        // Create an embed message to send to Discord
        const embed = new EmbedBuilder()
            .setTitle(productName || "Unknown Product")
            .setURL(URL)
            .setImage(imageURL)
            .addFields(
                { name: "Price", value: price || "N/A", inline: true },
                { name: "Availability", value: availability || "N/A", inline: true },
                { name: "SKU", value: sku.toString() || "N/A", inline: true}
            )
            .setColor(availability.includes("in-stock ✅") ? "#0000FF" : "#FF0000")
            .setFooter({ text: `Checked at ${new Date().toLocaleTimeString()}` });

        // Send the embed and button to the Discord channel
        const channel = client.channels.cache.get(DISCORD_CHANNEL_ID);
        if (channel) {
            channel.send({ embeds: [embed] });
        }
    } catch (error) {
        console.error(`Error scraping the product page for SKU ${sku}:`, error);
    }
};

// Function to check product status periodically
const checkProductsPeriodically = () => {
    for (const sku of SKUS) {
        scrapeProduct(sku); // Scrape each SKU
    }
    setInterval(checkProductsPeriodically, 45000); // Check every 45 seconds
};

// handle new skus being added / removed
client.on('messageCreate', (message) => {
    if (message.author.bot) return; // ignore bots
    if (!message.content.startsWith('!')) return; // commands

    const args = message.content.slice(1).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'addsku') {
        const skuToAdd = args[0];
        if (skuToAdd) {
            SKUS.push(skuToAdd);
            message.channel.send(`SKU ${skuToAdd} added for monitoring.`);
        } else {
            message.channel.send('Please provide a SKU to add.');
        }
    } else if (command === 'removesku') {
        const skuToRemove = args[0];
        const index = SKUS.indexOf(skuToRemove);
        if (index !== -1) {
            SKUS.splice(index, 1);
            message.channel.send(`SKU ${skuToRemove} removed from monitoring.`);
        } else {
            message.channel.send(`SKU ${skuToRemove} not found.`);
        }
    } else if (command === 'listskus') {
        message.channel.send(`Currently monitoring SKUs: ${SKUS.join(', ')}`);
    } else if (command === 'forceload') {
        message.channel.send('force loading');
        for (const sku of SKUS) {
            scrapeProduct(sku);
        }
    }
});

//log into bot
client.once("ready", () => {
    console.log(`Logged in as ${client.user.tag}`);
    checkProductsPeriodically(); // Start the periodic scraping
});
