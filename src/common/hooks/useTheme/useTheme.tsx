import {useThemeContext} from 'common/themes/Themes.context';

export default function useTheme() {
  const {theme} = useThemeContext();

  return theme;
}
