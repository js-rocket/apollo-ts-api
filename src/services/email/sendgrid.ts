import config from '@src/config';
import ajax from '@src/services/ajax';

const SENDGRID_URL = 'https://api.sendgrid.com/v3/mail/send';

//TODO complete function
export const sendEmailSG = async (to: string, subject: string, message: string): Promise<_obj> => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
  };

  const postData = {
    personalizations: [{ to: [{ email: to }], subject }],
    content: [{ type: 'text/plain', value: message }],
    from: { email: config.email.fromEmail, name: config.email.fromName },
  };

  const result = await ajax.post(SENDGRID_URL, postData, { headers }).catch((e) => e);

  return result;
};
