import {SendbirdUIKitContainer, useConnection} from '@sendbird/uikit-react-native';
import {NavioScreen} from 'rn-navio';
import {observer} from 'mobx-react';
import {Text, View} from 'react-native-ui-lib';
import AsyncStorage from '@react-native-async-storage/async-storage';
import platformServices from './platform-service-test';
import {GroupChannelListScreen} from './sendbird-group-chat';
import {useEffect, useState} from 'react';
import {ScrollView} from 'react-native-gesture-handler';

const NICKNAME = 'YOLO90';
const USER_ID = 'sendbird_desk_agent_id_2f7d9a15-a1e6-467c-9708-7e11a032e6ef';
const TOKEN = 'b007636ae8454eb6808529b5ed072be380ff120a';

export const SendbirdChatTest: NavioScreen = observer(({}) => {
  const {connect} = useConnection();

  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    triggerSendbirdConnect();
  }, []);

  const triggerSendbirdConnect = () => {
    connect(USER_ID, {nickname: NICKNAME, accessToken: TOKEN})
      .then(_user => {
        console.log('Sendbird Connected');
        console.log(_user);
        setIsConnected(true);
      })
      .catch(_err => {
        console.error('Sendbird connect error');
        console.error(_err);
      });
  };

  return (
    <View flex bg-bgColor style={{flex: 1}}>
      <ScrollView contentInsetAdjustmentBehavior="always">
        <Text>{`Connected: ${isConnected}`}</Text>
        <GroupChannelListScreen />
      </ScrollView>
    </View>
  );
});
