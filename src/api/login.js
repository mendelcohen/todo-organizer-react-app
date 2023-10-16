import axios from "axios";
import { BASE_URL } from "./environmentConfig";

export default async function login(params) {
  try {
    const results = await axios({
      method: "post",
      url: `${BASE_URL}/session/create`,
      data: params,
    });
    return results;
  } catch (error) {
    console.log(error);
  }
}
