import axios from "axios";
import { BASE_URL } from "./environmentConfig";

export default async function createUser({ username, password }) {
  try {
    const results = await axios({
      method: "post",
      url: "/user/create",
      // url: `${BASE_URL}/user/create`,
      data: { username, password },
    });
    console.log(results);
    return results;
  } catch (error) {
    console.log(error);
    return error;
  }
}
