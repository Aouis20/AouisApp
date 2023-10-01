import { Box, Group, Switch, Text } from '@mantine/core';
import { useEffect, useState } from 'react';
import { OptionValue } from '../types/OptionsType';

type SwitchOptionProps = {
    option: OptionValue;
    onChangeOption: (value: OptionValue) => void;
};

export const SwitchOption = ({ option, onChangeOption }: SwitchOptionProps) => {
  const [setting, setSetting] = useState(option);

  const updateSetting = (value: boolean) => {
    const settingUpdate = { ...setting, isChecked: value };
    setSetting(settingUpdate);
    onChangeOption(setting)
  };

  return (
    <Group position="apart" align="center" mt={'0.2rem'} noWrap w={'100%'}>
      <Box>
        <Text fw={'bold'}>{setting.title}</Text>
        <Text c={'gray'}>{setting.description}</Text>
      </Box>
      <Switch
        checked={setting.isChecked}
        onChange={(e) => updateSetting(e.currentTarget.checked)}
      />
    </Group>
  );
};
