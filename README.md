# pose-detector

## Library

- MediaPipe
- React
- Socket.io

## Command

```shell
yarn # install dependency package
yarn start # start server
yarn build # build static file
```

## Structure

### src

- index: start point
- App: start point component
- Mediapipe: load mediapipe component
- custom/customLandmark: custom MediaPipe pose landmark
- custom/customPoseConnection: custom MediaPipe pose connection
- service/input: input for websocket body
- service/websocket: socket.io module
