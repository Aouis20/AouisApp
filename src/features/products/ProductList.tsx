import { Box, Title } from "@mantine/core";
import DataTableDemo from "./ProductTable";

export const ProductList = () => {
  return (
    <Box>
      <Title>Products :</Title>
      <div className="w-full">
        <div className="flex items-center py-49"><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, eveniet! Necessitatibus dignissimos minus sequi repellat illo deleniti asperiores iusto aperiam dolor beatae. Esse magnam at vero consequatur illo ipsam natus?
        Provident saepe unde autem culpa ut ab earum iusto? Rem iste, dolorem veniam debitis minima praesentium quia sunt sapiente est unde eaque tenetur, ex dolore. Animi quod minus laudantium quis.
        Similique maxime mollitia nihil beatae, aliquid officiis sequi sapiente repellendus corporis praesentium velit voluptas dolores aut amet placeat magni rerum hic repellat quo, harum illo? Incidunt hic dolorem magni placeat!</p></div>
      </div>
      <DataTableDemo />
    </Box>
  );
};

export default ProductList;
