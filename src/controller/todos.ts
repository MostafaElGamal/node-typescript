import { RequestHandler } from "express";
import { Todo } from "../models/todo";

let TODOS: Todo[] = [];

export const createTodo: RequestHandler = (req, res, next) => {
  const text = (req.body as { text: string }).text;
  const newTodo = new Todo(Math.random().toString(), text);

  TODOS.push(newTodo);

  res.status(201).json({ message: "Created the todo. ", createTodo: newTodo });
};

export const getTodos: RequestHandler = (req, res, next) => {
  res.status(201).json({ message: "Success", todos: TODOS });
};

export const updateTodo: RequestHandler = (req, res, next) => {
  const todoID = (req.params as { id: string | number }).id;
  const text = (req.body as { text: string }).text;

  TODOS.filter((todo) => {
    if (todo.id == todoID) todo.text = text;
    return todo;
  });

  res.status(201).json({ message: "Updated" });
};

export const deleteTodo: RequestHandler = (req, res, next) => {
  const todoID = (req.params as { id: string | number }).id;

  TODOS = TODOS.filter((todo) => todo.id !== todoID);

  res.status(201).json({ message: "Deleted" });
};
