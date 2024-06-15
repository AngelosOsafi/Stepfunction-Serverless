const AWS = require('aws-sdk');
const sqs = new AWS.SQS();

exports.sendToSQS = async () => {
  const queueUrl = process.env.SQS_QUEUE_URL;

  const messages = ["Message 1", "Message 2", "Message 3"]; // Πίνακας με strings

  const sendMessages = messages.map(async (message) => {
    const params = {
      MessageBody: message,
      QueueUrl: queueUrl,
    };
    return sqs.sendMessage(params).promise();
  });

  try {
    await Promise.all(sendMessages);
    console.log('Messages sent successfully');
    return 'Messages sent successfully';
  } catch (error) {
    console.error('Failed to send messages:', error);
    throw error;
  }
};
