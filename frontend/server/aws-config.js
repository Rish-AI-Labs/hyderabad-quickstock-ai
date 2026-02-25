import { S3Client } from '@aws-sdk/client-s3';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { SageMakerRuntimeClient } from '@aws-sdk/client-sagemaker-runtime';
import { BedrockRuntimeClient } from '@aws-sdk/client-bedrock-runtime';
import dotenv from 'dotenv';

dotenv.config();

const region = process.env.AWS_REGION || 'ap-south-1'; // Defaulting to Mumbai

const credentials = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
};

export const s3Client = new S3Client({ region, credentials });
export const dynamoDBClient = new DynamoDBClient({ region, credentials });
export const sagemakerClient = new SageMakerRuntimeClient({ region, credentials });
export const bedrockClient = new BedrockRuntimeClient({ region, credentials });
