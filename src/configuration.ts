import { config } from "dotenv";
config();

export interface AWSConfiguration {
  region: string;
  apiVersion: string;
  queueUrl: string;
}

const { AWS_REGION, API_VERSION, QUEUE_URL } = process.env;

export const awsConfigLoader = (): AWSConfiguration => {
  console.log(
    `region is ${AWS_REGION}, api version is ${API_VERSION}, queue url is ${QUEUE_URL}`
  );

  return {
    region: AWS_REGION ?? "ap-northeast-2",
    apiVersion: API_VERSION ?? "2012-11-05",
    queueUrl: QUEUE_URL ?? "",
  };
};
