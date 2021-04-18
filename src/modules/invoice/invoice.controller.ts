/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Controller, Get, HttpCode, Param, ParseIntPipe, UseGuards, HttpStatus } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { AuthGuard } from '@nestjs/passport';
import { UserAuthGuard } from '../../commons/guards/user-auth.guard';
import { Roles } from '../../commons/decorators/roles.decorator';
import { GetAuthenticatedUser } from '../../commons/decorators/get-authenticated-user.decorator';
import { User } from '../auth/entities/user.entity';
import { AdminAuthGuard } from '../../commons/guards/admin-auth.guard';
import { AcceptedAuthGuard } from '../../commons/guards/accepted-auth.guard';
import { UserRole } from '../../commons/enums/user-role.enum';
import { ApiBadRequestResponse, ApiBearerAuth, ApiInternalServerErrorResponse, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';


@Controller('invoices')
@ApiBearerAuth()
@ApiTags('invoices')

export class InvoiceController {

  constructor(private invoiceService: InvoiceService) {
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: 'signInAdmin  user ' })
  @ApiResponse({ description: 'Ok' })
  @ApiBadRequestResponse({ description: 'bad Request ' })
  @ApiInternalServerErrorResponse({
    description:
      'data has been send but there is issiue in server so try later ',
  })
  @Get('all')
  @UseGuards(AuthGuard(), AdminAuthGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.WEAK_ADMIN)
  getAllInvoices() {
    return this.invoiceService.getAllInvoices();
  }
  /**
   * 
   * @param user 
   * @returns 
   */


  
   @HttpCode(HttpStatus.OK)
   @ApiOperation({ description: 'signInAdmin  user ' })
   @ApiResponse({ description: 'Ok' })
   @ApiBadRequestResponse({ description: 'bad Request ' })
   @ApiInternalServerErrorResponse({
     description:
       'data has been send but there is issiue in server so try later ',
   })
  @Get('user')
  @UseGuards(AuthGuard(), UserAuthGuard)
  @Roles(UserRole.USER)
  getUserInvoices(@GetAuthenticatedUser() user: User) {
    return this.invoiceService.getUserInvoices(user);
  }


  /**
   * 
   * @param id 
   * @returns 
   */


  
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: 'signInAdmin  user ' })
  @ApiResponse({ description: 'Ok' })
  @ApiBadRequestResponse({ description: 'bad Request ' })
  @ApiInternalServerErrorResponse({
    description:
      'data has been send but there is issiue in server so try later ',
  })
  @ApiParam({type:String,required:true,name:'id'})

  @Get(':id')
  @UseGuards(AuthGuard(), AcceptedAuthGuard)
  @Roles(UserRole.USER, UserRole.SUPER_ADMIN, UserRole.WEAK_ADMIN)
  getInvoiceById(@Param('id', ParseIntPipe) id: number) {
    return this.invoiceService.getInvoiceById(id);
  }

}
