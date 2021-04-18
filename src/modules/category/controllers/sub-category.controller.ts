import { NewProductParams } from './../dto/newProduct';
import { HttpCode, HttpStatus } from '@nestjs/common';
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UploadedFiles, UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { InsertTagDto } from '../../../shared/dto/insert-tag.dto';
import { SubCategoryService } from '../services/sub-category.service';
import { SubCategoryDto } from '../dto/category.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { AdminAuthGuard } from '../../../commons/guards/admin-auth.guard';
import { Roles } from '../../../commons/decorators/roles.decorator';
import { UserRole } from '../../../commons/enums/user-role.enum';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiHeader, ApiInternalServerErrorResponse, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';


@Controller('sub-categories')
@ApiBearerAuth()
@ApiTags('sub-categories')

export class SubCategoryController {
  constructor(private readonly subCategoryService: SubCategoryService) {
  }

  /**
   * 
   * @returns 
   */
   @ApiTags('sub-categories')
   @HttpCode(HttpStatus.OK)
   @ApiOperation({ description: 'getAllCategories  user ' })
   @ApiResponse({ description: 'Ok' })
   @ApiBadRequestResponse({ description: 'bad Request ' })
   @ApiInternalServerErrorResponse({
     description:
       'data has been send but there is issiue in server so try later ',
   })
  @Get()
  getAllSubCategories() {
    return this.subCategoryService.getAllSubCategories();
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

  @Get('mix-latest-products')
  getMixedLatestProducts() {
    return this.subCategoryService.fetchMixLatestProducts();
  }

  /**
   * 
   * @param tagName 
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
   @ApiParam({name:'tagName',required:true,type:String})
  @Get('search-by-tag-name/:tagName')
  getSubCategoriesByTagName(@Param('tagName') tagName: string) {
    return this.subCategoryService.getSubCategoriesByTagName(tagName);
  }
  /**
   * 
   * @param name 
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
   @ApiParam({name:'name',required:true,type:String})
  @Get('match-by-name/:name')
  searchMatchByName(@Param('name') name: string) {
    return this.subCategoryService.getMatchingByNames(name);
  }



  /**
   * 
   * @param id 
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
   @ApiParam({name:'id',required:true,type:String})
  @Get(':id')
  getSubCategory(@Param('id', ParseIntPipe) id: number) {
    return this.subCategoryService.getSubCategory(id);
  }
/**
 * 
 * @param id 
 * @param newProductParams 
 * @param name 
 * @param description 
 * @param refArr 
 * @param currentPrice 
 * @param quantity 
 * @param images 
 * @returns 
 */

 @ApiTags('sub-categories')
   @HttpCode(HttpStatus.OK)
   @ApiOperation({ description: 'getAllCategories  user ' })
   @ApiResponse({ description: 'Ok' })
   @ApiBadRequestResponse({ description: 'bad Request ' })
   @ApiInternalServerErrorResponse({
     description:
       'data has been send but there is issiue in server so try later ',
   })
  @Post(':id/new-product/:folderName/:subFolder/:type')
  @UseGuards(AuthGuard(), AdminAuthGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.WEAK_ADMIN)
  @UseInterceptors(FilesInterceptor('images'))
@ApiParam({name:"newProductParams",type:NewProductParams})
@ApiParam({name:'id',type:String})
  newProduct(
    @Param('id', ParseIntPipe) id: number,
    @Param('NewProductParams') newProductParams: NewProductParams,
   
    @Body('name') name: string,
    @Body('description') description: string,
    @Body('references') refArr: any,
    @Body('currentPrice', ParseIntPipe) currentPrice: number,
    @Body('quantity', ParseIntPipe) quantity: number,
    @UploadedFiles() images: any,
  ) {
    const{folderName,subFolder,type}=newProductParams
    return this.subCategoryService.newProduct(id, folderName, subFolder, type, {
      name,
      description,
      images,
      quantity,
      currentPrice,
      references: refArr ? JSON.parse(refArr) : null,
    });
  }
/**
 * 
 * @param id 
 * @param payload 
 * @returns 
 */


 @ApiTags('sub-categories')
   @HttpCode(HttpStatus.OK)
   @ApiOperation({ description: 'getAllCategories  user ' })
   @ApiResponse({ description: 'Ok' })
   @ApiBadRequestResponse({ description: 'bad Request ' })
   @ApiInternalServerErrorResponse({
     description:
       'data has been send but there is issiue in server so try later ',
   })
   @ApiParam({name:'id',type:String,required:true})
   @ApiBody({type:InsertTagDto})
  @Post(':id/add-tags')
  @UseGuards(AuthGuard(), AdminAuthGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.WEAK_ADMIN)
  addTagsToCategory(@Param('id', ParseIntPipe) id: number,
                    @Body() payload: InsertTagDto) {
    return this.subCategoryService.addTagsToCategory(id, payload);

  }

  /**
   * 
   * @param id 
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
   @ApiParam({name:'id',type:String,required:true})
  @Delete(':id/delete')
  @UseGuards(AuthGuard(), AdminAuthGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.WEAK_ADMIN)
  deleteSubCategory(@Param('id', ParseIntPipe) id: number) {
    return this.subCategoryService.deleteSubCategory(id);
  }



  /**
   * 
   * @param id 
   * @param updateSubCategoryDto 
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
   @ApiParam({name:'id',type:String,required:true})
   @ApiBody({type:SubCategoryDto})
  @Put(':id/update')
  @UseGuards(AuthGuard(), AdminAuthGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.WEAK_ADMIN)
  updateSubCategory(@Param('id', ParseIntPipe) id: number,
                    @Body() updateSubCategoryDto: SubCategoryDto) {
    return this.subCategoryService.updateSubCategory(id, updateSubCategoryDto);
  }


  /**
   * 
   * @param id 
   * @param data 
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
   @ApiParam({name:'id',type:String,required:true})
  @Delete(':id/remove-tags')
  @UseGuards(AuthGuard(), AdminAuthGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.WEAK_ADMIN)
  removeTagsFromCategory(@Param('id', ParseIntPipe) id: number,
                         @Body() data: any) {
    const { payload } = data;
    return this.subCategoryService.removeTagsFromCategory(id, payload);

  }

}
