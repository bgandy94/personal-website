#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib'
import { PersonalWebsiteStack } from './personal-website-stack'

const app = new cdk.App()
new PersonalWebsiteStack(app, 'PersonalWebsiteStack', {})
