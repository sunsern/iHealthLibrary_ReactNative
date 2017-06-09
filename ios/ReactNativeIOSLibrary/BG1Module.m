//
//  BG1Module.m
//  ReactNativeIOSLibrary
//
//  Created by daiqingquan on 2016/11/23.
//  Copyright © 2016年 daiqingquan. All rights reserved.
//

#import "BG1Module.h"
#import "BG1ProfileModule.h"
#import "BGMacroFile.h"
#import "BG1Controller.h"

#define EVENT_NOTIFY @"event_notify_bg1"

@implementation BG1Module

@synthesize bridge = _bridge;

RCT_EXPORT_MODULE()

- (NSDictionary *)constantsToExport
{
    return @{
             @"Event_Notify":@"event_notify_bg1",

             };
}


#pragma mark
#pragma mark - Init
-(id)init
{
    if (self=[super init])
    {

        [BG1Controller shareBG1Controller];

    }
    return self;
}



-(BG1*)getBG1Instance{

    BG1Controller *controller = [BG1Controller shareBG1Controller];
    BG1 *bg1Instance = [controller getCurrentBG1Instance];
    if(bg1Instance != nil)
    {
        return bg1Instance;
    }
    else
    {
        return nil;
    }

}


#pragma mark
#pragma mark - Method


RCT_EXPORT_METHOD(sendCode:(nonnull NSNumber *)codeType:(nonnull NSNumber *)testType:(nonnull NSString *)QR){


    if ([self getBG1Instance]!=nil) {

        if (QR ==nil || QR.length<30) {
            NSDictionary* deviceInfo = @{@"mac":@"",@"action":@"action_measure_error_for_bg1",@"action_measure_error_for_bg1":@400};
            [self sendEventWithName:EVENT_NOTIFY body:deviceInfo];

            return;
        }

        NSDictionary *codeDic = [[self getBG1Instance]codeStripStrAnalysis:QR];
        NSNumber *bottleID = [codeDic objectForKey:@"bottleId"];
        NSDate *dueDate = [codeDic objectForKey:@"overDate"];
        NSNumber *remainNum = [codeDic objectForKey:@"stripNum"];

        BGMeasureMode *bgMeasureModel = BGMeasureMode_Blood;
//        if(codeType.integerValue == 2)
//        {
            bgMeasureModel = BGMeasureMode_NoBlood;
//        }

        BGCodeMode *bgCodeModel =BGCodeMode_GOD;
//        if(codeType.integerValue == 2)
//        {
            bgCodeModel = BGCodeMode_GDH;
//        }


        [[self getBG1Instance]commandCreateBGtestWithMeasureType:bgMeasureModel CodeType:bgCodeModel CodeString:QR DisposeBGSendCodeBlock:^(BOOL sendOk) {

            NSDictionary* deviceInfo = @{@"mac":@"",@"action":@"action_sendcode_result_for_bg1",@"set_bottle_message":@true};
            [self sendEventWithName:EVENT_NOTIFY body:deviceInfo];

        } DisposeBGStripInBlock:^(BOOL stripIn) {

            NSDictionary* deviceInfo = @{@"mac":@"",@"action":@"action_measure_strip_in_for_bg1"};
            [self sendEventWithName:EVENT_NOTIFY body:deviceInfo];

        } DisposeBGBloodBlock:^(BOOL blood) {

            NSDictionary* deviceInfo = @{@"mac":@"",@"action":@"action_measure_get_blood_for_bg1"};
            [self sendEventWithName:EVENT_NOTIFY body:deviceInfo];

        } DisposeBGResultBlock:^(NSDictionary *result) {

            NSDate *measureDate = [result objectForKey:@"Date"];

            //将时间格式转化成字符串，适配plugin和react native
            NSDateFormatter *mydateFormatter = [[NSDateFormatter alloc] init];
            [mydateFormatter setDateFormat:@"yyyy-MM-dd HH:mm:ss"];
            NSString *dateStr = [mydateFormatter stringFromDate:measureDate];

            NSDictionary *resultDic = [NSDictionary dictionaryWithObjectsAndKeys:dateStr,@"date",[result objectForKey:@"Result"],@"value",[result objectForKey:@"dataID"],@"dataID", nil];

            NSDictionary* deviceInfo = @{@"mac":@"",@"action":@"action_measure_result_for_bg1",@"result":result};
            [self sendEventWithName:EVENT_NOTIFY body:deviceInfo];

        } DisposeBGStripOutBlock:^(BOOL stripOut) {

            NSDictionary* deviceInfo = @{@"mac":@"",@"action":@"action_measure_strip_out_for_bg1"};
            [self sendEventWithName:EVENT_NOTIFY body:deviceInfo];

        } DisposeBGErrorBlock:^(NSNumber *errorID) {

            NSDictionary* deviceInfo = @{@"mac":@"",@"action":@"action_measure_error_for_bg1",@"action_measure_error_for_bg1":errorID};
            [self sendEventWithName:EVENT_NOTIFY body:deviceInfo];

        }];



    }else{

        NSDictionary* deviceInfo = @{@"mac":@"",@"action":@"action_measure_error_for_bg1",@"action_measure_error_for_bg1":@100 };
        [self sendEventWithName:EVENT_NOTIFY body:deviceInfo];

    }

}

RCT_EXPORT_METHOD(codeAnalysis:(nonnull NSString *)QR){


    if ([self getBG1Instance]!=nil) {

        NSDictionary *codeDic = [[self getBG1Instance]codeStripStrAnalysis:QR];
        NSDate *tempDate = [codeDic objectForKey:@"DueDate"];

        //将时间格式转化成字符串，适配plugin和react native
        NSDateFormatter *mydateFormatter = [[NSDateFormatter alloc] init];
        [mydateFormatter setDateFormat:@"yyyy-MM-dd HH:mm:ss"];
        NSTimeZone *dongBaTimeZone = [NSTimeZone timeZoneForSecondsFromGMT:8*60*60];
        [mydateFormatter setTimeZone:dongBaTimeZone];
        NSString *dateStr = [mydateFormatter stringFromDate:tempDate];

        NSNumber *bottleID = [codeDic objectForKey:@"BottleID"];
        NSNumber *remainNum = [codeDic objectForKey:@"StripNum"];

        NSDictionary* deviceInfo = @{@"mac":@"",@"action":@"action_code_analysis_bg",@"stripNum":remainNum,@"overDate":dateStr,@"bottleId":bottleID};
        [self sendEventWithName:EVENT_NOTIFY body:deviceInfo];

    }else{

        NSDictionary* deviceInfo = @{@"mac":@"",@"action":@"action_measure_error_for_bg1",@"action_measure_error_for_bg1":@100};
        [self sendEventWithName:EVENT_NOTIFY body:deviceInfo];

    }

}


@end
