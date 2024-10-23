import react, {useEffect, useState} from 'react';
import {NavioScreen} from 'rn-navio';
import {observer} from 'mobx-react';
import {Button, Colors, Hint, Text, View} from 'react-native-ui-lib';
import * as Location from 'expo-location';
import {LocationObject, LocationOptions} from 'expo-location';

export type Props = {};

export const PlaygroundLocation: NavioScreen<Props> = observer(() => {
  const [location, setLocation] = useState<LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<any>(null);
  const [subscription, setSubscription] = useState<any>(null);
  const [showHint, setShowHint] = useState<boolean>(true);

  const getCurrentLocation = async () => {
    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
  };

  const startLocationTracking = async () => {
    const options: LocationOptions = {
      accuracy: Location.Accuracy.High,
      timeInterval: 5000,
      distanceInterval: 1,
    };
    const locationSubscription = await Location.watchPositionAsync(options, newLocation =>
      setLocation(newLocation),
    );
    setSubscription(locationSubscription);
  };

  useEffect(() => {
    (async () => {
      let {status} = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      getCurrentLocation();
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View flex useSafeArea>
      <View padding-15>
        <Button label={'Get Current Location'} size={'small'} onPress={getCurrentLocation} />
        <View marginT-15>
          {!subscription && (
            <Hint
              visible={showHint}
              message={'Remember to turn on dynamic GPS change in Simulator'}
              color={Colors.red30}
              onBackgroundPress={() => setShowHint(false)}
            >
              <Button
                label={'Start Location Tracking'}
                size={'small'}
                onPress={startLocationTracking}
              />
            </Hint>
          )}
          {subscription && (
            <Button
              label={'Stop Location Tracking'}
              size={'small'}
              onPress={() => {
                subscription.remove();
                setSubscription(null);
              }}
            />
          )}
        </View>
        <Text marginT-15>{text}</Text>
      </View>
    </View>
  );
});
