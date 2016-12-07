//
//  AM4Module.m
//  ReactNativeIOSLibrary
//
//  Created by daiqingquan on 2016/11/23.
//  Copyright © 2016年 daiqingquan. All rights reserved.
//

#import "AM4Module.h"
#import "AMProfileModule.h"
#import "AMMacroFile.h"
#import "AM4Controller.h"
#import "AM4.h"

@implementation AM4Module

RCT_EXPORT_MODULE()
- (NSDictionary *)constantsToExport
{
    return @{
             @"EVENT_NOTIFY": EVENT_NOTIFY
             
             };


}

#pragma mark
#pragma mark - Init
-(id)init
{
    if (self=[super init])
    {
        
        [[NSNotificationCenter defaultCenter]addObserver:self selector:@selector(DeviceConnectForAM4:) name:AM4ConnectNoti object:nil];
        [[NSNotificationCenter defaultCenter]addObserver:self selector:@selector(DeviceDisConnectForAM4:) name:AM4DisConnectNoti object:nil];
        
        [AM4Controller shareIHAM4Controller];
        
    }
    return self;
}

-(AM4*)getAM4WithMac:(NSString*)mac{
    
    AM4Controller *controller = [AM4Controller shareIHAM4Controller];
    NSArray *amDeviceArray = [controller getAllCurrentAM4Instace];
    
    for(AM4 *tempAM4 in amDeviceArray){
        if([mac isEqualToString:tempAM4.currentUUID]){
            
            return tempAM4;
            break;
        }
    }
    
    return nil;
}

#pragma mark
#pragma mark - Notification
#pragma mark - AM4

-(void)DeviceConnectForAM4:(NSNotification *)tempNoti{
    AM4Controller *controller = [AM4Controller shareIHAM4Controller];
    NSArray *amDeviceArray = [controller getAllCurrentAM4Instace];
    
    AM4 *AMInstance = [amDeviceArray objectAtIndex:0];
    
}


#pragma mark
#pragma mark - Method
RCT_EXPORT_METHOD(reset:(nonnull NSString *)mac){
    
    if ([self getAM4WithMac:mac]!=nil) {
        
        [[self getAM4WithMac:mac] commandAM4ResetDevice:^(BOOL resetSuc) {
            
            NSDictionary* deviceInfo = @{@"mac":mac,@"action":@"reset_am",@"reset":[NSNumber numberWithInteger:resetSuc]};
            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInfo];
            
        } withErrorBlock:^(AM4ErrorID errorID) {
            
            NSDictionary* deviceInfo = @{@"mac":mac,@"action":@"error_am",@"error":[NSNumber numberWithInteger:errorID]};
            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInfo];
        }];
    }
}

RCT_EXPORT_METHOD(getUserId:(nonnull NSString *)mac){
    
    if ([self getAM4WithMac:mac]!=nil) {
        
        [[self getAM4WithMac:mac] commandAM4GetDeviceUserID:^(unsigned int userID) {
            
            NSDictionary* deviceInfo = @{@"mac":mac,@"action":@"userid_am",@"userid":[NSNumber numberWithInteger:userID]};
            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInfo];
            
        } withErrorBlock:^(AM4ErrorID errorID) {
            
            NSDictionary* deviceInfo = @{@"mac":mac,@"action":@"error_am",@"error":[NSNumber numberWithInteger:errorID]};
            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInfo];
        }];
        
     }
}

RCT_EXPORT_METHOD(setUserId:(nonnull NSString *)mac :(nonnull NSNumber *)uesrID){
    
    if ([self getAM4WithMac:mac]!=nil) {
        
        [[self getAM4WithMac:mac] commandAM4SetUserID:uesrID withFinishResult:^(BOOL resetSuc) {

            NSDictionary* deviceInfo = @{@"mac":mac,@"action":@"set_userid_success_am"};
            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInfo];
            
        } withErrorBlock:^(AM4ErrorID errorID) {
            NSDictionary* deviceInfo = @{@"mac":mac,@"action":@"error_am",@"error":[NSNumber numberWithInteger:errorID]};
            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInfo];
        }];
    }
}

