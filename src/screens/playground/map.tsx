import React from 'react';
import {NavioScreen} from 'rn-navio';
import {observer} from 'mobx-react';
import {Text, View} from 'react-native-ui-lib';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

export type Props = {};

export const PlaygroundMap: NavioScreen<Props> = observer(() => {
  return (
    <View flex useSafeArea>
      <MapView
        initialRegion={{
          latitude: 37.7749,
          longitude: -122.4194,
          latitudeDelta: 0.5922,
          longitudeDelta: 0.5421,
        }}
        provider={PROVIDER_GOOGLE}
        style={{height: '100%', width: '100%'}}
      >
        <Marker
          coordinate={{
            latitude: 37.7749,
            longitude: -122.4194,
          }}
          title="Marker Title1"
          description="Marker Description1"
        />
      </MapView>
    </View>
  );
});
