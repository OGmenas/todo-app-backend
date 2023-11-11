import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';

@Module({
  controllers: [TodoController], // recibe un array de controladores
  providers: [TodoService], // recibe un array de servicios
})
export class TodoModule {}
