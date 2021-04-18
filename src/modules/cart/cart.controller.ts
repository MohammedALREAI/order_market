/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Body, Controller, Delete, Get, Param, ParseArrayPipe, ParseIntPipe, Post, Put, Query, UseGuards, HttpStatus, HttpCode } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserAuthGuard } from '../../commons/guards/user-auth.guard';
import { GetAuthenticatedUser } from '../../commons/decorators/get-authenticated-user.decorator';
import { User } from '../auth/entities/user.entity';
import { CartService } from './cart.service';
import { Roles } from '../../commons/decorators/roles.decorator';
import { OrderDto } from '../order/dto/order.dto';
import { CreatePaymentDto } from '../payment/dto/create-payment.dto';
import { RemoveCartItem } from '../../commons/interfaces/remove-cart-item';
import { UserRole } from '../../commons/enums/user-role.enum';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiHeader, ApiInternalServerErrorResponse, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
@ApiTags('Cart')
@UseGuards(AuthGuard(), UserAuthGuard)
@Roles(UserRole.USER)
@ApiBearerAuth()
@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {
  }
  /**
   * 
   * @param user 
   * @returns 
   */


  
   @HttpCode(HttpStatus.CREATED)
   @ApiOperation({ description: 'createUserCart  user ' })
   @ApiResponse({ description: 'Ok' })
   @ApiBadRequestResponse({ description: 'bad Request ' })
   @ApiInternalServerErrorResponse({
     description:
       'data has been send but there is issiue in server so try later ',
   })


  @Post('create-user-cart')
  createUserCart(@GetAuthenticatedUser() user: User) {
    return this.cartService.createCart(user);
  }
  /**
   * 
   * @returns 
   */



  
  @ApiTags('Cart')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: 'getTotalCarts  user ' })
  @ApiResponse({ description: 'Ok' })
  @ApiBadRequestResponse({ description: 'bad Request ' })
  @ApiInternalServerErrorResponse({
    description:
      'data has been send but there is issiue in server so try later ',
  })
  @Get('count')
  getTotalCarts() {
    return this.cartService.getTotalCarts();
  }

/**
 * 
 * @param user 
 * @returns 
 */


@ApiBearerAuth()
 @ApiTags('Cart')
 @HttpCode(HttpStatus.CREATED)
 @ApiOperation({ description: 'signInAdmin  user ' })
 @ApiResponse({ description: 'Ok' })
 @ApiBadRequestResponse({ description: 'bad Request ' })
 @ApiInternalServerErrorResponse({
   description:
     'data has been send but there is issiue in server so try later ',
 })
  @Get('user-cart')
  getUserCart(@GetAuthenticatedUser() user: User) {
    return this.cartService.getUserCart(user);
  }


  /**
   * 
   * @param user 
   * @param createOrderDto 
   * @param createPaymentDto 
   * @returns 
   */

   @ApiBearerAuth()
 
   @HttpCode(HttpStatus.CREATED)
   @ApiOperation({ description: 'checkoutOnCart  user ' })
   @ApiResponse({ description: 'Ok' })
   @ApiBadRequestResponse({ description: 'bad Request ' })
   @ApiInternalServerErrorResponse({
     description:
       'data has been send but there is issiue in server so try later ',
   })
   @ApiBody({type:OrderDto,required:true,description:"OrderDto"})
   @ApiBody({type:CreatePaymentDto,required:true,description:"CreatePaymentDto"})
  @Post('checkout-on-cart')
  checkoutOnCart(@GetAuthenticatedUser() user: User,
                 @Body('createOrderDto') createOrderDto: OrderDto,
                 @Body('createPaymentDto') createPaymentDto: CreatePaymentDto) {
    return this.cartService.checkoutOnCart(user, createOrderDto, createPaymentDto);
  }


  /**
   * 
   * @param user 
   * @param cartProductId 
   * @param createOrderDto 
   * @param createPaymentDto 
   * @returns 
   */

  
 
   @HttpCode(HttpStatus.CREATED)
   @ApiOperation({ description: 'signInAdmin  user ' })
   @ApiResponse({ description: 'Ok' })
   @ApiBadRequestResponse({ description: 'bad Request ' })
   @ApiInternalServerErrorResponse({
     description:
       'data has been send but there is issiue in server so try later ',
   })
   @ApiBody({type:OrderDto,description:"OrderDto"})
   @ApiBody({type:CreatePaymentDto,description:"CreatePaymentDto"}) 
     @ApiParam({ name: 'cartProductId', type: Number, required: true })
  @Post('checkout-on-single-product/:cartProductId')
  checkoutOnSingleProduct(@GetAuthenticatedUser() user: User,
                          @Param('cartProductId', ParseIntPipe) cartProductId: number,
                          @Body('createOrderDto') createOrderDto: OrderDto,
                          @Body('createPaymentDto') createPaymentDto: CreatePaymentDto) {
    return this.cartService.checkoutOnSingleProduct(user, cartProductId, createOrderDto, createPaymentDto);
  }