RCT_EXPORT_METHOD(syncRealTime:(nonnull NSString *)mac){
    
    if ([self getAM4WithMac:mac]!=nil) {
        
        [[self getAM4WithMac:mac] commandAM4SyncTime:^(BOOL resetSuc) {
            
            NSDictionary* deviceInfo = @{@"mac":mac,@"action":@"set_sync_time_success_am"};
            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInfo];
        } withErrorBlock:^(AM4ErrorID errorID) {

            NSDictionary* deviceInfo = @{@"mac":mac,@"action":@"error_am",@"error":[NSNumber numberWithInteger:errorID]};
            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInfo];
        }];
    }
}

RCT_EXPORT_METHOD(setUserInfo:(nonnull NSString *)mac :(nonnull NSNumber *)age :(nonnull NSNumber *)height :(nonnull NSNumber *)weight :(nonnull NSNumber *)gender :(nonnull NSNumber *)unit :(nonnull NSNumber *)target :(nonnull NSNumber *)activityLevel :(nonnull NSNumber *)min){
    
    if ([self getAM4WithMac:mac]!=nil) {
        
        HealthUser *myUser = [[HealthUser alloc]init];
        myUser.age = age;
        myUser.sex = UserSex_Male;
        myUser.height = height;
        myUser.weight = weight;
        myUser.activityLevel = activityLevel;
        
        NSDictionary *dic = [[NSMutableDictionary alloc]init];
        [[self getAM4WithMac:mac] commandAM4SetUserInfo:myUser withUnit:unit withActiveGoal:target withSwimmingGoal:min withSetUserInfoFinishResult:^(BOOL resetSuc) {
            
            NSDictionary* deviceInfo = @{@"mac":mac,@"action":@"set_userinfo_success_am"};
            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInfo];
            
        } withSetBMR:^(BOOL resetSuc) {
           
            
        } withErrorBlock:^(AM4ErrorID errorID) {
            
            NSDictionary* deviceInfo = @{@"mac":mac,@"action":@"error_am",@"error":[NSNumber numberWithInteger:errorID]};
            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInfo];
        }];
    }
}

RCT_EXPORT_METHOD(getUserInfo:(nonnull NSString *)mac){
    
    if ([self getAM4WithMac:mac]!=nil) {
        
        [[self getAM4WithMac:mac] commandAM4GetUserInfo:^(NSDictionary *userInfo) {

            NSDictionary* deviceInfo = @{@"mac":mac,@"action":@"get_userinfo_am",@"age":[userInfo valueForKey:@"Age"],@"step":[userInfo valueForKey:@"Step"],@"height":[userInfo valueForKey:@"Height"],@"gender":[userInfo valueForKey:@"Gender"],@"weight":[userInfo valueForKey:@"Weight"],@"unit":[userInfo valueForKey:@"Unit"],@"target1":[userInfo valueForKey:@"TotalStep1"],@"target2":[userInfo valueForKey:@"TotalStep2"],@"target3":[userInfo valueForKey:@"TotalStep3"],@"swim_target":[userInfo valueForKey:@"SwimmingGoal"]};

            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInfo];
            
        } withErrorBlock:^(AM4ErrorID errorID) {
            
            NSDictionary* deviceInfo = @{@"mac":mac,@"action":@"error_am",@"error":[NSNumber numberWithInteger:errorID]};
            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInfo];
        }];
    }
}

RCT_EXPORT_METHOD(getAlarmClockNum:(nonnull NSString *)mac){
    
    if ([self getAM4WithMac:mac]!=nil) {
        
        [[self getAM4WithMac:mac] commandAM4GetTotoalAlarmInfo:^(NSMutableArray *totoalAlarmArray) {
            
            NSMutableArray * IDArray = [[NSMutableArray alloc]init];
            
            if (totoalAlarmArray.count > 0){
                
                for (NSDictionary *dic in totoalAlarmArray) {
                    [IDArray addObject:[dic valueForKey:@"AlarmId"]];
                }
            }
            
            NSDictionary* deviceInfo = @{@"mac":mac,@"action":@"get_alarmnum_am",@"alarmclocknumber":[NSNumber numberWithInt:IDArray.count],@"alarmclocknumberid":IDArray};
            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInfo];
            
        } withErrorBlock:^(AM4ErrorID errorID) {
            
            NSDictionary* deviceInfo = @{@"mac":mac,@"action":@"error_am",@"error":[NSNumber numberWithInteger:errorID]};
            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInfo];
        }];
    }
}

