import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  DeviceEventEmitter
} from 'react-native';

import {
  iHealthDeviceManagerModel,
  BP5Model
} from 'ihealthlibrary-react-native'



var styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20
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


class TipView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tip:''
    }
  }

  render() {
    return (
      <View>
        <Text> Tip: {this.state.tip} </Text>
      </View>
    )
  }

}

export default class BP5View extends Component {

  constructor(props) {
    super(props);
    var connectionListener = null
    var notifyListerner = null
  }

  componentWillMount(){
    console.log('BP5View -- componentWillMount :' + this.props.mac)
    this.addListener()
  }

  componentWillUnmount() {
    console.log('BP5View -- componentWillUnmount')
    this.removeListener()
  }

  getDeviceInfo() {
    iHealthDeviceManagerModel.getDevicesIDPS (this.props.mac, (e) => {
        console.log('deviceInfo:' +  e.modenumber)
    })
  }

  startMeasure() {
    BP5Model.startMeasure(this.props.mac)
  }

  stopMeasure() {
    BP5Model.stopMeasure(this.props.mac)
  }

  addListener() {
      let self = this
      this.connectionListener = DeviceEventEmitter.addListener(iHealthDeviceManagerModel.DeviceDisconnect, function(e: Event) {
          // handle event.
          console.log('~~~' + JSON.stringify(e))
      });

      this.notifyListerner = DeviceEventEmitter.addListener(BP5Model.Action_Battery, function(e: Event) {
          // handle event.
          console.log('~~~' + JSON.stringify(e))
          self.refs.tipView.setState({tip: JSON.stringify(e)})
      });
      this.notifyListerner = DeviceEventEmitter.addListener(BP5Model.Action_Zeroing, function(e: Event) {
          // handle event.
          console.log('~~~' + BP5Model.Action_Zeroing)
          self.refs.tipView.setState({tip: JSON.stringify(e)})
      });
      this.notifyListerner = DeviceEventEmitter.addListener(BP5Model.Action_ZeroOver, function(e: Event) {
          // handle event.
          console.log('~~~' + BP5Model.Action_ZeroOver)
          self.refs.tipView.setState({tip: JSON.stringify(e)})
      });
      this.notifyListerner = DeviceEventEmitter.addListener(BP5Model.Action_Pressure, function(e: Event) {
          // handle event.
          console.log('~~~' + e.pressure)
          self.refs.tipView.setState({tip: JSON.stringify(e)})
      });
      this.notifyListerner = DeviceEventEmitter.addListener(BP5Model.Action_PulseWave, function(e: Event) {
          // handle event.
          console.log('~~~' + e.wave)
          self.refs.tipView.setState({tip: JSON.stringify(e)})
      });
      this.notifyListerner = DeviceEventEmitter.addListener(BP5Model.Action_Result, function(e: Event) {
          // handle event.
          console.log('~~~' + e.highpressure)
          self.refs.tipView.setState({tip: JSON.stringify(e)})
      });
  }

  removeListener() {
    //Unregister  event
    if (this.connectionListener) {
      this.connectionListener.remove()
    }
    if(this.notifyListerner) {
      this.notifyListerner.remove()
    }
  }

  render() {
    return (
      <View>
        <View style={styles.heading}>
          <Text style={styles.headText}> BP5 View </Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={()=> this.props.navigator.pop()}>
            <Text style={styles.buttonText}>
              返回主页
            </Text>
        </TouchableOpacity>

          <TouchableOpacity
              style={styles.button}
              onPress={()=> this.getDeviceInfo()}>
              <Text style={styles.buttonText}>
                  获取设备信息
              </Text>
          </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={()=> this.startMeasure()}>
            <Text style={styles.buttonText}>
              开始测量
            </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={()=> this.stopMeasure()}>
            <Text style={styles.buttonText}>
              结束测量
            </Text>
        </TouchableOpacity>

        <TipView ref='tipView'/>
      </View>
    )
  }
}
