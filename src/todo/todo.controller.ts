import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  create(@Body() createTodoDto: CreateTodoDto) {
    const todo = this.todoService.create(createTodoDto);
    return { message: 'Todo created successfully', todo};
  }

  @Get()
  findAll() {
    const todos =  this.todoService.findAll();
    return { message: 'Todos found successfully', todos: todos}
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe ) id: number) {
    const todo =  this.todoService.findOne(+id);
    return { message: 'Todo found successfully', todo}
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number,
         @Body() updateTodoDto: UpdateTodoDto,
        ) {
    const todo = this.todoService.update(+id, updateTodoDto);
    return { message: 'Todo updated successfully', todo}      
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todoService.remove(+id);
  }
}
