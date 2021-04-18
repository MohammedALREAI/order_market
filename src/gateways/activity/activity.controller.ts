import { ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Controller, Get, HttpCode, HttpStatus, ParseIntPipe, Query, UseGuards } from '@nestjs/common';
import { ActivityRepository } from './activity.repository';
import { AuthGuard } from '@nestjs/passport';
import { AdminAuthGuard } from '../../commons/guards/admin-auth.guard';
import { Roles } from '../../commons/decorators/roles.decorator';
import { UserRole } from '../../commons/enums/user-role.enum';
import { ApiTags, ApiOperation, ApiResponse, ApiBadRequestResponse, ApiInternalServerErrorResponse } from '@nestjs/swagger';


@ApiTags('activities')
@ApiBearerAuth()
@Controller('activities')
export class ActivityController {

  constructor(private activityRepo: ActivityRepository) {
  }
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: 'getAllOrders  user ' })
  @ApiResponse({ description: 'Ok' })
  @ApiBadRequestResponse({ description: 'bad Request ' })
  @ApiInternalServerErrorResponse({
    description:
      'data has been send but there is issiue in server so try later ',
  })
  @ApiQuery({name:"take",type:Number,})
  @ApiQuery({name:"skip",type:Number,})
  @Get()
  @UseGuards(AuthGuard(), AdminAuthGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.WEAK_ADMIN)
  async getActivities(@Query('take', ParseIntPipe) take: number,
                      @Query('skip') skip: number) {
    return await this.activityRepo.getActivities(take, skip);
  }
}
