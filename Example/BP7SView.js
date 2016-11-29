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
    TouchableNativeFeedback,
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

class TipView extends Component {
    constructor(props) {
        super(props)

        this.state = {
            tip: ''
        }

    }

    render() {
        return (
            <View>
                <Text>
                    Tip: {this.state.tip}
                </Text>
            </View>
        )
    }


}


export default class BP7SView extends Component {

    constructor(props) {
        super(props);

        this.state = {
            unit: 0
        }

    }

    componentWillMount() {
        console.info('BP7SView', 'componentWillMount()', "mac = " + this.props.mac + " type = " + this.props.type);
        this._addListener();
    }

    componentDidMount() {
        console.info('BP7SView', 'componentDidMount()');
    }


    componentWillReceiveProps() {
        console.info('BP7SView', 'componentWillReceiveProps()');
    }


    componentWillUpdate() {
        console.info('BP7SView', 'componentWillUpdate()');
    }

    componentDidUpdate() {
        console.info('BP7SView', 'componentDidUpdate()');
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
                    <TouchableNativeFeedback

                        onPress={() => this._getDeviceIDPS()}>

                        <View style={styles.button}>
                            <Text style={styles.buttonText}>
                                获得IDPS
                            </Text>
                        </View>


                    </TouchableNativeFeedback>

                    <TouchableNativeFeedback

                        onPress={() => this._getFunctionInfo()}>

                        <View style={styles.button}>
                            <Text style={styles.buttonText}>
                                获得下位机信息
                            </Text>
                        </View>


                    </TouchableNativeFeedback>

                    <TouchableNativeFeedback

                        onPress={() => this._getBattery()}>

                        <View style={styles.button}>
                            <Text style={styles.buttonText}>
                                获得电量
                            </Text>
                        </View>


                    </TouchableNativeFeedback>

                    <TouchableNativeFeedback
                        onPress={() => this._startMeasure()}>

                        <View style={styles.button}>

                            <Text style={styles.buttonText}>
                                获得离线数据数量
                            </Text>
                        </View>


                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback

                        onPress={() => this._stopMeasure()}>

                        <View style={styles.button}>
                            <Text style={styles.buttonText}>
                                获得离线数据
                            </Text>
                        </View>


                    </TouchableNativeFeedback>

                    <View style={{flexDirection: 'row',marginTop: 10}}>


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


                    <TouchableNativeFeedback

                        onPress={() => this._setAngle()}>

                        <View style={styles.button}>
                            <Text style={styles.buttonText}>
                                设置角度
                            </Text>
                        </View>


                    </TouchableNativeFeedback>

                    <TouchableNativeFeedback

                        onPress={() => this._disConnect()}>

                        <View style={styles.button}>
                            <Text style={styles.buttonText}>
                                断开连接
                            </Text>
                        </View>


                    </TouchableNativeFeedback>

                </ScrollView>

                <TipView ref='tipView'/>


            </View>


        )
            ;


    }


    _addListener() {


        let self = this;

        this.connectionListener = DeviceEventEmitter.addListener(iHealthDeviceManagerModule.Event_Device_Disconnect, function (e: Event) {
            // handle event.
            console.info('BP5View', 'addListener_DeviceDisconnect', JSON.stringify(e));
            self.props.navigator.pop();
        });
        this.notifyListener = DeviceEventEmitter.addListener(BP7SModule.Event_Notify, function (e: Event) {
            console.info('BP5View', 'addListener_DeviceDisconnect', "Action = " + e.action + '\n' + "Message = " + JSON.stringify(e));
            if (e.action === BPProfileModule.ACTION_ERROR_BP) {
                self.refs.TipView.setState({tip: JSON.stringify(e)});
            }
            else if (e.action === BPProfileModule.ACTION_BATTERY_BP) {
                self.refs.tipView.setState({tip: JSON.stringify(e)});
            }
            else if (e.action === BPProfileModule.ACTION_HISTORICAL_NUM_BP) {
                self.refs.tipView.setState({tip: JSON.stringify(e)});
            }
            else if (e.action === BPProfileModule.ACTION_HISTORICAL_DATA_BP) {
                self.refs.tipView.setState({tip: JSON.stringify(e)});
            }
            else if (e.action === BPProfileModule.ACTION_FUNCTION_INFORMATION_BP) {
                self.refs.tipView.setState({tip: JSON.stringify(e)});
            }
            else if (e.action === BPProfileModule.ACTION_SET_UNIT_SUCCESS_BP) {
                self.refs.tipView.setState({tip: JSON.stringify(e)});
            }
            else if (e.action === BPProfileModule.ACTION_SET_ANGLE_SUCCESS_BP) {
                self.refs.tipView.setState({tip: JSON.stringify(e)});
            }

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
            this.refs.tipView.setState({tip: JSON.stringify(e)})
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