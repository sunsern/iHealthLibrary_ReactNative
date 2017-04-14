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
    BG5LModule,
    BGProfileModule
} from 'ihealthlibrary-react-native'

var styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 60
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

export default class BG5LView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            resultText: "",
            QRCode:"02323C641E3114322D0800A064646464646464646464FA012261000E1CCC",
            BottleID:""
        }
    }

    componentWillMount() {
        console.log('BG5LView', 'componentWillMount :' + this.props.mac, null);
        this.addListener();
    }

    componentWillUnmount() {
        console.log('BG5LView', 'componentWillUnmount', null);
        this.removeListener();
    }

    addListener() {
        let self = this

        this.disConnectionListener = DeviceEventEmitter.addListener(iHealthDeviceManagerModule.Event_Device_Disconnect, function (e: Event) {
            console.log('BG5L' + '_addListener()_DeviceDisConnect', JSON.stringify(e));
            // I/Runtime_iHealthDM: onDeviceConnectionStateChange(8CDE52B5F928, BG5, 2, 0)
            // I/ReactNativeJS: 'BG5_addListener()_DeviceDisConnect', '{"errorid":0,"type":"BG5","mac":"8CDE52B5F928"}'
            self.props.navigator.pop();
        });

        this.notifyListerner = DeviceEventEmitter.addListener(BG5LModule.Event_Notify, function (e: Event) {
            console.info('BG5LView', 'addListener_NotifyLinstener', "Action = " + e.action + '\n' + "Message = " + JSON.stringify(e));
            if (e.action == BGProfileModule.ACTION_KEEP_LINK) {
                resultText = 'Keep link success';
            }
            else if (e.action == BGProfileModule.ACTION_GET_BATTERY) {
                resultText = 'bg5L battery : ' + e[BGProfileModule.GET_BATTERY];
            }
            else if (e.action == BGProfileModule.ACTION_SET_TIME) {
                resultText = 'Set time success';
            }
            else if (e.action == BGProfileModule.ACTION_SET_UNIT) {
                resultText =  'Set unit success';
            }
            else if (e.action == BGProfileModule.ACTION_START_MEASURE) {
                resultText = 'Start measure success';
            }
            else if (e.action == BGProfileModule.ACTION_GET_OFFLINEDATA) {
                resultText = 'Offline data : ' + e[BGProfileModule.GET_OFFLINEDATA];
            }
            else if (e.action == BGProfileModule.ACTION_GET_OFFLINEDATA_COUNT) {
                resultText = 'Offline data count : ' + e[BGProfileModule.GET_OFFLINEDATA_COUNT];
            }
            else if (e.action == BGProfileModule.ACTION_DELETE_OFFLINEDATA) {
                resultText = 'Delete success';
            }
            else if (e.action == BGProfileModule.ACTION_SET_BOTTLEMESSAGE) {
                resultText = JSON.stringify(e);
            }
            else if (e.action == BGProfileModule.ACTION_GET_BOTTLEMESSAGE) {
                resultText = 'Expire time : ' + e[BGProfileModule.GET_EXPIRECTIME] +"  ";
                resultText += 'UseNum: ' + e[BGProfileModule.GET_USENUM];
            }
            else if (e.action == BGProfileModule.ACTION_SET_BOTTLEID) {
                resultText = 'Set bottleID success';
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
                resultText = "Error happens:\n errorNumber = " + errorNumber + "\nDescreption: " + errorDescription;
            } else if(e.action == BGProfileModule.ACTION_CODE_ANALYSIS){
                BottleID = e[BGProfileModule.BOTTLEID_BG]
                resultText = JSON.stringify(e)
                console.log('BottleID = ' + BottleID)
                self.setState({BottleID: BottleID})
            } else {
                resultText = JSON.stringify(e)
            }
            console.info('BG5LView', resultText);
            self.setState({resultText: resultText})
        });


    }

    removeListener() {

        if (this.disConnectionListener) {
            this.disConnectionListener.remove()
        }

        if (this.notifyListerner) {
            this.notifyListerner.remove()
        }
    }
    getBottleInfoFromQR(QRCode){
        console.log("  BG5L getBottleInfoFromQR  " + QRCode);
        BG5LModule.getBottleInfoFromQR(QRCode);
    }
    holdLink() {
        console.log("  BG5L holdLink  " + this.props.mac);
        BG5LModule.holdLink(this.props.mac);
    }

    getBattery() {
        console.log("  BG5L getBattery  ");
        BG5LModule.getBattery(this.props.mac);
    }

    setTime() {
        console.log("  BG5L setTime  ");
        BG5LModule.setTime(this.props.mac);
    }

    setUnit(type) {
        console.log("  BG5L setUnit  " + type);
        BG5LModule.setUnit(this.props.mac, type);
    }

    startMeasure(type) {
        console.log("  BG5L startMeasure  " + type);
        BG5LModule.startMeasure(this.props.mac, type);
    }

    getOfflineData() {
        console.log("  BG5L getOfflineData  ");
        BG5LModule.getOfflineData(this.props.mac);
    }

    deleteOfflineData() {
        console.log("  BG5L deleteOfflineData  ");
        BG5LModule.deleteOfflineData(this.props.mac);
    }

    setBottleMessage(stripType, measureType, QRCode, stripNum, overDate) {
        console.log("  BG5L setBottleMessage  " + "stripType= " + stripType + " measureType="+measureType + " QRCode"
                    + QRCode + " stripNum=" +stripNum + " overDate="+overDate);
        BG5LModule.setBottleMessage(this.props.mac, stripType, measureType, QRCode , stripNum, overDate);
    }

    getBottleMessage() {
        console.log("  BG5L getBottleMessage  ");
        BG5LModule.getBottleMessage(this.props.mac);
    }

    setBottleID(ID) {
        console.log("  BG5L setBottleID  " + ID);
        BG5LModule.setBottleID(this.props.mac, ID);
    }

    getBottleID() {
        console.log("  BG5L getBottleID  ");
        BG5LModule.getBottleID(this.props.mac);
    }

    disConnect() {
        console.log("  BG5L disConnect  ");
        BG5LModule.disConnect(this.props.mac);
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
                        onPress={() => this.getBottleInfoFromQR(this.state.QRCode)}>
                        <Text style={styles.buttonText}>
                            parseCodeInfo
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => this.holdLink()}>
                        <Text style={styles.buttonText}>
                            holdLink
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
                        onPress={() => this.setBottleMessage(1,1,this.state.QRCode,20,"2017-07-15")}>
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
                        onPress={() => this.setBottleID(this.state.BottleID)}>
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
            </View>
        )
    }
}
