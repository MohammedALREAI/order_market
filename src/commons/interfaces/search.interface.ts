import { ApiProperty, PickType } from "@nestjs/swagger"

export class ISearchDto {
  @ApiProperty({
    type: String,
    name: 'name',
    description: 'This is the name of the product that you want to add to the cart',
    required: true,
    title: 'name',
  })
  name: string
  @ApiProperty({
    type: String,
    name: 'type',
    description: 'This is the type of the product that you want to add to the cart',
    required: true,
    title: 'type',
  })

  type: string
  
  @ApiProperty({
    type: Number,
    name: 'take',
    description: 'This is the name of the product that you want to add to the cart',
    required:false,
    title: 'take',
  })

  take?: number
  
  @ApiProperty({
    type: Number,
    name: 'page',
    description: 'This is the page of the product that you want to add to the cart',
    required: false,
    title: 'page',
  })
  page?: number
  @ApiProperty({
    type: Number,
    name: 'v',
    description: 'This is the limit of the product that you want to add to the cart',
    required: true,
    title: 'limit',
  })
  
  limit?: number
}

export class INameSearchDto extends PickType(ISearchDto,['type','name'] as const ) {
 
}
