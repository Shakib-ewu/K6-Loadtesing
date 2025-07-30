import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10,
  iterations: 10,
};


export default function () {
  const response = http.get("https://test.k6.io");

 

  check(response, {
    'status code is 200': (response) => response.status === 200
  });

  sleep(1);
}
