import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { EmailSenderService } from './email-sender.service';
import { ContactMessageDto } from '../../dto/contact-message.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiBody } from '@nestjs/swagger';
@ApiTags('email')

@Controller('email')
export class EmailController {

  constructor(private emailSenderService: EmailSenderService) {
  }



  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: 'signInAdmin  user ' })
  @ApiResponse({ description: 'Ok' })
  @ApiBadRequestResponse({ description: 'bad Request ' })
  @ApiInternalServerErrorResponse({
    description:
      'data has been send but there is issiue in server so try later ',
  })
  @ApiBody({type:ContactMessageDto})
  @Post('contact')
  contactMessage(@Body() contactMessageDto: ContactMessageDto) {
    return this.emailSenderService.sendContactMessage(contactMessageDto);
  }
}
