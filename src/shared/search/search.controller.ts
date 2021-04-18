import { ApiBody } from '@nestjs/swagger';
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { SearchService } from './search.service';
import { INameSearchDto, ISearchDto } from '../../commons/interfaces/search.interface';
import { ApiTags, ApiOperation, ApiResponse, ApiBadRequestResponse, ApiInternalServerErrorResponse } from '@nestjs/swagger';

@Controller('search')
@ApiTags('search')

export class SearchController {

  constructor(private searchService: SearchService) {

  }


 
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: 'search   ' })
  @ApiResponse({ description: 'Ok' })
  @ApiBadRequestResponse({ description: 'bad Request ' })
  @ApiInternalServerErrorResponse({
    description:
      'data has been send but there is issiue in server so try later ',
  })
  @ApiBody({type:ISearchDto})
  @Post()
  search(@Body() searchPayload: ISearchDto) {
    const { name, limit, page, take, type } = searchPayload;
    return this.searchService.search(name, type, take, page, limit);
  }

 
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: 'search   ' })
  @ApiResponse({ description: 'Ok' })
  @ApiBadRequestResponse({ description: 'bad Request ' })
  @ApiInternalServerErrorResponse({
    description:
      'data has been send but there is issiue in server so try later ',
  })
  @ApiBody({type:INameSearchDto})
  @Post('items-names')
  getItemsNames(@Body() searchPayload: INameSearchDto) {
    const { name, type } = searchPayload;
    return this.searchService.getNames(name, type);
  }
}
