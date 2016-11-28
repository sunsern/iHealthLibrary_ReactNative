//
//  WifiSetWifiClass.h
//  iHealthDemoCode
//
//  Created by XuJianbo on 16/8/18.
//  Copyright © 2016年 zhiwei jing. All rights reserved.
//

#import <Foundation/Foundation.h>


typedef enum {
    WifiSetWifiDidDisconnect=0,//下位机断开
    Wifi = 1,//连接路由器成功
    WifiSetWifiOverTimeError,//底层发的超时
    WifiSetWifiNoRespondError,//一定时间内没收到响应的，一般是蓝牙堵塞
    WifiSetWifiAskToStopMeasure,//下位机请求中断测量
    parameterInputWrong=400,//输入参数错误
    
}WifiSetWifiError;

typedef enum {
    Connecting= 0,//连接中
    ConnectAccessPoint,//连接路由器
    ConnectCloud,//连接云
    
}WifiConnectStep;


typedef enum {
    CannotFindAccessPoint = 0,//找不到路由器
    PassWordError,//wifi密码错误
    DHCPError,//DHCP错误
    ConnectCloudFailed,//连接云失败
    CloudAuthenticateFailed,//云认证失败
    AccessPointConnectSuccess //连接成功
    
}WifiConnectState;

typedef void(^BlockWifiError)(WifiSetWifiError error);
typedef void(^BlockWifiSetSuccess)(NSNumber *waitFlg);
typedef void(^BlockWifiConnectState)();
typedef void(^BlockWifiIDPSDictionary) (NSDictionary *IDPSDic);
typedef void(^BlockWifiArrayDictionary)(NSDictionary *wifiArrayDic);
typedef void(^BlockConnectStepAndState) (NSDictionary *connectStepAndState);




#define Wifi_SSID @"Wifi_SSID"
#define Wifi_Channel @"Wifi_Channel"
#define Wifi_Security @"Wifi_Security"
#define Wifi_RSSI @"Wifi_RSSI"

//Security有以下几种：OPEN, WPA, WPA2, WPA/WPA2


@interface WifiSetWifiClass : NSObject{

    NSMutableDictionary *wifiInfoAndMacDic;
    
    NSString *currentWifiMac;
    
    BlockWifiError _blockError;
    BlockWifiSetSuccess _blockWifiSetSuccess;
    BlockWifiIDPSDictionary _blockWifiIDPSDictionary;
    BlockWifiArrayDictionary _blockWifiArrayDictionary;
    BlockConnectStepAndState _blockConnectStepAndState;
    
    NSTimer *sendDataTimer;
    
    NSTimer *connectStatusTimer;
    NSArray *wifiDicArray;
    
    
}
//单实例
+(WifiSetWifiClass *)shareInstance;
//开始扫描Wifi
/**
 *Start search the UDP access point device.
 * @param wifiIDPSDic   A block return the IDPS of the connected wifi Device.
 * @param blockWifiArrayDic The block return a dictionary which contains the wifi list and the wifi count that the device scan.
 * @param error   Retention parameter, no use now.
 */
-(void)commandStartSearchDeviceGetIDPS:(BlockWifiIDPSDictionary)wifiIDPSDic blockWifiArrayDictionary:(BlockWifiArrayDictionary)blockWifiArrayDic blockError:(BlockWifiError)error;

//设置wifi账号和密码
/**
 *Send wifi name and password to the device and return the connect status of the device.
 * @param wifiName
 * @param password  wifiName，password are the information of the wifi that selected to connect.
 * @param phoneIDStr The unique device ID of the current iPhone,iTouch or iPad.
 * @param urlStr   a service URL, to where the AP device send the wifi connect status.
 * @param setResult The block return means set success, containing a flg to show whether need to wait the 'stepAndStateDic', @1 means need，@0 means not.
 * @param stepAndStateDic The block return a dictionary which contains the connection step and the connection status.
 * @param error  Retention parameter, no use now.
 */
-(void)commandSendWifiName:(NSString*)wifiName password:(NSString *) password phoneID:(NSString *)phoneIDStr withURL:(NSString *)urlStr setResult:(BlockWifiSetSuccess)setResult blockConnectState:(BlockConnectStepAndState)stepAndStateDic blockError:(BlockWifiError)error;


@end
