import express from 'express';
import { sagemakerClient, dynamoDBClient } from '../aws-config.js';
import { InvokeEndpointCommand } from '@aws-sdk/client-sagemaker-runtime';
import { GetItemCommand } from '@aws-sdk/client-dynamodb';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { product_id, pincode, days } = req.body;
        const endpointName = process.env.SAGEMAKER_FORECAST_ENDPOINT || 'quickstock-forecast-endpoint';

        if (!process.env.AWS_ACCESS_KEY_ID) {
            console.log('Mocking AWS SageMaker Forecast - No Credentials');

            // Generate dynamic time-series data
            const timeSeries = [];
            let baseDemand = 120;
            for (let i = 0; i < days; i++) {
                let date = new Date();
                date.setDate(date.getDate() + i);
                let trend = Math.floor(Math.random() * 20);
                timeSeries.push({
                    date: date.toISOString().split('T')[0],
                    p10: baseDemand + trend - 15,
                    p50: baseDemand + trend,
                    p90: baseDemand + trend + 25
                });
                baseDemand += 5; // Slight upward trend
            }

            return res.status(200).json({
                forecast_id: `fc_${Date.now()}`,
                product_id,
                pincode,
                prediction_horizon_days: days,
                forecast_date: new Date().toISOString(),
                predicted_demand: {
                    p10: timeSeries[0].p10,
                    p50: timeSeries[0].p50,
                    p90: timeSeries[0].p90
                },
                time_series: timeSeries,
                confidence_score: 0.88,
                influencing_factors: ['weather_rain_probability', 'weekend_surge', 'local_festival'],
                actionable_insights: [
                    "High probability of rain in 48h. Stock extra waterproof packaging.",
                    "Local festival detected on Day 3. Increase perishable inventory by 15%.",
                    "Competitor out-of-stock trend observed nearby."
                ],
                created_at: new Date().toISOString()
            });
        }

        const payload = JSON.stringify({ product_id, pincode, days });

        const command = new InvokeEndpointCommand({
            EndpointName: endpointName,
            Body: payload,
            ContentType: 'application/json'
        });

        const response = await sagemakerClient.send(command);
        const result = JSON.parse(new TextDecoder().decode(response.Body));

        res.status(200).json(result);
    } catch (error) {
        console.error('Error generating forecast:', error);
        res.status(500).json({ error: 'Failed to generate forecast' });
    }
});

router.get('/:productId/:pincode', async (req, res) => {
    try {
        const { productId, pincode } = req.params;
        const tableName = process.env.DYNAMODB_FORECAST_TABLE || 'ForecastResults';

        if (!process.env.AWS_ACCESS_KEY_ID) {
            console.log('Mocking AWS DynamoDB Forecast Read - No Credentials');
            return res.status(200).json({
                forecast_id: `fc_mock`,
                product_id: productId,
                pincode: pincode,
                forecast_date: new Date().toISOString(),
                predicted_demand: { p10: 110, p50: 140, p90: 180 },
                confidence_score: 0.9,
                influencing_factors: ['festival'],
                created_at: new Date().toISOString()
            });
        }

        const command = new GetItemCommand({
            TableName: tableName,
            Key: {
                'product_id': { S: productId },
                'pincode': { S: pincode }
            }
        });

        const response = await dynamoDBClient.send(command);

        if (response.Item) {
            res.status(200).json(response.Item);
        } else {
            res.status(404).json({ error: 'Forecast not found' });
        }
    } catch (error) {
        console.error('Error retrieving forecast:', error);
        res.status(500).json({ error: 'Failed to retrieve forecast' });
    }
});

export default router;
