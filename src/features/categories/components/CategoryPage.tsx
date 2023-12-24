import {
  Container,
  Overlay,
  SimpleGrid,
  Text,
  UnstyledButton,
  rem,
} from '@mantine/core';

const categories = [
  {
    label: 'Customer Support',
    image:
      'https://images.unsplash.com/photo-1508780709619-79562169bc64?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
  },
  {
    label: 'User Guides',
    image:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80',
  },
  {
    label: 'Sales Questions',
    image:
      'https://images.unsplash.com/photo-1543286386-713bdd548da4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
  },
];

export const Categories = () => {
  const items = categories.map((category) => (
    <UnstyledButton
      style={{
        backgroundImage: `url(${category.image})`,
        height: rem('160px'),
        position: 'relative',
        backgroundSize: '100%',
        backgroundPosition: 'center',
        color: 'white',
        borderRadius: 'lg',
        padding: 'xl',
        overflow: 'hidden',
        transition: 'backgroundSize 300ms ease',
      }}
      key={category.label}
    >
      <Overlay color="#000" opacity={0.6} zIndex={1} />
      <Text
        size="xl"
        ta="center"
        fw={700}
        style={{ color: 'white', zIndex: 2, position: 'relative' }}
      >
        {category.label}
      </Text>
    </UnstyledButton>
  ));

  return (
    <Container pt={'md'} pb={'xl'} size="lg">
      <SimpleGrid cols={{ base: 1, sm: 3 }}>{items}</SimpleGrid>
    </Container>
  );
};
