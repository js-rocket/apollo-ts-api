import {
  APIGatewayProxyEvent,
  Context,
  APIGatewayProxyResult,
  APIGatewayProxyStructuredResultV2,
} from 'aws-lambda';
import serverless from 'serverless-http';
import app from '@src/rest';

const handler = serverless(app);
export const resthandler = async (
  event: APIGatewayProxyEvent,
  context: Context,
): Promise<APIGatewayProxyResult | APIGatewayProxyStructuredResultV2> => {
  const result = await handler(event, context);
  return result;
};

/*
// Read why running express over lambda is bad: https://medium.com/dailyjs/six-reasons-why-you-shouldnt-run-express-js-inside-aws-lambda-102e3a50f355
export const resthandler = async (
  event: APIGatewayProxyEvent,
  context: Context,
): Promise<APIGatewayProxyResult> => {
  // console.log('EVENT: \n' + JSON.stringify(event, null, 2));
  return {
    statusCode: 200,
    body: JSON.stringify(event, null, 2),
  };
};
*/
