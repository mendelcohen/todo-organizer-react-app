import { BASE_URL } from "./environmentConfig";

export default async function getAllTodos(userId) {
  try {
    const options = {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    };
    console.log(process.env.NODE_ENV);
    const response = await fetch(`${BASE_URL}/todos/all/${userId}`, options);
    const todos = await response.json();
    return todos;
  } catch (error) {
    console.log(error);
  }
}
