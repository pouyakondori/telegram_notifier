# Telegram Notifier for SuperGroups

A GitHub Action that enables you to send messages and images to Telegram chats, channels, or specific topics in supergroups using the Telegram Bot API.

## Table of Contents

- [Features](#features)
- [Inputs](#inputs)
- [Usage](#usage)
    - [Example Workflow: Send a Message](#example-workflow-send-a-message)
    - [Example Workflow: Send an Image](#example-workflow-send-an-image)
- [How It Works](#how-it-works)
- [Contributing](#contributing)

---

## Features

- Send text messages to a Telegram chat or channel.
- Attach images by providing their URL.
- Target specific topics in Telegram supergroups using `telegram_topic_id` (optional).

---

## Inputs

| Input               | Required | Description                                                                 |
|---------------------|----------|-----------------------------------------------------------------------------|
| `telegram_bot_token` | Yes      | The unique token provided by the Telegram Bot API for authorization.       |
| `telegram_chat_id`   | Yes      | The unique identifier for the Telegram chat or channel.                    |
| `telegram_topic_id`  | No       | The unique identifier for the specific topic in supergroups or channels.   |
| `message`            | No       | The content of the message to send.                                        |
| `imageUrl`           | No       | The URL of the image to download and send.                                 |

---

## Usage

### Example Workflow: Send a Message

```yaml
name: Telegram Notifier - Send Message

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
          telegram_topic_id: ${{ secrets.TELEGRAM_TOPIC_ID }} # Optional
          message: 'Hello from GitHub Actions!'
```

### Example Workflow: Send an Image

```yaml
name: Telegram Notifier - Send Image

on:
  push:
    branches:
      - main

jobs:
  send_image:
    runs-on: ubuntu-latest
    steps:
      - name: Send Image to Telegram
        uses: TheTechNexus/telegram_notifier@v1
        with:
          telegram_bot_token: ${{ secrets.TELEGRAM_BOT_TOKEN }}
          telegram_chat_id: ${{ secrets.TELEGRAM_CHAT_ID }}
          telegram_topic_id: ${{ secrets.TELEGRAM_TOPIC_ID }} # Optional
          imageUrl: 'https://example.com/image.jpg'
```
## How It Works

1. The action uses the provided Telegram Bot API token for authentication.
2. If sending an image:
    - The action downloads the image from the given URL.
    - The image is sent to the specified Telegram chat or channel.
3. For supergroups, you can optionally specify a `telegram_topic_id` to target a specific topic.

---

## Contributing

We welcome contributions to improve this GitHub Action! To contribute:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Submit a pull request with a clear description of your changes.

---

## Notes

Replace the placeholders (`TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`, and `TELEGRAM_TOPIC_ID`) with your actual secrets in your workflow configuration.