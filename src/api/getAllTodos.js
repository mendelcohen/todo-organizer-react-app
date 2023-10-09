import axios from "axios";
import { BASE_URL } from "./environmentConfig";

export default async function getAllTodos(userId) {
  try {
    const results = await axios({
      method: "get",
      url: `${BASE_URL}/todos/all/${userId}`,
    });
    return results;
  } catch (error) {
    console.log(error);
  }
}
