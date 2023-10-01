import { Group, Paper, Text, Title } from '@mantine/core';
import { useState } from 'react';
import { OptionValue, OptionsType } from '../types/OptionsType';
import { SwitchOption } from './SwitchOption';

type SwitchContainerProps = {
  title: string;
  description?: string;
  settings: OptionsType;
};

export const SwitchContainer = ({
  title,
  description,
  settings,
}: SwitchContainerProps) => {
  const [options, setOptions] = useState<OptionsType>(settings);

  const handleUpdateOptions = (newSetting: OptionValue) => {
    const settingToUpdate = Object.keys(settings).find(
      (key) => settings[key].title === newSetting.title
    );
    if (settingToUpdate) {
      const newSettings = { ...settings, [settingToUpdate]: newSetting };
      setOptions(newSettings);
    }
  };

  return (
    <Paper shadow="sm" radius="md" p={'lg'} withBorder maw={'32rem'}>
      <Title order={3}>{title}</Title>
      <Text>{description}</Text>
      <Group mt={'lg'}>
        {Object.values(options).map((option) => (
          <SwitchOption option={option} onChangeOption={handleUpdateOptions} />
        ))}
      </Group>
    </Paper>
  );
};
