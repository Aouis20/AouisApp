import { AccountStore } from '@/features/accounts/store';
import { Product } from '@/features/products/types/Product';
import { Box, Button, Dialog, Textarea, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconMessageCircle2 } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { DisplayName } from './DisplayName';

type MessageProps = {
  product: Product;
};

export const DirectMessage = ({ product }: MessageProps) => {
  const [opened, { toggle, close }] = useDisclosure(false);
  const t = useTranslations();
  const [message, setMessage] = useState<string>(
    'Bonjour, je suis intéressé par votre annonce, est-elle toujours disponible ?'
  );
  const user = AccountStore.useState((s) => s.user);

  if (!user) return <></>;

  const handleSubmit = () => {
    console.log('to send');
  };

  return (
    <Box onClick={(e) => e.stopPropagation()}>
      <Button variant="subtle" radius="md" onClick={() => toggle()} p={6}>
        <IconMessageCircle2 size={22} />
      </Button>

      <Dialog
        opened={opened}
        withCloseButton
        onClose={close}
        size="lg"
        radius="md"
      >
        <Title size="sm" mb="xs" fw={500}>
          {t('sendMessageTo')}
          <DisplayName user={product.owner} />
        </Title>

        <Textarea
          autosize
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          my={'sm'}
          minRows={2}
          maxRows={4}
        />

        <Button
          onClick={() => {
            handleSubmit();
            close();
          }}
        >
          {t('send')}
        </Button>
      </Dialog>
    </Box>
  );
};