RCT_EXPORT_METHOD(getAlarmClockDetail:(nonnull NSString *)mac){
    
    if ([self getAM4WithMac:mac]!=nil) {
        
        [[self getAM4WithMac:mac] commandAM4GetTotoalAlarmInfo:^(NSMutableArray *totoalAlarmArray) {
            
            NSMutableArray * alarmInfoArray = [[NSMutableArray alloc]init];
            
            if (totoalAlarmArray.count > 0){
                
                for (NSDictionary *dic in totoalAlarmArray) {
                    
                    NSMutableDictionary *alartDic = [[NSMutableDictionary alloc]init];
                    [alartDic setValue:[dic valueForKey:@"AlarmId"] forKey:@"alarmid"];
                    [alartDic setValue:[dic valueForKey:@"Time"] forKey:@"time"];
                    [alartDic setValue:[dic valueForKey:@"IsRepeat"] forKey:@"repeat"];
                    
                    NSMutableDictionary * weekDic = [[NSMutableDictionary alloc]init];
                    [weekDic setValue:[[dic valueForKey:@"Week"] objectAtIndex:0] forKey:@"sun"];
                    [weekDic setValue:[[dic valueForKey:@"Week"] objectAtIndex:1] forKey:@"mon"];
                    [weekDic setValue:[[dic valueForKey:@"Week"] objectAtIndex:2] forKey:@"tue"];
                    [weekDic setValue:[[dic valueForKey:@"Week"] objectAtIndex:3] forKey:@"wed"];
                    [weekDic setValue:[[dic valueForKey:@"Week"] objectAtIndex:4] forKey:@"thu"];
                    [weekDic setValue:[[dic valueForKey:@"Week"] objectAtIndex:5] forKey:@"fri"];
                    [weekDic setValue:[[dic valueForKey:@"Week"] objectAtIndex:6] forKey:@"sat"];
                    
                    [alartDic setValue:weekDic forKey:@"get_alarm_week"];
                    [alartDic setValue:[dic valueForKey:@"Switch"] forKey:@"switch"];
                    
                    [alarmInfoArray addObject:alartDic];
                }
            }
            
            NSDictionary* deviceInfo = @{@"mac":mac,@"action":@"get_alarminfo_am",@"alarmclockdetail":alarmInfoArray};
            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInfo];
            
        } withErrorBlock:^(AM4ErrorID errorID) {
            NSDictionary* deviceInfo = @{@"mac":mac,@"action":@"error_am",@"error":[NSNumber numberWithInteger:errorID]};
            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInfo];
        }];
    }
}

