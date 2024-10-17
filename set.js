const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidUxEdlFiamI0SUtKMUhUbFhXcVhzQURGNFRqcTd6dTJ3S3NzWUg0UDhYST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZ0xSN2h1d1hKT0NvbXhXM3cxaG5VUERxdytWdkQ5YUpPald6OTVxQjNnaz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJBSFB0TVI2T21kc24wNGRob3lMRElhT3I5VVFOVDV0RzFTc20wSWY0b0dRPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJiMmRjL0JVT0I4REJ4QmllbkExbXBtY3J2bEN0NXprZHB4dHIyVkgrUVRRPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IklNaFdUVUx2bGxzUklneUw5RnFoSVNyMzZyTWd0ckhrbEtNM0tJM0JHMUU9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkdOd0dJYy9pTnhETlh3citzcHVSSUNLRmlFdXkwQjg3TUlWLzZONkk0RjA9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU0d5MERvZWNGL25aVHVkQUY5VFY0YTBFOHpWeERyWWlYRGs4T1BuTnNFbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib0kvM3FqTzlTSjJ0S0xaaG1BdVFTZVowRGdNSDV4aVVBWkVvanlEZTkwZz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImxsZ3drZW5oMHU2RU9IcTRtd0RtUHBYYUFqclJPRFFzR0kybnhZVkNnVEhnaytyMEY3dk5qVGFlM25DVUg2bTYrNXFIOFdiN2oxTlZHa0lHdkpyRGdBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTIzLCJhZHZTZWNyZXRLZXkiOiJ6Y0NHYXh3SmtqVDVaOWdybG1RY3EwdlNpa0lsZWwycHZ4ejRoeFVVbDlNPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJDVDZQWFQxRFFHV1VwcHNxOFdIcEZRIiwicGhvbmVJZCI6ImU4OTNmYmU4LTE2MWYtNDcwOC05MDkzLTI5MTM0NTk1NThjNiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJIUzVSWXNJSkRwNSt5TEozRTIzOTRMWW53eEE9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRFI2OEhpTUJPWmZ3YlZIcHVBZnFiaXlwYzBjPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlFBM0RXMk1RIiwibWUiOnsiaWQiOiI5NDc3MzgyNDI2Njo2M0BzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiIuXG5cblxu8J2RrFxuXG5cblxuXG7wnZG5XG5cblxuXG5cbvCdkblcblxuXG5cblxu8J2RtlxuXG5cblxuXG7wnZG5XG5cblxuXG7wnZ+w8J2frPCdn7BcblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxu8JKNmSJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDSzdodzU4RkVLV1B4YmdHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiNEJMdDdpQUNFME5ISHdWT1VkQWV4TnZGY3g4RGZ2Zm9ITUNSZU9SMTRYYz0iLCJhY2NvdW50U2lnbmF0dXJlIjoiR0UxUm5lWWsxakRzLzhTa3JpdzhENFRvaFhzNThOTjdURGRRM1k4N3JYdXJwZFBqdVg1cTY1cmFkbnhGVTB1OFd4NHV6K3hCS21BOTZYY2YwWlEyQ2c9PSIsImRldmljZVNpZ25hdHVyZSI6ImE5eWVzbWtPZFQzL3Z1VUZKVENHQy9RNnZqSzFJNG93VnVvc1dTVlAvUXQ2NWRKbHVrYTlscXRjYmEyMlR5NnBlQ013eGNuUkRXOWE4Z1RGTU5UUmpBPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiOTQ3NzM4MjQyNjY6NjNAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCZUFTN2U0Z0FoTkRSeDhGVGxIUUhzVGJ4WE1mQTM3MzZCekFrWGprZGVGMyJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyOTE4NTcxMywibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFBdnoifQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "sOvIdU",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "sOvIdU",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'sOvIdU_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'yes',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
