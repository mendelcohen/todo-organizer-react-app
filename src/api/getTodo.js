import axios from "axios";
import { BASE_URL } from "./environmentConfig";

export default async function getTodo(id) {
  try {
    const results = await axios({
      method: "post",
      // url: `${BASE_URL}/todo/${id}`,
      url: "/todo",
      data: { id },
    });
    return results;
  } catch (error) {
    console.log(error);
  }
}
