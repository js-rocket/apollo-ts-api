/*
Example curl request:
curl -X POST -A "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.132 Safari/537.36" \
-d '{"API_KEY":"jgjg9y5yj9j5_YOUR_API_KEY_j95j0tuyuh","SUBJECT":"Test","MESSAGE":"Hello 9:08am"}' \
-L https://script.google.com/macros/s/AKfycbwZOwQI6xtYYYY6eBT5o0N_u0KszVJUBrrXXXXXgoii-eaNFItXWf4ZZZZ/exec
*/

function glob() {
  return {
    API_KEY: 'jgjg9y5yj9j5_YOUR_API_KEY_j95j0tuyuh',
    RECPT: 'default@example.com',
  };
}

function returnJSON(result) {
  return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(
    ContentService.MimeType.JSON,
  );
  // return HtmlService.createHtmlOutput('<div tag="nvdfjh32">' + JSON.stringify(result) + '</div>');
}

function sendMail(mailContents) {
  if (!mailContents.SUBJECT) return returnJSON({ success: false });

  // if you want to allow any recipient specified in the data
  const recpt = mailContents.MAILTO ? mailContents.MAILTO : glob().RECPT;

  const message = {
    to: recpt,
    subject: mailContents.SUBJECT,
    body: mailContents.MESSAGE,
  };

  if (mailContents.HTMLMESSAGE) message.htmlBody = mailContents.HTMLMESSAGE;
  if (mailContents.ATTACHMENT_NAME && mailContents.ATTACHMENT_CONTENT) {
    const blob = Utilities.newBlob(
      mailContents.ATTACHMENT_CONTENT,
      'text/plain',
      mailContents.ATTACHMENT_NAME,
    );
    message.attachments = [blob];
  }

  MailApp.sendEmail(message);

  return returnJSON({ success: true });
}

function request_validate(e) {
  return e.API_KEY === glob().API_KEY;
}

function doPost(e, f) {
  const data = e.postData && e.postData.contents && JSON.parse(e.postData.contents);
  if (request_validate(data)) {
    return sendMail(data);
  }

  return returnJSON({ success: false, msg: 'not valid', content: e, eff: f });
}
