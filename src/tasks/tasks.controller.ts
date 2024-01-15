import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
// import { TasksService } from './tasks.service';
import TasksService from './tasks.service';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter-dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import Task from './entities/task.entity';

@Controller('tasks')
export class TasksController {
    
    constructor(private taskService:TasksService){}

    @Get()
    getTasks(@Query() filterDto:GetTasksFilterDto):Promise<Task[]>{
        return this.taskService.getAllTasks(filterDto)
    }

    @Get('/:id')
    async getById(@Param('id') id:string):Promise<Task>{
        return await this.taskService.getTaskById(id);
    }

    @Post()
    async createTask(@Body() createTaskDto:CreateTaskDto):Promise<Task>{
        return  await this.taskService.createTask(createTaskDto);
    }

    @Delete('/:id')
    deleteTask(@Param('id') id:string){
        return this.taskService.deleteTask(id);
    }

    @Patch('/:id')
    updateTaskStatus(@Param('id') id:string, @Body() updateTaskStatusDto:UpdateTaskStatusDto){
        const { status } = updateTaskStatusDto;
        return this.taskService.updateTaskStatus(id,status)
    }

}


