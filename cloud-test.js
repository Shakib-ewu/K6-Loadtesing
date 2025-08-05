import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 10,
  duration: '3s',
  cloud: {
    // Project: Default project
    projectID: 3791306,
    // Test runs with the same name groups test runs together.
    name: 'Cloud test'
  }
};

export default function() {
  http.get('https://quickpizza.grafana.com');
  sleep(1);
}