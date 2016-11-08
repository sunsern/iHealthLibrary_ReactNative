# iHealthLibrary_ReactNative

##Install  
```
 npm install  ihealthlibrary-react-native  
```


##Configure model for Android
```
1. android/settings.gradle    

	include ':ihealthlibrary-react-native' 
	project(':ihealthlibrary-react-native').projectDir = new File(rootProject.projectDir,'../node_modules/ihealthlibrary-react-native/android')

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

	  
##Import module
```
import {
  iHealthDeviceManagerModel,
  BP5Model
} from 'ihealthlibrary-react-native'
```


##Demo Api
```
	Discovery: iHealthDeviceManagerModel.startDiscovery(BP5)  
```
```
	Connect: iHealthDeviceManagerModel.connectDevice(mac)  
```
```
	Start Measure: BP5Model.startMeasure(mac)  
```
```
	Stop Measure: BP5Model.stopMeasure(mac)  
```
##Example

