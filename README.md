# text2UriBot

## How to use

1. [Download and install Cloud SDK](https://cloud.google.com/sdk/)
2. Open `app.yaml`, enter your Slack API TOKEN instead of the dummy text.
3. Enter bellow the command
  ```
  $ gcloud config set project {Enter your GCP Project ID}
  $ gcloud auth login
  $ gcloud app deploy
  ```

***

## Dependencies

- Node.JS 4.3.1 later
- [botkit](https://github.com/howdyai/botkit)

***

## Author

dorayakikun