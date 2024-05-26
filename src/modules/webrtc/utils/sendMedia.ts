import { AppData, Producer } from 'mediasoup-client/lib/types';
import { MediaStream, mediaDevices } from 'react-native-webrtc';

import { useProducerStore } from '../stores/useProducerStore';
import { useStreamStore } from '../stores/useStreamStore';

const sendMedia = async () => {
  const { sendTransport, set, streamAudioTracks, streamVideoTracks } = useStreamStore.getState();

  if (!sendTransport) {
    console.log('sendTransport is null');
    return;
  }

  streamAudioTracks?.stop();
  streamVideoTracks?.stop();

  let stream: MediaStream | null = null;

  try {
    stream = await mediaDevices.getUserMedia({
      audio: true,
      video: {
        facingMode: 'user',
        // minFrameRate: 30
      },
    });

    console.log('Successfully got user media');
  } catch (err) {
    set({ streamVideoTracks: null, streamAudioTracks: null, stream: null });
    console.error(err);
    return;
  }

  const videoTracks = stream.getAudioTracks();
  const audioTracks = stream.getAudioTracks();

  if (videoTracks.length && audioTracks.length) {
    const audioTrack = audioTracks[0]!;
    const videoTrack = videoTracks[0]!;

    const audioPoducer: Producer<AppData> = await sendTransport.produce({
      track: audioTrack as unknown as MediaStreamTrack,
      appData: { mediaTag: 'cam-audio' },
    });

    const videoPoducer: Producer<AppData> = await sendTransport.produce({
      track: videoTrack as unknown as MediaStreamTrack,
      appData: { mediaTag: 'cam-audio' },
    });

    useProducerStore.getState().addAudio(audioPoducer);

    useProducerStore.getState().addVideo(videoPoducer);

    set({
      streamAudioTracks: audioTrack as unknown as MediaStreamTrack,
      streamVideoTracks: videoTrack as unknown as MediaStreamTrack,
      stream,
    });
    return;
  }

  set({ stream: null, streamVideoTracks: null, streamAudioTracks: null });
};

export default sendMedia;
