import * as core from "@actions/core";
import * as github from "@actions/github";
import axios from "axios";
import * as fs from "fs";
import * as path from "path";
import FormData from "form-data";

/**
 * `downloadImage` downloads an image from a given URL and saves it with a specified file name.
 * @param {string} imageUrl - The `imageUrl` parameter is a string that represents the URL of the image
 * you want to download. It should be a valid URL pointing to an image file.
 * @param {string} imageFileName - The `imageFileName` parameter is a string that represents the name
 * of the file to be saved. It should include the file extension (e.g., "image.jpg").
 */
async function downloadImage(imageUrl: string, imageFileName: string) {
  try {
    const { data: image } = await axios.get(imageUrl, {
      responseType: "arraybuffer",
    });
    fs.writeFileSync(path.join(__dirname, imageFileName), image);
  } catch (error: any) {
    core.setFailed(error.message);
  }
}

/**
 * `sendImage` sends an image file to a Telegram chat using the Telegram Bot API.
 * @param {string} imageFileName - The `imageFileName` parameter is a string that represents the name
 * of the image file that you want to send. It should include the file extension (e.g., "image.jpg",
 * "image.png", etc.).
 * @param {string} telegram_bot_token - The `telegram_bot_token` is a unique token provided by the
 * Telegram Bot API. It is used to authenticate and authorize your bot to access the Telegram API and
 * perform actions on behalf of the bot.
 * @param {string} telegram_chat_id - The `telegram_chat_id` parameter is the unique identifier for the
 * chat or channel where you want to send the image. It can be a user's chat ID or a channel's ID.
 */
async function sendImage(
  imageFileName: string,
  telegram_bot_token: string,
  telegram_chat_id: string
) {
  try {
    const filePath = path.join(__dirname, imageFileName);
    const readStream = fs.createReadStream(filePath);

    const form = new FormData();
    form.append("photo", readStream);

    const url = `https://api.telegram.org/bot${telegram_bot_token}/sendPhoto?chat_id=${telegram_chat_id}`;
    await axios.post(url, form);
  } catch (error: any) {
    core.setFailed(error.message);
  }
}

/**
 * The function sends a message to a Telegram chat using the Telegram Bot API.
 * @param {string} message - The message parameter is a string that represents the content of the
 * message you want to send. It can be any text or information you want to communicate.
 * @param {string} telegram_bot_token - The `telegram_bot_token` is a unique token that is provided by
 * the Telegram Bot API. It is used to authenticate and authorize the bot to access the Telegram API
 * and send messages on behalf of the bot.
 * @param {string} telegram_chat_id - The `telegram_chat_id` parameter is the unique identifier for the
 * Telegram chat or channel where you want to send the message. It can be a numeric ID for a chat or a
 * username for a channel.
 * @param telegram_topic_id - The `telegram_id` parameter is an optional attribute for cases that you want to send
 * messages to a telegram super channel with different topics, and it should be a number.
 */
async function sendMessage(
    message: string,
    telegram_bot_token: string,
    telegram_chat_id: string,
    telegram_topic_id: string
) {
  try {
    // Base URL for sending messages
    let url = `https://api.telegram.org/bot${telegram_bot_token}/sendMessage?chat_id=${telegram_chat_id}&text=${encodeURIComponent(
        message
    )}&message_thread_id=${telegram_topic_id}`;

    // Send the request
    await axios.get(url);
  } catch (error: any) {
    core.setFailed(error.message);
  }
}

/**
 * The main function is an asynchronous function that handles sending messages and images to a Telegram
 * chat using the Telegram Bot API.
 */
async function main() {
  const imageFileName = `image${Date.now()}.jpg`;

  try {
    // Get the JSON webhook payload for the event that triggered the workflow
    const payload = JSON.stringify(github.context.payload, undefined, 2);
    console.log(`The event payload: ${payload}`);

    // Get the inputs from the workflow file:
    const telegram_bot_token = core.getInput("telegram_bot_token", {
      required: true,
    });
    const telegram_chat_id = core.getInput("telegram_chat_id", {
      required: true,
    });
    const telegram_topic_id = core.getInput("telegram_topic_id", { required: true });
    const message = core.getInput("message", { required: false });
    const imageUrl = core.getInput("imageUrl", {
      required: false,
    });

    if (imageUrl) {
      console.log("Downloading image...");
      await downloadImage(imageUrl, imageFileName);
      await sendImage(imageFileName, telegram_bot_token, telegram_chat_id);
      console.log("Image sent successfully!");
    }
    if (message) {
      console.log("Sending message...");
      await sendMessage(message, telegram_bot_token, telegram_chat_id, telegram_topic_id);
      console.log("Message sent successfully!");
    }
  } catch (error: any) {
    core.setFailed(error.message);
  } finally {
    // Delete the image (if exist) file from the runner after sending it to Telegram (whether the action was successful or not)
    if (fs.existsSync(imageFileName)) {
      fs.unlinkSync(imageFileName);
    }
  }
}

main();
