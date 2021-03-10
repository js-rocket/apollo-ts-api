/* eslint-disable @typescript-eslint/no-unused-vars */
import ajax from '@src/services/ajax';

const GMAIL_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbwU5VHUj5sniOyLHvSgaZ-C-Hjo_52CFsDqjhmmXIr4an-Z51k/exec';

const star_image =
  '<img src="data:image/gif;base64,R0lGODlhEAAQAMQAAORHHOVSKudfOulrSOp3WOyDZu6QdvCchPGolfO0o/XBs/fNwfjZ0frl3/zy7////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAkAABAALAAAAAAQABAAAAVVICSOZGlCQAosJ6mu7fiyZeKqNKToQGDsM8hBADgUXoGAiqhSvp5QAnQKGIgUhwFUYLCVDFCrKUE1lBavAViFIDlTImbKC5Gm2hB0SlBCBMQiB0UjIQA7" alt="star" width="16" height="16">';
const dot_image =
  '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==" alt="Red dot" />';

//TODO complete function
export const sendEmailGapps = async (
  to: string,
  subject: string,
  message: string,
): Promise<_obj> => {
  const postData = {
    API_KEY: 'gj50jg408gwh80uw068yjhw0hj0jh05y6uj580ujhrev4fw95hf803',
    MAILTO: to,
    SUBJECT: subject,
    MESSAGE: message,
    HTMLMESSAGE: `<div><b>html</b> ${dot_image} ${message}</div>`,
    ATTACHMENT_NAME: 'testme.txt',
    ATTACHMENT_CONTENT: 'hello world this is a test file',
  };

  const result = await ajax.post(GMAIL_SCRIPT_URL, postData).catch((e) => e);

  return result;
};
