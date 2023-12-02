const TelegramBot = require("node-telegram-bot-api");
const axios = require("axios");

// replace the value below with the Telegram token you receive from @BotFather
const token = "6798070418:AAH87RqEN2MRCestO_dlMRMLAw3XK9YhWvU";
const coinAPIToken = "3005560D-ECF5-45D0-96EC-163FBDA3D7CD";

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
});

// Command 2 - /data
bot.onText(/\/data/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"

  let asset_id_base = "BTC";
  let asset_id_quote = "USD";

  const message = msg.text;

  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `https://rest.coinapi.io/v1/exchangerate/${asset_id_base}/${asset_id_quote}`,
    headers: {
      Accept: "text/json",
      "X-CoinAPI-Key": coinAPIToken,
    },
  };

  axios(config)
    .then((response) => {
      const result = response.data;

      console.log("result");
      console.log(result);
      console.log("result.rate");
      console.log(result.rate);

      bot.sendMessage(chatId, `BTC: ${result.rate}`);
    })
    .catch((error) => {
      console.log(error);
    });
});

// Listen for any kind of message. There are different kinds of
// messages.
bot.on("message", (msg) => {
  const chatId = msg.chat.id;

  // send a message to the chat acknowledging receipt of their message
  bot.sendMessage(chatId, "Affirmative");
});

console.log("Bot service running");
