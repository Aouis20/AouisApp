import {
  AspectRatio,
  Button,
  Flex,
  Group,
  Image,
  Paper,
  Text,
  Title,
  createStyles,
} from '@mantine/core';
import { t } from 'i18next';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

interface WayType {
  title: string;
  icon: ReactNode;
  button: string;
  description: string;
  onclick: string;
  img: string;
}

interface WayCardProps {
  way: WayType;
}

const useStyle = createStyles((theme) => ({
  paper: {
    transition: 'all .4s ease-in-out',
    cursor: 'pointer',
    '&:hover': {
      transform: 'scale(1.05)',
    },
  },
}));

export const WayCard = ({ way }: WayCardProps) => {
  const { classes } = useStyle();
  const router = useRouter();

  return (
    <Paper
      key={way.title}
      shadow="md"
      radius="md"
      p="xl"
      className={classes.paper}
      onClick={() => router.push(way.onclick)}
    >
      <Group position="apart" align="start" noWrap grow>
        <Flex direction={'column'} gap={'lg'}>
          <Title order={1} style={{ alignSelf: 'start' }}>
            {way.title}
          </Title>
          <Text fz="sm" c="dimmed" mt="xl">
            {way.description}
          </Text>
        </Flex>

        <Flex direction={'column'} gap={'lg'} align={'end'}>
          <AspectRatio ratio={16 / 9} w={300} h={300}>
            <Image src={way.img} />
          </AspectRatio>
          <Button
            fz={'xl'}
            p={10}
            px={14}
            w={'auto'}
            h={'auto'}
            rightIcon={way.icon}
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