/**
 * 
 * @param user 
 * @returns 
 */


 @ApiTags('Cart')
 @HttpCode(HttpStatus.CREATED)
 @ApiOperation({ description: 'signInAdmin  user ' })
 @ApiResponse({ description: 'Ok' })
 @ApiBadRequestResponse({ description: 'bad Request ' })
 @ApiInternalServerErrorResponse({
   description:
     'data has been send but there is issiue in server so try later ',
 })
  @Delete('clear-cart')
  clearCart(@GetAuthenticatedUser() user: User) {
    return this.cartService.clearCart(null, user.cartId, true);
  }


  /**
   * 
   * @param user 
   * @param cartProducts 
   * @returns 
   */
  @Delete('remove-products-from-cart')
  removeProductsFromCart(@GetAuthenticatedUser() user: User,
                         @Body('cartProducts', ParseArrayPipe) cartProducts: RemoveCartItem[]) {
    return this.cartService.removeProductsFromCart(user.cartId, cartProducts, true);
  }

  /**
   * 
   * @param cartId 
   * @param cartProductId 
   * @returns 
   */


  
 
   @HttpCode(HttpStatus.CREATED)
   @ApiOperation({ description: 'signInAdmin  user ' })
   @ApiResponse({ description: 'Ok' })
   @ApiBadRequestResponse({ description: 'bad Request ' })
   @ApiInternalServerErrorResponse({
     description:
       'data has been send but there is issiue in server so try later ',
   })
   @ApiParam({ name: 'cartId', type: String, required: true })
   @ApiParam({ name: 'cartProductId', type: String, required: true })
  @Delete(':cartId/remove-product-from-cart/:cartProductId')
  removeCartProductFromCart(@Param('cartId', ParseIntPipe) cartId: number,
                            @Param('cartProductId', ParseIntPipe) cartProductId: number) {
    return this.cartService.removeCartProduct(cartId, cartProductId);
  }

  /**
   * 
   * @param cartId 
   * @param cartProductId 
   * @param newQuantity 
   * @returns 
   */
  
 
   @HttpCode(HttpStatus.CREATED)
   @ApiOperation({ description: 'signInAdmin  user ' })
   @ApiResponse({ description: 'Ok' })
   @ApiBadRequestResponse({ description: 'bad Request ' })
   @ApiInternalServerErrorResponse({
     description:
       'data has been send but there is issiue in server so try later ',
   })
   @ApiParam({ name: 'cartId', type: String})
   @ApiParam({ name: 'cartProductId', type: String})
   @ApiQuery({ name: 'userId', type: String, required: true })

  @Put(':cartId/update-product-cart-quantity/:cartProductId')
  updateCartProductQuantity(@Param('cartId', ParseIntPipe) cartId: number,
                            @Param('cartProductId', ParseIntPipe) cartProductId: number,
                            @Query('newQuantity', ParseIntPipe) newQuantity: number) {
    return this.cartService.updateCartProductQuantity(cartId, cartProductId, newQuantity);
  }
}
