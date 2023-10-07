import http from "k6/http";
import { sleep } from "k6";

export let options = {
  vus: 10,
  duration: "1m",
};

export default function () {
  const headers = {
    "Content-Type": "application/json",
  };

  const requestBody = {
    email: "anotherRandom3@user.id",
    password: "randomtextaspassword",
  };

  const response = http.post(
    "http://localhost:5000/api/user",
    JSON.stringify(requestBody),
    {
      headers: headers,
    }
  );

  console.log(`Response status code: ${response.status}`);
  sleep(1);
}
