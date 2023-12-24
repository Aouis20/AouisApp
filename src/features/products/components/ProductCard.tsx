import { DirectMessage } from '@/common/DirectMessage';
import { DisplayName } from '@/common/DisplayName';
import { AccountStore } from '@/features/accounts/store';
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
import {
  IconHeart,
  IconHeartFilled,
  IconMapPinFilled,
  IconStarFilled,
} from '@tabler/icons-react';
import dayjs from 'dayjs';
import 'dayjs/locale/en';
import 'dayjs/locale/fr';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import { useRouter } from 'next/router';
import { PaymentType, Product } from '../types/Product';
import { conditionIcon } from '../variables/Conditions';
import { paymentType } from '../variables/PaymentType';

type ProductCardProps = {
  product: Product;
};

dayjs.extend(LocalizedFormat);

const ProductCard = ({ product }: ProductCardProps) => {
  const router = useRouter();
  const { hovered, ref } = useHover();
  const user = AccountStore.useState((s) => s.user);

  const handleLike = () => {
    // TODO add product to user wishlist
    // + if product already exists in his wishlist ? IconHeartFilled avec dans ActionIcon(color="pink") : HeartIcon
  };

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
        '&:hover': { transform: 'scale(1.05)', cursor: 'pointer' },
      }}
    >
      <Group wrap={'nowrap'} gap={'xs'} align="start">
        {/* Left Section */}
        <Box w={'40%'} miw={'40%'}>
          <Carousel
            loop
            withControls={hovered ? true : false}
            style={{ position: 'relative' }}
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
          }}
          onClick={() => router.push(`/products/${product.id}`)}
        >
          {/* Like Button */}
          <ActionIcon
            bg={'white'}
            h={40}
            w={40}
            right={2}
            top={2}
            style={{
              position: 'absolute',
              borderRadius: '50%',
              transition: 'color 0.3s ease',
              display: hovered ? 'block' : 'none',
              '&:hover': {
                color: 'red',
                animation: 'enlarge 0.3s ease',
              },
              zIndex: 99999999,
            }}
            onClick={handleLike}
            color={user?.favoris.includes(product) ? 'red' : 'gray'}
          >
            <Group justify="center">
              {user?.favoris.includes(product) ? (
                <IconHeartFilled />
              ) : (
                <IconHeart />
              )}
            </Group>
          </ActionIcon>

          <Group justify="space-between" wrap={'nowrap'} align="start">
            <Flex direction={'column'}>
              {/* Title */}
              <Title order={4}>{product.title}</Title>

              {/* Description */}
              <Spoiler
                maxHeight={44}
                showLabel="Voir plus"
                hideLabel="Voir moins"
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
              <Badge color="pink" fz={12}>
                <Group wrap={'nowrap'}>
                  <Text mr={-6}>{product.condition}</Text>
                  {conditionIcon[product.condition]}
                </Group>
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
                  <ActionIcon c="dimmed" pb={2}>
                    <IconStarFilled size={16} />
                  </ActionIcon>
                </Group>
              </Group>
              <Text c="dimmed">{dayjs(product.created_at).format('ll')}</Text>
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

export default ProductCard;
