/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Put, UseGuards, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserAuthGuard } from '../../commons/guards/user-auth.guard';
import { Roles } from '../../commons/decorators/roles.decorator';
import { GetAuthenticatedUser } from '../../commons/decorators/get-authenticated-user.decorator';
import { User } from '../auth/entities/user.entity';
import { OrderService } from './order.service';
import { AdminAuthGuard } from '../../commons/guards/admin-auth.guard';
import { AcceptedAuthGuard } from '../../commons/guards/accepted-auth.guard';
import { OrderDto } from './dto/order.dto';
import { UserRole } from '../../commons/enums/user-role.enum';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiHeader, ApiInternalServerErrorResponse, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';


@Controller('orders')
@ApiBearerAuth()
@ApiTags('orders')

export class OrderController {
  constructor(private orderService: OrderService) {
  }


  /**
   * 
   * @returns 
   */

  
   
   @HttpCode(HttpStatus.OK)
   @ApiOperation({ description: 'getAllOrders  user ' })
   @ApiResponse({ description: 'Ok' })
   @ApiBadRequestResponse({ description: 'bad Request ' })
   @ApiInternalServerErrorResponse({
     description:
       'data has been send but there is issiue in server so try later ',
   })
  @Get('all')
  @UseGuards(AuthGuard(), AdminAuthGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.WEAK_ADMIN)
  getAllOrders() {
    return this.orderService.getAllOrders();
  }

/**
 * 
 * @param user 
 * @returns 
 */

 
 @HttpCode(HttpStatus.OK)
 @ApiOperation({ description: 'getUserOrders  user ' })
 @ApiResponse({ description: 'Ok' })
 @ApiBadRequestResponse({ description: 'bad Request ' })
 @ApiInternalServerErrorResponse({
   description:
     'data has been send but there is issiue in server so try later ',
 })
  @Get('user')
  @UseGuards(AuthGuard(), UserAuthGuard)
  @Roles(UserRole.USER)
  getUserOrders(@GetAuthenticatedUser() user: User) {
    return this.orderService.getUserOrders(user);
  }
/**
 * 
 * @param id 
 * @returns 
 */


 
 @HttpCode(HttpStatus.OK)
 @ApiOperation({ description: 'getOrderById  user ' })
 @ApiResponse({ description: 'Ok' })
 @ApiBadRequestResponse({ description: 'bad Request ' })
 @ApiInternalServerErrorResponse({
   description:
     'data has been send but there is issiue in server so try later ',
 })
 @ApiParam({type:String,required:true,name:'id'})

  @Get(':id')
  @UseGuards(AuthGuard(), AcceptedAuthGuard)
  @Roles(UserRole.USER)
  getOrderById(@Param('id', ParseIntPipe) id: number) {
    return this.orderService.getOrderById(id);
  }

  /**
   * 
   * @param id 
   * @returns 
   */

   
 @HttpCode(HttpStatus.OK)
 @ApiOperation({ description: 'getOrderDetails  user ' })
 @ApiResponse({ description: 'Ok' })
 @ApiBadRequestResponse({ description: 'bad Request ' })
 @ApiInternalServerErrorResponse({
   description:
     'data has been send but there is issiue in server so try later ',
 })
 @ApiParam({type:String,required:true,name:'id'})

  @Get(':id/details')
  @UseGuards(AuthGuard(), AcceptedAuthGuard)
  @Roles(UserRole.USER)
  getOrderDetails(@Param('id', ParseIntPipe) id: number) {
    return this.orderService.getOrderDetails(id);
  }



  
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: 'updateOrder  user ' })
  @ApiResponse({ description: 'Ok' })
  @ApiBadRequestResponse({ description: 'bad Request ' })
  @ApiInternalServerErrorResponse({
    description:
      'data has been send but there is issiue in server so try later ',
  })
  @ApiParam({type:String,required:true,name:'id'})
 
  @Put(':id/update')
  @UseGuards(AuthGuard(), UserAuthGuard)
  @Roles(UserRole.USER)
  updateOrder(@Param('id', ParseIntPipe) id: number,
              @Body() updateOrderDto: OrderDto) {
    return this.orderService.updateOrder(id, updateOrderDto);
  }



  
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: 'deleteOrder  user ' })
  @ApiResponse({ description: 'Ok' })
  @ApiBadRequestResponse({ description: 'bad Request ' })
  @ApiInternalServerErrorResponse({
    description:
      'data has been send but there is issiue in server so try later ',
  })
  @ApiParam({type:String,required:true,name:'id'})
 
  @Delete(':id/cancel')
  @UseGuards(AuthGuard(), UserAuthGuard)
  @Roles(UserRole.USER)
  deleteOrder(@Param('id', ParseIntPipe) id: number) {
    return this.orderService.deleteOrder(id);
  }
}
