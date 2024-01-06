import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter-dto';

@Controller('tasks')
export class TasksController {
    
    constructor(private taskService:TasksService){}

    @Get()
    getTasks(@Query() filterDto:GetTasksFilterDto):Task[]{
        if(Object.keys(filterDto).length){
            return this.taskService.getTasksWithFilter(filterDto);
        }else{
            return this.taskService.getAllTasks();
        }
    }

    @Get('/:id')
    getById(@Param('id') id:string){
        return this.taskService.getTask(id);
    }

    @Post()
    createTask(@Body() createTaskDto:CreateTaskDto):Task{
        return this.taskService.createTask(createTaskDto);
    }

    @Delete('/:id')
    deleteTask(@Param('id') id:string){
        return this.taskService.deleteTask(id);
    }

    @Patch('/:id')
    updateTaskStatus(@Param('id') id:string, @Body('status') status:TaskStatus){
        return this.taskService.updateStatus(id,status)
    }

}


