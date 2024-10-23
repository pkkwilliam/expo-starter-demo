import React, {useState} from 'react';
import {NavioScreen} from 'rn-navio';
import {observer} from 'mobx-react';
import {Text, TextField, View} from 'react-native-ui-lib';
import {MuxStream} from '@app/components/MuxStream';

export type Props = {};

export const PlaygroundVideoStream: NavioScreen<Props> = observer(() => {
  const [streamKey, setStreamKey] = useState<string>('03162bf0-22a6-fb49-adfa-db8142661427');
  return (
    <View flex useSafeArea>
      <Text>Stream Key</Text>
      <TextField onChangeText={setStreamKey} value={streamKey} />
      <MuxStream streamKey={streamKey} />
    </View>
  );
});
PlaygroundVideoStream.options = {
  title: 'Video Stream',
  headerShown: true,
};
