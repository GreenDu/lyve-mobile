import { useGetStream } from '@api/stream/useGetStream';
import useAuth from '@modules/auth/useAuth';

const useCurrentStreamInfo = (streamId: string) => {
  const { user } = useAuth();
  const { data, error } = useGetStream({ variables: { id: streamId } });

  console.log(data);

  if (!data || !data.success || error) {
    return {
      id: null as unknown as string,
      streamerId: null as unknown as string,
      isStreamer: false,
      isViewer: false,
    };
  }

  const { id, streamer } = data.data;
  return {
    id,
    streamerId: streamer.id,
    isStreamer: user.id === streamer.id,
    isViewer: user.id !== streamer.id,
  };
};

export default useCurrentStreamInfo;
