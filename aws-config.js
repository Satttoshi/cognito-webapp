import AWS from 'aws-sdk';

AWS.config.region = 'eu-central-1';
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: process.env.NEXT_PUBLIC_IDENTITY_POOL_ID,
});

export default AWS;
