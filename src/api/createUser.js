import { BASE_URL } from "./environmentConfig";

export default async function login({ username, password }) {
  try {
    const options = {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    };
    const response = await fetch(`${BASE_URL}/user/create`, options);
    const results = await response.json();
    return results;
  } catch (error) {
    console.log(error);
  }
}
