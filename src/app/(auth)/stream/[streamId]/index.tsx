import useSocket from '@modules/ws/useSocket';
import { useLocalSearchParams } from 'expo-router';
import { Device } from 'mediasoup-client';
import { RtpCapabilities } from 'mediasoup-client/lib/types';
import React, { useContext, useEffect, useState } from 'react';
import { View } from 'react-native';
import { mediaDevices, RTCView, MediaStream } from 'react-native-webrtc';
import { YStack, Button } from 'tamagui';

const Stream = () => {
  const { streamId } = useLocalSearchParams();

  const [flag, setFlag] = useState(false);

  const { socket } = useSocket(); // Todo add useSocket hook for this

  const [stream, setStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    startMedia();
  }, []);

  useEffect(() => {
    if (socket && !flag) {
      console.log('call create_stream');

      socket.emit('create_stream', { streamId }, (data: any) => {
        console.log(data);
        socket.emit('connect_as_streamer');
        setFlag(true);
      });
    }
  }, [socket]);

  useEffect(() => {
    if (socket) {
      socket.on(
        'you-connected-as-streamer',
        async ({
          streamId,
          peerId,
          routerRtpCapabilities,
          recvTransportOptions,
          sendTransportOptions,
        }) => {
          console.log(
            streamId,
            peerId,
            routerRtpCapabilities,
            recvTransportOptions,
            sendTransportOptions
          );
          // Todo use response
          // await loadDevice(routerRtpCapabilities);
        }
      );
    }
  }, [socket]);

  const loadDevice = async (device: Device, routerRtpCapabilities: RtpCapabilities) => {
    await device.load({ routerRtpCapabilities });
  };

  const startMedia = async () => {
    if (!stream) {
      try {
        const s = await mediaDevices.getUserMedia({ video: true });

        setStream(s);
      } catch (e) {
        console.error(e);
      }
    }
  };
  const stop = () => {
    if (stream) {
      stream.release();
      setStream(null);
    }
  };

  return (
    <YStack fullscreen>
      <View style={{ flex: 1, position: 'relative', top: 0, bottom: 0, left: 0, right: 0 }}>
        {stream && (
          <RTCView
            streamURL={stream.toURL()}
            zOrder={0}
            objectFit="cover"
            mirror
            style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}
          />
        )}
        <YStack width="100%" bottom="$6" position="absolute" paddingHorizontal="$4">
          <Button
            backgroundColor="$accentMain"
            width="$20"
            alignSelf="center"
            onPress={() => {
              console.log('press');
            }}>
            Start Stream
          </Button>
        </YStack>
      </View>
    </YStack>
  );
};

export default Stream;
