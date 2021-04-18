import {  ApiProperty } from "@nestjs/swagger"

export class NewProductParams{

@ApiProperty({
    name:'type',
    type:String,
    description:"type product",
    required:true,
    
})
type:string

@ApiProperty({
    name:'folderName',
    type:String,
    description:"folderName product",
    required:true,
    
})
folderName:string
@ApiProperty({
    name:'subFolder',
    type:String,
    description:"subFolder product",
    required:true,
    
})
subFolder:string
}


