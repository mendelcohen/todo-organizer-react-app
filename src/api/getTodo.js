import { BASE_URL } from "./environmentConfig";

export default async function getTodo(id) {
  try {
    const options = {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(`${BASE_URL}/todo/${id}`, options);
    const todo = await response.json();
    return todo;
  } catch (error) {
    console.log(error);
  }
}
