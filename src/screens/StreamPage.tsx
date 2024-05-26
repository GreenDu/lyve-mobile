import useCurrentStreamInfo from '@modules/stream/useCurrentStreamInfo';
import { useStreamStore } from '@modules/webrtc/stores/useStreamStore';
import React from 'react';
import { RTCView } from 'react-native-webrtc';

import StreamerView from './StreamerView';
import ViewerView from './ViewerView';
import WebRtcController from '@modules/webrtc/WebRtcController';

const StreamPage: React.FC<{ id: string }> = ({ id }) => {
  const stream = useStreamStore.getState().stream;
  const { isStreamer } = useCurrentStreamInfo(id);
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
