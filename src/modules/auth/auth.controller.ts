/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { EmailLoginDto } from './dto/email-login.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../../commons/decorators/roles.decorator';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { GetAuthenticatedUser } from '../../commons/decorators/get-authenticated-user.decorator';
import { User } from './entities/user.entity';
import { AdminAuthGuard } from '../../commons/guards/admin-auth.guard';
import { UserAuthGuard } from '../../commons/guards/user-auth.guard';
import { ApiBadRequestResponse, ApiBasicAuth, ApiBody, ApiInternalServerErrorResponse, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { EditRolesDto } from './dto/edit-roles.dto';
import { UserRole } from '../../commons/enums/user-role.enum';

@ApiTags('Auth')

@Controller('Auth')
export class AuthController {

  constructor(private authService: AuthService) {
  }


  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ description: 'register new user ' })
  @ApiResponse({ description: 'Ok' })
  @ApiBadRequestResponse({ description: 'bad Request ' })
  @ApiInternalServerErrorResponse({
    description:
      'data has been send but there is issiue in server so try later ',
  })
  @Post('register/user')
  @ApiBody({ type: AuthCredentialsDto, required: true })
  signUpUser(@Body() authCredentialsDto: AuthCredentialsDto,
  ) {
    return this.authService.signUpUser(authCredentialsDto);
  }
  
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ description: 'testEmail  user ' })
  @ApiResponse({ description: 'Ok' })
  @ApiBadRequestResponse({ description: 'bad Request ' })
  @ApiInternalServerErrorResponse({
    description:
      'data has been send but there is issiue in server so try later ',
  })
  @ApiBody({ type: String, required: true })

  @Post('test-email')
  testEmail(@Body() email:string) {
    return this.authService.isEmailActivated(email);
  }



  
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ description: 'signUpAdmin  user ' })
  @ApiResponse({ description: 'Ok' })
  @ApiBadRequestResponse({ description: 'bad Request ' })
  @ApiInternalServerErrorResponse({
    description:
      'data has been send but there is issiue in server so try later ',
  })

  @Post('register/admin')
  @ApiBody({ type: AuthCredentialsDto, required: true })
  signUpAdmin(@Body() authCredentialsDto: AuthCredentialsDto,
  ) {
    return this.authService.signUpAdmin(authCredentialsDto);
  }





  
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ description: 'sendEmailVerification  user ' })
  @ApiResponse({ description: 'Ok' })
  @ApiBadRequestResponse({ description: 'bad Request ' })
  @ApiInternalServerErrorResponse({
    description:
      'data has been send but there is issiue in server so try later ',
  })
  @ApiBody({ type: String, required: true })

  @Get('email/send-email-verification/:email')
  @ApiParam({ name: 'email', type: String, required: true, example: 'mohammad.aa1997@gmail.com' })
  async sendEmailVerification(@Param('email') email: string) {
    await this.authService.createEmailToken(email);
    return this.authService.sendEmailVerification(email);
  }



  
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ description: 'verifyEmail  user ' })
  @ApiResponse({ description: 'Ok' })
  @ApiBadRequestResponse({ description: 'bad Request ' })
  @ApiInternalServerErrorResponse({
    description:
      'data has been send but there is issiue in server so try later ',
  })
  @ApiBody({ type: String, required: true })

  @Get('email/verify/:token')
  @ApiParam({ name: 'token', type: String, required: true })
  verifyEmail(@Param('token') token: string) {
    return this.authService.verifyEmail(token);
  }



  
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ description: 'signInUser  user ' })
  @ApiResponse({ description: 'Ok' })
  @ApiBadRequestResponse({ description: 'bad Request ' })
  @ApiInternalServerErrorResponse({
    description:
      'data has been send but there is issiue in server so try later ',
  })
  @ApiBody({ type: EmailLoginDto, required: true })

  @Post('login/user')
  @ApiBody({ type: EmailLoginDto, required: true })
  signInUser(@Body() emailLoginDto: EmailLoginDto) {
    return this.authService.signInUser(emailLoginDto);
  }




  
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ description: 'signInUser  user ' })
  @ApiResponse({ description: 'Ok' })
  @ApiBadRequestResponse({ description: 'bad Request ' })
  @ApiInternalServerErrorResponse({
    description:
      'data has been send but there is issiue in server so try later ',
  })
  @ApiParam({name:'email',type:String, required: true,example:"mhammem@gmail.com" })

  @Get('update-token/:email')
  updateToken(@Param('email') email: string) {
    const jwt = this.authService.generateJwtToken(email);
    return { jwt };
  }


  
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: 'sendEmailForgotPassword  user ' })
  @ApiResponse({ description: 'Ok' })
  @ApiBadRequestResponse({ description: 'bad Request ' })
  @ApiInternalServerErrorResponse({
    description:
      'data has been send but there is issiue in server so try later ',
  })
  @ApiBody({ type: String, required: true })

  @Get('email/forgot-password/:email')
  @ApiParam({ name: 'email', type: String, required: true })
  sendEmailForgotPassword(@Param('email') email: string) {
    return this.authService.sendEmailForgottenPassword(email);
  }



  
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ description: 'sendEmailForgotPassword  user ' })
  @ApiResponse({ description: 'Ok' })
  @ApiBadRequestResponse({ description: 'bad Request ' })
  @ApiInternalServerErrorResponse({
    description:
      'data has been send but there is issiue in server so try later ',
  })
  @ApiBody({ type: ResetPasswordDto, required: true })

  @Post('email/reset-password')
  @ApiBody({ type: ResetPasswordDto, required: true })
  setNewPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.setNewPassword(resetPasswordDto);
  }




   @ApiBasicAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: 'signInUser  user ' })
  @ApiResponse({ description: 'Ok' })
  @ApiBadRequestResponse({ description: 'bad Request ' })
  @ApiInternalServerErrorResponse({
    description:
      'data has been send but there is issiue in server so try later ',
  })
  @ApiBasicAuth()

  @Delete('delete-user-account')
  @UseGuards(AuthGuard(), UserAuthGuard)
  @Roles(UserRole.USER)
  deleteUserAccount(@GetAuthenticatedUser() user: User) {
    return this.authService.deleteUserAccount(user);
  }

   
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: 'isValidUsername  user ' })
  @ApiResponse({ description: 'Ok' })
  @ApiBadRequestResponse({ description: 'bad Request ' })
  @ApiInternalServerErrorResponse({
    description:
      'data has been send but there is issiue in server so try later ',
  })
  @ApiBasicAuth()

  @Get('check-username/:username')
  @ApiParam({ name: 'username', type: String, required: true })
  isValidUsername(@Param('username') username: string) {
    return this.authService.isValidUsername(username);
  }

   
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ description: 'signInAdmin  user ' })
  @ApiResponse({ description: 'Ok' })
  @ApiBadRequestResponse({ description: 'bad Request ' })
  @ApiInternalServerErrorResponse({
    description:
      'data has been send but there is issiue in server so try later ',
  })
  @ApiBody({type:EmailLoginDto,required:true})
  @Post('login/admin')
  signInAdmin(@Body() emailLoginDto: EmailLoginDto) {
    return this.authService.signInAdmin(emailLoginDto);
  }


   
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ description: 'getSystemUsers  user ' })
  @ApiResponse({ description: 'Ok' })
  @ApiBadRequestResponse({ description: 'bad Request ' })
  @ApiInternalServerErrorResponse({
    description:
      'data has been send but there is issiue in server so try later ',
  })
  @Get('system-users')
  getSystemUsers() {
    return this.authService.getSystemUsers();
  }
   
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: 'signInAdmin  user ' })
  @ApiResponse({ description: 'Ok' })
  @ApiBadRequestResponse({ description: 'bad Request ' })
  @ApiInternalServerErrorResponse({
    description:
      'data has been send but there is issiue in server so try later ',
  })
  @ApiBasicAuth()

  @Get('users/:id')
  @ApiParam({ name: 'id', type: String, required: true })
  getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.authService.getUserById(id);
  }

   
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ description: 'signInAdmin  user ' })
  @ApiResponse({ description: 'Ok' })
  @ApiBadRequestResponse({ description: 'bad Request ' })
  @ApiInternalServerErrorResponse({
    description:
      'data has been send but there is issiue in server so try later ',
  })
  @ApiBody({type:EditRolesDto})
  @ApiBasicAuth()

  @ApiParam({ name: 'userId', type: String, required: true })
  @Put('edit-user-roles/:userId')
  @UseGuards(AuthGuard(), AdminAuthGuard)
  @Roles(UserRole.SUPER_ADMIN)
  editUserRoles(@Param('userId', ParseIntPipe) userId: number, @Body() roles: EditRolesDto) {
    return this.authService.editUserRoles(userId, roles);
  }


}
