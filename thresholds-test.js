import http from 'k6/http';
import { check } from 'k6';

export const options = {
  thresholds: {
    // Fail test if average response time > 200ms
    http_req_duration: ['avg<200'],

    // Fail test if 95th percentile response time > 500ms
    http_req_duration: ['p(95)<500'],

    // Fail test if more than 1% of requests fail
    http_req_failed: ['rate<0.01'],

    // Fail test if less than 99% of checks pass
    checks: ['rate>0.99']
  },
};

export default function () {
  const res = http.get('https://test.k6.io');
  check(res, {
    'status is 200': (r) => r.status === 200,
  });
}
