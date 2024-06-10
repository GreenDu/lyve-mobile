import { useGetStream } from '@api/stream/query/useGetStream';
import { useStreamChatStore } from '@modules/chat/stores/useStreamChatStore';
import useCurrentStreamInfo from '@modules/stream/hooks/useCurrentStreamInfo';
import { useCurrentStreamInfoStore } from '@modules/stream/stores/useCurrentStreamInfoStore';
import WebRtcController from '@modules/webrtc/WebRtcController';
import { useConsumerStore } from '@modules/webrtc/stores/useConsumerStore';
import { useProducerStore } from '@modules/webrtc/stores/useProducerStore';
import { useStreamStore } from '@modules/webrtc/stores/useStreamStore';
import useSocket from '@modules/ws/useSocket';
import React, { useEffect, useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  TouchableWithoutFeedback,
} from 'react-native';
import { RTCView, MediaStream } from 'react-native-webrtc';
import * as Crypto from 'expo-crypto';

import StreamEnded from './StreamEnded';
import StreamerView from './StreamerView';
import ViewerView from './ViewerView';
import { useIncomingRewardStore } from '@modules/reward/stores/useIncomingRewardStore';

const StreamPage: React.FC<{ id: string }> = ({ id }) => {
  const { stream } = useStreamStore((state) => ({
    stream: state.stream,
  }));

  const { consumers } = useConsumerStore((state) => ({ consumers: state.consumers }));

  const { isStreamer, isViewer } = useCurrentStreamInfo(id);

  const { setId, setStreamer, setViewerCount, setActive, setEnded } =
    useCurrentStreamInfoStore.getState();
  const { addMessage } = useStreamChatStore.getState();

  const { ended } = useCurrentStreamInfoStore((state) => ({ ended: state.ended }));

  const { data, isSuccess } = useGetStream({ variables: { id }, refetchInterval: 30 * 1000 }); // refetch every 30 seconds

  const { add: addReward } = useIncomingRewardStore.getState();

  const { socket } = useSocket();

  const [streamUrl, setStreamUrl] = useState<any | null>(null);

  useEffect(() => {
    if (data && data.data && isSuccess) {
      const { id: streamId, streamer, viewerCount, active } = data.data.stream;

      setId(streamId);
      setStreamer({
        id: streamer.id,
        username: streamer.username,
        dispname: streamer.dispname,
        avatar_url: streamer.avatar_url,
        followerCount: streamer.followerCount,
      });
      setViewerCount(viewerCount);
      setActive(active);
    }
  }, [data]);

  useEffect(() => {
    if (socket) {
      socket.on('user_joined', (data) => {
        addMessage({
          id: Crypto.randomUUID(),
          type: 'joined',
          msg: `${data.user.dispname} joined the stream`,
          created_at: Date.now().toString(),
        });
      });

      socket.on('user_leaved', (data) => {
        addMessage({
          id: Crypto.randomUUID(),
          type: 'leaved',
          msg: `${data.user.dispname} joined the stream`,
          created_at: Date.now().toString(),
        });
      });

      socket.on('viewer_count', (data) => {
        setViewerCount(data.viewerCount);
      });

      socket.on('stream_ended', ({ ended_at, duration }) => {
        console.log(`Stream ended at: ${ended_at}, duration: ${duration / 60}`);
        setEnded(true);
      });

      socket.on('new_msg', (data) => {
        addMessage(data);
      });
      socket.on('resv_reward', (data) => {
        addReward(data);
      });
    }
  }, [socket]);

  useEffect(() => {
    if (isViewer) {
      const consumer = consumers.find((c) => c.kind === 'video');

      if (consumer) {
        // Create a MediaStream from the consumer's track
        const stream = new MediaStream([consumer.track as any]);

        // Set the stream URL for the RTCView
        setStreamUrl(stream.toURL());
      }
    }
  }, [consumers]);

  const leaveStream = () => {
    socket.emit('leave_stream');
  };

  return (
    <>
      {/* {streamUrl && (
        <RTCView
          streamURL={streamUrl}
          zOrder={0}
          objectFit="cover"
          mirror
          style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}
        />
      )} */}
      {isStreamer && stream ? (
        <RTCView
          streamURL={stream.id}
          zOrder={0}
          objectFit="cover"
          mirror
          style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}
        />
      ) : isViewer && streamUrl ? (
        <RTCView
          streamURL={streamUrl}
          zOrder={0}
          objectFit="cover"
          mirror
          style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}
        />
      ) : (
        <></>
      )}
      {!ended ? (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView style={{ backgroundColor: 'transparent', height: '100%' }}>
              {isStreamer ? (
                <StreamerView onLeave={leaveStream} />
              ) : (
                <ViewerView onLeave={leaveStream} />
              )}
            </SafeAreaView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      ) : (
        <SafeAreaView style={{ backgroundColor: 'transparent', height: '100%' }}>
          <StreamEnded onLeave={leaveStream} />
        </SafeAreaView>
      )}
      <WebRtcController />
    </>
  );
};

export default StreamPage;
