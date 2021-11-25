import { AWSConfiguration } from "./configuration";
import AWS from "aws-sdk";

export interface Message {
  message: string;
  messageGroupId: string;
  messageDeduplicationId: string;
}

export class MessageSender {
  private sqs;
  private url;
  constructor(config: AWSConfiguration) {
    AWS.config.update({ region: config.region });
    this.url = config.queueUrl;
    this.sqs = new AWS.SQS({ apiVersion: config.apiVersion });
  }

  async sendMessage({
    message,
    messageGroupId,
    messageDeduplicationId,
  }: Message): Promise<AWS.SQS.SendMessageResult> {
    try {
      return await this.sqs
        .sendMessage({
          MessageBody: message,
          MessageGroupId: messageGroupId,
          MessageDeduplicationId: messageDeduplicationId,
          QueueUrl: this.url,
        })
        .promise();
    } catch (error: any) {
      throw new Error(error?.message);
    }
  }
}
