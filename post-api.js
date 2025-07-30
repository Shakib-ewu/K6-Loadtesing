import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 1,
  iterations: 1,
};

const url = "https://reqres.in/api/users";

export default function () {
  const payload = JSON.stringify({
   "name": "morpheus",
    "job": "leader"
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
      "x-api-key": "reqres-free-v1"
    },
  };

  const response = http.post(url, payload, params);
  check(response, {
    'status code is 201': (res) => res.status === 201
  });

  sleep(1);
}
