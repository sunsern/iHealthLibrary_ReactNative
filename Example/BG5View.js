import React, {Component, PropTypes} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    DeviceEventEmitter,
    ScrollView
} from 'react-native';

import {
    iHealthDeviceManagerModule,
    BG5Module,
    BGProfileModule
} from 'ihealthlibrary-react-native'


var styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 60,
    },
    // 导航栏
    heading: {
        height: 44,
        alignItems: 'center',
        justifyContent: 'center', // 内容居中显示
        marginBottom: 10
    },
    // 导航栏文字
    headText: {
        color: '#ff5555',
        fontSize: 22
    },
    // 按钮
    button: {
        height: 60,
        marginTop: 10,
        justifyContent: 'center', // 内容居中显示
        backgroundColor: '#eedddd',
        alignItems: 'center'
    },
    // 按钮文字
    buttonText: {
        fontSize: 18
    },
    cell: {
        marginTop: 10,
        height: 25,
        alignItems: 'flex-start',
        justifyContent: 'center', // 内容居中显示
        marginBottom: 5
    },
});

export default class BG5View extends Component {

    constructor(props) {
        super(props);
        this.state = {
            resultText: ""
        }
    }

    componentWillMount() {
        this.addListener();
    }

    componentWillUnmount() {
        this.removeListener();
    }


    addListener() {
        let self = this

        this.disConnectionListener = DeviceEventEmitter.addListener(iHealthDeviceManagerModule.Event_Device_Disconnect, function (e: Event) {
            console.log('BG5' + '_addListener()_DeviceDisConnect', JSON.stringify(e));
            // I/Runtime_iHealthDM: onDeviceConnectionStateChange(8CDE52B5F928, BG5, 2, 0)
            // I/ReactNativeJS: 'BG5_addListener()_DeviceDisConnect', '{"errorid":0,"type":"BG5","mac":"8CDE52B5F928"}'
            self.props.navigator.pop();
        });

        this.notifyListerner = DeviceEventEmitter.addListener(BG5Module.Event_Notify, function (e: Event) {
            console.info('BG5View', 'addListener_NotifyLinstener', "Action = " + e.action + '\n' + "Message = " + JSON.stringify(e));
            if (e.action == BGProfileModule.ACTION_KEEP_LINK) {
                resultText = e[BGProfileModule.KEEP_LINK]? 'Keep link success':'Keep link fail';
            }
            else if (e.action == BGProfileModule.ACTION_GET_BATTERY) {
                console.info('BG5View', BGProfileModule.GET_BATTERY + JSON.stringify(e));
                resultText = 'bg5 battery : ' + e[BGProfileModule.GET_BATTERY];
            }
            else if (e.action == BGProfileModule.ACTION_SET_TIME) {
                resultText = e[BGProfileModule.SET_TIME]? 'Set time success':'Set time fail'
            }
            else if (e.action == BGProfileModule.ACTION_SET_UNIT) {
                resultText = e[BGProfileModule.SET_UNIT] == true? 'Set unit success':'Set unit fail'
            }
            else if (e.action == BGProfileModule.ACTION_START_MEASURE) {
                resultText = e[BGProfileModule.START_MEASURE] == true? 'Start measure success':'Start measure fail'
            }
            else if (e.action == BGProfileModule.ACTION_GET_OFFLINEDATA_COUNT) {
                resultText = 'Offline data count : ' + e[BGProfileModule.GET_OFFLINEDATA_COUNT];
            }
            else if (e.action == BGProfileModule.ACTION_GET_OFFLINEDATA) {
                resultText = 'Offline data : ' + e[BGProfileModule.GET_OFFLINEDATA];
            }
            else if (e.action == BGProfileModule.ACTION_DELETE_OFFLINEDATA) {
                resultText = e[BGProfileModule.DELETE_OFFLINEDATA] == true? 'Delete success':'Delete fail'
            }
            else if (e.action == BGProfileModule.ACTION_SET_BOTTLEMESSAGE) {
                resultText = e[BGProfileModule.SET_BOTTLEMESSAGE] == true? 'Set bottle message success':'Set bottle message fail'
            }
            else if (e.action == BGProfileModule.ACTION_GET_BOTTLEMESSAGE) {
                resultText = 'Expire time : ' + e[BGProfileModule.GET_EXPIRECTIME] +"  ";
                resultText += 'UserID : ' + e[BGProfileModule.GET_USENUM];
            }
            else if (e.action == BGProfileModule.ACTION_SET_BOTTLEID) {
                resultText = e[BGProfileModule.SET_BOTTLEMESSAGE] == true? 'Set bottleID success':'Set bottleID fail'
            }
            else if (e.action == BGProfileModule.ACTION_GET_BOTTLEID) {
                resultText = 'BottleID is : ' + e[BGProfileModule.GET_BOTTLEID];
            }
            else if (e.action == BGProfileModule.ACTION_ERROR_BG) {
                let errorNumber = e[BGProfileModule.ERROR_NUM_BG]
                // let errorDescription = e[BGProfileModule.ERROR_DESCRIPTION_BG]
                resultText = "Error happens:\nerrorNumber = " + errorNumber;
                // + "\nDescreption: " + errorDescription
            } else {
                resultText = JSON.stringify(e)
            }
            console.info('BG5View', resultText);
            // self.refs.tipView.setState({resultText: resultText});
            self.setState({resultText: resultText})
        });
    }

