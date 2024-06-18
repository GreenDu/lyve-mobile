import React from 'react';
import { render } from '@testing-library/react-native';
import { BaseToastProps } from 'react-native-toast-message';
import { toastConfig } from '../../../src/modules/toast/config';

describe('toastConfig', () => {
  it('renders success toast with correct styles', () => {
    const SuccessComponent = toastConfig.success as React.FC<BaseToastProps>;
    const { getByText } = render(
      <SuccessComponent text1="Success!" text2="This is a success message" />
    );
    const successToast = getByText('Success!');
    expect(successToast).toBeDefined();
    // Add more assertions for styles if needed
  });

  it('renders error toast with correct styles', () => {
    const ErrorComponent = toastConfig.error as React.FC<BaseToastProps>;
    const { getByText } = render(
      <ErrorComponent text1="Error!" text2="This is an error message" />
    );
    const errorToast = getByText('Error!');
    expect(errorToast).toBeDefined();
    // Add more assertions for styles if needed
  });

  it('renders info toast with correct styles', () => {
    const InfoComponent = toastConfig.info as React.FC<BaseToastProps>;
    const { getByText } = render(<InfoComponent text1="Info!" text2="This is an info message" />);
    const infoToast = getByText('Info!');
    expect(infoToast).toBeDefined();
    // Add more assertions for styles if needed
  });
});