RCT_EXPORT_METHOD(setAlarmClock:(nonnull NSString *)mac :(nonnull NSNumber *)alarmID :(nonnull NSNumber *)hour :(nonnull NSNumber *)min :(nonnull  BOOL*)isRepeat :(nonnull NSArray *)weekArray :(nonnull BOOL *)isOn){

    if ([self getAM4WithMac:mac]!=nil) {
        
        NSDateFormatter *formater=[[NSDateFormatter alloc]init];
        [formater setTimeZone:[NSTimeZone defaultTimeZone]];
        [formater setLocale:[[NSLocale alloc] initWithLocaleIdentifier:@"en_US"]];
        [formater setDateFormat:@"HH-mm"];
        NSString * timeStr = [NSString stringWithFormat:@"%@-%@",hour,min];
        NSDate *date = [formater dateFromString:timeStr];
        
        NSMutableArray *weeksArray = [[NSMutableArray alloc]init];
        NSNumber *SUNDAY = [weekArray valueForKey:@"sun"];
        NSNumber *MONDAY = [weekArray valueForKey:@"mon"];
        NSNumber *TUESDAY = [weekArray valueForKey:@"tue"];
        NSNumber *WEDNESDAY = [weekArray valueForKey:@"wed"];
        NSNumber *THURSDAY = [weekArray valueForKey:@"thu"];
        NSNumber *FRIDAY = [weekArray valueForKey:@"fri"];
        NSNumber *SATURDAY = [weekArray valueForKey:@"sat"];

        [weeksArray addObject:SUNDAY];
        [weeksArray addObject:MONDAY];
        [weeksArray addObject:TUESDAY];
        [weeksArray addObject:WEDNESDAY];
        [weeksArray addObject:THURSDAY];
        [weeksArray addObject:FRIDAY];
        [weeksArray addObject:SATURDAY];
        
        NSDictionary *dic = [[NSDictionary alloc]initWithObjectsAndKeys:alarmID,@"AlarmId",date,@"Time",isRepeat,@"IsRepeat",weeksArray,@"Week",isOn,@"Switch", nil];
        
        [[self getAM4WithMac:mac] commandAM4SetAlarmDictionary:dic withFinishResult:^(BOOL resetSuc) {
            NSDictionary* deviceInfo = @{@"mac":mac,@"action":@"set_alarminfo_success_am"};

            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInfo];
            
        } withErrorBlock:^(AM4ErrorID errorID) {
            NSDictionary* deviceInfo = @{@"mac":mac,@"action":@"error_am",@"error":[NSNumber numberWithInteger:errorID]};
            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInfo];
        }];
    }
}

RCT_EXPORT_METHOD(deleteAlarmClock:(nonnull NSString *)mac :(nonnull NSNumber *)alarmID){
    
    if ([self getAM4WithMac:mac]!=nil) {
        
        [[self getAM4WithMac:mac] commandAM4DeleteAlarmID:alarmID withFinishResult:^(BOOL resetSuc) {
            
            NSDictionary* deviceInfo = @{@"mac":mac,@"action":@"delete_alarm_success_am"};
            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInfo];
            
        } withErrorBlock:^(AM4ErrorID errorID) {
            NSDictionary* deviceInfo = @{@"mac":mac,@"action":@"error_am",@"error":[NSNumber numberWithInteger:errorID]};
            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInfo];
        }];
    }
}

RCT_EXPORT_METHOD(getActivityRemind:(nonnull NSString *)mac){
    
    if ([self getAM4WithMac:mac]!=nil) {
        
        [[self getAM4WithMac:mac] commandAM4GetReminderInfo:^(NSArray *remindInfo) {
        
            NSDictionary *dic = [remindInfo objectAtIndex:0];
            NSDictionary* deviceInfo = @{@"mac":mac,@"action":@"get_activity_remind_am",@"time":[dic valueForKey:@"Time"],@"switch":[dic valueForKey:@"Switch"]};

            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInfo];
            
        } withErrorBlock:^(AM4ErrorID errorID) {
            NSDictionary* deviceInfo = @{@"mac":mac,@"action":@"error_am",@"error":[NSNumber numberWithInteger:errorID]};
            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInfo];
        }];
    }
}

RCT_EXPORT_METHOD(setActivityRemind:(nonnull NSString *)mac :(nonnull NSNumber *)hour :(nonnull NSNumber *)min :(nonnull BOOL *)isOn){
    
    if ([self getAM4WithMac:mac]!=nil) {
        
        NSDateFormatter *formater=[[NSDateFormatter alloc]init];
        [formater setTimeZone:[NSTimeZone defaultTimeZone]];
        [formater setLocale:[[NSLocale alloc] initWithLocaleIdentifier:@"en_US"]];
        [formater setDateFormat:@"HH-mm"];
        NSString * timeStr = [NSString stringWithFormat:@"%@-%@",hour,min];
        NSDate *date = [formater dateFromString:timeStr];

        
        NSDictionary *dic = [NSDictionary dictionaryWithObjectsAndKeys:date,@"Time",isOn,@"Switch", nil];
        
        [[self getAM4WithMac:mac] commandAM4SetReminderDictionary:dic withFinishResult:^(BOOL resetSuc) {
            
            NSDictionary* deviceInfo = @{@"mac":mac,@"action":@"set_activityremind_success_am"};
            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInfo];
        } withErrorBlock:^(AM4ErrorID errorID) {
            NSDictionary* deviceInfo = @{@"mac":mac,@"action":@"error_am",@"error":[NSNumber numberWithInteger:errorID]};
            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInfo];
        }];
    }
}

