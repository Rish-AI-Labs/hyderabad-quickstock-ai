import express from 'express';
import { s3Client, dynamoDBClient } from '../aws-config.js';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { QueryCommand } from '@aws-sdk/client-dynamodb';

const router = express.Router();

router.post('/upload', async (req, res) => {
    try {
        const data = req.body; // Array of sales data
        const bucketName = process.env.S3_RAW_DATA_BUCKET || 'quickstock-raw-data';

        // Convert to CSV or JSON to store in S3
        const fileContent = JSON.stringify(data);
        const fileName = `sales_data_${Date.now()}.json`;

        if (!process.env.AWS_ACCESS_KEY_ID) {
            console.log('Mocking AWS S3 Upload Upload - No Credentials');
            return res.status(200).json({ message: 'Success (Mocked)' });
        }

        const command = new PutObjectCommand({
            Bucket: bucketName,
            Key: fileName,
            Body: fileContent,
            ContentType: 'application/json'
        });

        await s3Client.send(command);
        res.status(200).json({ message: 'Data uploaded successfully to S3', fileName });
    } catch (error) {
        console.error('Error uploading sales data:', error);
        res.status(500).json({ error: 'Failed to upload sales data' });
    }
});

router.get('/', async (req, res) => {
    try {
        const { pincode, start_date, end_date } = req.query;

        const tableName = process.env.DYNAMODB_SALES_TABLE || 'SalesData';

        if (!process.env.AWS_ACCESS_KEY_ID) {
            console.log('Mocking AWS DynamoDB Read - No Credentials');
            return res.status(200).json([]);
        }

        // In a real scenario, you'd use a more complex query, likely on Timestream or a specialized index in DynamoDB
        const command = new QueryCommand({
            TableName: tableName,
            KeyConditionExpression: 'pincode = :pincode AND timestamp BETWEEN :start_date AND :end_date',
            ExpressionAttributeValues: {
                ':pincode': { S: pincode },
                ':start_date': { S: start_date },
                ':end_date': { S: end_date },
            },
        });

        const response = await dynamoDBClient.send(command);

        res.status(200).json(response.Items || []);
    } catch (error) {
        console.error('Error fetching sales data:', error);
        res.status(500).json({ error: 'Failed to fetch sales data' });
    }
});

export default router;
