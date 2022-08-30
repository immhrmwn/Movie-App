enum SearchBoxColor {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
}

type SearchBoxColorKey = keyof typeof SearchBoxColor;
type SearchBoxColorValue = typeof SearchBoxColor[SearchBoxColorKey];
const searchBoxColors: SearchBoxColorValue[] = Object.values(SearchBoxColor);

type SearchBoxProps = {
  color?: SearchBoxColor;
  ariaLabel?: string;
  placeholder?: string;
  outlined?: boolean;
  onSubmit?: (value: string) => void;
  iconPosition?: 'start' | 'end';
  hidden?: boolean;
};

export {SearchBoxColor, searchBoxColors};
export type {SearchBoxProps};
