# iHealthLibrary_ReactNative

##Install  
```
 npm install @ihealth/ihealthlibrary-react-native  
```


##Configure module for Android
```
1. android/settings.gradle    

	include ':ihealthlibrary-react-native' 
	project(':ihealthlibrary-react-native').projectDir = new File(rootProject.projectDir,'../node_modules/@ihealth/ihealthlibrary-react-native/android')

2. android/app/build.gradle
	compile project(':ihealthlibrary-react-native')

3. register module (in MainActivity.java)    
	protected List<ReactPackage> getPackages() {  
		return Arrays.<ReactPackage>asList(
		   new MainReactPackage(),
		   new iHealthDeviceManagerPackage()       
	 	);  
	}   
```

##Configure module for iOS
```
1. Open your iOS project, add node_modules/@ihealth/ihealthlibrary-react-native/ios/ReactNativeIOSLibrary.xcodeproj to libraries

2. Under 'Build Phases' --  'Link Binary With Libraries', add libReactNativeIOSLibrary.a
 
```

	  
##Import module
```
import {
  iHealthDeviceManagerModule,
  BP5Module,
  AM4Module
} from '@ihealth/ihealthlibrary-react-native'
```


##Demo Api
```
	Discovery: iHealthDeviceManagerModule.startDiscovery(iHealthDeviceManagerModule.BP5)  
```
```
	Connect: iHealthDeviceManagerModule.connectDevice(mac,type)  
```
```
	Start Measure: BP5Module.startMeasure(mac)  
```
```
	Stop Measure: BP5Module.stopMeasure(mac)  
```
##Example
    
[Click this link](https://github.com/iHealthDeviceLabs/iHealthLibrary_ReactNative/tree/master/Example)

