/**
 * Created by zhangxu on 16/11/20.
 */


import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    TextInput,
    Picker,
    View,
    Button,
    TouchableOpacity,
    DeviceEventEmitter,
    ScrollView
} from 'react-native';


import {
    iHealthDeviceManagerModule,
    BP7SModule,
    BPProfileModule
} from 'ihealthlibrary-react-native'


var styles = StyleSheet.create({
    container: {
        margin: 20,
        marginTop: 50
    },
    contentContainer: {
        height: 400,
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




export default class BP7SView extends Component {

    constructor(props) {
        super(props);

        this.state = {
            unit: 0,
            resultText:''
        }

    }

    componentWillMount() {
        console.info('BP7SView', 'componentWillMount()', "mac = " + this.props.mac + " type = " + this.props.type);
        this._addListener();
    }

    componentDidMount() {
        console.info('BP7SView', 'componentDidMount()');
    }


    componentWillUnmount() {
        console.info('BP7SView', 'componentWillUnmount()');

        this._removeListener();

    }

    render() {

        console.info('BP7SView', 'render()');

        return (
            <View style={styles.container}>

                <ScrollView style={styles.contentContainer}>
                    <TouchableOpacity

                        style={styles.button}
                        onPress={() => this._getDeviceIDPS()}>

                        <Text style={styles.buttonText}>
                            获得IDPS
                        </Text>


                    </TouchableOpacity>

                    <TouchableOpacity

                        style={styles.button}
                        onPress={() => this._getFunctionInfo()}>

                        <Text style={styles.buttonText}>
                            获得下位机信息
                        </Text>


                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => this._getBattery()}>

                        <Text style={styles.buttonText}>
                            获得电量
                        </Text>


                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => this._startMeasure()}>

                        <Text style={styles.buttonText}>
                            获得离线数据数量
                        </Text>


                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => this._stopMeasure()}>

                        <Text style={styles.buttonText}>
                            获得离线数据
                        </Text>


                    </TouchableOpacity>

                    <View style={{flexDirection: 'row', marginTop: 10}}>


                        <Picker
                            style={{flex: 1, height: 60}}
                            selectedValue={this.state.unit}
                            onValueChange={(value) => {
                                this.setState({unit: value})
                            }}
                            mode="dropdown">

                            <Picker.Item label='mmHg' value={0}/>
                            <Picker.Item label='KPa' value={1}/>

                        </Picker>

                        <TouchableOpacity

                            style={{
                                height: 60,
                                justifyContent: 'center', // 内容居中显示
                                backgroundColor: '#eedddd',
                                alignItems: 'center',
                                flex: 2
                            }}
                            onPress={() => this._setUnit(this.state.unit)}>

                            <Text style={styles.buttonText}>
                                设置单位
                            </Text>


                        </TouchableOpacity>


                    </View>


                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => this._setAngle()}>

                        <Text style={styles.buttonText}>
                            设置角度
                        </Text>


                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => this._disConnect()}>

                        <Text style={styles.buttonText}>
                            断开连接
                        </Text>


                    </TouchableOpacity>

                </ScrollView>

                <TouchableOpacity
                    style={{backgroundColor: '#000000', height: 3}}>
                </TouchableOpacity>

                <ScrollView
                    style={{height: 150, paddingBottom: 10}}>
                    <Text>{this.state.resultText}</Text>
                </ScrollView>

            </View>


        )


    }


    _addListener() {


        let result = "";
        let self = this;

        this.connectionListener = DeviceEventEmitter.addListener(iHealthDeviceManagerModule.Event_Device_Disconnect, function (e: Event) {
            // handle event.
            console.info(JSON.stringify(e));
            self.props.navigator.pop();
        });
        this.notifyListener = DeviceEventEmitter.addListener(BP7SModule.Event_Notify, function (e: Event) {
            console.info( "Action = " + e.action + '\n' + "Message = " + JSON.stringify(e));

            if (e.action === BPProfileModule.ACTION_ERROR_BP) {
                let errorNum = e[BPProfileModule.ERROR_NUM_BP];
                result = "错误编号：" + "\nErrorNum = " + errorNum;
            }
            else if (e.action === BPProfileModule.ACTION_BATTERY_BP) {
                let battery = e[BPProfileModule.BATTERY_BP];
                result = "电池电量：" + "\nBattery = " + battery;
            }
            else if (e.action === BPProfileModule.ACTION_HISTORICAL_NUM_BP) {
                let offlineNum = e[BPProfileModule.HISTORICAL_NUM_BP];
                result = "离线数据数量：" + "\nofflineNum = " + offlineNum;
            }
            else if (e.action === BPProfileModule.ACTION_HISTORICAL_DATA_BP) {

                let dataArray = e[BPProfileModule.HISTORICAL_DATA_BP];

                if (dataArray == undefined) {
                    result = "There is not offline data in device"
                }else {
                    result = "离线数据：";

                    for (let i = 0; i < dataArray.length; i++) {
                        let offlineData = dataArray[i];

                        let time = offlineData[BPProfileModule.HISTORICAL_DATA_BP];
                        let sys = offlineData[BPProfileModule.HIGH_BLOOD_PRESSURE_BP];
                        let dia = offlineData[BPProfileModule.LOW_BLOOD_PRESSURE_BP];
                        let heartRate = offlineData[BPProfileModule.PULSE_BP];
                        let arrhythmia = offlineData[BPProfileModule.MEASUREMENT_AHR_BP];
                        let hsd = offlineData[BPProfileModule.MEASUREMENT_HSD_BP];
                        let startAngle = offlineData[BPProfileModule.MEASUREMENT_STRAT_ANGLE_BP];
                        let measureAngleChange = offlineData[BPProfileModule.MEASUREMENT_ANGLE_CHANGE_BP];
                        let chooseHand = offlineData[BPProfileModule.MEASUREMENT_HAND_BP];
                        let dataID = offlineData[BPProfileModule.DATAID];

                        result += "\n---------------------------------------------------------------"
                        result += "\ntime = " + time +
                            "\nsys = " + sys +
                            "\ndia = " + dia +
                            "\nheartRate" + heartRate +
                            "\narrhythmia = " + arrhythmia +
                            "\nhsd = " + hsd +
                            "\nstartAngle = " + startAngle +
                            "\nmeasureAngleChange = " + measureAngleChange +
                            "\nchooseHand = " + chooseHand +
                            "\ndataID = " + dataID;
                    }
                }

            } else if (e.action === BPProfileModule.ACTION_HISTORICAL_OVER_BP) {
                result += "\n---------------------------------------------------------------";
                result += "\n 离线数据上传结束"
            } else if (e.action === BPProfileModule.ACTION_FUNCTION_INFORMATION_BP) {

                let upAirMeasureFlg = e[BPProfileModule.FUNCTION_IS_UPAIR_MEASURE];
                let armMeasureFlg = e[BPProfileModule.FUNCTION_IS_ARM_MEASURE];
                let haveAngleSensor = e[BPProfileModule.FUNCTION_HAVE_ANGLE_SENSOR];
                let haveOffline = e[BPProfileModule.FUNCTION_HAVE_OFFLINE];
                let haveHSD = e[BPProfileModule.FUNCTION_IS_UPAIR_MEASURE];
                let haveAngleSet = e[BPProfileModule.FUNCTION_HAVE_ANGLE_SETTING];
                let mutableUpload = e[BPProfileModule.FUNCTION_IS_MULTI_UPLOAD];
                let selfUpdate = e[BPProfileModule.FUNCTION_HAVE_SELF_UPDATE];

                result += "设备功能信息：" + "\nupAirMeasureFlg = " + upAirMeasureFlg +
                    "\narmMeasureFlg = " + armMeasureFlg +
                    "\nhaveAngleSensor = " + haveAngleSensor +
                    "\nhaveOffline" + haveOffline +
                    "\nhaveHSD = " + haveHSD +
                    "\nhaveAngleSet = " + haveAngleSet +
                    "\nmutableUpload = " + mutableUpload +
                    "\nselfUpdate = " + selfUpdate



            }
            else if (e.action === BPProfileModule.ACTION_SET_UNIT_SUCCESS_BP) {
                result = "set unit successfully";
            }
            else if (e.action === BPProfileModule.ACTION_SET_ANGLE_SUCCESS_BP) {
                result = "set angle successfully";
            }

            self.setState({resultText: result});
        });


    }

    _removeListener() {
        //Unregister  event
        if (this.connectionListener) {
            this.connectionListener.remove()
        }
        if (this.notifyListener) {
            this.notifyListener.remove()
        }

    }


    _getDeviceIDPS() {
        iHealthDeviceManagerModule.getDevicesIDPS(this.props.mac, (e) => {
            console.info('deviceInfo:' + JSON.stringify(e));
            this.setState({resultText: JSON.stringify(e)})
        })
    }

    _getFunctionInfo() {

        BP7SModule.getFunctionInfo(this.props.mac);
    }

    _startMeasure() {

        BP7SModule.getOffLineNum(this.props.mac);
    }

    _stopMeasure() {
        BP7SModule.getOffLineData(this.props.mac);
    }

    _getBattery() {
        BP7SModule.getBattery(this.props.mac);
    }

    _setUnit(unit) {
        BP7SModule.setUnit(this.props.mac, unit);
    }

    _setAngle() {
        BP7SModule.angleSet(this.props.mac, 90, 0, 0, 0);
    }

    _disConnect() {
        BP7SModule.disconnect(this.props.mac);
    }
}