RCT_EXPORT_METHOD(syncActivityData:(nonnull NSString *)mac){
    
    if ([self getAM4WithMac:mac]!=nil) {
        
        [[self getAM4WithMac:mac] commandAM4StartSyncActiveData:^(NSDictionary *startDataDictionary) {


            
        } withActiveHistoryData:^(NSArray *historyDataArray) {

            NSMutableArray *lastArray = [[NSMutableArray alloc]init];
            for (NSDictionary *dic in historyDataArray) {
                
                NSMutableDictionary * lastDic = [[NSMutableDictionary alloc]init];
                
                [lastDic setValue:[dic valueForKey:AMDate] forKey:@"time"];
                [lastDic setValue:[dic valueForKey:AMStepSize] forKey:@"stepsize"];
                [lastDic setValue:[dic valueForKey:AMCalorie] forKey:@"calorie"];
                [lastDic setValue:[dic valueForKey:AMStepNum] forKey:@"step"];
                [lastDic setValue:[dic valueForKey:@"dataID"] forKey:@"dataID"];
                [lastArray addObject:lastDic];
            }
            
            NSDictionary *dictionary = [NSDictionary dictionaryWithObject:lastArray forKey:@"activity_each_data"];
            NSArray *array = [NSArray arrayWithObjects:dictionary, nil];
            
            NSDictionary* deviceInfo = @{@"mac":mac,@"action":@"sync_activity_data_am",@"activity":array};

            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInfo];
            
        } withActiveFinishTransmission:^{
          
            
        } withErrorBlock:^(AM4ErrorID errorID) {
            NSDictionary* deviceInfo = @{@"mac":mac,@"action":@"error_am",@"error":[NSNumber numberWithInteger:errorID]};
            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInfo];
        }];
    }
}

RCT_EXPORT_METHOD(syncSleepData:(nonnull NSString *)mac){
    
    if ([self getAM4WithMac:mac]!=nil) {
        
        [[self getAM4WithMac:mac] commandAM4StartSyncSleepData:^(NSDictionary *startDataDictionary) {

        
        } withSleepHistoryData:^(NSArray *historyDataArray) {

            NSMutableArray *lastArray = [[NSMutableArray alloc]init];
            

            for (NSArray *array in historyDataArray) {
                
                for (NSDictionary *dic in array) {
                    
                    NSMutableDictionary * lastDic = [[NSMutableDictionary alloc]init];
                    [lastDic setValue:[dic valueForKey:AMDate] forKey:@"time"];
                    [lastDic setValue:[dic valueForKey:@"SleepData"] forKey:@"level"];
                    [lastDic setValue:[dic valueForKey:@"dataID"] forKey:@"dataID"];
                    [lastArray addObject:lastDic];

                }
            }
            
            NSDictionary *dictionary = [NSDictionary dictionaryWithObject:lastArray forKey:@"sleep_each_data"];
            NSArray *array = [NSArray arrayWithObjects:dictionary, nil];
            
            NSDictionary* deviceInfo = @{@"mac":mac,@"action":@"sync_sleep_data_am",@"sleep":array};
            
            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInfo];

            
        } withSleepFinishTransmission:^{
            
        } withErrorBlock:^(AM4ErrorID errorID) {
            NSDictionary* deviceInfo = @{@"mac":mac,@"action":@"error_am",@"error":[NSNumber numberWithInteger:errorID]};
            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInfo];
        }];
    }
}

