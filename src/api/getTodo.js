import axios from "axios";
import { BASE_URL } from "./environmentConfig";

export default async function getTodo(id) {
  try {
    const results = await axios({
      method: "get",
      url: `${BASE_URL}/todo/${id}`,
    });
    return results;
  } catch (error) {
    console.log(error);
  }
}
