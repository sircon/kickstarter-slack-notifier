# Kickstarter Slack Notifier

With this repo you can create a firebase cloud function that checks a Kickstarter campaign and posts to a Slack channel when there's a new backer.


## Getting Started

 - Create a Firebase Project using the [Firebase Developer Console](https://console.firebase.google.com)
 - Enable billing on your project by switching to the Blaze plan. This is required to be able to do requests to non-Google services.
 - Install [Firebase CLI Tools](https://github.com/firebase/firebase-tools) if you have not already and log in with `firebase login`.
 - Configure this sample to use your project using `firebase use --add` and select your project.
 - Install dependencies locally by running: `cd functions; npm install; cd -`
 - [Add your Slack Webhook URL](https://api.slack.com/messaging/webhooks) to firebase config:
     ```bash
     firebase functions:config:set slack.url=<YOUR SLACK WEBHOOK URL>
     ```
 - Add the Kickstarter page url to firebase config:
     ```bash
     firebase functions:config:set kickstarter.url=<YOUR KICKSTARTER URL>
     ```

 - Deploy your project using `firebase deploy`


## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## Authors

* **sircon** - [Miguel Correia](https://www.miguelncorreia.com)

## License

This project is licensed under the [MIT License](https://choosealicense.com/licenses/mit/)
