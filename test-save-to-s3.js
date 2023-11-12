const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');

async function uploadFileToS3() {
  const bucketName = 'ej-data-lake'; // Replace 'your-s3-bucket-name' with your S3 bucket name
  const channelId = Math.random().toString().substring(2);
  const messageId = Math.random().toString().substring(2);
  const timestamp = new Date().getTime();
  const s3Key = `/test/channels/${channelId}/message/${messageId}/${timestamp}/1/1.json`;
  const requestBody = { a: 1, b: 'bbb', usedS3Key: s3Key };

  // Create an S3 client
  const s3Client = new S3Client({ region: 'your-region' }); // Replace 'your-region' with your AWS region

  // Create the parameters for the S3 upload
  const uploadParams = {
    Bucket: bucketName,
    Key: s3Key,
    Body: requestBody,
  };

  try {
    // Upload the file to S3
    const command = new PutObjectCommand(uploadParams);
    const response = await s3Client.send(command);

    console.log(`File uploaded successfully. ETag: ${response.ETag}`);
    console.log(s3Key);
  } catch (err) {
    console.error('Error uploading file to S3:', err);
    console.log(s3Key);
  }
}

uploadFileToS3();
