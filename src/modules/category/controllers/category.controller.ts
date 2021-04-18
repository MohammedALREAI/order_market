/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Post, Put, UseGuards, HttpStatus } from '@nestjs/common';
import { CategoryDto, SubCategoryDto } from '../dto/category.dto';
import { CategoryService } from '../services/category.service';
import { AuthGuard } from '@nestjs/passport';
import { AdminAuthGuard } from '../../../commons/guards/admin-auth.guard';
import { Roles } from '../../../commons/decorators/roles.decorator';
import { UserRole } from '../../../commons/enums/user-role.enum';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiHeader, ApiInternalServerErrorResponse, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('categories')
@ApiBearerAuth()
@ApiTags('categories')


export class CategoryController {

  constructor(private readonly categoryService: CategoryService) {
  }


  /**
   * 
   * @returns 
   */

 
   @HttpCode(HttpStatus.OK)
   @ApiOperation({ description: 'getAllCategories  user ' })
   @ApiResponse({ description: 'Ok' })
   @ApiBadRequestResponse({ description: 'bad Request ' })
   @ApiInternalServerErrorResponse({
     description:
       'data has been send but there is issiue in server so try later ',
   })
  @Get()
  getAllCategories() {
    return this.categoryService.getAllCategories();
  }

/**
 * 
 * @param createCategoryDto 
 * @returns 
 */


 @ApiTags('categories')
 @HttpCode(HttpStatus.CREATED)
 @ApiOperation({ description: 'newCategory  user ' })
 @ApiResponse({ description: 'Ok' })
 @ApiBadRequestResponse({ description: 'bad Request ' })
 @ApiInternalServerErrorResponse({
   description:
     'data has been send but there is issiue in server so try later ',
 })
 @ApiBody({type:CategoryDto,required:true})
  @Post()
  @UseGuards(AuthGuard(), AdminAuthGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.WEAK_ADMIN)
  newCategory(@Body() createCategoryDto: CategoryDto) {
    return this.categoryService.newCategory(createCategoryDto);
  }


  /**
   * 
   * @param id 
   * @returns 
   */


 
 @HttpCode(HttpStatus.CREATED)
 @ApiOperation({ description: 'newCategory  user ' })
 @ApiResponse({ description: 'Ok' })
 @ApiBadRequestResponse({ description: 'bad Request ' })
 @ApiInternalServerErrorResponse({
   description:
     'data has been send but there is issiue in server so try later ',
 })
 @ApiParam({type:String,required:true,name:'id'})
  @Get(':id')
  getCategoryById(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.getCategoryById(id);
  }
/**
 * 
 * @param name 
 * @returns 
 */

 @ApiTags('categories')
 @HttpCode(HttpStatus.OK)
 @ApiOperation({ description: 'newCategory  user ' })
 @ApiResponse({ description: 'Ok' })
 @ApiBadRequestResponse({ description: 'bad Request ' })
 @ApiInternalServerErrorResponse({
   description:
     'data has been send but there is issiue in server so try later ',
 })
 @ApiParam({type:String,required:true,name:'name'})
  @Get('match-by-name/:name')
  searchMatchByName(@Param('name') name: string) {
    return this.categoryService.getMatchingByNames(name);
  }
  /**
   * 
   * @param id 
   * @param subCategoryDto 
   * @returns 
   */

 
   @HttpCode(HttpStatus.OK)
   @ApiOperation({ description: 'newCategory  user ' })
   @ApiResponse({ description: 'Ok' })
   @ApiBadRequestResponse({ description: 'bad Request ' })
   @ApiInternalServerErrorResponse({
     description:
       'data has been send but there is issiue in server so try later ',
   })
   @ApiParam({type:String,required:true,name:'id'})
   @ApiBody({type:SubCategoryDto})

  @Post(':id/new-sub-category')
  @UseGuards(AuthGuard(), AdminAuthGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.WEAK_ADMIN)
  newSubCategory(@Param('id', ParseIntPipe) id: number,
                 @Body() subCategoryDto: SubCategoryDto) {
    return this.categoryService.addSubCategory(id, subCategoryDto);
  }


  /**
   * 
   * @param id 
   * @param updateCategoryDto 
   * @returns 
   */


 
   @HttpCode(HttpStatus.OK)
   @ApiOperation({ description: 'newCategory  user ' })
   @ApiResponse({ description: 'Ok' })
   @ApiBadRequestResponse({ description: 'bad Request ' })
   @ApiInternalServerErrorResponse({
     description:
       'data has been send but there is issiue in server so try later ',
   })
   @ApiParam({type:String,required:true,name:'id'})
   @ApiBody({type:CategoryDto})
  @Put(':id/update')
  @UseGuards(AuthGuard(), AdminAuthGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.WEAK_ADMIN)
  updateCategory(@Param('id', ParseIntPipe) id: number,
                 @Body() updateCategoryDto: CategoryDto) {
    return this.categoryService.updateCategory(id, updateCategoryDto);
  }


  /**
   * 
   * @param id 
   * @returns 
   */


 
   @HttpCode(HttpStatus.OK)
   @ApiOperation({ description: 'deleteCategory  user ' })
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
  deleteCategory(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.deleteCategory(id);
  }

}