RCT_EXPORT_METHOD(syncStageReprotData:(nonnull NSString *)mac){
    
    if ([self getAM4WithMac:mac]!=nil) {
        
        [[self getAM4WithMac:mac] commandAM4StartSyncStageData:^(NSArray *measureDataArray) {

            NSMutableArray *lastArray = [[NSMutableArray alloc]init];
           
            
            NSPredicate *pre = [NSPredicate predicateWithFormat:@"ReportState == 1"];
            NSArray *workoutArray = [measureDataArray filteredArrayUsingPredicate:pre];
            if (workoutArray.count != 0)
            {
                for (NSDictionary *dic in workoutArray) {
                    
                    NSMutableDictionary *dictionary = [[NSMutableDictionary alloc]init];
                    [dictionary setValue:@"stage_data_type_workout" forKey:@"type"];
                    [dictionary setValue:[dic valueForKey:Work_outMeasureDate] forKey:@"stoptime"];
                    [dictionary setValue:[dic valueForKey:Work_outTimeNumber] forKey:@"usedtime"];
                    [dictionary setValue:[dic valueForKey:Work_outStepNumber] forKey:@"stage_data_workout_step"];
                    [dictionary setValue:[dic valueForKey:Work_outLengthNumber] forKey:@"stage_data_distance"];
                    [dictionary setValue:[dic valueForKey:Work_outCalories] forKey:@"calorie"];
                    [dictionary setValue:[dic valueForKey:@"dataID"] forKey:@"dataID"];
                    [lastArray addObject:dictionary];
                }
            }

            NSPredicate *predicateSwim = [NSPredicate predicateWithFormat:@"ReportState == 0"];
            NSArray *swimArray = [measureDataArray filteredArrayUsingPredicate:predicateSwim];
            if (swimArray.count != 0)
            {
                for (NSDictionary *dic in workoutArray) {
                    
                    NSMutableDictionary *dictionary = [[NSMutableDictionary alloc]init];
                    [dictionary setValue:@"swim" forKey:@"type"];
                    [dictionary setValue:[dic valueForKey:AM4SwimmingMeasureDate] forKey:@"stoptime"];
                    [dictionary setValue:[dic valueForKey:AM4SwimmingTimeNumber] forKey:@"usedtime"];
                    [dictionary setValue:[dic valueForKey:AM4SwimmingTimes] forKey:@"number of strokes"];
                    [dictionary setValue:[dic valueForKey:AM4Swimmingcalories] forKey:@"calorie"];
                    [dictionary setValue:[dic valueForKey:AM4SwimmingAct] forKey:@"swimming stroke"];
                    [dictionary setValue:[dic valueForKey:AM4SwimmingCircleCount] forKey:@"number of turns"];
                    [dictionary setValue:[dic valueForKey:AM4SwimmingPoollength] forKey:@"stage_data_swimpool_length"];
                    [dictionary setValue:[dic valueForKey:AM4EnterSwimmingTime] forKey:@"stage_data_cutindif"];
                    [dictionary setValue:[dic valueForKey:AM4OutSwimmingTime] forKey:@"stage_data_cutoutdif"];
                    [dictionary setValue:[dic valueForKey:AM4SwimmingProcessMark] forKey:@"stage_data_processflag"];
                    [dictionary setValue:[dic valueForKey:@"dataID"] forKey:@"dataID"];

                    [lastArray addObject:dictionary];
                }

            }
            
            NSPredicate *predicateSleep = [NSPredicate predicateWithFormat:@"ReportState == 2"];
            NSArray *sleepArray = [measureDataArray filteredArrayUsingPredicate:predicateSleep];
            if (sleepArray.count != 0)
            {
                for (NSDictionary *dic in workoutArray) {
                    
                    NSMutableDictionary *dictionary = [[NSMutableDictionary alloc]init];
                    [dictionary setValue:@"sleep" forKey:@"type"];
                    [dictionary setValue:[dic valueForKey:Sleep_summaryMeasureDate] forKey:@"stoptime"];
                    [dictionary setValue:[dic valueForKey:Sleep_summarySleepTime] forKey:@"usedtime"];
                    [dictionary setValue:[dic valueForKey:Sleep_summarysleepEfficiency] forKey:@"sleepefficiency"];
                    [dictionary setValue:[dic valueForKey:Sleep_summarysleepAddMinute] forKey:@"is50min"];
                    [lastArray addObject:dictionary];
                }

            }
            
            NSDictionary* deviceInfo = @{@"mac":mac,@"action":@"sync_stage_data_am",@"stage_data":lastArray};
            
            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInfo];

            
        } withStageDataFinishTransmission:^(BOOL resetSuc) {
            
            
            
            
        } withErrorBlock:^(AM4ErrorID errorID) {
            
            NSDictionary* deviceInfo = @{@"mac":mac,@"action":@"error_am",@"error":[NSNumber numberWithInteger:errorID]};
            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInfo];
        }];
    }
}

