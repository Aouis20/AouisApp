import { Button, Flex, Group, Image, Paper, Text, Title } from '@mantine/core';
import { useHover, useMediaQuery } from '@mantine/hooks';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import { WayType } from '../types/WayType';

interface WayCardProps {
  way: WayType;
}

export const WayCard = ({ way }: WayCardProps) => {
  const router = useRouter();
  const t = useTranslations();
  const matches = useMediaQuery('(min-width: 700px)');
  const { hovered, ref } = useHover();

  return (
    <Paper
      key={way.title}
      shadow="md"
      radius="md"
      p="xl"
      mx={'xl'}
      ref={ref}
      style={{
        cursor: 'pointer',
        transition: 'transform 0.3s',
        transform: hovered ? 'scale(1.04)' : 'none',
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
            color={way.title === t('exchange') ? 'secondary.4' : 'primary.4'}
          >
            {way.title}
          </Button>
        </Flex>
      </Group>
    </Paper>
  );
};
