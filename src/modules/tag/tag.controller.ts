import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagDto } from './dto/tag.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../../commons/decorators/roles.decorator';
import { AdminAuthGuard } from '../../commons/guards/admin-auth.guard';
import { UserRole } from '../../commons/enums/user-role.enum';
import { ProductService } from '../product/product.service';
import { SubCategoryService } from '../category/services/sub-category.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiBody, ApiParam, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('tags')
@ApiBearerAuth()

@Controller('tags')
export class TagController {
  constructor(private tagService: TagService, private productService: ProductService,
              private subCategoryService: SubCategoryService) {
  }



  /**
   * 
   * @returns 
   */

  
 
 @HttpCode(HttpStatus.OK)
 @ApiOperation({ description: ' get all tags  user ' })
 @ApiResponse({ description: 'Ok' })
 @ApiBadRequestResponse({ description: 'bad Request ' })
 @ApiInternalServerErrorResponse({
   description:
     'data has been send but there is issiue in server so try later ',
 })
  @Get()
  getAllTags() {
    return this.tagService.getAllTags();
  }
  /**
   * 
   * @returns 
   */


   
 @HttpCode(HttpStatus.OK)
 @ApiOperation({ description: ' getSubCategoryTags ' })
 @ApiResponse({ description: 'Ok' })
 @ApiBadRequestResponse({ description: 'bad Request ' })
 @ApiInternalServerErrorResponse({
   description:
     'data has been send but there is issiue in server so try later ',
 })
  @Get('sub-categories')
  getSubCategoriesTags() {
    return this.subCategoryService.getSubCategoryTags();
  }




  /**
   * 
   * @returns 
   */

  
 @HttpCode(HttpStatus.OK)
 @ApiOperation({ description: ' getProductsTags ' })
 @ApiResponse({ description: 'Ok' })
 @ApiBadRequestResponse({ description: 'bad Request ' })
 @ApiInternalServerErrorResponse({
   description:
     'data has been send but there is issiue in server so try later ',
 })
  @Get('products')
  getProductsTags() {
    return this.productService.getProductsTags();
  }



  
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: ' getProductsTags ' })
  @ApiResponse({ description: 'Ok' })
  @ApiBadRequestResponse({ description: 'bad Request ' })
  @ApiInternalServerErrorResponse({
    description:
      'data has been send but there is issiue in server so try later ',
  })
  @ApiBody({type:TagDto})
  @Post('new')
  @UseGuards(AuthGuard(), AdminAuthGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.WEAK_ADMIN)
  newTag(@Body() createTagDto: TagDto) {
    return this.tagService.createNewTag(createTagDto);
  }

  /**
   * 
   * @param id 
   * @returns 
   */

   
   @HttpCode(HttpStatus.OK)
   @ApiOperation({ description: ' getProductsTags ' })
   @ApiResponse({ description: 'Ok' })
   @ApiBadRequestResponse({ description: 'bad Request ' })
   @ApiInternalServerErrorResponse({
     description:
       'data has been send but there is issiue in server so try later ',
   })
   @ApiParam({type:String,required:true,name:'id'})

  @Delete(':id/delete')
  @UseGuards(AuthGuard(), AdminAuthGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.WEAK_ADMIN)
  deleteTag(@Param('id', ParseIntPipe) id: number) {
    return this.tagService.deleteTag(id);
  }

  /**
   * 
   * @param id 
   * @returns 
   */

   
   @HttpCode(HttpStatus.OK)
   @ApiOperation({ description: ' getProductsTags ' })
   @ApiResponse({ description: 'Ok' })
   @ApiBadRequestResponse({ description: 'bad Request ' })
   @ApiInternalServerErrorResponse({
     description:
       'data has been send but there is issiue in server so try later ',
   })
   @ApiParam({type:String,required:true,name:'id'})

  @Get(':id')
  getTagById(@Param('id', ParseIntPipe) id: number) {
    return this.tagService.getTagById(id);
  }



  
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ description: ' getProductsTags ' })
  @ApiResponse({ description: 'Ok' })
  @ApiBadRequestResponse({ description: 'bad Request ' })
  @ApiInternalServerErrorResponse({
    description:
      'data has been send but there is issiue in server so try later ',
  })
  @ApiParam({type:String,required:true,name:'id'})
@ApiBody({type:TagDto})
  @Put(':id/update')
  @UseGuards(AuthGuard(), AdminAuthGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.WEAK_ADMIN)
  updateTag(@Param('id', ParseIntPipe) id: number, @Body() updateTagDto: TagDto) {
    return this.tagService.updateTag(id, updateTagDto);
  }

}
