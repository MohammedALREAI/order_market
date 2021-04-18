/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiParam, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { InsertTagDto } from 'src/shared/dto/insert-tag.dto';
import { AwsService } from './aws.service';


@ApiTags('aws')
@Controller('aws')
@ApiBearerAuth()
export class AwsController {
  constructor(private awsService: AwsService) {
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: 'getObjects  user ' })
  @ApiResponse({ description: 'Ok' })
  @ApiBadRequestResponse({ description: 'bad Request ' })
  @ApiInternalServerErrorResponse({
    description:
      'data has been send but there is issiue in server so try later ',
  })
 
  @Get('any')
  async getObjects() {
    const { Contents } = await this.awsService.getAllFiles() as any;
    return Contents.length;
  }
}
