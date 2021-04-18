/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Put, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateProfileDto } from './dto/create-profile.dto';
import { GetAuthenticatedUser } from '../../commons/decorators/get-authenticated-user.decorator';
import { User } from '../auth/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { AcceptedAuthGuard } from '../../commons/guards/accepted-auth.guard';
import { Roles } from '../../commons/decorators/roles.decorator';
import { ProfileService } from './profile.service';
import { UserRole } from '../../commons/enums/user-role.enum';
import { ApiBadRequestResponse, ApiBearerAuth,ApiBody, ApiHeader, ApiInternalServerErrorResponse, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';


@UseGuards(AuthGuard(), AcceptedAuthGuard)
@Roles(UserRole.SUPER_ADMIN, UserRole.WEAK_ADMIN, UserRole.USER)
@ApiBearerAuth()

@Controller('profiles')
@ApiTags('profile')
@ApiBearerAuth()
export class ProfileController {

  constructor(private profileService: ProfileService) {
  }

/**
 * 
 * @param user 
 * @param createProfileDto 
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
  @ApiBody({type:CreateProfileDto})

  @Post('create-profile')
  @UseGuards(AuthGuard(), AcceptedAuthGuard)
  createProfile(@GetAuthenticatedUser() user: User,
                @Body() createProfileDto: CreateProfileDto) {
    return this.profileService.createUserProfile(user, createProfileDto);
  }
/**
 * 
 * @param user 
 * @returns 
 */


 @ApiTags('profile')
 @HttpCode(HttpStatus.OK)
 @ApiOperation({ description: 'getUserProfile  user ' })
 @ApiResponse({ description: 'Ok' })
 @ApiBadRequestResponse({ description: 'bad Request ' })
 @ApiInternalServerErrorResponse({
   description:
     'data has been send but there is issiue in server so try later ',
 })
  @Get('user-profile')
  getUserProfile(@GetAuthenticatedUser() user: User) {
    return this.profileService.getProfileData(user);
  }
  /**
   * 
   * @param user 
   * @param folderName 
   * @param subFolder 
   * @param image 
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
   @ApiParam({type:String,example:"foldernmae",name:"folderName"})
   @ApiParam({type:String,example:"subFolder",name:"subFolder"})
  @Post('user-profile/set-profile-image/:folderName/:subFolder')
  @UseInterceptors(FileInterceptor('image'))
  setProfileImage(@GetAuthenticatedUser() user: User,
                  @Param('folderName') folderName: string,
                  @Param('subFolder') subFolder: string,
                  @UploadedFile() image: any) {
    return this.profileService.setProfileImage(user, folderName, subFolder, image);
  }


  /**
   * 
   * @param user 
   * @param folderName 
   * @param subFolder 
   * @param image 
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
   @ApiParam({type:String,example:"foldernmae",name:"folderName"})
   @ApiParam({type:String,example:"subFolder",name:"subFolder"})
  @Patch('user-profile/change-profile-image/:folderName/:subFolder')
  @UseInterceptors(FileInterceptor('image'))
  changeProfileImage(@GetAuthenticatedUser() user: User,
                     @Param('folderName') folderName: string,
                     @Param('subFolder') subFolder: string,
                     @UploadedFile() image: any) {
    return this.profileService.changeProfileImage(user, folderName, subFolder, image);
  }

/**
 * 
 * @param user 
 * @returns 
 */
 @ApiTags('profile')
 @HttpCode(HttpStatus.CREATED)
 @ApiOperation({ description: 'signInAdmin  user ' })
 @ApiResponse({ description: 'Ok' })
 @ApiBadRequestResponse({ description: 'bad Request ' })
 @ApiInternalServerErrorResponse({
   description:
     'data has been send but there is issiue in server so try later ',
 })
  @Delete('user-profile/delete-profile-image')
  deleteProfileImage(@GetAuthenticatedUser() user: User) {
    return this.profileService.deleteProfileImage(user);
  }
/**
 * 
 * @param user 
 * @param createProfileDto 
 * @returns 
 */
 @ApiTags('profile')
 @HttpCode(HttpStatus.CREATED)
 @ApiOperation({ description: 'editProfile  user ' })
 @ApiResponse({ description: 'Ok' })
 @ApiBadRequestResponse({ description: 'bad Request ' })
 @ApiInternalServerErrorResponse({
   description:
     'data has been send but there is issiue in server so try later ',
 })
 @ApiBody({type:CreateProfileDto})
  @Put('user-profile/edit-profile')
  editProfile(@GetAuthenticatedUser() user: User,
              @Body() createProfileDto: CreateProfileDto) {
    return this.profileService.editProfile(user, createProfileDto);
  }
}
