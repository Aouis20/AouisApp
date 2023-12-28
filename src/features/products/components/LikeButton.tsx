import { updateUser } from '@/features/accounts/api';
import { AccountStore } from '@/features/accounts/store';
import { setupPrivateApi } from '@/pages/api';
import { ActionIcon, Group } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { IconHeart, IconHeartFilled } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { Product } from '../types/Product';

type LikeButtonProps = {
  hovered: any;
  product: Product;
};

export const LikeButton = ({ hovered, product }: LikeButtonProps) => {
  const user = AccountStore.useState((s) => s.user);
  const t = useTranslations();

  if (!user) return <></>;

  const handleLike = async (e: any) => {
    e.stopPropagation();
    try {
      let newFavoris: number[] = [];
      const api = setupPrivateApi();
      if (user.favoris.includes(product.id)) {
        newFavoris = user.favoris.filter((p) => p != product.id);
      } else {
        const favoris = [...user.favoris, product.id];
        newFavoris = [...new Set(favoris)];
      }
      const newUser = await updateUser(user?.id, { favoris: newFavoris }, api);
      AccountStore.update((s) => {
        s.user = newUser;
      });
      if (user.favoris.includes(product.id)) {
        showNotification({
          title: t('favoris.success.unlike.title'),
          message: t('favoris.success.unlike.message'),
          color: 'green',
        });
      } else {
        showNotification({
          title: t('favoris.success.like.title'),
          message: t('favoris.success.like.message'),
          color: 'green',
        });
      }
    } catch (err) {
      console.log(err);
      showNotification({
        title: t('favoris.error.title'),
        message: t('favoris.error.message'),
        color: 'red',
      });
    }
  };

  return (
    <ActionIcon
      bg={'white'}
      h={40}
      w={40}
      right={6}
      top={6}
      style={{
        position: 'absolute',
        borderRadius: '50%',
        transition: 'color 0.3s ease',
        display: hovered ? 'block' : 'none',
        color: hovered ? 'red' : 'inherit',
        animation: hovered ? 'enlarge 0.3s ease' : 'none',
      }}
      onClick={handleLike}
    >
      <Group justify={'center'}>
        {user.favoris.includes(product.id) ? (
          <IconHeartFilled />
        ) : (
          <IconHeart />
        )}
      </Group>
    </ActionIcon>
  );
};
