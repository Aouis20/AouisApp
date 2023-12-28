import { Button, Group, Image } from '@mantine/core';

export const SocialLinks = () => {
  return (
    <Group grow>
      <Button
        variant="default"
        leftSection={<Image src={'/assets/services/google.svg'} w={24} />}
      >
        Google
      </Button>
      <Button
        variant="default"
        leftSection={<Image src={'/assets/services/apple.svg'} w={24} />}
      >
        Apple
      </Button>
    </Group>
  );
};
