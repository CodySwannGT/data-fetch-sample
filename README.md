
# Design: Trading Card Pricing Tracking System

## Data Collection and Storage

- Users, Holdings, and Products: These entities can be stored in DynamoDB.
- Market Transactions: Store market transaction data in DynamoDB as well.

## Market Data Aggregation

- Collect data from various market sources using APIs or web scraping.
- Process and clean the collected data before storing it in DynamoDB.
- Utilize AWS Lambda functions or EC2 instances for data processing.

## Price Deviation Calculation

- Implement a background job or scheduled Lambda function to calculate the average market price for each product.
- Store average market price alongside product details in DynamoDB.
- Calculate user-defined threshold (e.g., +/- 10%) based on the average market price.

## Listing Monitoring and Notification

- Use DynamoDB Streams to capture changes in the listings table.
- Set up an AWS Lambda function to analyze changes and compare listed prices with average market price and threshold.
- Publish notification message to an SNS topic when a listing price exceeds the threshold.

## Notification Service

- Create an SNS topic and subscribe users to it.
- Configure SNS to send notifications via multiple communication channels.
- Integrate Amazon SES with SNS to send emails for notifications.

## Diagram

```
          +------------------------+
          |        Users           |
          +------------------------+
                    |        +
                    |        | Manages
                    |        |
          +------------------------+
          |       Holdings         |
          +------------------------+
                    |        +
                    |        | Consists of
                    |        |
          +------------------------+
          |       Products         |
          +------------------------+
                    |        +
                    |        | Contains
                    |        |
          +------------------------+
          |   Market Transactions   |
          +------------------------+
                    |
                    |  Collects from
                    |
          +------------------------+
          |  Market Data Aggregator|
          +------------------------+
                    |
                    |  Calculates and updates
                    |
          +------------------------+
          | Price Deviation Service|
          +------------------------+
                    |
                    |  Monitors and publishes
                    |
          +------------------------+
          |     DynamoDB Streams    |
          +------------------------+
                    |
                    |  Analyzes changes and publishes
                    |
          +------------------------+
          |     Lambda Function     |
          +------------------------+
                    |
                    | Subscribes and sends
                    |
          +------------------------+
          |      SNS (Topic)        |
          +------------------------+
                    |        +
                    |        | Sends
                    |        |
          +------------------------+
          |        SES             |
          +------------------------+
```

Advantages of using DynamoDB, SNS, and SES:
- DynamoDB provides scalability, low latency, and automatic scaling.
- SNS offers a flexible and scalable notification service.
- SES ensures reliable email delivery.
