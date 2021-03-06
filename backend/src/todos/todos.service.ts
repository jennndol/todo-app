import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TodoInterface } from './todo.interface';
import { Todo } from './dto/todo.dto';
import { TodoInput } from './todo.input';

@Injectable()
export class TodosService {
    constructor(@InjectModel('Todo') private todo: Model<TodoInterface>) {}

    async findAll(): Promise<Todo[]> {
        return await this.todo.find().exec();
    }

    async findOne(id: string): Promise<Todo> {
        return await this.todo.findOne({ _id: id });
    }

    async create(dto: TodoInput): Promise<Todo> {
        const createdTodo = new this.todo(dto);
        return await createdTodo.save();
    }

    async update(id: string, dto: TodoInput): Promise<Todo> {
        return await this.todo.findByIdAndUpdate(id, dto, { new: true });
    }

    async delete(id: string): Promise<string> {
        const deletedTodo = await this.todo.deleteOne({_id: id});
        if (deletedTodo.ok){
            return 'OK'
        }
        return 'Not OK'
    }
}
