//
//  IHSDKCloudUser.h
//  iHealthDemoCode
//
//  Created by daiqingquan on 16/5/5.
//  Copyright © 2016年 zhiwei jing. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "HealthUser.h"



@interface IHSDKCloudUser : NSObject

@property (strong, nonatomic) NSString *thirdUserID;

+(IHSDKCloudUser*)commandGetSDKUserInstance;


/*  Establish memory and measurement connection*/
/*
 Import Parameters:
 tempUser included properties: clientID, clientSecret, userAccount
 userAccount: either email or mobile phone number (mobile phone number is not currently supported yet)
 clientID & clientSecret: the only identification for users of the SDK, requires registration from iHealth administrator, please email: heguangming@ihealthlabs.com.cn for more information.
 
 Return Parameters:
 userValidationSuccess: The return parameters of ’‘userid’, ‘height’, ’clientID’, and ‘clientSecret’ after verification
 
 The interpretation for the verification:
 UserAuthen_RegisterSuccess: New-user registration succeeded.
 UserAuthen_LoginSuccess: User login succeeded.
 UserAuthen_CombinedSuccess: The user is an iHealth user as well, measurement via SDK has been activated, and the data from the measurement belongs to the user.
 UserAuthen_TrySuccess: Testing without internet connection succeeded.
 UserAuthen_InvalidateUserInfo: Userid/clientID/clientSecret verification failed.
 UserAuthen_SDKInvalidateRight: SDK has not been authorized.
 UserAuthen_UserInvalidateRight: User has not been authorized.
 UserAuthen_InternetError: Internet error, verification failed.
 The measurement via SDK will be operated in the case of 1-4, and will be terminated if any of 5-8 occurs. The interface needs to be re-called after analyzing the return parameters.
 Notice: when a new user registers via SDK, an ‘iHealth disclaimer’ will pop up automatically, and will require the user to agree in order to continue. SDK applications require an Internet connection; there is 10-day trial period if the SDK cannot connect to the internet, the SDK is fully functional during tryout period, but will be terminated without a working internet connection after 10 days.
 
 userDeviceAccess：(
 OpenApiActivity,
 OpenApiBG,
 OpenApiBP,
 OpenApiFood,
 OpenApiSleep,
 OpenApiSpO2,
 OpenApiSport,
 OpenApiUserInfo,
 OpenApiWeight
 )
 userValidationReturn：userID
 disposeValidationErrorBlock: Error code
 
 */

-(void)commandSDKUserValidation:(HealthUser *)tempUser UserDeviceAccess:(DisposeSDKUserDeviceAccess)userDeviceAccess UserValidationSuccess:(DisposeSDKUserValidationSuccess)userValidationSuccess UserValidationReturn:(DisposeSDKUserValidationReturn)userValidationReturn DisposeErrorBlock:(DisposeSDKUserValidationErrorBlock)disposeValidationErrorBlock;


@end
