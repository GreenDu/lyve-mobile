import { AppData, Producer } from 'mediasoup-client/lib/types';

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
    stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });

    console.log('Successfully got user media');
  } catch (err) {
    set({ streamVideoTracks: null, streamAudioTracks: null, stream: null });
    console.error(err);
    return;
  }

  const videoTracks = stream.getVideoTracks();
  const audioTracks = stream.getAudioTracks();

  if (videoTracks.length && audioTracks.length) {
    const audioTrack = audioTracks[0]!;
    const videoTrack = videoTracks[0]!;

    const audioPoducer: Producer<AppData> = await sendTransport.produce({
      track: audioTrack,
      appData: { mediaTag: 'cam-audio' },
    });

    const videoPoducer: Producer<AppData> = await sendTransport.produce({
      track: videoTrack,
      appData: { mediaTag: 'cam-audio' },
    });

    useProducerStore.getState().addAudio(audioPoducer);

    useProducerStore.getState().addVideo(videoPoducer);

    set({
      streamAudioTracks: audioTrack,
      streamVideoTracks: videoTrack,
      stream,
    });
    return;
  }

  set({ stream: null, streamVideoTracks: null, streamAudioTracks: null });
};

export default sendMedia;
