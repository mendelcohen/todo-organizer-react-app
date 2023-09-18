import { BASE_URL } from "./environmentConfig";

export default async function login(params) {
  try {
    const options = {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    };
    const response = await fetch(`${BASE_URL}/session/create`, options);
    const data = await response.json();
    const loginResults = response.status;
    return { loginResults, data };
  } catch (error) {
    console.log(error);
  }
}
