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
  createStyles,
  getStylesRef,
} from '@mantine/core';
import {
  IconHeart,
  IconMapPinFilled,
  IconMessageCircle2,
} from '@tabler/icons-react';
import _ from 'lodash';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import { PaymentType, Product } from '../types/Product';
import { conditionIcon } from '../variables/Conditions';
import { paymentType } from '../variables/PaymentType';

type ProductCardProps = {
  product: Product;
  cardHeight: any;
};

const useStyles = createStyles(() => ({
  controls: {
    ref: getStylesRef('controls'),
    transition: 'opacity 150ms ease',
    opacity: 0,
  },
  control: {
    '&[data-inactive]': {
      opacity: 0,
      cursor: 'default',
    },
  },
  indicators: {
    ref: getStylesRef('indicators'),
    transition: 'opacity 150ms ease',
    opacity: 0,
  },
  root: {
    '&:hover': {
      [`& .${getStylesRef('controls')}`]: {
        opacity: 1,
      },
      [`& .${getStylesRef('indicators')}`]: {
        opacity: 1,
      },
    },
  },
}));

const ProductCard = ({ product, cardHeight }: ProductCardProps) => {
  const router = useRouter();
  const { classes } = useStyles();
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const detailsRef = useRef<HTMLDivElement>(null);

  const handleLike = () => {
    // TODO add product to user wishlist
    // + if product already exists in his wishlist ? IconHeartFilled avec dans ActionIcon(color="pink") : HeartIcon
  };

  const handleDistance = () => {
    // TODO get distance between user and product owner
  };

  const handleProductDetails = () => {
    // TODO go to product details page
    router.push(`/products/${product.id}`);
  };

  return (
    <Card
      shadow="sm"
      radius="md"
      withBorder
      p={'sm'}
      pb={0}
      style={{
        maxWidth: 800,
        display: 'flex',
        flexDirection: 'row',
        gap: 32,
      }}
      key={product.id}
      h={'100%'}
    >
      {/* Images */}
      <Card.Section
        p={0}
        sx={{
          alignSelf: isOpened ? 'start' : 'center',
          flex: 1,
        }}
      >
        <Carousel
          sx={{ flex: 1 }}
          mx="auto"
          classNames={classes}
          orientation="vertical"
          align={'start'}
          slideGap={'md'}
          slidesToScroll={1}
          height={isOpened ? cardHeight.current?.clientHeight : 200}
          mah={detailsRef.current?.clientHeight}
        >
          {product.images.map((image, index) => (
            <Carousel.Slide key={index}>
              {/* TODO add AspectRatio from mantine */}
              <Image
                src={image}
                height={200}
                alt={product.title + '-image' + index}
              />
            </Carousel.Slide>
          ))}
        </Carousel>
      </Card.Section>

      {/* Product Details */}
      <Flex
        sx={{
          '&:hover': { cursor: 'pointer' },
        }}
        w={'60%'}
        onClick={handleProductDetails}
        direction={'column'}
        gap={16}
        ref={detailsRef}
      >
        {/* Title */}
        <Group position="apart" align="start" m={0}>
          <Text sx={{ flex: 1, alignSelf: 'end' }} weight={700} w={'100%'}>
            {product.title}
          </Text>
          <Flex direction={'column'} align={'end'} gap={8}>
            {/* Like Button */}
            <ActionIcon
              bg={'white'}
              w={40}
              h={40}
              p={4}
              top={'-4px'}
              right={'-4px'}
              sx={{
                borderRadius: '50%',
                transition: 'color 0.3s ease',
                '&:hover': { color: 'red', animation: 'enlarge 0.3s ease' },
              }}
              onClick={handleLike}
            >
              <IconHeart />
            </ActionIcon>
            <Badge color="green" variant="light" fz={14} p={10}>
              {product.price}€
              {product.payment_type != PaymentType.UNIQ &&
                paymentType[product.payment_type]}
            </Badge>
            <Badge color="pink" fz={12}>
              <Group>
                {product.condition} {conditionIcon[product.condition]}
              </Group>
            </Badge>
          </Flex>
        </Group>

        {/* Description */}
        <Spoiler
          maxHeight={80}
          showLabel="Show more"
          hideLabel="Hide"
          onClick={(e) => {
            e.stopPropagation();
            setIsOpened(!isOpened);
          }}
        >
          <Text size="md" color="dimmed">
            {product.description}
          </Text>
        </Spoiler>

        {/* Price and owner informations */}
        <Group position="apart" mt="auto">
          <Box>
            <Button
              leftIcon={<IconMapPinFilled size={22} />}
              variant="subtle"
              onClick={handleDistance}
            >
              95
            </Button>
            <Button variant="subtle" radius="md">
              <IconMessageCircle2 size={22} />
            </Button>
            {/* Think about a new feature to make proposal */}
          </Box>
          <Text color="gray" fs={'italic'} fz={'sm'}>
            {_.upperFirst(product.user.first_name)}{' '}
            {product.user.last_name.toUpperCase()}
          </Text>
        </Group>
      </Flex>
    </Card>
  );
};

export default ProductCard;
