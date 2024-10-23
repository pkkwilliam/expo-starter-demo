import React, {useRef, useState} from 'react';
import RTMPPublisher, {BluetoothDeviceStatuses, RTMPPublisherRefProps} from 'react-native-rtmp-publisher';
import {Button, View} from 'react-native-ui-lib';
import { StyleSheet } from 'react-native';
import usePermissions from '@app/hook/userPermissions';

export const MuxStream = (props:any) => {
  const publisherRef = useRef<RTMPPublisherRefProps>(null);
  const [isStreaming, setIsStreaming] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [hasBluetoothDevice, setHasBluetoothDevice] = useState<boolean>(false);
  const [microphoneModalVisibility, setMicrophoneModalVisibility] =
    useState<boolean>(false);

  const { permissionGranted } = usePermissions();

  const handleOnConnectionFailed = (data: String) => {
    console.log('Connection Failed: ' + data);
  };

  const handleOnConnectionStarted = (data: String) => {
    console.log('Connection Started: ' + data);
  };

  const handleOnConnectionSuccess = () => {
    console.log('Connected');
    setIsStreaming(true);
  };

  const handleOnDisconnect = () => {
    console.log('Disconnected');
    setIsStreaming(false);
  };

  const handleOnNewBitrateReceived = (data: number) => {
    console.log('New Bitrate Received: ' + data);
  };

  const handleOnStreamStateChanged = (data: any) => {
    console.log('Stream Status: ' + data);
  };

  const handleUnmute = () => {
    publisherRef.current && publisherRef.current.unmute();
    setIsMuted(false);
  };

  const handleMute = () => {
    publisherRef.current && publisherRef.current.mute();
    setIsMuted(true);
  };

  const handleStartStream = () => {
    console.log('onPress handleStartStream');
    publisherRef.current && publisherRef.current.startStream();
  };

  const handleStopStream = () => {
    publisherRef.current && publisherRef.current.stopStream();
  };

  const handleSwitchCamera = () => {
    publisherRef.current && publisherRef.current.switchCamera();
  };

  const handleToggleMicrophoneModal = () => {
    setMicrophoneModalVisibility(!microphoneModalVisibility);
  };

  const handleMicrophoneSelect = (selectedMicrophone: any) => {
    publisherRef.current &&
    publisherRef.current.setAudioInput(selectedMicrophone);
  };

  const handleBluetoothDeviceStatusChange = (
    status: BluetoothDeviceStatuses
  ) => {
    switch (status) {
      case BluetoothDeviceStatuses.CONNECTED: {
        setHasBluetoothDevice(true);
        break;
      }

      case BluetoothDeviceStatuses.DISCONNECTED: {
        setHasBluetoothDevice(false);
        break;
      }

      default:
        break;
    }
  };

  return (<View style={styles.container}>
    {permissionGranted && (
      <RTMPPublisher
        ref={publisherRef}
        streamURL={'rtmp://global-live.mux.com:5222/app'}
        streamName={props.streamKey}
        style={styles.publisher_camera}
        onDisconnect={handleOnDisconnect}
        onConnectionFailed={handleOnConnectionFailed}
        onConnectionStarted={handleOnConnectionStarted}
        onConnectionSuccess={handleOnConnectionSuccess}
        onNewBitrateReceived={handleOnNewBitrateReceived}
        onStreamStateChanged={handleOnStreamStateChanged}
        onBluetoothDeviceStatusChanged={handleBluetoothDeviceStatusChange}
      />
    )}
    <View style={styles.footer_container}>
      <View style={styles.mute_container}>
        {isMuted ? (
          <Button type="circle" title="🔇" onPress={handleUnmute} />
        ) : (
          <Button type="circle" title="🔈" onPress={handleMute} />
        )}
      </View>
      <View style={styles.stream_container}>
        {isStreaming ? (
          <Button type="circle" label="🟥" onPress={handleStopStream} />
        ) : (
          <Button type="circle" label="🔴" onPress={handleStartStream} />
        )}
      </View>
      {/*<View style={styles.controller_container}>*/}
      {/*  <Button type="circle" title="📷" onPress={handleSwitchCamera} />*/}
      {/*  {(Platform.OS === 'ios' || hasBluetoothDevice) && (*/}
      {/*    <Button*/}
      {/*      type="circle"*/}
      {/*      title="🎙"*/}
      {/*      onPress={handleToggleMicrophoneModal}*/}
      {/*    />*/}
      {/*  )}*/}
      {/*</View>*/}
    </View>
    {/*{isStreaming && <LiveBadge />}*/}
    {/*<MicrophoneSelectModal*/}
    {/*  onSelect={handleMicrophoneSelect}*/}
    {/*  visible={microphoneModalVisibility}*/}
    {/*  onClose={handleToggleMicrophoneModal}*/}
    {/*/>*/}
  </View>)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  publisher_camera: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  footer_container: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    justifyContent: 'space-between',
    padding: 10,
    flexDirection: 'row',
  },
  mute_container: {
    flex: 1,
    alignItems: 'flex-start',
  },
  stream_container: {
    flex: 1,
    alignItems: 'center',
  },
  controller_container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});