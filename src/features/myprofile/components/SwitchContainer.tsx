import { Group, Paper, Text, Title } from '@mantine/core';
import { useEffect, useState } from 'react';
import { OptionValue } from '../types/OptionsType';
import { Setting } from '../types/Settings';
import { SwitchOption } from './SwitchOption';

type SwitchContainerProps = {
  setting: Setting;
};

export const SwitchContainer = ({ setting }: SwitchContainerProps) => {
  const [currentSetting, setCurrentSetting] = useState<Setting>(setting);

  useEffect(() => {
    console.log('newsetting', currentSetting);
  }, [currentSetting]);

  const handleUpdateOptions = (newOption: OptionValue) => {
    const optionToUpdate = Object.keys(currentSetting.options).find(
      (key) => currentSetting.options[key].title === newOption.title
    );
    if (optionToUpdate) {
      const newSettings = {
        ...currentSetting,
        options: { ...currentSetting.options, [optionToUpdate]: newOption },
      };
      setCurrentSetting(newSettings);
    }
  };

  return (
    <Paper shadow="sm" radius="md" p={'lg'} withBorder maw={'32rem'}>
      <Title order={3}>{setting.title}</Title>
      <Text>{setting.description}</Text>
      <Group mt={'lg'}>
        {Object.values(currentSetting.options).map((option) => (
          <SwitchOption option={option} onChangeOption={handleUpdateOptions} />
        ))}
      </Group>
    </Paper>
  );
};
