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
  Text,
  Title,
} from '@mantine/core';
import { useHover } from '@mantine/hooks';
import { IconMapPinFilled, IconStarFilled } from '@tabler/icons-react';
import dayjs from 'dayjs';
import 'dayjs/locale/en';
import 'dayjs/locale/fr';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
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

  const handleDistance = () => {
    // TODO get distance between user and product owner
  };

  const images = [
    'https://cdn.pixabay.com/photo/2023/07/29/17/36/fly-8157417_1280.jpg',
    'https://cdn.pixabay.com/photo/2023/11/30/07/51/bridge-8420945_640.jpg',
    'https://cdn.pixabay.com/photo/2023/04/22/10/28/sheep-7943526_640.jpg',
    'https://cdn.pixabay.com/photo/2023/12/04/18/10/lilac-8430051_640.jpg',
    'https://cdn.pixabay.com/photo/2023/06/01/05/59/oranges-8032713_640.jpg',
    'https://cdn.pixabay.com/photo/2023/11/25/16/56/dragon-8412130_640.jpg',
  ];

  const slides = images.map((image) => (
    <Carousel.Slide key={image}>
      <Image src={image} height={200} />
    </Carousel.Slide>
  ));

  if (product.title == 'azerty') {
    console.log(product);
  }
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
          <Carousel loop withControls={hovered ? true : false}>
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
                {images.length} Images
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
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Beatae itaque fugiat sunt provident distinctio excepturi id,
                  eaque reiciendis sed maiores accusantium cumque odit eveniet
                  consequatur quasi ea mollitia hic autem! jeizgaeignoierg Lorem
                  ipsum, dolor sit amet consectetur adipisicing elit. Esse
                  assumenda exercitationem est quidem culpa fugit voluptatibus.
                  Qui, similique iste unde maiores molestiae in labore maxime
                  officia enim sequi! Facere, nam.
                </Text>
              </Spoiler>
            </Flex>

            {/* Badges */}
            <Flex direction={'column'} gap={'xs'}>
              <Badge color="green" variant="light" fz={14} p={10} mt={40}>
                {product.price}€
                {product.payment_type != PaymentType.UNIQ &&
                  paymentType[product.payment_type]}
              </Badge>
              <Badge
                color="secondary.5"
                variant="light"
                fz={12}
                rightSection={conditionIcon[product.condition]}
              >
                {product.condition}
              </Badge>
            </Flex>
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
                onClick={handleDistance}
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
