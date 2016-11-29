/**
 * Created by zhangxu on 16/11/11.
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Button,
    TouchableNativeFeedback,
    DeviceEventEmitter,
    ScrollView
} from 'react-native';


import {
    iHealthDeviceManagerModule,
    BP3LModule,
    BPProfileModule
} from 'ihealthlibrary-react-native'



var styles = StyleSheet.create({
    container: {
        margin: 20,
        marginTop: 60
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



export default class BP3LView extends Component {

    constructor(props) {
        super(props);


    }

    componentWillMount() {
        console.info('BP3LView', 'componentWillMount()', null);
        this._addListener();
    }

    componentDidMount() {
        console.info('BP3LView', 'componentDidMount()', null);
    }


    componentWillReceiveProps() {
        console.info('BP3LView', 'componentWillReceiveProps()', null);
    }

    shouldComponentUpdate() {
        console.info('BP3LView', 'shouldComponentUpdate()', null);
    }

    componentWillUpdate() {
        console.info('BP3LView', 'componentWillUpdate()', null);
    }

    componentDidUpdate() {
        console.info('BP3LView', 'componentDidUpdate()', null);
    }

    componentWillUnmount() {
        console.info('BP3LView', 'componentWillUnmount()', null);

        this._removeListener();

    }

    render() {

        console.info('BP3LView', 'render()', null);

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
                                开始测量
                            </Text>
                        </View>


                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback

                        onPress={() => this._stopMeasure()}>

                        <View style={styles.button}>
                            <Text style={styles.buttonText}>
                                停止测量
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


        );


    }


    _addListener() {


        let self = this;
        this.connectionListener = DeviceEventEmitter.addListener(iHealthDeviceManagerModule.Event_Device_Disconnect, function (e: Event) {
            // handle event.
            console.info('BP5View', 'addListener_DeviceDisconnect', JSON.stringify(e));
            self.props.navigator.pop();
        });
        this.notifyListener = DeviceEventEmitter.addListener(BP3LModule.Event_Notify, function (e: Event) {
            console.info('BP5View', 'addListener_DeviceDisconnect',"Action = " +  e.action + '\n' + "Message = " +  JSON.stringify(e));
            if (e.action === BPProfileModule.ACTION_ERROR_BP) {
                self.refs.TipView.setState({tip: JSON.stringify(e)});
            }
            else if (e.action === BPProfileModule.ACTION_BATTERY_BP) {
                self.refs.tipView.setState({tip: JSON.stringify(e)});
            }
            else if (e.action === BPProfileModule.ACTION_ZOREING_BP) {
                self.refs.tipView.setState({tip: JSON.stringify(e)});
            }
            else if (e.action === BPProfileModule.ACTION_ZOREOVER_BP) {
                self.refs.tipView.setState({tip: JSON.stringify(e)});
            }
            else if (e.action === BPProfileModule.ACTION_ONLINE_PRESSURE_BP) {
                self.refs.tipView.setState({tip: JSON.stringify(e)});
            }
            else if (e.action === BPProfileModule.ACTION_ONLINE_PULSEWAVE_BP) {
                self.refs.tipView.setState({tip: JSON.stringify(e)});
            }
            else if (e.action === BPProfileModule.ACTION_ONLINE_RESULT_BP) {
                self.refs.tipView.setState({tip: JSON.stringify(e)});
            }
            else if (e.action === BPProfileModule.ACTION_INTERRUPTED_BP) {
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

    _startMeasure() {

        BP3LModule.startMeasure(this.props.mac);
    }

    _stopMeasure() {
        BP3LModule.stopMeasure(this.props.mac);
    }

    _getBattery() {
        BP3LModule.getBattery(this.props.mac);
    }

    _disConnect() {
        BP3LModule.disconnect(this.props.mac);
    }
}