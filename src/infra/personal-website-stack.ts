import * as cdk from 'aws-cdk-lib'
import { aws_s3 } from 'aws-cdk-lib'
import { ObjectOwnership } from 'aws-cdk-lib/aws-s3'

export class PersonalWebsiteStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    new aws_s3.Bucket(this, 'personal-website-root-bucket', {
      versioned: true,
      bucketName: 'brandon.gandy.me',
      publicReadAccess: true,
      websiteIndexDocument: 'index.html',
      blockPublicAccess: {
        blockPublicAcls: false,
        ignorePublicAcls: false,
        blockPublicPolicy: false,
        restrictPublicBuckets: false,
      },
      objectOwnership: ObjectOwnership.OBJECT_WRITER,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    })
    // new aws_s3.Bucket(this, 'personal-website-subdomain-bucket', {
    //   versioned: true,
    //   removalPolicy: cdk.RemovalPolicy.DESTROY,
    //   bucketName: 'www.brandon.gandy.me',
    // });
  }
}
