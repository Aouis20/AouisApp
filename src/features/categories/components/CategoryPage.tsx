import { Box, Text, Title, createStyles } from '@mantine/core';
import { CategoryStore } from '../CategoryStore';
import { Category } from '../types/Category';

const useStyles = createStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: 'calc(100vh - 64px)',
    paddingTop: '32px',
  },
}));

const Categories = () => {
  const categories: Category[] = CategoryStore.useState((s) => s.categories);
  const { classes } = useStyles();

  return (
    <Box className={classes.container}>
      <Title>Categories :</Title>
      {categories.map((category: Category) => (
        <Text key={category.id}>{category.title}</Text>
      ))}
    </Box>
  );
};

export default Categories;
