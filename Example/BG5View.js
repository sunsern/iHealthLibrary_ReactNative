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
    // 
    heading: {
        height: 44,
        alignItems: 'center',
        justifyContent: 'center', 
        marginBottom: 10
    },
    // 
    headText: {
        color: '#ff5555',
        fontSize: 22
    },
    // 
    button: {
        height: 60,
        marginTop: 10,
        justifyContent: 'center', 
        backgroundColor: '#eedddd',
        alignItems: 'center'
    },
    // 
    buttonText: {
        fontSize: 18
    },
    cell: {
        marginTop: 10,
        height: 25,
        alignItems: 'flex-start',
        justifyContent: 'center', 
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
                resultText = e[BGProfileModule.KEEP_LINK] ? 'Keep link success' : 'Keep link fail';
            }
            else if (e.action == BGProfileModule.ACTION_GET_BATTERY) {
                console.info('BG5View', BGProfileModule.GET_BATTERY + JSON.stringify(e));
                resultText = 'bg5 battery : ' + e[BGProfileModule.GET_BATTERY];
            }
            else if (e.action == BGProfileModule.ACTION_SET_TIME) {
                resultText = e[BGProfileModule.SET_TIME] ? 'Set time success' : 'Set time fail'
            }
            else if (e.action == BGProfileModule.ACTION_SET_UNIT) {
                resultText = e[BGProfileModule.SET_UNIT] == true ? 'Set unit success' : 'Set unit fail'
            }
            else if (e.action == BGProfileModule.ACTION_START_MEASURE) {
                resultText = e[BGProfileModule.START_MEASURE] == true ? 'Start measure success' : 'Start measure fail'
            }
            else if (e.action == BGProfileModule.ACTION_GET_OFFLINEDATA) {
                resultText = 'Offline data : ' + e[BGProfileModule.GET_OFFLINEDATA];
            }
            else if (e.action == BGProfileModule.ACTION_GET_OFFLINEDATA_COUNT) {
                console.info('Offline ' + e.action);
                resultText = 'Offline data count 111 : ' + e[BGProfileModule.GET_OFFLINEDATA_COUNT];
            }
            else if (e.action == BGProfileModule.ACTION_DELETE_OFFLINEDATA) {
                resultText = e[BGProfileModule.DELETE_OFFLINEDATA] == true ? 'Delete success' : 'Delete fail'
            }
            else if (e.action == BGProfileModule.ACTION_SET_BOTTLEMESSAGE) {
                resultText = e[BGProfileModule.SET_BOTTLEMESSAGE] == true ? 'Set bottle message success' : 'Set bottle message fail'
            }
            else if (e.action == BGProfileModule.ACTION_GET_BOTTLEMESSAGE) {
                resultText = 'Expire time : ' + e[BGProfileModule.GET_EXPIRECTIME] + "  ";
                resultText += 'UserID : ' + e[BGProfileModule.GET_USENUM];
            }
            else if (e.action == BGProfileModule.ACTION_SET_BOTTLEID) {
                resultText = e[BGProfileModule.SET_BOTTLEMESSAGE] == true ? 'Set bottleID success' : 'Set bottleID fail'
            }
            else if (e.action == BGProfileModule.ACTION_GET_BOTTLEID) {
                resultText = 'BottleID is : ' + e[BGProfileModule.GET_BOTTLEID];
            }
            else if (e.action == BGProfileModule.ACTION_STRIP_IN) {
                resultText = 'get the strip in ';
            }
            else if (e.action == BGProfileModule.ACTION_STRIP_OUT) {
                resultText = 'get the strip out ';
            }
            else if (e.action == BGProfileModule.ACTION_GET_BLOOD) {
                resultText = 'get the blood ';
            }
            else if (e.action == BGProfileModule.ACTION_ONLINE_RESULT_BG) {
                // onDeviceNotify(010203000003, BG5L, action_value_bg, {"result":146,"dataID":"3E995A712827354FB660B89A06B2AB99"})
                resultText = 'measure result : ' + e[BGProfileModule.ONLINE_RESULT_BG] + ' dataID : ' + e[BGProfileModule.DATA_ID];
            }
            else if (e.action == BGProfileModule.ACTION_ERROR_BG) {
                let errorNumber = e[BGProfileModule.ERROR_NUM_BG]
                let errorDescription = e[BGProfileModule.ERROR_DESCRIPTION_BG]
                resultText = "Error happens:\nerrorNumber = " + errorNumber + "\nDescreption: " + errorDescription;
            }
            else {
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

    setBottleMessage(stripType, measureType, QRCode, stripNum, overDate) {
        console.log("  BG5 setBottleMessage  " + "stripType= " + stripType + " measureType="+measureType + " QRCode="
                + QRCode + " stripNum=" +stripNum + " overDate="+overDate);
        BG5Module.setBottleMessage(this.props.mac, stripType, measureType, QRCode , stripNum, overDate);
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
                            holdLink
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => this.setTime()}>
                        <Text style={styles.buttonText}>
                            setTime
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => this.setUnit(1)}>
                        <Text style={styles.buttonText}>
                            setUnit
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => this.getBattery()}>
                        <Text style={styles.buttonText}>
                            getBattery
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => this.startMeasure(1)}>
                        <Text style={styles.buttonText}>
                            startMeasure
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => this.getOfflineData()}>
                        <Text style={styles.buttonText}>
                            getOfflineData
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => this.deleteOfflineData()}>
                        <Text style={styles.buttonText}>
                            deleteOfflineData
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => this.setBottleMessage(2,1,"",0,"")}>
                        <Text style={styles.buttonText}>
                            setBottleMessage
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => this.getBottleMessage()}>
                        <Text style={styles.buttonText}>
                            getBottleMessage
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => this.setBottleID(123123123)}>
                        <Text style={styles.buttonText}>
                            setBottleID
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => this.getBottleID()}>
                        <Text style={styles.buttonText}>
                            getBottleID
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => this.disConnect()}>
                        <Text style={styles.buttonText}>
                            disConnect
                        </Text>
                    </TouchableOpacity>
                </ScrollView>


                {/*<TipView ref="tipView"/>*/}
            </View>
        )
    }
}
