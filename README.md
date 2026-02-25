# Hyderabad QuickStock AI 🚀

A data-driven, hyper-local quick commerce distribution platform powered by advanced AWS AI and Serverless architectures.

## 🔗 Live Demo
**[Launch QuickStock AI Demo](https://h2i-inky.vercel.app)**

## 🌟 Key Features
- **AI-Powered Intelligence**: Real-time stock analysis and agentic orchestration powered by **Amazon Bedrock** and **Amazon Bedrock Agents**.
- **Probabilistic Forecasting**: Time-series demand planning using **Amazon SageMaker Canvas**, providing P10, P50, and P90 confidence intervals.
- **Hyper-Local Dashboard**: Specialized monitoring for Hyderabad distribution nodes (e.g., Gachibowli, Madhapur, Uppal).
- **Embedded Visualization**: Interactive dashboards and trend analysis integrated via **Amazon QuickSight**.
- **Serverless Architecture**: Built for massive scale and low latency using a serverless-first approach.

## 🛠️ AWS-Powered Tech Stack
- **AI/ML**: Amazon Bedrock (Claude 3.5 Sonnet), Amazon SageMaker Canvas (Forecasting).
- **Backend**: AWS Lambda, Amazon API Gateway, AWS Step Functions.
- **Database**: Amazon DynamoDB (Real-time), Amazon Timestream (Time-series), Amazon S3 (Data Lake).
- **Frontend**: React 18 hosted on Amazon S3 + CloudFront CDN.
- **DevOps**: AWS Amplify for CI/CD and hosting.

## 🚀 Quick Start (Local Simulation)

1. **Clone the repo**
   ```bash
   git clone https://github.com/Rish-AI-Labs/hyderabad-quickstock-ai.git
   cd hyderabad-quickstock-ai
   ```

2. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. **Backend Setup**
   ```bash
   # Root directory
   cd frontend/server
   npm install
   # Requires AWS_ACCESS_KEY_ID + AWS_SECRET_ACCESS_KEY
   node index.js
   ```

## 📖 Technical Architecture
The platform follows a zero-trust, multi-layered security model. Detailed architectural diagrams (AWS Amplify Architecture) and data flow specifications are available in the **Developer Docs** within the application.

---