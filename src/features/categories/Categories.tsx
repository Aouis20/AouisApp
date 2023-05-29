import { Box, Text, Title } from "@mantine/core";
import { Category } from "../api/category.api";
import { CategoryStore } from "./CategoryStore";

const Categories = () => {
  const categories: Category[] = CategoryStore.useState((s) => s.categories);

  return (
    <Box>
      <Title>Categories :</Title>
      {categories.map((category: Category) => (
        <Text key={category.id}>{category.name}</Text>
      ))}
    </Box>
  );
};

export default Categories;
