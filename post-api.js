import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 5,
  iterations: 10,
};
const url="https://reqres.in/api/users"

export default function () {
  const response = http.post(url,{
    
        "name": "morpheus",
        "job": "leader"
    
  });


  check(response, {
    'status code is 201': (r) => r.status === 201
  });

  sleep(1);
}
