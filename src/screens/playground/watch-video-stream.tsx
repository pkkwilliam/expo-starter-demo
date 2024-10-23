import React, {useRef, useState} from 'react';
import {NavioScreen} from 'rn-navio';
import {observer} from 'mobx-react';
import {Button, Switch, Text, View} from 'react-native-ui-lib';
import {ResizeMode, Video} from 'expo-av';

const DEFAULT_VIDEO_ID = 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4';
const VIDEO_ID = 'LaFw1sFLJ5nRU4nVPPjZmlc1ANoSABCAPq1JSg90243Y';

export type Props = {};

export const PlaygroundWatchVideoStream: NavioScreen<Props> = observer(() => {
  const video: any = useRef(null);
  const [status, setStatus] = useState<any>({isPlaying: false});
  const [showApplicationController, setShowApplicationController] = useState<boolean>(true);

  return (
    <View flex useSafeArea>
      <View padding-15>
        <View style={{alignItems: 'center',justifyContent: 'space-between', flexDirection: 'row'}}>
          <Text>Show Application Controller</Text>
          <Switch value={showApplicationController} onValueChange={setShowApplicationController} />
        </View>
        <Video
          ref={video}
          source={{
            uri:'https://stream.mux.com/APFOR1BMv384WrWlhYdkhoDLCDOPElA4Qr4nk4RMvhU.m3u8'
          }}
          useNativeControls
          resizeMode={ResizeMode.CONTAIN}
          isLooping
          style={{width: '100%', height: 300, marginTop: 20}}
          onPlaybackStatusUpdate={status => setStatus(() => status)}
        />
        {showApplicationController && (
          <View marginT-20>
            <Button
              label={status.isPlaying ? 'Pause' : 'Play'}
              onPress={() =>
                status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
              }
            />
          </View>
        )}
      </View>
    </View>
  );
});
PlaygroundWatchVideoStream.options = {
  headerShown: true,
};
