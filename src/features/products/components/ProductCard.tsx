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
import { PaymentType, Product } from '../types/Product';
import { conditionIcon } from '../variables/Conditions';
import { paymentType } from '../variables/PaymentType';

type ProductCardProps = {
  product: Product;
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

const ProductCard = ({ product }: ProductCardProps) => {
  const router = useRouter();
  const { classes } = useStyles();

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
      style={{
        maxWidth: 800,
        display: 'flex',
        flexDirection: 'row',
        gap: 32,
      }}
      key={product.id}
    >
      {/* Images */}
      <Card.Section w={'40%'} sx={{ alignSelf: 'center' }}>
        <Carousel classNames={classes} withIndicators>
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
          onClick={(e) => e.stopPropagation()}
        >
          <Text size="md" color="dimmed">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita
            mollitia accusamus, natus laboriosam veritatis pariatur maiores
            libero facilis at perferendis ad dolore. Repudiandae nisi tenetur
            maxime, animi nam reiciendis quis? Tenetur itaque et sit eum ipsa
            culpa iste nulla consequatur ratione necessitatibus ipsam,
            dignissimos minus sequi beatae, esse quidem omnis aperiam, pariatur
            dolores vitae? Magnam dolores voluptate eveniet libero
            exercitationem.
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
