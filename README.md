# pose-detector

## Library

- MediaPipe
- React
- Tensorflow.js

## Command

```shell
yarn # install dependency package
yarn start # start server
yarn build # build static file
```

## Structure

```
src
│  App.css
│  App.js: start point component
│  App.test.js
│  index.js: start point
│  logo.svg
│  Mediapipe.js: load mediapipe component
│  reportWebVitals.js
│  service-worker.js
│  serviceWorkerRegistration.js
│
├─custom
│      customLandmark.js: custom MediaPipe pose landmark
│      customPoseConnection.js: custom MediaPipe pose connection
│
└─service
        api.js
        input.js
        model.js: tensorflow js model module
        tf.js: tensorflow js module
        websocket.js
```
