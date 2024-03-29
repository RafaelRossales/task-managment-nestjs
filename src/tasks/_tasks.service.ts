import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { v4 as uuid } from 'uuid'
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter-dto';

@Injectable()
export class TasksService {
    // private tasks:Array<Task> = [];

    // getAllTasks():Task[]{

    //     return this.tasks;
    // }

    // getTask(id:string):Task{

    //     const found = this.tasks.find(task => task.id === id);

    //     if(!found){
    //         throw new NotFoundException();
    //     }
    
    //     return found;
    // }
    
    // createTask(createTaskDto:CreateTaskDto):Task{

    //     const{title, description } = createTaskDto;
        
    //     let dateInstance = new Date();

    //     const task:Task = {
    //         id:uuid(),
    //         title,
    //         description,
    //         status:TaskStatus.OPEN,
    //         date:dateInstance.toISOString()
    //     }

    //     this.tasks.push(task);

    //     return task;
    // }

    // deleteTask(id:string):void{

    //     let taskId = this.tasks.findIndex(task => task.id === id);

    //     if(taskId === -1 ) throw new NotFoundException(`Task ${id} not found`);

    //     this.tasks.splice(taskId,1);
    // }

    // updateStatus(id:string, status:TaskStatus):Task{
        
    //     let taskId = this.tasks.findIndex(task => task.id === id);

    //     this.tasks[taskId].status = status;

    //     return this.tasks[taskId];
    // }

    // getTasksWithFilter(filterDto:GetTasksFilterDto):Task[]{
    //     const { status, search } = filterDto;

    //     let tasks = this.getAllTasks();

    //     if(status){
    //         tasks = tasks.filter(task => task.status === status);
    //     }

    //     if(search){
    //         tasks = tasks.filter((task) => {
    //             if(task.title.includes(search) || task.description.includes(search)){
    //                 return true
    //             }
    //             return false
    //         });
    //     }

    //     return tasks;


    // }
}
