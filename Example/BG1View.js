/**
 * Created by zhangxu on 16/11/11.
 */
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
    BG1Module,
    BG1ProfileModule
} from 'ihealthlibrary-react-native'


var styles = StyleSheet.create({
    container: {
        margin: 20,
        marginTop: 50
    },
    contentContainer: {
        height: 200,
        marginTop: 20
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
        };
    }

    render() {
        console.info('TipView', 'render()', null);
        return (
            <View>
                <Text> Tip: {this.state.tip} </Text>
            </View>
        )
    }

}

export default class BG1View extends Component {

    constructor(props) {
        super(props);
        this.state = {
            QRCode:"02ABCDE67C284BA29ACDFEE6E60A2FE43EDF0C"
        }

    }

    componentWillMount() {
        console.info('BG1View', 'componentWillMount', '_addListener');
         this._addListener();
    }

    componentDidMount() {
        console.info('BG1View', 'componentDidMount',  null);
    }


    componentWillReceiveProps() {
        console.info('BG1View', 'componentWillReceiveProps', null);
    }

    shouldComponentUpdate() {
        console.info('BG1View', 'shouldComponentUpdate', null);
    }

    componentWillUpdate() {
        console.info('BG1View', 'componentWillUpdate', null);
    }

    componentDidUpdate() {
        console.info('BG1View', 'componentDidUpdate', null);
    }

    componentWillUnmount() {
        console.info('BG1View', 'componentWillUnmount', '_removeListener');
         this._removeListener();
    }


    _addListener() {
        let self = this;

        this.connectionListener = DeviceEventEmitter.addListener(iHealthDeviceManagerModule.Event_Device_Disconnect, function (e: Event) {
            // handle event.
            console.info('BG1View', 'addListener_DeviceDisconnect', JSON.stringify(e));
            self.props.navigator.pop();
        });

        this.notifyListener = DeviceEventEmitter.addListener(BG1Module.Event_Notify, function (e: Event) {

            console.info('BG1View', 'Event_Notify',"Action = " +  e.action + '\n' + "Message = " +  JSON.stringify(e));
            
            if(e.action===BG1ProfileModule.ACTION_BG1_SENDCODE_RESULT) {
                console.info(JSON.stringify(e));
            } else if (e.action === BG1ProfileModule.ACTION_BG1_MEASURE_ERROR) {
                console.info(JSON.stringify(e));
            } else if (e.action === BG1ProfileModule.ACTION_BG1_MEASURE_STRIP_IN) {
                 console.info(JSON.stringify(e));
            } else if (e.action === BG1ProfileModule.ACTION_BG1_MEASURE_GET_BLOOD) {
                 console.info(JSON.stringify(e));
            } else if (e.action === BG1ProfileModule.ACTION_BG1_MEASURE_RESULT) {
                 console.info(JSON.stringify(e));
            } else if (e.action === BG1ProfileModule.ACTION_BG1_MEASURE_STRIP_OUT) {
                 console.info(JSON.stringify(e));
            } else if (e.action === BG1ProfileModule.ACTION_BG1_MEASURE_STANDBY) {
                 console.info(JSON.stringify(e));
            }
            self.refs.TipView.setState({tip: JSON.stringify(e)});

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

    // _connect() {
    //     console.info('----------------------------connect bg1 device------------------------------')
    //     BG1Module.connect();
    // }

    _sendCode() {
        BG1Module.sendCode(this.state.QRCode);
    }

    _getBottleInfoFromQR() {
       BG1Module.getBottleInfoFromQR(this.state.QRCode);
    }

    // _disconnect() {
    //     console.info('----------------------------disconnect bg1 device------------------------------')
    //     BG1Module.disconnect();
    // }


    render() {

        return (
            <View style={styles.container}>

                <ScrollView style={styles.contentContainer}>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => this._getBottleInfoFromQR()}>
                        <Text style={styles.buttonText}>
                            解析Code信息
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => this._sendCode()}>
                        <Text style={styles.buttonText}>
                            发送Code
                        </Text>
                    </TouchableOpacity>

                    
                </ScrollView>


                <TipView ref="TipView"/>
            </View>
        )
    }

}
