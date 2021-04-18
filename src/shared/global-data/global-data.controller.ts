/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Controller, Get, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { GlobalDataService } from './global-data.service';
import { AuthGuard } from '@nestjs/passport';
import { AdminAuthGuard } from '../../commons/guards/admin-auth.guard';
import { Roles } from '../../commons/decorators/roles.decorator';
import { UserRole } from '../../commons/enums/user-role.enum';
import { ApiTags, ApiOperation, ApiResponse, ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiBearerAuth } from '@nestjs/swagger';


@ApiTags('global-data')
@ApiBearerAuth()
@Controller('global-data')
export class GlobalDataController {
  constructor(private gdService: GlobalDataService) {
  }


  
 @HttpCode(HttpStatus.CREATED)
 @ApiOperation({ description: 'customFilter  user ' })
 @ApiResponse({ description: 'Ok' })
 @ApiBadRequestResponse({ description: 'bad Request ' })
 @ApiInternalServerErrorResponse({
   description:
     'data has been send but there is issiue in server so try later ',
 })

  @Get()
  @UseGuards(AuthGuard(), AdminAuthGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.WEAK_ADMIN)
  getGlobalData() {
    return this.gdService.getGlobalData();
  }
}
