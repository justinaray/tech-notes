# AWS CLI

## Config
Configure your defaults in ~/.aws/config

```
[default]
region = us-east-1
output = json
```

## Credentials
Configure your defaults in ~/.aws/credentials.

[Note:] You can also automatically generate this file with `aws configure`

```
[default]
region = us-east-1
aws_access_key_id = AXXXXXXXXXXXXXXX
aws_secret_access_key = rAndomStringOfCharactersAndNumb3rs

[profile-name]
region = us-east-1
aws_access_key_id = AXXXXXXXXXXXXXXX
aws_secret_access_key = rAndomStringOfCharactersAndNumb3rs
```

## CLI Examples

```
aws ec2 describe-instances [--profile profile-name] // Describe your instances
aws s3 ls [--profile profile-name] // list s3 buckets
aws s3 mb s3://<globallyUniqueBucketName> // create an s3 bucket

aws s3 cp <localFile> s3://<bucketName>/path/to/object // Copy local file to S3.
// Don't forget: this will set/reset permissions to private

aws dynamodb list-tables [--profile profile-name] // List DynamoDb tables

aws dynamodb scan --table-name <tableName> [--profile profile-name] // Read an entire Dynamo Table ... eventually consistent
aws dynamodb delete-table --table-name <tableName> [--profile profile-name] // Delete a Dynamo Table
```

## SSH
`ssh ec2-user@<ip> -i <path/to/private/key>`
