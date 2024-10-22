import React from 'react';
import {NavioScreen} from 'rn-navio';
import {observer} from 'mobx-react';
import {Text, View} from 'react-native-ui-lib';
import {MuxStream} from '@app/components/MuxStream';

export type Props = {}

export const PlaygroundVideoStream:NavioScreen<Props> = observer(() => {
  return <View flex useSafeArea>
    <MuxStream />
  </View>
})
PlaygroundVideoStream.options = {
  title: 'Video Stream',
  headerShown: false,
}