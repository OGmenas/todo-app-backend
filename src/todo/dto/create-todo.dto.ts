import { IsBoolean, IsDate, IsNotEmpty, IsString } from "class-validator";

export class CreateTodoDto {

    @IsString()
    @IsNotEmpty()
    title: string;
    
    @IsString()
    description: string;
    done: boolean;
    createdAt: Date;
    updatedAt: Date;
    
}
