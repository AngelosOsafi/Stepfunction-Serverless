const AWS = require('aws-sdk');
const sqs = new AWS.SQS();

exports.readFromSQS = async () => {
  const queueUrl = process.env.SQS_QUEUE_URL;

  const params = {
    QueueUrl: queueUrl,
    MaxNumberOfMessages: 10, // Max number of messages to retrieve (adjust as needed)
    VisibilityTimeout: 10, // How long to hide the message from other consumers (adjust as needed)
  };

  try {
    const data = await sqs.receiveMessage(params).promise();
    if (data.Messages) {
      data.Messages.forEach(message => {
        console.log('Received message:', message.Body);
        // Add logic here for further processing or delete the message from the queue
      });
      return 'Messages received successfully';
    } else {
      console.log('No messages available');
      return 'No messages available';
    }
  } catch (error) {
    console.error('Failed to receive messages:', error);
    throw error;
  }
};
