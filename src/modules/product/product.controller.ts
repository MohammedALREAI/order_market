import { HttpStatus } from '@nestjs/common';
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UploadedFiles, UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { UpdateProductDto } from './dto/update-product.dto';
import { InsertTagDto } from '../../shared/dto/insert-tag.dto';
import { CreateCartProductDto } from '../cart/dto/create-cart-product.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { AdminAuthGuard } from '../../commons/guards/admin-auth.guard';
import { Roles } from '../../commons/decorators/roles.decorator';
import { UserRole } from '../../commons/enums/user-role.enum';
import { UserAuthGuard } from '../../commons/guards/user-auth.guard';
import { ProductsCustomFilterDto } from './dto/products-custom-filter.dto';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiHeader, ApiInternalServerErrorResponse, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('products')
@ApiBearerAuth()
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {
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
  getAllProducts() {
    return this.productService.getAllProducts();
  }
  /**
   * 
   * @param limit 
   * @param page 
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

 @ApiQuery({name:"limit",type:Number})
 @ApiQuery({name:"page",type:Number})


  @Get('shop')
  getShopProducts(@Query('limit', ParseIntPipe) limit: number,
                  @Query('page', ParseIntPipe) page: number) {
    return this.productService.getShopProducts(page, limit);
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

  @Get('tags-names')
  getProductsTagsName() {
    return this.productService.fetchProductsTagsNames();
  }


  
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: 'getTotalProducts  user ' })
  @ApiResponse({ description: 'Ok' })
  @ApiBadRequestResponse({ description: 'bad Request ' })
  @ApiInternalServerErrorResponse({
    description:
      'data has been send but there is issiue in server so try later ',
  })
 
  @Get('count')
  getTotalProducts() {
    return this.productService.getTotalProducts();
  }


  
  
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: 'getTotalSales  user ' })
  @ApiResponse({ description: 'Ok' })
  @ApiBadRequestResponse({ description: 'bad Request ' })
  @ApiInternalServerErrorResponse({
    description:
      'data has been send but there is issiue in server so try later ',
  })
  @Get('sales')
  getTotalSales() {
    return this.productService.getTotalSales();
  }


  
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: 'getMixLatestProduct  user ' })
  @ApiResponse({ description: 'Ok' })
  @ApiBadRequestResponse({ description: 'bad Request ' })
  @ApiInternalServerErrorResponse({
    description:
      'data has been send but there is issiue in server so try later ',
  })
  @Get('mix-latest-products')
  async getMixLatestProduct() {
    return await this.productService.getMixLatestProduct();
  }

/**
 * 
 * @returns 
 */
  
  
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: 'getMixLatestProduct  user ' })
  @ApiResponse({ description: 'Ok' })
  @ApiBadRequestResponse({ description: 'bad Request ' })
  @ApiInternalServerErrorResponse({
    description:
      'data has been send but there is issiue in server so try later ',
  })

  @Get('most-sales')
  async getMostSalesProducts() {
    return await this.productService.getMostSalesProducts();
  }


  
  
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ description: 'customFilter  user ' })
  @ApiResponse({ description: 'Ok' })
  @ApiBadRequestResponse({ description: 'bad Request ' })
  @ApiInternalServerErrorResponse({
    description:
      'data has been send but there is issiue in server so try later ',
  })
  @Post('custom-filter')
  getFilteredBetweenRange(@Body() productsCustomFilterDto: ProductsCustomFilterDto) {
    return this.productService.customFilter(productsCustomFilterDto);
  }


  
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ description: 'customFilter  user ' })
  @ApiResponse({ description: 'Ok' })
  @ApiBadRequestResponse({ description: 'bad Request ' })
  @ApiInternalServerErrorResponse({
    description:
      'data has been send but there is issiue in server so try later ',
  })
  @ApiParam({ name:"tagName",type:String})
  @Get('search-by-tag-name/:tagName')
  getProductsByTagName(@Param('tagName') tagName: string) {
    return this.productService.searchForProductsByTagName(tagName);
  }
  /**
   * 
   * @param name 
   * @returns 
   */

  
   
   @HttpCode(HttpStatus.CREATED)
   @ApiOperation({ description: 'customFilter  user ' })
   @ApiResponse({ description: 'Ok' })
   @ApiBadRequestResponse({ description: 'bad Request ' })
   @ApiInternalServerErrorResponse({
     description:
       'data has been send but there is issiue in server so try later ',
   })
   @ApiParam({ name:"tagName",type:String})
  @Get('match-by-name/:name')
  searchMatchByName(@Param('name') name: string) {
    return this.productService.getMatchingByNames(name);
  }
  /**
   * 
   * @param id 
   * @returns 
   */



  
   
   @HttpCode(HttpStatus.CREATED)
   @ApiOperation({ description: 'customFilter  user ' })
   @ApiResponse({ description: 'Ok' })
   @ApiBadRequestResponse({ description: 'bad Request ' })
   @ApiInternalServerErrorResponse({
     description:
       'data has been send but there is issiue in server so try later ',
   })
   @ApiParam({ name:"id",type:String})
  @Get(':id')
  getProductById(@Param('id', ParseIntPipe) id: number) {
    return this.productService.getProductById(id);
  }
  /**
   * 
   * @param id 
   * @param updateProductDto 
   * @returns 
   */



  
   
   @HttpCode(HttpStatus.CREATED)
   @ApiOperation({ description: 'customFilter  user ' })
   @ApiResponse({ description: 'Ok' })
   @ApiBadRequestResponse({ description: 'bad Request ' })
   @ApiInternalServerErrorResponse({
     description:
       'data has been send but there is issiue in server so try later ',
   })
   @ApiParam({ name:"id",type:String})
   @ApiBody({type:UpdateProductDto})
  @Put(':id/update')
  @UseGuards(AuthGuard(), AdminAuthGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.WEAK_ADMIN)
  updateProduct(@Param('id', ParseIntPipe) id: number,
                @Body() updateProductDto: UpdateProductDto) {
    return this.productService.updateProduct(id, updateProductDto);
  }

  /**
   * 
   * @param productId 
   * @param cartId 
   * @param createCartProductDto 
   * @returns 
   */


   
   @HttpCode(HttpStatus.CREATED)
   @ApiOperation({ description: 'customFilter  user ' })
   @ApiResponse({ description: 'Ok' })
   @ApiBadRequestResponse({ description: 'bad Request ' })
   @ApiInternalServerErrorResponse({
     description:
       'data has been send but there is issiue in server so try later ',
   })
   @ApiParam({ name:"productId",type:String})
   @ApiParam({ name:"cartId",type:String})
   @ApiBody({type:CreateCartProductDto})
  @Post(':productId/add-to-cart/:cartId')
  @UseGuards(AuthGuard(), UserAuthGuard)
  @Roles(UserRole.USER)
  addToCart(@Param('productId', ParseIntPipe) productId: number,
            @Param('cartId', ParseIntPipe) cartId: number,
            @Body() createCartProductDto: CreateCartProductDto) {
    return this.productService.addProductToCart(productId, cartId, createCartProductDto);
  }
