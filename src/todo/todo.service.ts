import { Body, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';
import { response } from 'express';

@Injectable()
export class TodoService {

  private todos = [
    // generate some fake data
    { id: 1, title: 'Todo 1', description: 'Description 1', done: false, createdAt: new Date(), updatedAt: new Date() },
    { id: 2, title: 'Todo 2', description: 'Description 2', done: false, createdAt: new Date(), updatedAt: new Date() },
    { id: 3, title: 'Todo 3', description: 'Description 3', done: false, createdAt: new Date(), updatedAt: new Date() },
    { id: 4, title: 'Todo 4', description: 'Description 4', done: false, createdAt: new Date(), updatedAt: new Date() }  
  ];

  create(createTodoDto: CreateTodoDto) {
    console.log(createTodoDto);
    const todo = new Todo();
    todo.id = this.todos.length + 1;
    todo.title = createTodoDto.title;
    todo.description = createTodoDto.description;
    todo.done = false;
    todo.createdAt = new Date();
    this.todos.push(todo);
    return { message: 'Todo created successfully', todo };
  }

  findAll(): Todo[] {
    return this.todos;
  }

  findOne(id: number): Todo {
    const todo = this.todos.find(todo => todo.id === id);
    if (!todo) throw new HttpException(`Todo with id ${id} not found`, HttpStatus.NO_CONTENT)
    return todo;
  }
  
  update(id: number, updateTodoDto: UpdateTodoDto) {
    const todo = this.todos.find(todo => todo.id === id);
    if (!todo) throw new NotFoundException(`Todo with id ${id} not found`)
    const { done , description } = updateTodoDto;
    if(done !== undefined) todo.done = done;
    if(description) todo.description = description;
    todo.updatedAt = new Date();

    this.todos = this.todos.map(dbTodo =>{
      if(dbTodo.id === todo.id) return todo;
      return dbTodo;
    } )
    return { message: 'Todo updated successfully', todo };
  }

  remove(id: number) {
    if (!this.todos.find(todo => todo.id === id)) throw new NotFoundException(`Todo with id ${id} not found`)
    this.todos = this.todos.filter(todo => todo.id !== id);
    return { message: 'Todo deleted successfully' };
  }
}
