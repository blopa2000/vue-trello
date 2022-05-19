// import { db } from "./firebase";
import { ref } from "firebase/database";

const boardRef = ref("/boards");
const listsRef = ref("/lists");
const tasksRef = ref("/tasks");

export default {
  getBoardsByUser(userId) {
    const query = boardRef.orderByChild("owner").equalTo(userId);
    return query.once("value");
  },
  postBoard(name) {
    const id = boardRef.push().key;
    const owner = 1;
    const board = (id, name, owner);
    return boardRef
      .child(id)
      .set(board)
      .then(() => board);
  },
  getListsFromBoard(boardId) {
    const query = listsRef.orderByChild("board").equalTo(boardId);
    return query.once("value");
  },

  postList(board, name) {
    const id = listsRef.push().key;
    const column = { id, name, board };

    return listsRef
      .child(id)
      .set(column)
      .then(() => column);
  },
  getTasksFromList(listId) {
    const query = tasksRef.orderByChild("list").equalTo(listId);
    return query.once("value");
  },
  postTask(list, title) {
    const id = tasksRef.push().key;
    const task = { id, title, list, completed: false };

    return tasksRef
      .child(id)
      .set(task)
      .then(() => task);
  },
  // updateTask(taskId, name) {},
  deleteTask(taskId) {
    return tasksRef.child(taskId).remove();
  },
  completedTask(taskId) {
    return tasksRef.child(taskId).update({ completed: true });
  },
};
