import React, {useState} from 'react';
import {Button, Colors, Text, View} from 'react-native-ui-lib';
import {services} from '@app/services';
import {NavioScreen} from 'rn-navio';
import {observer} from 'mobx-react';
import socketIoService from '@app/services/websocket/socketIoService';
import {ScrollView} from 'react-native-gesture-handler';

export const WebSocketTest: NavioScreen = observer(({}) => {
  const [connected, setConnected] = useState(false);

  const onClickConnect = () => {
    console.log('onClickConnect');
    // const webSocketConnector = new WebSocketConnector();
    // const socketIoConnector = new SocketIoConnector();
    // socketIoConnector.connect();
    // SocketIoConnector.connect();
    socketIoService.initalizeSocket();
  };

  const onClickDisconnect = () => {
    console.log('onClickDisconnect');
    socketIoService.disconnect();
  };

  const checkConnection = () => {
    // const isConnected = SocketIoConnector.isConnected();
    // setConnected(isConnected);
  };

  const connectionStatus = connected ? 'YEAH, BABY' : 'OH NO...';

  return (
    <View flex bg-bgColor>
      <ScrollView contentInsetAdjustmentBehavior="always">
        <Button label={'Connect'} onPress={onClickConnect} />
        <Button label={'Disconnect'} onPress={onClickDisconnect} />
        <Button onPress={checkConnection}>
          <Text>Check Connection</Text>
        </Button>
        <Text>{connectionStatus}</Text>
      </ScrollView>
    </View>
  );
});
WebSocketTest.options = () => ({
  title: services.t.do('settings.title'),
});
