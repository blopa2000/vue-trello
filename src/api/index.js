import { db } from "@/api/firebase";
import {
  getDocs,
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

export const getBoardsByUser = async (userId) => {
  return await getDocs(
    query(collection(db, "users", userId, "boards"), orderBy("timestamp", "asc"))
  );
};

export const createBoard = async (userId, board) => {
  return await addDoc(collection(db, "users", userId, "boards"), {
    name: board,
    timestamp: serverTimestamp(),
  });
};

export const getListAndTaskById = async (userId, boardId) => {
  const lists = await getDocs(
    query(collection(db, "users", userId, "boards", boardId, "lists"), orderBy("timestamp", "asc"))
  );
  const tasks = await getDocs(
    query(collection(db, "users", userId, "boards", boardId, "tasks"), orderBy("timestamp", "asc"))
  );

  return {
    lists,
    tasks,
  };
};

export const createList = async (userId, boardId, name) => {
  return await addDoc(collection(db, "users", userId, "boards", boardId, "lists"), {
    name,
    timestamp: serverTimestamp(),
  });
};

export const createTask = async (userId, boardId, listId, name) => {
  return await addDoc(collection(db, "users", userId, "boards", boardId, "tasks"), {
    name,
    listId,
    timestamp: serverTimestamp(),
  });
};

export const updateTask = async (userId, boardId, taskId, listId) => {
  return await updateDoc(doc(db, "users", userId, "boards", boardId, "tasks", taskId), {
    listId,
  });
};

export const deleteBoard = async (userId, boardId) => {
  const lists = await getDocs(
    query(collection(db, "users", userId, "boards", boardId, "lists"), orderBy("timestamp", "asc"))
  );
  if (!lists.empty) return false;
  await deleteDoc(doc(db, "users", userId, "boards", boardId));
  return true;
};

export const deleteTask = async (userId, boardId, taskId) => {
  return await deleteDoc(doc(db, "users", userId, "boards", boardId, "tasks", taskId));
};

export const deleteList = async (userId, boardId, listId) => {
  return await deleteDoc(doc(db, "users", userId, "boards", boardId, "lists", listId));
};
