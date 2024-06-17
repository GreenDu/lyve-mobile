import React from 'react';
import { RenderOptions, render } from '@testing-library/react-native';
import { TamaguiProvider } from 'tamagui';
import config from '../../tamagui.config';

const customRender = (
  component: React.ReactElement<any, string | React.JSXElementConstructor<any>>,
  options?: RenderOptions | undefined
) => render(<TamaguiProvider config={config}>{component}</TamaguiProvider>, options);

export * from '@testing-library/react-native';
export { customRender };
