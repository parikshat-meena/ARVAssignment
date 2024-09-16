import axios from 'axios';

const AppId = 'd76f46ed-3a60-46a6-82b4-623e7b8d90c1';
const ApiKey = 'ZTc3OWJlZjItMzFkNC00ZTU0LTk0MGUtNjkwYTYyNjViZmI0';
const HEADERS = {
  Accept: 'application/json',
  Authorization: `Basic ${ApiKey}`, // authorization required only for include_aliases
  'Content-Type': 'application/json',
};

const notification = {
  method: 'POST',
  url: `https://onesignal.com/api/v1/notifications`,
};
const createNotification = (body: any) => {
  console.log('.....................trigger notification..................');

  const options: any = {
    method: notification.method,
    url: notification.url,
    ...HEADERS,
    data: body,
  };

  onRequest(options);
};

const onRequest = (options: any) => {
  return axios
    .request(options)
    .then(function (response) {
      console.log(response.data, 'sent');
      return response;
    })
    .catch(function (error) {
      console.error(error, 'failed');
      return error;
    });
};

export {createNotification};
