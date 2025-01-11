import axios from "axios";

const taskApiUrl =
  import.meta.env.VITE_BACKEND_URL + import.meta.env.VITE_TASK_URL;

export async function fetchTasks() {
  console.log("Trying to fetch tasks.");
  try {
    const res = await axios.get(taskApiUrl);

    console.log("got polls successfully", res.data);
    return res.data.data;
  } catch (err) {
    console.log("Error fetching tasks. Error info:", err);
    return [];
  }
}
