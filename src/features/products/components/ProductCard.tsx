import { DirectMessage } from '@/common/DirectMessage';
import { DisplayName } from '@/common/DisplayName';
import { Carousel } from '@mantine/carousel';
import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Card,
  Flex,
  Group,
  Image,
  Spoiler,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { useHover } from '@mantine/hooks';
import { IconMapPinFilled, IconStarFilled } from '@tabler/icons-react';
import dayjs from 'dayjs';
import 'dayjs/locale/en';
import 'dayjs/locale/fr';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import { PaymentType, Product } from '../types/Product';
import { conditionIcon } from '../variables/Conditions';
import { paymentType } from '../variables/PaymentType';
import { LikeButton } from './LikeButton';

type ProductCardProps = {
  product: Product;
};

dayjs.extend(LocalizedFormat);

export const ProductCard = ({ product }: ProductCardProps) => {
  const router = useRouter();
  const { hovered, ref } = useHover();
  const t = useTranslations();

  const slides = product.images.length ? (
    product.images.map((image, index) => (
      <Carousel.Slide key={index}>
        <Image
          src={process.env.NEXT_PUBLIC_API_BASE_URL + image.image}
          height={200}
        />
      </Carousel.Slide>
    ))
  ) : (
    <Carousel.Slide>
      <Image
        src={
          'https://th.bing.com/th/id/OIG.i1YcxZb19CgF3995jFq_?w=1024&h=1024&rs=1&pid=ImgDetMain'
        }
        height={200}
      />
    </Carousel.Slide>
  );

  return (
    <Card
      withBorder
      radius="md"
      p={0}
      ref={ref}
      h={200}
      w={600}
      style={{
        transition: 'all .4s ease-in-out',
        transform: hovered ? 'scale(1.05)' : 'none',
      }}
    >
      <Group wrap={'nowrap'} gap={'xs'} align="start">
        {/* Left Section */}
        <Box w={'40%'} miw={'40%'}>
          <Carousel
            loop
            withControls={hovered ? product.images.length > 1 && true : false}
          >
            {slides}
          </Carousel>
          {hovered && (
            <Group justify="center">
              <Badge
                style={{
                  position: 'absolute',
                  bottom: 4,
                  userSelect: 'none',
                }}
              >
                {t('photos', { count: product.images.length })}
              </Badge>
            </Group>
          )}
        </Box>

        {/* Right Section */}
        <Flex
          direction={'column'}
          gap={'xs'}
          w={'100%'}
          h={200}
          p={8}
          style={{
            position: 'relative',
            boxSizing: 'border-box',
            cursor: 'pointer',
          }}
          onClick={() => router.push(`/products/${product.id}`)}
        >
          {/* Like Button */}
          <LikeButton product={product} hovered={hovered} />

          <Group justify="space-between" wrap={'nowrap'} align="start">
            <Flex direction={'column'}>
              {/* Title */}
              <Title order={4}>{product.title}</Title>

              {/* Description */}
              <Spoiler
                maxHeight={44}
                showLabel={''}
                hideLabel={''}
                transitionDuration={500}
                mt={'xl'}
              >
                <Text c={'dimmed'} fz={14}>
                  {product.description}
                </Text>
              </Spoiler>
            </Flex>

            {/* Badges */}
            <Stack gap={'xs'} align={'end'}>
              <Badge variant="light" fz={14} p={10} mt={40}>
                {product.price}€
                {product.payment_type != PaymentType.UNIQ &&
                  paymentType[product.payment_type]}
              </Badge>
              <Badge
                variant="transparent"
                color="secondary.2"
                fz={12}
                rightSection={conditionIcon[product.condition]}
              >
                {product.condition}
              </Badge>
            </Stack>
          </Group>

          {/* Owner */}
          <Group
            wrap={'nowrap'}
            gap="xs"
            justify="space-between"
            mt={'auto'}
            align="end"
          >
            {/* Owner Information */}
            <Flex direction={'column'}>
              <Group gap={8}>
                <Text c="dimmed">
                  <DisplayName user={product.owner} />
                </Text>
                <Text c="dimmed">•</Text>
                <Group gap={0} align="center">
                  <Text c="dimmed" fw={'bold'} fz={'md'} span>
                    5
                  </Text>
                  <ActionIcon c="dimmed" variant="transparent" pb={2}>
                    <IconStarFilled size={16} />
                  </ActionIcon>
                </Group>
              </Group>
              {/* <Text c="dimmed">{dayjs(product.created_at).format('ll')}</Text> */}
            </Flex>

            {/* Action Buttons */}
            <Group wrap={'nowrap'}>
              <Button
                leftSection={<IconMapPinFilled size={22} />}
                variant="subtle"
                p={8}
              >
                95
              </Button>
              <DirectMessage product={product} />
              {/* Think about a new feature to make proposal */}
            </Group>
          </Group>
        </Flex>
      </Group>
    </Card>
  );
};
