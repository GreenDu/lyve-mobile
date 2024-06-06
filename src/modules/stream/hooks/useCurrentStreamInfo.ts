import { useGetStream } from '@api/stream/query/useGetStream';
import useAuth from '@modules/auth/useAuth';

const useCurrentStreamInfo = (streamId: string) => {
  const { user } = useAuth();
  const { data, error } = useGetStream({ variables: { id: streamId } });

  if (!data || !data.success || error || !data.data) {
    return {
      id: null as unknown as string,
      streamerId: null as unknown as string,
      isStreamer: false,
      isViewer: false,
    };
  }

  const { id, streamer } = data.data.stream;
  return {
    id,
    streamerId: streamer.id,
    isStreamer: user.id === streamer.id,
    isViewer: user.id !== streamer.id,
  };
};

export default useCurrentStreamInfo;
