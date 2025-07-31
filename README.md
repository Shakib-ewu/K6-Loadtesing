## K6-Loadtesing
Grafana k6 is an open-source load testing tool written in Go that helps test application performance by simulating real user traffic. It uses JavaScript for scripting, making it easy for developers and testers to define test scenarios and user behavior.

## Clone & Install - K6
Clone the repo using git clone https://github.com/Shakib-ewu/K6-Loadtesing
1) Install K6

MAC OS => brew install k6

Windows => winget install k6

## Run test scripts using - K6
Run the test case using the below command**

API => k6 run <test_script.js>
Browser Headless Mode => k6 run <test_script.js>
Browser UI Mode => K6_BROWSER_HEADLESS=false k6 run <test_script.js>