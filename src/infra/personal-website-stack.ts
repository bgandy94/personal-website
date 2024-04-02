import * as cdk from 'aws-cdk-lib'
import * as s3 from 'aws-cdk-lib/aws-s3'
import * as r53 from 'aws-cdk-lib/aws-route53'
import * as targets from 'aws-cdk-lib/aws-route53-targets'
import * as cf from 'aws-cdk-lib/aws-cloudfront'
import * as cm from 'aws-cdk-lib/aws-certificatemanager'
import { ObjectOwnership } from 'aws-cdk-lib/aws-s3'

const websiteHost = 'brandon.gandy.me'
const dubdubdubHost = `www.${websiteHost}`
export class PersonalWebsiteStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    const rootBucket = new s3.Bucket(this, `${websiteHost}-root-bucket`, {
      versioned: true,
      bucketName: websiteHost,
      publicReadAccess: true,
      autoDeleteObjects: true,
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
    new s3.Bucket(this, `${websiteHost}-subdomain-bucket`, {
      versioned: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      bucketName: dubdubdubHost,
      objectOwnership: ObjectOwnership.OBJECT_WRITER,
      websiteRedirect: {
        hostName: rootBucket.bucketWebsiteUrl,
      },
    })

    const zone = new r53.HostedZone(this, 'personal-hosted-zone', {
      zoneName: 'gandy.me',
    })

    const cert = new cm.Certificate(this, 'gandy.me-ssl', {
      domainName: 'gandy.me',
      subjectAlternativeNames: ['*.gandy.me', '*.brandon.gandy.me'],
      validation: {
        method: cm.ValidationMethod.DNS,
        props: {
          hostedZone: zone,
        },
      },
    })

    const distro = new cf.CloudFrontWebDistribution(
      this,
      `${websiteHost}-cf-distro`,
      {
        priceClass: cf.PriceClass.PRICE_CLASS_100,
        originConfigs: [
          {
            behaviors: [{ isDefaultBehavior: true }],
            s3OriginSource: {
              s3BucketSource: rootBucket,
            },
          },
        ],

        viewerCertificate: cf.ViewerCertificate.fromAcmCertificate(cert, {
          aliases: [websiteHost, dubdubdubHost],
        }),
      }
    )

    const rootDomainRecord = new r53.ARecord(this, `${websiteHost}-a-record`, {
      zone,
      recordName: websiteHost,
      target: r53.RecordTarget.fromAlias(new targets.CloudFrontTarget(distro)),
    })

    new r53.ARecord(this, 'www.brandon.gandy.me-a-record', {
      zone,
      recordName: dubdubdubHost,
      target: r53.RecordTarget.fromAlias(
        new targets.Route53RecordTarget(rootDomainRecord)
      ),
    })
  }
}
