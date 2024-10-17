import React, {useEffect, useState} from 'react';
import {NavioScreen} from 'rn-navio';
import {observer} from 'mobx-react';
import {Card, Chip, Colors, Text, View} from 'react-native-ui-lib';
import {ScrollView} from 'react-native';
import {COLORS} from '@app/styles/color-schema';

export const Court: NavioScreen = observer(({}) => {
  const [courts, setCourts] = useState<Court[]>([]);

  const getCourts = async () => {
    setCourts(MOCK_COURT_LIST);
  };

  useEffect(() => {
    getCourts();
  }, []);

  const CourtCardList = courts.map(court => <CourtCard court={court} />);

  return (
    <View flex paddingH-20 style={{backgroundColor: COLORS.backgroundGrey}}>
      <ScrollView contentInsetAdjustmentBehavior="always">
        <View>{CourtCardList}</View>
      </ScrollView>
    </View>
  );
});

const CourtCard = (props: {court: Court}) => {
  const {court} = props;
  return (
    <Card padding-20 marginB-20>
      <Text text50BO>{court.name}</Text>
      <View row>
        <Text green40>{court.courtStatus}</Text>
        <Text text80BO>{' since 31 August 2018'}</Text>
      </View>
      <Text>Distance: {court.distance}</Text>
      <Text>Address: {court.address}</Text>
    </Card>
  );
};

const MOCK_COURT_LIST: Court[] = [
  {
    address: 'Court 1 Address',
    courtStatus: 'ACTIVE',
    distance: 3.2,
    name: 'Court1',
    numberOfCourt: 5,
  },
  {
    address: 'Court 2 Address',
    courtStatus: 'PENDING',
    distance: 3.3,
    name: 'Court1',
    numberOfCourt: 5,
  },
];
