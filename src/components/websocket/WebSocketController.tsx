import {Row} from '../row';
import {Text, View} from 'react-native-ui-lib';
import {useState} from 'react';
import {services, useServices} from '@app/services';
import {useStores} from '@app/stores';
import {NavioScreen} from 'rn-navio';
import {observer} from 'mobx-react';

export const WebSocketController: NavioScreen = observer(({}) => {
  const [connected, setConnected] = useState(false);
  const {socketMessage} = useStores();
  const {socketIo} = useServices();

  const privateSystemHandler = (message: any) => {
    console.log('From Private System Handler', message);
    // socketMessage.add(message);
  };

  const systemHandler = (message: any) => {
    console.log('From System Handler', message);
    // socketMessage.add(message);
    socketMessage.set('messages', new Date().getSeconds().toString());
  };

  const onClickConnection = () => {
    if (connected) {
      socketIo.disconnect();
    } else {
      socketIo.initialConnection({
        onConnectedHandler: (result: boolean) => setConnected(result),
        privateSystemHandler,
        systemHandler,
      });
    }
  };

  return (
    <View style={{backgroundColor: 'pink', padding: 15}}>
      <Row style={{justifyContent: 'space-between'}}>
        <Text style={{fontWeight: 600}}>Socket IO Controller </Text>
        <View style={{flexDirection: 'row'}}>
          <Text underline onPress={onClickConnection}>
            {connected ? 'Disconnect' : 'Connect'}
          </Text>
        </View>
      </Row>
      <Row>
        <Text>{`Message Count:${socketMessage.messages}`}</Text>
        <Text>{`Message Count:${socketMessage.messages2.length}`}</Text>
      </Row>
    </View>
  );
});
