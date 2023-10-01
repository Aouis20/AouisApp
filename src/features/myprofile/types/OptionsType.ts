export type OptionValue = {
  title: string;
  description: string;
  isChecked: boolean;
};

export type OptionsType = {
  [key: string]: OptionValue;
};