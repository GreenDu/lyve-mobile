import { useGetStream } from '@api/stream/useGetStream';
import useCurrentStreamInfo from '@modules/stream/hooks/useCurrentStreamInfo';
import { useCurrentStreamInfoStore } from '@modules/stream/stores/useCurrentStreamInfoStore';
import WebRtcController from '@modules/webrtc/WebRtcController';
import { useStreamStore } from '@modules/webrtc/stores/useStreamStore';
import useSocket from '@modules/ws/useSocket';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import { RTCView } from 'react-native-webrtc';

import StreamerView from './StreamerView';
import ViewerView from './ViewerView';
import { useConsumerStore } from '@modules/webrtc/stores/useConsumerStore';

const StreamPage: React.FC<{ id: string }> = ({ id }) => {
  const { stream } = useStreamStore((state) => ({
    stream: state.stream,
  }));

  const { consumer } = useConsumerStore.getState();
  const { isStreamer } = useCurrentStreamInfo(id);

  const { setId, setStreamer, setViewerCount, setActive } = useCurrentStreamInfoStore.getState();

  const { data, isSuccess } = useGetStream({ variables: { id }, refetchInterval: 30 * 1000 }); // refetch every 30 seconds

  const { socket } = useSocket();

  useEffect(() => {
    if (data && isSuccess) {
      const { id: streamId, streamer, viewerCount, active } = data.data;

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
      socket.on('viewer_count', (data) => {
        setViewerCount(data.viewerCount);
      });
    }
  }, [socket]);

  useEffect(() => {
    console.log(consumer?.getStats());
  }, [consumer]);

  return (
    <>
      {stream && (
        <RTCView
          streamURL={stream.id}
          zOrder={0}
          objectFit="cover"
          mirror
          style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}
        />
      )}
      <SafeAreaView style={{ backgroundColor: 'transparent', height: '100%' }}>
        {isStreamer ? <StreamerView /> : <ViewerView />}
      </SafeAreaView>
      <WebRtcController />
    </>
  );
};

export default StreamPage;
