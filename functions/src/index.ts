import axios from "axios";
import * as cheerio from "cheerio";
import * as functions from "firebase-functions";
import * as firebase from "firebase-admin";

const KICKSTARTER_URL = functions.config().kickstarter.url;
const SLACK_URL = functions.config().slack.url;

firebase.initializeApp();

export const updateStatus = functions.pubsub
  .schedule("every 5 minutes")
  .onRun(async () => {
    await checkStatus();
  });

async function checkStatus() {
  const snapshot = await firebase
    .database()
    .ref("/status")
    .once("value");

  const currentBackers = snapshot.val() || 0;

  const { data } = await axios.get(KICKSTARTER_URL);

  const $ = cheerio.load(data);
  const projectData = $("#content-wrap > .bg-grey-100").data("initial");

  const backersCount = projectData["project"]["backersCount"];
  const percentageFunded = projectData["project"]["percentFunded"];
  const pledged = projectData["project"]["pledged"]["amount"];

  if (currentBackers !== backersCount) {
    const message = `We have ${backersCount} backers and pledged $${pledged} (${percentageFunded}%)`;

    await firebase
      .database()
      .ref("/status")
      .set(backersCount);

    await sendSlackMessage(message);
  }
}

async function sendSlackMessage(message: string) {
  const data = {
    fallback: "Kickstarter sale",
    color: "good",
    fields: [{ value: message, short: false }]
  };

  await axios.post(SLACK_URL, data);
}
