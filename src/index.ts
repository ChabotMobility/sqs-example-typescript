import { MessageSender } from "./MessageSender";
import { awsConfigLoader } from "./configuration";
import { MessageReceiver } from "./MessageReceiver";
import AWS from "aws-sdk";

const main = async () => {
  const config = awsConfigLoader();
  authenticationAWS();
  const messageSender = new MessageSender(config);
  const messageReceiver = new MessageReceiver(config);

  const sendResult = await messageSender.sendMessage({
    message: "첫번째 메세지",
    messageDeduplicationId: "messageDeduplicationId",
    messageGroupId: "messageGroupId",
  });

  console.log(sendResult);
};

main();

const authenticationAWS = () =>
  AWS.config.getCredentials(function (err) {
    if (err) {
      console.error(`credentials not loaded`);
      console.error(err.message);
    } else {
      console.log("Access key:", AWS.config?.credentials?.accessKeyId);
    }
  });
