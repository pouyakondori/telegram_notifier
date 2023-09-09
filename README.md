# Telegram Notifier

This GitHub Action allows you to send messages and images to a Telegram chat using the Telegram Bot API.

## Usage

### Inputs

- `telegram_bot_token` (required): The unique token provided by the Telegram Bot API for authorization.
- `telegram_chat_id` (required): The unique identifier for the Telegram chat or channel where you want to send the message or image.
- `message` (optional): The content of the message you want to send.
- `imageUrl` (optional): The URL of the image you want to download and send.

### Example Workflow

```yaml
name: Telegram Notifier

on:
  push:
    branches:
      - main

jobs:
  send_message:
    runs-on: ubuntu-latest
    steps:
      - name: Send Message to Telegram
        uses: TheTechNexus/telegram_notifier@v1
        with:
          telegram_bot_token: ${{ secrets.TELEGRAM_BOT_TOKEN }}
          telegram_chat_id: ${{ secrets.TELEGRAM_CHAT_ID }}
          message: 'Hello from GitHub Actions!'

  send_image:
    runs-on: ubuntu-latest
    steps:
      - name: Send Image to Telegram
        uses: TheTechNexus/telegram_notifier@v1
        with:
          telegram_bot_token: ${{ secrets.TELEGRAM_BOT_TOKEN }}
          telegram_chat_id: ${{ secrets.TELEGRAM_CHAT_ID }}
          imageUrl: 'https://example.com/image.jpg'
```

## How It Works
- The action downloads an image from a given URL and saves it with a specified file name.
- It then sends the image to a Telegram chat using the Telegram Bot API.

## Contributing
If you'd like to contribute to this project, please create a pull request.


### You can replace the placeholders like `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` with your actual secrets. This `README.md` provides clear instructions on how to use your GitHub Action. If you have any specific details or additional information you'd like to include, please let me know!
