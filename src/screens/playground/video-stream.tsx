import React, {useState} from 'react';
import {NavioScreen} from 'rn-navio';
import {observer} from 'mobx-react';
import {Text, TextField, View} from 'react-native-ui-lib';
import {MuxStream} from '@app/components/MuxStream';

export type Props = {};

export const PlaygroundVideoStream: NavioScreen<Props> = observer(() => {
  const [streamKey, setStreamKey] = useState<string>('caec10b8-21d7-f345-dcf8-dd202074cc5a');
  return (
    <View flex useSafeArea>
      <Text>Stream Key</Text>
      <TextField  onChangeText={setStreamKey} value={streamKey} />
      <MuxStream streamKey={streamKey} />
    </View>
  );
});
PlaygroundVideoStream.options = {
  title: 'Video Stream',
  headerShown: false,
};
