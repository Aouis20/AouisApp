import { Button, Flex, Group, Image, Paper, Text, Title } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { t } from 'i18next';
import { useRouter } from 'next/router';
import { WayType } from '../types/WayType';

interface WayCardProps {
  way: WayType;
}

export const WayCard = ({ way }: WayCardProps) => {
  const router = useRouter();
  const matches = useMediaQuery('(min-width: 500px)');

  return (
    <Paper
      key={way.title}
      shadow="md"
      radius="md"
      p="xl"
      mx={'xl'}
      style={{
        cursor: 'pointer',
        '&:hover': { transform: 'scale(1.04)' },
      }}
      onClick={() => router.push(way.onclick)}
    >
      <Group
        align="start"
        wrap={matches ? 'nowrap' : 'wrap'}
        grow={matches ? true : false}
      >
        <Flex direction={'column'} gap={'lg'}>
          <Title order={1} style={{ alignSelf: 'start' }}>
            {way.title}
          </Title>
          <Text fz="sm" c="dimmed" mt="xl">
            {way.description}
          </Text>
        </Flex>

        <Flex direction={'column'} gap={'lg'} align={'end'}>
          <Image src={way.img} w={300} />
          <Button
            fz={'xl'}
            p={10}
            px={14}
            w={'auto'}
            h={'auto'}
            rightSection={way.icon}
            color={
              way.title === t('common:exchange') ? 'secondary.4' : 'primary.4'
            }
          >
            {way.title}
          </Button>
        </Flex>
      </Group>
    </Paper>
  );
};