/**
 * 
 * @param id 
 * @param payload 
 * @returns 
 */


 
   @HttpCode(HttpStatus.CREATED)
   @ApiOperation({ description: 'customFilter  user ' })
   @ApiResponse({ description: 'Ok' })
   @ApiBadRequestResponse({ description: 'bad Request ' })
   @ApiInternalServerErrorResponse({
     description:
       'data has been send but there is issiue in server so try later ',
   })
   @ApiParam({ name:"id",type:String})
   @ApiBody({type:InsertTagDto})
  @Post(':id/add-tags')
  @UseGuards(AuthGuard(), AdminAuthGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.WEAK_ADMIN)
  addTagsToProduct(@Param('id', ParseIntPipe) id: number,
                   @Body() payload: InsertTagDto) {
    return this.productService.addTagsToProduct(id, payload);
  }


/**
 * 
 * @param productId 
 * @param type 
 * @param folderName 
 * @param subFolder 
 * @param removedImages 
 * @param images 
 * @returns 
 */

 
 @HttpCode(HttpStatus.CREATED)
 @ApiOperation({ description: 'customFilter  user ' })
 @ApiResponse({ description: 'Ok' })
 @ApiBadRequestResponse({ description: 'bad Request ' })
 @ApiInternalServerErrorResponse({
   description:
     'data has been send but there is issiue in server so try later ',
 })
 @ApiParam({ name:"id",type:String})
 @ApiBody({type:InsertTagDto})

  @Put(':productId/manage-images/:folderName/:subFolder/:type')
  @UseGuards(AuthGuard(), AdminAuthGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.WEAK_ADMIN)
  @UseInterceptors(FilesInterceptor('images'))
  manageProductImages(@Param('productId', ParseIntPipe) productId: number,
                      @Param('type') type: string,
                      @Param('folderName') folderName: string,
                      @Param('subFolder') subFolder: string,
                      @Body('removedImages') removedImages: any,
                      @UploadedFiles() images: any) {
    return this.productService.manageProductImages
    (productId, { removedImages: removedImages ? JSON.parse(removedImages) : null, newImages: images },
      type, folderName, subFolder);
  }

  @Delete(':id/remove-tags')
  @UseGuards(AuthGuard(), AdminAuthGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.WEAK_ADMIN)
  removeTagsFromProduct(@Param('id', ParseIntPipe) id: number,
                        @Body() data: any) {
    const { payload } = data;
    return this.productService.removeTagsFromProduct(id, payload);
  }

  @Delete(':id/delete')
  @UseGuards(AuthGuard(), AdminAuthGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.WEAK_ADMIN)
  deleteProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productService.deleteProduct(id);
  }
}
