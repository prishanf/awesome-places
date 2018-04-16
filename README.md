
Installed Packages 
`$ npm install @ionic-native/core --save` Ionic Native Plugin

* Google Map
`$ npm install --save @agm/core ` Angular Google Maps Module 

* Camera
`$ ionic cordova plugin add cordova-plugin-camera`
`$ npm install @ionic-native/camera --save`

* Geolocation
`$ ionic cordova plugin add cordova-plugin-geolocation --variable GEOLOCATION_USAGE_DESCRIPTION="To locate you"`
`$ npm install --save @ionic-native/geolocation `

Notes:
Update the app.module.ts file with:
1) Imports

    ```javascript 
        import { Camera } from '@ionic-native/camera';
        import { Geolocation } from '@ionic-native/geolocation';
    ```
2 Add to providers array
```javascript
    providers: [
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        Geolocation,
        Camera
    ]
  ```