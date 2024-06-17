import { giphyTheme } from '../../../src/modules/gif/giphyTheme';

jest.mock('@giphy/react-native-sdk', () => ({
  GiphyThemePreset: {
    Dark: 'dark',
    Light: 'light',
  },
  GiphyTheme: {
    preset: 'dark',
    backgroundColor: '#151718',
    defaultTextColor: '#fff',
    tabBarSwitchDefaultColor: '#676D75',
    tabBarSwitchSelectedColor: '#fff',
    searchBackButtonColor: '#fff',
    searchBarBackgroundColor: '#242526',
    searchPlaceholderTextColor: '#5E5E60',
    searchTextColor: '#fff',
    showSuggestionsBar: true,
    suggestionCellBackgroundColor: '#242526',
    suggestionCellTextColor: '#fff',
  },
}));

describe('GiphyTheme', () => {
  it('exports the Giphy theme object correctly', () => {
    expect(giphyTheme).toEqual({
      preset: 'dark',
      backgroundColor: '#151718',
      defaultTextColor: '#fff',
      tabBarSwitchDefaultColor: '#676D75',
      tabBarSwitchSelectedColor: '#fff',
      searchBackButtonColor: '#fff',
      searchBarBackgroundColor: '#242526',
      searchPlaceholderTextColor: '#5E5E60',
      searchTextColor: '#fff',
      showSuggestionsBar: true,
      suggestionCellBackgroundColor: '#242526',
      suggestionCellTextColor: '#fff',
    });
  });
});
