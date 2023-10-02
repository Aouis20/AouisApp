import { Box, Group, Switch, Text } from '@mantine/core';
import { OptionValue } from '../types/OptionsType';

type SwitchOptionProps = {
  option: OptionValue;
  onChangeOption: (value: OptionValue) => void;
};

export const SwitchOption = ({ option, onChangeOption }: SwitchOptionProps) => {

  const updateSetting = (value: boolean) => {
    const optionUpdate = { ...option, isChecked: value };
    onChangeOption(optionUpdate);
  };

  return (
    <Group position="apart" align="center" mt={'0.2rem'} noWrap w={'100%'}>
      <Box>
        <Text fw={'bold'}>{option.title}</Text>
        <Text c={'gray'}>{option.description}</Text>
      </Box>
      <Switch
        checked={option.isChecked}
        onChange={(e) => updateSetting(e.currentTarget.checked)}
      />
    </Group>
  );
};
