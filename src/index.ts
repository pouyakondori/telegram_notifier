import * as core from "@actions/core";
import * as github from "@actions/github";
import axios from "axios";

async function run() {
  try {
    // Get the JSON webhook payload for the event that triggered the workflow
    const payload = JSON.stringify(github.context.payload, undefined, 2);
    console.log(`The event payload: ${payload}`);

    // Get the inputs from the workflow file:
    const telegram_bot_token = core.getInput("telegram_bot_token");
    const telegram_chat_id = core.getInput("telegram_chat_id");
    const message = core.getInput("message");

    // Send message to telegram
    const url = `https://api.telegram.org/bot${telegram_bot_token}/sendMessage?chat_id=${telegram_chat_id}&text=${message}`;
    const { data } = await axios.get(url);
    console.log(data);
  } catch (error: any) {
    core.setFailed(error.message);
  }
}

run();
