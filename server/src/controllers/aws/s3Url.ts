// import aws from '@aws-sdk/signature-v4';
import aws from 'aws-sdk';
import { randomBytes } from 'crypto';

const region = 'ap-northeast-2';
const bucketName = 'image-upload-storage-test';
const accessKeyId = process.env.REACT_APP_AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.REACT_APP_AWS_SECRET_ACCESS_KEY;

const s3 = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: 'v4',
});

export async function generateUploadURL() {
  const rawBytes = randomBytes(16);
  const imageName = rawBytes.toString('hex');

  const params = {
    Bucket: bucketName,
    Key: imageName,
    Expires: 60, //60초후 사용되지 않으면 url을 새로받아야한다 ?
  };

  const uploadURL = await s3.getSignedUrlPromise('putObject', params);
  return uploadURL;
}
