import { AWSConfiguration } from "./configuration";
import AWS from "aws-sdk";

const MAX_NUMBER_OF_MESSAGES = 100;
const WAIT_TIME_SECONDS = 0;
const VISIBILITY_TIMEOUT = 20;

export class MessageReceiver {
  private sqs;
  private url;
  constructor(config: AWSConfiguration) {
    AWS.config.update({ region: config.region });
    this.url = config.queueUrl;
    this.sqs = new AWS.SQS({ apiVersion: config.apiVersion });
  }

  async messageReceive() {
    const param = {
      AttributeNames: ["SentTimestamp"],
      MaxNumberOfMessages: MAX_NUMBER_OF_MESSAGES,
      MessageAttributeNames: ["All"],
      QueueUrl: this.url,
      VisibilityTimeout: VISIBILITY_TIMEOUT,
      WaitTimeSeconds: WAIT_TIME_SECONDS,
    };
  }
}
