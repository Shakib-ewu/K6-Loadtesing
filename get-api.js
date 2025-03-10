import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10,
  iterations: 10,
};


export default function () {
  const response = http.get("https://api.github.com/user/repos", { headers: headers_api });

  console.log(`Response status: ${response.status}`);
  console.log(`Response body: ${response.body}`);

  check(response, {
    'status code is 200': (r) => r.status === 200
  });

  sleep(1);
}
