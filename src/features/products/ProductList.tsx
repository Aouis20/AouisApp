import { Box, Text, Title } from "@mantine/core";
import { useTranslation } from "react-i18next";

export const ProductList = () => {
  const { t } = useTranslation();
  return (
    <Box>
      <Text>{t("common:appName")}</Text>
      <Title>Products :</Title>
    </Box>
  );
};

export default ProductList;
