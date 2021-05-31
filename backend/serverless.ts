import type { AWS } from '@serverless/typescript';

import {
  details,
  filter,
  list,
  login,
  register,
  search
} from 'src/actions/index'

const serverlessConfiguration: AWS = {
  service: 'backend',
  frameworkVersion: '2',
  custom: {
    bundle: {
      linting: false
    },
    ['serverless-offline']: {
      httpPort: 3000,
      babelOptions: {
        presets: ['env']
      }
    }
  },
  package: {
    individually: true
  },
  plugins: [
    'serverless-bundle',
    'serverless-dotenv-plugin',
    'serverless-offline'
  ],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
    lambdaHashingVersion: '20201221',
  },
  // import the function via paths
  functions: {
    details,
    filter,
    list,
    login,
    register,
    search
  },
};

module.exports = serverlessConfiguration;
