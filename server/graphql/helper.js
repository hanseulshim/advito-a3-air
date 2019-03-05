const AWS = require('aws-sdk');
const lambda = new AWS.Lambda();

exports.lambdaFakeInvoke = async (payload, data) => {
  const params = {
    FunctionName: 'python-lambdas-dev-udf_story_hotel_3',
    InvocationType: 'RequestResponse',
    Payload: JSON.stringify(payload)
  };
  const response = await lambda.invoke(params).promise();
  const responseBody = JSON.parse(response.Payload);
  responseBody.body = JSON.parse(responseBody.body);
  if (responseBody.statusCode === 200) {
    return exports.generateResponse(data);
  } else {
    return responseBody;
  }
};

exports.getProjectName = project => {
  const effectiveFromYear = new Date(project.effectiveFrom).getFullYear();
  const effectiveToYear = new Date(project.effectiveTo).getFullYear();
  const yearRange =
    effectiveFromYear !== effectiveToYear
      ? `${effectiveFromYear} - ${effectiveToYear.toString().substr(-2)}`
      : effectiveFromYear;
  return `${project.clientName} ${yearRange} ${project.projectType}`;
};
