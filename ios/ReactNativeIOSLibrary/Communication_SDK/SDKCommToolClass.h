//
//  SDKCommToolClass.h
//  iHealthDemoCode
//
//  Created by daiqingquan on 16/7/3.
//  Copyright © 2016年 zhiwei jing. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <CoreBluetooth/CoreBluetooth.h>

#define BTFlag self.framework.BtFlag

//BluetoothState
typedef void (^DisposeSDKBluetoothState)(BOOL BluetoothState);

@interface SDKCommToolClass : NSObject<CBCentralManagerDelegate>{

    DisposeSDKBluetoothState _disposeSDKBluetoothState;
    CBCentralManager *centralManager;
}
@property (nonatomic, assign) BOOL blueToothStatus;

+(SDKCommToolClass *)shareSDKCommToolClass;

//YES:ON   NO:Off
-(void)commandGetBluetoothState:(DisposeSDKBluetoothState)disposeSDKBluetoothState;

-(BOOL)getTheBLEStatus;

@end
