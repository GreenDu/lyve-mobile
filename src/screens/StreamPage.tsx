import { useGetStream } from '@api/stream/useGetStream';
import useCurrentStreamInfo from '@modules/stream/hooks/useCurrentStreamInfo';
import { useCurrentStreamInfoStore } from '@modules/stream/stores/useCurrentStreamInfoStore';
import WebRtcController from '@modules/webrtc/WebRtcController';
import { useStreamStore } from '@modules/webrtc/stores/useStreamStore';
import useSocket from '@modules/ws/useSocket';
import React, { useEffect } from 'react';
import { RTCView } from 'react-native-webrtc';

import StreamerView from './StreamerView';
import ViewerView from './ViewerView';

const StreamPage: React.FC<{ id: string }> = ({ id }) => {
  const stream = useStreamStore.getState().stream;
  const { isStreamer } = useCurrentStreamInfo(id);

  const { setId, setStreamer, setViewerCount } = useCurrentStreamInfoStore.getState();

  const { data, isSuccess } = useGetStream({ variables: { id } });

  const { socket } = useSocket();

  useEffect(() => {
    if (data && isSuccess) {
      const { id: streamId, streamer, viewerCount } = data.data;

      setId(streamId);
      setStreamer({
        id: streamer.id,
        username: streamer.username,
        dispname: streamer.dispname,
        avatar_url: streamer.avatar_url,
        followerCount: streamer.followerCount,
      });
      setViewerCount(viewerCount);
    }
  }, [data, isSuccess]);

  useEffect(() => {
    if (socket) {
      socket.on('viewer_count', (data) => {
        setViewerCount(data.viewerCount);
      });
    }
  }, [socket]);

  return (
    <>
      {stream && (
        <RTCView
          streamURL={stream.toURL()}
          zOrder={0}
          objectFit="cover"
          mirror
          style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}
        />
      )}
      {isStreamer ? <StreamerView /> : <ViewerView />}
      <WebRtcController />
    </>
  );
};

export default StreamPage;
