import { Text, Title } from "@mantine/core";
import { HeaderSection } from "../common/Header";
import ProductList from "../features/products/ProductList";

export default function Home() {
  return (
    <>
      <HeaderSection />
      <Title>Aouis</Title>
      <Text>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem
        ex est obcaecati numquam, alias neque molestiae nulla voluptates dolorum
        consectetur unde tempora quisquam voluptate ut consequuntur at aliquid
        ipsam repellat!
      </Text>
      <ProductList />
    </>
  );
}
