import { Box, Divider, Drawer, Flex, Text, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ProductStore } from '../ProductStore';
import ProductCard from './ProductCard';
import ProductHeader from './ProductHeader';
import DataTableDemo from './ProductTable';
import { PaginationComponent } from '@/features/common/pagination/Pagination';
import { useEffect, useState } from 'react';
import { setupPrivateApi } from '@/api';
import { getProductByPage } from '@/api/product.api';

export const ProductList = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [activePage, setPage] = useState(1);
  const productList = ProductStore.useState((s) => s.productList);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  if (!productList) {
    return <Text>Aucun produit trouvé</Text>;
  }

  const fetchProducts = async (page: number) => {
    // Called when page is changed
    const api = setupPrivateApi();
    setIsLoading(true);
    const newProductList = await getProductByPage(page, api);
    ProductStore.update((s) => {
      s.productList = newProductList;
    });
    setIsLoading(false);
  };

  useEffect(() => {
    fetchProducts(activePage);
  }, [activePage]);

  // TODO filtres (voir la centrale)
  // Footer avec code départemental + distance en km (demande l'autorisation à l'utilsateur de prendre sa position (useEffect au changement qui va réactualiser tous les produits) puis calcul)
  // Button pour engager la discussion avec le propriétaire du product
  // [OPTIONNEL] Chatbox si need help ?

  const truc = [
    {
      title: 'Table Renault 234 AR',
      category: { name: 'Décoration' },
      description:
        'azdzaeazedzaeazedzaeazedzaeazed zaeazedzaeazedzaeazeaz daz eaazheu arguhoezr gouerzh geoaruhg oueir goeiru goui regiou eaz azeaez',
      images: [
        'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80',
      ],
    },
    {
      title: 'aze',
      category: { name: 'azeaze' },
      description:
        'azdzaeazeaz daz eeazaezezaea zzazaeazezaezaezaaaz eaz azeaez',
      images: [
        'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80',
      ],
    },
    {
      title: 'aze',
      category: { name: 'azeaze' },
      description: 'azdzaeazeaz daz eaaz eaz azeaez',
      images: [
        'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80',
      ],
    },
    {
      title: 'aze',
      category: { name: 'azeaze' },
      description: 'azdzaeazeaz daz eaaz eaz azeaez',
      images: [
        'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80',
      ],
    },
    {
      title: 'aze',
      category: { name: 'azeaze' },
      description: 'azdzaeazeaz daz eaaz eaz azeaez',
      images: [
        'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80',
      ],
    },
    {
      title: 'aze',
      category: { name: 'azeaze' },
      description:
        'azdzaeazelzoe fiez jfeizfgazeu gbuzeh bvcx,nv xcvxc vcx vxvx vx vxaz daz eaaz eaz azeaez',
      images: [
        'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80',
      ],
    },
    {
      title: 'aze',
      category: { name: 'azeaze' },
      description: 'azdzaeazeaz daz eaaz eaz azeaez',
      images: [
        'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80',
      ],
    },
    {
      title: 'aze',
      category: { name: 'azeaze' },
      description: 'azdzaeazeaz daz eaaz eaz azeaez',
      images: [
        'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80',
      ],
    },
    {
      title: 'aze',
      category: { name: 'azeaze' },
      description: 'azdzaeazeaz daz eaaz eaz azeaez',
      images: [
        'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80',
      ],
    },
  ];

  return (
    <Flex direction={'column'} align={'center'} gap={'xl'}>
      <ProductHeader open={open} />
      <PaginationComponent
        page={activePage}
        setPage={setPage}
        total={productList.total_pages}
      />
      <Flex wrap="wrap" gap={'xl'} justify={'center'}>
        {productList.results.map((product) => (
          <ProductCard product={product} />
        ))}
      </Flex>
      <PaginationComponent
        page={activePage}
        setPage={setPage}
        total={productList.total_pages}
      />

      <DataTableDemo />
      {/* Filters */}
      <Drawer opened={opened} onClose={close} title={<Title>Filtres</Title>}>
        <Divider my="sm" />
        {/* From current categories display it filters */}
        <Box></Box>
      </Drawer>
    </Flex>
  );
};

export default ProductList;
