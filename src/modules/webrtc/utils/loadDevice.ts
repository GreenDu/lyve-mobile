import { RtpCapabilities } from 'mediasoup-client/lib/types';

import { useStreamStore } from '../stores/useStreamStore';

const loadDevice = async (routerRtpCapabilities: RtpCapabilities) => {
  const { device } = useStreamStore.getState();
  if (!device!.loaded) {
    await device!.load({ routerRtpCapabilities });
  }

  console.log('Successfully loaded device');
};

export default loadDevice;
