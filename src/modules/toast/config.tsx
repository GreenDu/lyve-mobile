// App.jsx
import { InfoToast, SuccessToast, ErrorToast, BaseToastProps } from 'react-native-toast-message';

export const toastConfig = {
  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
  success: (props: BaseToastProps) => (
    <SuccessToast
      {...props}
      contentContainerStyle={{ paddingHorizontal: 15, backgroundColor: '#242526' }}
      text1Style={{ color: '#fff' }}
      text2Style={{ color: '#fff' }}
    />
  ),
  /*
    Overwrite 'error' type,
    by modifying the existing `ErrorToast` component
  */
  error: (props: BaseToastProps) => (
    <ErrorToast
      {...props}
      style={{ borderLeftColor: '#FF204E' }}
      contentContainerStyle={{ paddingHorizontal: 15, backgroundColor: '#242526' }}
      text1Style={{ color: '#fff' }}
      text2Style={{ color: '#fff' }}
    />
  ),

  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
  info: (props: BaseToastProps) => (
    <InfoToast
      {...props}
      contentContainerStyle={{ paddingHorizontal: 15, backgroundColor: '#242526' }}
      text1Style={{ color: '#fff' }}
      text2Style={{ color: '#fff' }}
    />
  ),
};
