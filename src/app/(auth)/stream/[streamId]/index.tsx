import { Link, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StatusBar, View, Button } from 'react-native';
import { mediaDevices, RTCView, MediaStream } from 'react-native-webrtc';
import { Text, YStack } from 'tamagui';

const Stream = () => {
  const { streamId } = useLocalSearchParams();

  const [stream, setStream] = useState<MediaStream | null>(null);
  const start = async () => {
    console.log('start');
    if (!stream) {
      try {
        const s = await mediaDevices.getUserMedia({ video: true });
        console.log(s);
        setStream(s);
      } catch (e) {
        console.error(e);
      }
    }
  };
  const stop = () => {
    console.log('stop');
    if (stream) {
      stream.release();
      setStream(null);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <View style={{ flex: 1 }}>
        {stream && <RTCView streamURL={stream.toURL()} style={{ flex: 1 }} />}
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        <Button title="Start" onPress={start} />
        <Button title="Stop" onPress={stop} />
      </View>
    </SafeAreaView>
  );
};

export default Stream;
