import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import Task from "./entities/task.entity";
import { Like, Repository } from "typeorm";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TaskStatus } from "./task-status.enum";
import { GetTasksFilterDto } from "./dto/get-tasks-filter-dto";

@Injectable()
class TasksService{

    constructor(
        @InjectRepository(Task)
        private tasksRespository:Repository<Task>
    ){}


    private async getTasks(filterDto:GetTasksFilterDto):Promise<Task[]>{
        const query = this.tasksRespository.createQueryBuilder('task');
        const { status, search } = filterDto;

        if(status){
            query.andWhere('task.status = :status',{ status });
        }
        if(search){
            query.andWhere(
                'task.title LIKE :search OR task.description LIKE :search',
                {search: `%${search}%`}
            )
        }
        const tasks =  await query.getMany();

        return tasks
    }

    async getTaskById(id:string):Promise<Task>{
        const found = await this.tasksRespository.findOne({ where: { id: id }});

        if(!found){
            throw new NotFoundException(`Task with ID ${id} not found`)
        }

        return found;
    }

    async createTask(createTaskDto:CreateTaskDto):Promise<Task>{
    
        const { title, description } = createTaskDto;

        const task = this.tasksRespository.create({title,description,status:TaskStatus.OPEN});

        await this.tasksRespository.save(task);

        return task;
    }

    // if(Object.keys(filterDto).length){
    //     return this.taskService.getTasksWithFilter(filterDto);
    // }else{
    //     return this.taskService.getAllTasks();
    // }
    async getAllTasks(filterDto:GetTasksFilterDto):Promise<Task[]>{

        return this.getTasks(filterDto)
        
        // const { status , search } = filterDto;
        
        // let tasksArray:Task[] = [];

        // if(status){
        //     tasksArray = await this.tasksRespository.findBy({ status });
        // }

        // if(search){
        //     tasksArray = await this.tasksRespository.find({
        //         where:{ title: Like(`%${search}%`), description:Like(`%${search}%`)},
        //     })
        // }

        // return tasksArray;
    }

    async deleteTask(id:string):Promise<void>{

        const task = await this.getTaskById(id);

        if(!task) throw new NotFoundException(`Task with ID ${id} not found`);

        this.tasksRespository.softDelete(id);
    }

    async updateTaskStatus(id:string, status:TaskStatus):Promise<Task>{
    
        const task = await this.getTaskById(id);

        if(!task) throw new NotFoundException(`Task not found`);

        task.status = status;

        await this.tasksRespository.save(task);

        return task;
    }
}

export default TasksService;