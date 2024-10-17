import React from 'react';
import {NavioScreen} from 'rn-navio';
import {observer} from 'mobx-react';
import {Text, View} from 'react-native-ui-lib';
import {ScrollView} from 'react-native';

export const MyTeam: NavioScreen = observer(({}) => {
  return (
    <View flex>
      <ScrollView contentInsetAdjustmentBehavior="always">
        <Text>Team Page</Text>
      </ScrollView>
    </View>
  );
});
