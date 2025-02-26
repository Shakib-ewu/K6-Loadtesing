import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10,
  iterations: 10,
};

const token = __ENV.GITHUB_TOKEN; // Load the token from an environment variable

let headers_api = {
  Authorization: `Bearer ${token}`,
  "User-Agent": "k6-loadtest",
  "Accept": "application/vnd.github.v3+json",
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
