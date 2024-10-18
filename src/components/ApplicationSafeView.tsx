import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {View} from 'react-native-ui-lib';

export const ApplicationSafeView = (props: {
  children?: React.ReactNode;
  styleProps?: any;
  useSafeAreaBottom?: boolean;
  useSafeAreaLeft?: boolean;
  useSafeAreaRight?: boolean;
  useSafeAreaTop?: boolean;
  viewProps?: any;
}) => {
  const insets = useSafeAreaInsets();
  const {bottom, left, right, top} = insets;
  const styles = {
    marginBottom: props.useSafeAreaBottom ? bottom : 0,
    marginLeft: props.useSafeAreaLeft ? left : 0,
    marginRight: props.useSafeAreaRight ? right : 0,
    marginTop: props.useSafeAreaTop ? top : 0,
    flex: true,
    ...props.styleProps,
  };
  return (
    <View style={styles} {...props.viewProps}>
      {props.children}
    </View>
  );
};