RCT_EXPORT_METHOD(syncRealData:(nonnull NSString *)mac){
    
    if ([self getAM4WithMac:mac]!=nil) {
        
        [[self getAM4WithMac:mac] commandAM4StartSyncCurrentActiveData:^(NSDictionary *activeDictionary) {

            NSDictionary* deviceInfo = @{@"mac":mac,@"action":@"sync_real_data_am",@"step":[activeDictionary valueForKey:@"Step"],@"calorie":[activeDictionary valueForKey:@"Calories"],@"totalcalories":[activeDictionary valueForKey:@"TotalCalories"]};
            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInfo];
            
        } withErrorBlock:^(AM4ErrorID errorID) {
            NSDictionary* deviceInfo = @{@"mac":mac,@"action":@"error_am",@"error":[NSNumber numberWithInteger:errorID]};
            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInfo];
        }];
    }
}

RCT_EXPORT_METHOD(queryAMState:(nonnull NSString *)mac){
    
    if ([self getAM4WithMac:mac]!=nil) {
        
        __block NSInteger index;
        
        [[self getAM4WithMac:mac] commandAM4GetDeviceStateInfo:^(AM4QueryState queryState) {
            
            index = queryState;
           
        } withBattery:^(NSNumber *battery) {
            
            NSDictionary* deviceInfo = @{@"mac":mac,@"action":@"query_state_am",@"query_state":[NSNumber numberWithInteger:index],@"battery":battery};
            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInfo];
        
        } withErrorBlock:^(AM4ErrorID errorID) {
            NSDictionary* deviceInfo = @{@"mac":mac,@"action":@"error_am",@"error":[NSNumber numberWithInteger:errorID]};
            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInfo];
        }];
    }
}

RCT_EXPORT_METHOD(setUserBmr:(nonnull NSString *)mac :(nonnull NSNumber *)bmr){
    
    if ([self getAM4WithMac:mac]!=nil) {
        
        [[self getAM4WithMac:mac] commandAM4SetBMR:bmr withFinishResult:^(BOOL resetSuc) {
            
            NSDictionary* deviceInfo = @{@"mac":mac,@"action":@"set_bmr_success_am"};

            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInfo];

        } withErrorBlock:^(AM4ErrorID errorID) {
            NSDictionary* deviceInfo = @{@"mac":mac,@"action":@"error_am",@"error":[NSNumber numberWithInteger:errorID]};
            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInfo];
        }];
    }
}

RCT_EXPORT_METHOD(sendRandom:(nonnull NSString *)mac){
    
    if ([self getAM4WithMac:mac]!=nil) {
        
        [[self getAM4WithMac:mac] commandAM4SetRandomNumber:^(NSString *randomNumString) {
            
            NSDictionary* deviceInfo = @{@"mac":mac,@"action":@"get_random_am",@"random":randomNumString};
            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInfo];
        } withErrorBlock:^(AM4ErrorID errorID) {
            NSDictionary* deviceInfo = @{@"mac":mac,@"action":@"error_am",@"error":[NSNumber numberWithInteger:errorID]};
            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInfo];
        }];
    }
}

RCT_EXPORT_METHOD(disconnect:(nonnull NSString *)mac){
    
    if ([self getAM4WithMac:mac]!=nil) {
        
        [[self getAM4WithMac:mac] commandAM4Disconnect:^(BOOL resetSuc) {
            
            NSDictionary* deviceInfo = @{@"mac":mac};
            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInfo];
        } withErrorBlock:^(AM4ErrorID errorID) {
            NSDictionary* deviceInfo = @{@"mac":mac,@"action":@"error_am",@"error":[NSNumber numberWithInteger:errorID]};
            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInfo];
        }];
    }
}

