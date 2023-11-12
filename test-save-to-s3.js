import AWS from 'aws-sdk';
const s3 = new AWS.S3();

const handler = async () => {
  try {
    // Extract data from the API Gateway request
    const requestBody = JSON.parse({ a: 1, b: 'bbb', c: 'sample' });
    const channelId = Math.random().toString().substring(2);
    const messageId = Math.random().toString().substring(2);
    const timestamp = new Date().getTime();
    const s3Key = `/test/channels/${channelId}/message/${messageId}/${timestamp}/1/1.json`;

    // Create parameters for the S3 PutObject operation
    const s3Params = {
      Bucket: 'ej-data-lake',
      Key: s3Key,
      Body: JSON.stringify(requestBody),
    };

    // Upload the JSON data to the S3 bucket
    await s3.putObject(s3Params).promise();

    const response = {
      statusCode: 200,
      body: JSON.stringify({ message: `saved successfully: ${s3Key}` }),
    };
    return response;
  } catch (error) {
    console.error('Error:', error);
    const response = {
      statusCode: 500,
      body: JSON.stringify({ message: `Error saving data to S3 (${s3Key})` }),
    };
    return response;
  }
};

(async () => {
  await handler();
})();
