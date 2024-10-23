import React, {useEffect, useState} from 'react';
import {NavioScreen} from 'rn-navio';
import {observer} from 'mobx-react';
import {Button, Card, Text, TextField, View} from 'react-native-ui-lib';
import {SocketIoService} from '@app/services/socket-io/socketIoService';
import {ScrollView} from 'react-native';

const DEFAULT_SOCKET_IO_HOST = 'http://localhost:9092';
let socketIoService: any;

export type Props = {};

export const PlaygroundSocketIo: NavioScreen<Props> = observer(() => {
  const [connected, setConnected] = useState<boolean>(false);
  const [hostUrl, setHostUrl] = useState<string>('');
  const [systemMessages, setSystemMessages] = useState<any[]>([]);

  const handleSystemMessage = (newMessage: any) => {
    setSystemMessages(currentMessages => [
      {
        ...newMessage,
        timestamp: new Date().toLocaleTimeString(),
      },
      ...currentMessages.slice(0, 10),
    ]);
  };

  const onPressConnect = () => {
    if (connected) {
      socketIoService.disconnect();
      setConnected(false);
    } else {
      socketIoService = new SocketIoService(DEFAULT_SOCKET_IO_HOST);
      socketIoService.initialConnection({
        onConnectedHandler: (connected: boolean) => setConnected(connected),
        systemHandler: (newMessage: string) => handleSystemMessage(newMessage),
      });
    }
  };

  return (
    <View flex useSafeArea>
      <View padding-10>
        <Card
          padding-15
          style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}
        >
          <View>
            <TextField
              editable={!connected}
              placeholder={DEFAULT_SOCKET_IO_HOST}
              onChangeText={(text: string) => setHostUrl(text)}
            />
            <Text>Connection Status: </Text>
            {connected && <Text green30>Connected</Text>}
            {!connected && <Text red30>Pending</Text>}
          </View>
          <View>
            <Button
              label={connected ? 'Disconnect' : 'Connect'}
              onPress={onPressConnect}
              size={'xSmall'}
            />
          </View>
        </Card>
        <SystemMessageConsole messages={systemMessages} />
      </View>
    </View>
  );
});

const SystemMessageConsole = (props: {messages: any[]}) => {
  const Messages = props.messages.map(message => (
    <View
      flex
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
      <Text grey20>{message.timestamp}</Text>
      <Text grey20>{message.message}</Text>
    </View>
  ));
  return (
    <ScrollView padding-20>
      <View padding-20>{Messages}</View>
    </ScrollView>
  );
};
