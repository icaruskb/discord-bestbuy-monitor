# Discord BestBuy Stock Monitor

![322790](https://github.com/user-attachments/assets/daccfc1d-b471-4cca-81bc-cc649f11df86)

## Why?
I started collecting Pokemon TCG again and have been wanting a specific set, SV 151, but it's consistently out of stock due to high demand. In order to combat this problem I created a discord bot that scrapes BestBuy's website in order to check for whether the product is in stock. This eventually grew to become something larger and I can now consistently track any product from BestBuy with intentions of adding other sites.
![Screenshot 2024-09-29 234259](https://github.com/user-attachments/assets/069df5ae-31ef-426b-a74a-7f928998de4c)

## Features

- Monitors multiple Best Buy product SKUs.
- Sends notifications to a Discord channel when products are in stock.
- Commands to add or remove SKUs from monitoring.
- TO ADD: auto ATC button embeded within the discord webhook
- TO ADD: Other websites such as Amazon, Walmart, Target, etc.
- TO ADD: Improvements to speeds
- TO ADD: Hosting on cloud

## Technologies Used
<a href="#"><img src="https://raw.githubusercontent.com/onemarc/tech-icons/292cfceecce6a863e9a10216c1c730d3a1a02ff5/icons/discord-dark.svg" width="50"></a>
<a href="#"><img src="https://raw.githubusercontent.com/onemarc/tech-icons/292cfceecce6a863e9a10216c1c730d3a1a02ff5/icons/javascript.svg" width="50"></a>
<a href="#"><img src="https://raw.githubusercontent.com/onemarc/tech-icons/292cfceecce6a863e9a10216c1c730d3a1a02ff5/icons/axios-light.svg" width="50"></a>
<a href="#"><img src="https://raw.githubusercontent.com/onemarc/tech-icons/292cfceecce6a863e9a10216c1c730d3a1a02ff5/icons/nodejs-light.svg" width="50"></a>
<a href="#"><img src="https://cheerio.js.org/img/orange-c.svg" width="50"></a>

## Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed. You will also need a Discord bot token and a Discord channel ID.

### Installation

1. Clone the repository:
   git clone https://github.com/yourusername/Discord-Bestbuy-Stock-Monitor.git
   cd Discord-Bestbuy-Stock-Monitor
2. Run 'npm install'
3. Create a new '.env' file within the folder in order to add bot credentials
   - DISCORD_TOKEN=your_discord_bot_token
   - DISCORD_CHANNEL_ID=your_discord_channel_id
4. Add the bot to your discord server through Discord's development tools
5. Run bot by typing 'node script.js' into terminal while within the folder directory.

## Commands

- !addsku <sku> - Add a new SKU into the monitor
- !removesku <sku> - Remove a SKU from the monitor
- !listskus - list all SKUS being monitored
- !dinohelp - gives a list of each command, draws a dinosaur at the end :D