    removeListener() {
        //Unregister  event

        if (this.disConnectionListener) {
            this.disConnectionListener.remove()
        }

        if (this.notifyListerner) {
            this.notifyListerner.remove()
        }
    }

    holdLink() {
        console.log("  BG5 holdLink  ");
        BG5Module.holdLink(this.props.mac);
    }

    getBattery() {
        console.log("  BG5 getBattery  ");
        BG5Module.getBattery(this.props.mac);
    }

    setTime() {
        console.log("  BG5 setTime  ");
        BG5Module.setTime(this.props.mac);
    }

    setUnit(type) {
        console.log("  BG5 setUnit  " + type);
        BG5Module.setUnit(this.props.mac, type);
    }

    startMeasure(type) {
        console.log("  BG5 startMeasure  " + type);
        BG5Module.startMeasure(this.props.mac, type);
    }

    getOfflineData() {
        console.log("  BG5 getOfflineData  ");
        BG5Module.getOfflineData(this.props.mac);
    }

    deleteOfflineData() {
        console.log("  BG5 deleteOfflineData  ");
        BG5Module.deleteOfflineData(this.props.mac);
    }

    setBottleMessage(QR) {
        console.log("  BG5 setBottleMessage  " + QR);
        BG5Module.setBottleMessage(this.props.mac, QR);
    }

    getBottleMessage() {
        console.log("  BG5 getBottleMessage  ");
        BG5Module.getBottleMessage(this.props.mac);
    }

    setBottleID(ID) {
        console.log("  BG5 setBottleID  " + ID);
        BG5Module.setBottleID(this.props.mac, ID);
    }

    getBottleID() {
        console.log("  BG5 getBottleID  ");
        BG5Module.getBottleID(this.props.mac);
    }

    disConnect() {
        console.log("  BG5 disConnect  ");
        BG5Module.disConnect(this.props.mac);
    }

    render() {

        return (
            <View style={styles.container}>

                <ScrollView
                    style={{height: 60, paddingBottom: 10}}>
                    <Text>{this.state.resultText}</Text>
                </ScrollView>
                <ScrollView style={styles.contentContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => this.holdLink()}>
                        <Text style={styles.buttonText}>
                            保持连接
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => this.setTime()}>
                        <Text style={styles.buttonText}>
                            设置时间
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => this.setUnit(1)}>
                        <Text style={styles.buttonText}>
                            设置单位
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => this.getBattery()}>
                        <Text style={styles.buttonText}>
                            获得电量
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => this.startMeasure(1)}>
                        <Text style={styles.buttonText}>
                            开始测量
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => this.getOfflineData()}>
                        <Text style={styles.buttonText}>
                            获取离线数据
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => this.deleteOfflineData()}>
                        <Text style={styles.buttonText}>
                            删除离线数据
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => this.setBottleMessage("02323C641E3114322D0800A064646464646464646464FA012261000E1CCC")}>
                        <Text style={styles.buttonText}>
                            设置试瓶信息
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => this.getBottleMessage()}>
                        <Text style={styles.buttonText}>
                            获取试瓶信息
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => this.setBottleID(123123123)}>
                        <Text style={styles.buttonText}>
                            设置BottleID
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => this.getBottleID()}>
                        <Text style={styles.buttonText}>
                            获取BottleID
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => this.disConnect()}>
                        <Text style={styles.buttonText}>
                            断开连接
                        </Text>
                    </TouchableOpacity>
                </ScrollView>


                {/*<TipView ref="tipView"/>*/}
            </View>
        )
    }
}
