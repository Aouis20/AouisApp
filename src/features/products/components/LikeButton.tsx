import { AccountStore } from '@/features/accounts/store';
import { ActionIcon, Group } from '@mantine/core';
import { IconHeart, IconHeartFilled } from '@tabler/icons-react';
import { Product } from '../types/Product';

type LikeButtonProps = {
  hovered: any;
  product: Product;
};

export const LikeButton = ({ hovered, product }: LikeButtonProps) => {
  const user = AccountStore.useState((s) => s.user);

  const handleLike = (e: any) => {
    e.stopPropagation();
    // TODO add product to user wishlist
    // + if product already exists in his wishlist ? IconHeartFilled avec dans ActionIcon(color="pink") : HeartIcon
  };

  return (
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
        color: hovered ? 'red' : 'inherit',
        animation: hovered ? 'enlarge 0.3s ease' : 'none',
        zIndex: 100,
      }}
      onClick={(e) => handleLike(e)}
      color={user?.favoris.includes(product.id) ? 'red' : 'gray'}
    >
      <Group justify={'center'}>
        {user?.favoris.includes(product.id) ? (
          <IconHeartFilled />
        ) : (
          <IconHeart />
        )}
      </Group>
    </ActionIcon>
  );
};
