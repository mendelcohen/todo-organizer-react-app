export default async function getAllTodos(userId) {
  try {
    const options = {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(
      `http://localhost:3001/todos/all/${userId}`,
      options
    );
    const todos = await response.json();
    return todos;
  } catch (error) {
    console.log(error);
  }
}