RCT_EXPORT_METHOD(setSwimPara:(nonnull NSString *)mac :(nonnull BOOL *)isOpen :(nonnull NSNumber *)poolLength :(nonnull NSNumber *)hours :(nonnull NSNumber *)minutes :(nonnull NSNumber *)unit ){
    
    if ([self getAM4WithMac:mac]!=nil) {
        
        NSDateFormatter *formater=[[NSDateFormatter alloc]init];
        [formater setTimeZone:[NSTimeZone defaultTimeZone]];
        [formater setLocale:[[NSLocale alloc] initWithLocaleIdentifier:@"en_US"]];
        [formater setDateFormat:@"HH-mm"];
        NSString * timeStr = [NSString stringWithFormat:@"%@-%@",hours,minutes];
        NSDate *date = [formater dateFromString:timeStr];
        
        
        [[self getAM4WithMac:mac] commandAM4SetSwimmingState:isOpen withSwimmingPoolLength:poolLength withNOSwimmingTime:date withUnit:unit withFinishResult:^(BOOL resetSuc) {
            
            NSDictionary* deviceInfo = @{@"mac":mac,@"action":@"set_swiminfo_am"};
            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInfo];
        } withErrorBlock:^(AM4ErrorID errorID) {
            
            NSDictionary* deviceInfo = @{@"mac":mac,@"action":@"error_am",@"error":[NSNumber numberWithInteger:errorID]};
            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInfo];
            
        }];
    }
}

RCT_EXPORT_METHOD(checkSwimPara:(nonnull NSString *)mac){
    
    if ([self getAM4WithMac:mac]!=nil) {
        
        [[self getAM4WithMac:mac] commandAM4GetSwimmingInfo:^(BOOL swimmingIsOpen, NSNumber *swimmingLaneLength, NSNumber *NOSwimmingTime, AM4SwimmingUnit unit) {
            
            int hour = NOSwimmingTime.intValue / 60;
            int min = NOSwimmingTime.intValue % 60;
            
            NSDictionary* deviceInfo = @{@"mac":mac,@"action":@"get_swiminfo_am",@"get_swimlane_length":swimmingLaneLength,@"get_swim_unit_am":@"unit",@"get_swim_switch_am":@"swimmingIsOpen",@"get_swim_cutout_hour_am":[NSNumber numberWithInt:hour],@"get_swim_cutout_min_am":[NSNumber numberWithInt:min]};
            
            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInfo];
        } withErrorBlock:^(AM4ErrorID errorID) {
            NSDictionary* deviceInfo = @{@"mac":mac,@"action":@"error_am",@"error":[NSNumber numberWithInteger:errorID]};
            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInfo];
        }];
    }
}



RCT_EXPORT_METHOD(setHourMode:(nonnull NSString *)mac){
    
    if ([self getAM4WithMac:mac]!=nil) {
        
        [[self getAM4WithMac:mac] commandAM4SetTimeFormatAndNation:^(BOOL resetSuc) {

            NSDictionary* deviceInfo = @{@"mac":mac,@"action":@"set_hour_mode_success_am"};

            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInfo];
        } withErrorBlock:^(AM4ErrorID errorID) {
            NSDictionary* deviceInfo = @{@"mac":mac,@"action":@"error_am",@"error":[NSNumber numberWithInteger:errorID]};
            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInfo];
        }];
    }
}

RCT_EXPORT_METHOD(getHourMode:(nonnull NSString *)mac){
    
    if ([self getAM4WithMac:mac]!=nil) {
        
        [[self getAM4WithMac:mac] commandAM4GetTimeFormatAndNation:^(AM4TimeFormatAndNation timeFormatAndNation) {
            
            NSDictionary* deviceInfo = @{@"mac":mac,@"action":@"get_hour_mode_am"};
            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInfo];
        } withErrorBlock:^(AM4ErrorID errorID) {
            NSDictionary* deviceInfo = @{@"mac":mac,@"action":@"error_am",@"error":[NSNumber numberWithInteger:errorID]};
            [self.bridge.eventDispatcher sendDeviceEventWithName:EVENT_NOTIFY body:deviceInfo];
        }];
    }
}























@end
