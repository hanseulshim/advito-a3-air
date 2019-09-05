import AWS from 'aws-sdk';
import {
  EMAIL_SENDER,
  EMAIL_BCC,
  ADVITO_AIR_APPLICATION,
  APP_URL
} from '../constants';
const ses = new AWS.SES({
  accessKeyId: process.env.AWS_SES_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SES_SECRET_ACCESS_KEY,
  region: process.env.AWS_SES_REGION
});

export const sendNoteEmail = async (
  db,
  parentId,
  parentTable,
  assignedToId
) => {
  const user = await db('blops.advito_user')
    .where('id', assignedToId)
    .first();
  const { email_subject: emailSubject, email_body: emailBody } = await db(
    'blops.email_template'
  )
    .where('template_name', 'Note')
    .where('advito_application_id', ADVITO_AIR_APPLICATION)
    .first();
  let message = emailBody;

  let projectId = null;
  let projectName = '';
  let contractName = '';
  let pricingTermName = '';
  let discountName = '';
  let targetTermName = '';

  if (parentTable === 'pricingterm') {
    const { contractcontainerid, name: ptName } = await getPricingTerm(
      db,
      parentId
    );
    const { projectid: pId, name: cName } = await getContract(
      db,
      contractcontainerid
    );
    const { id, name_val: pName } = await getProject(db, pId);
    pricingTermName = ptName;
    contractName = cName;
    projectName = pName;
    projectId = id;
    const regex = new RegExp(String.raw`\[\[ADDITIONALINFO]]`, 'g');
    message = message.replace(
      regex,
      `
    <p>Pricing Term Name: ${pricingTermName}</p>
    `
    );
  } else if (parentTable === 'targetterm_v2') {
    const { contractcontainerid, name: tName } = await getTargetTerm(
      db,
      parentId
    );
    const { projectid: pId, name: cName } = await getContract(
      db,
      contractcontainerid
    );
    const { id, name_val: pName } = await getProject(db, pId);
    targetTermName = tName;
    contractName = cName;
    projectName = pName;
    projectId = id;
    const regex = new RegExp(String.raw`\[\[ADDITIONALINFO]]`, 'g');
    message = message.replace(
      regex,
      `
    <p>Target Term Name: ${targetTermName}</p>
    `
    );
  } else if (parentTable === 'discount') {
    const { pricingtermid, generateddiscountname: dName } = await getDiscount(
      db,
      parentId
    );
    const { contractcontainerid, name: ptName } = await getPricingTerm(
      db,
      pricingtermid
    );
    const { projectid: pId, name: cName } = await getContract(
      db,
      contractcontainerid
    );
    const { id, name_val: pName } = await getProject(db, pId);
    discountName = dName;
    pricingTermName = ptName;
    contractName = cName;
    projectName = pName;
    projectId = id;
    const regex = new RegExp(String.raw`\[\[ADDITIONALINFO]]`, 'g');
    message = message.replace(
      regex,
      `
    <p>Pricing Term Name: ${pricingTermName}</p>
    <p>Discount Name: ${discountName}</p>
    `
    );
  }

  const placeholders = {
    NAMEFIRST: user.name_first,
    URL: `${APP_URL}/${projectId}/contracts`,
    CONTRACTNAME: contractName,
    PROJECTNAME: projectName
  };
  Object.keys(placeholders).forEach(key => {
    const regex = new RegExp(String.raw`\[\[${key}]]`, 'g');
    message = message.replace(regex, placeholders[key]);
  });
  const params = {
    Source: EMAIL_SENDER,
    Destination: {
      ToAddresses: [user.email],
      BccAddresses: EMAIL_BCC
    },
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: message
        }
      },
      Subject: {
        Charset: 'UTF-8',
        Data: emailSubject
      }
    }
  };

  await ses.sendEmail(params).promise();
};

const getProject = async (db, id) =>
  await db('project')
    .where('id', id)
    .first();
const getContract = async (db, id) =>
  await db('contractcontainer')
    .where('id', id)
    .first();
const getPricingTerm = async (db, id) =>
  await db('pricingterm')
    .where('id', id)
    .first();
const getTargetTerm = async (db, id) =>
  await db('targetterm_v2')
    .where('id', id)
    .first();
const getDiscount = async (db, id) =>
  await db('discount')
    .where('id', id)
    .first();
