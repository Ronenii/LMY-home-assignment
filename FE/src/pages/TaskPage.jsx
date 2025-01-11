import TaskBox from "../cmps/task/TaskBox";

export default function TaskPage() {
  const taskData = {
    id: 1,
    title: "example",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet excepturi, laboriosam maiores molestias vitae deleniti magni? Nemo, rem eligendi. Aspernatur officia error nulla tempora cumque quidem, dolorum quibusdam fuga eum.",
    due_date: "2025-01-20",
    status: "open",
    created_at: "2025-01-11",
  };
  return <TaskBox taskData={taskData} />;
}
