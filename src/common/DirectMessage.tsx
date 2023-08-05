import { Product } from '@/features/products/types/Product';
import { Box, Button, Dialog, Group, Textarea, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconMessageCircle2 } from '@tabler/icons-react';
import { useState } from 'react';
import DisplayName from './DisplayName';

type MessageProps = {
  product: Product;
};

const DirectMessage = ({ product }: MessageProps) => {
  const [opened, { toggle, close }] = useDisclosure(false);
  const [message, setMessage] = useState<string>(
    `Bonjour, je suis intéressé par votre annonce, est-elle toujours disponible ?`
  );

  // TODO Connection required

  const handleSubmit = () => {
    console.log('to send');
  };

  return (
    <Box onClick={(e) => e.stopPropagation()}>
      <Group position="center">
        <Button variant="subtle" radius="md" onClick={(e) => toggle()}>
          <IconMessageCircle2 size={22} />
        </Button>
      </Group>

      <Dialog
        opened={opened}
        withCloseButton
        onClose={close}
        size="lg"
        radius="md"
      >
        <Title size="sm" mb="xs" weight={500}>
          Envoyer un message à <DisplayName user={product.user} />
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
          Envoyer
        </Button>
      </Dialog>
    </Box>
  );
};

export default DirectMessage;
