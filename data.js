export const initialData = {
  tasks: {
    "task-1": { id: "task-1", content: "content1" },
    "task-2": { id: "task-2", content: "content2" },
    "task-3": { id: "task-3", content: "content3" },
    "task-4": { id: "task-4", content: "content4" },
  },
  columns: {
    "to-do": {
      id: "to-do",
      title: "Todo",
      taskId: ["task-1", "task-2", "task-3", "task-4"],
    },
    "in-progress": {
      id: "in-progress",
      title: "In Progress",
      taskId: [],
    },
    "review": {
      id: "review",
      title: "Review",
      taskId: [],
    },
    "done": {
      id: "done",
      title: "Done",
      taskId: [],
    },
  },
  columnOrder: ["to-do", "in-progress", "review", "done"],
};
