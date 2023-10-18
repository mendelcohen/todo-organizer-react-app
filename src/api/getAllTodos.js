import axios from "axios";
import { BASE_URL } from "./environmentConfig";

export default async function getAllTodos(userId) {
  try {
    const results = await axios({
      method: "post",
      // url: `${BASE_URL}/todos/${userId}`,
      // url: `/todos/${userId}`,
      url: "/todos",
      data: { id: userId },
    });
    return results;
  } catch (error) {
    console.log(error);
  }
}
