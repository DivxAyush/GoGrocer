import NetInfo from '@react-native-community/netinfo';
import { showNetworkPopup } from '../components/GlobalNetworkPopup';

/**
 * Checks internet connectivity status.
 * If offline, it triggers the beautiful global theme-based popup and returns false.
 * If online, it returns true.
 */
export const checkNetwork = async () => {
  const state = await NetInfo.fetch();
  if (!state.isConnected) {
    showNetworkPopup();
    return false;
  }
  return true;
};
