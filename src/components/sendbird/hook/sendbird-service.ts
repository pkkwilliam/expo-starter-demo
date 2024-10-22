import {useCallback, useEffect, useState} from 'react';
import {useConnection} from '@sendbird/uikit-react-native';

const NICKNAME = 'YOLO90';
const USER_ID = 'sendbird_desk_agent_id_2f7d9a15-a1e6-467c-9708-7e11a032e6ef';
const TOKEN = 'b007636ae8454eb6808529b5ed072be380ff120a';

function useSendbirdService() {
  const {connect} = useConnection();
  const [isConnected, setIsConnected] = useState<boolean>(false);

  const initConnection = useCallback(() => {
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
  }, [connect]);

  useEffect(() => {
    initConnection();
  }, [initConnection])

  return {isConnected};
}

export default useSendbirdService;