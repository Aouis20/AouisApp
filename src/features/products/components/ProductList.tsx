import { ActionIcon, Badge, Box, Button, Card, Container, Divider, Drawer, Flex, Group, Image, Paper, Text, Title } from "@mantine/core";
import DataTableDemo from "./ProductTable";
import { IconAdjustments, IconArticle, IconTag, IconHeart, IconHeartFilled, IconMapPinFilled, IconMessageCircle2 } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { ProductStore } from "../ProductStore";
import { AccountStore } from "@/features/accounts/AccountStore";

export const ProductList = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const productList = ProductStore.useState((s) => s.productList)
  const user = AccountStore.useState((s) => s.user)
  console.log(user)
  console.log(productList);

  // TODO filtres (voir la centrale)
  // Footer avec code départemental + distance en km (demande l'autorisation à l'utilsateur de prendre sa position (useEffect au changement qui va réactualiser tous les produits) puis calcul)
  // Button pour engager la discussion avec le propriétaire du product
  // [OPTIONNEL] Chatbox si need help ?

  const handleLike = () => {
    // TODO add product to user wishlist
    // + if product already exists in his wishlist ? IconHeartFilled avec dans ActionIcon(color="pink") : HeartIcon
  }

  const handleDistance = () => {
    // TODO get distance between user and product owner
  }

  const handleProductDetails = () => {
    // TODO go to product details page
  }

  const truc = [{ title: "Table Renault 234 AR", category: { name: "Décoration" }, description: "azdzaeazedzaeazedzaeazedzaeazed zaeazedzaeazedzaeazeaz daz eaazheu arguhoezr gouerzh geoaruhg oueir goeiru goui regiou eaz azeaez", images: ["https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"] }, { title: "aze", category: { name: "azeaze" }, description: "azdzaeazeaz daz eeazaezezaea zzazaeazezaezaezaaaz eaz azeaez", images: ["https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"] }, { title: "aze", category: { name: "azeaze" }, description: "azdzaeazeaz daz eaaz eaz azeaez", images: ["https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"] }, { title: "aze", category: { name: "azeaze" }, description: "azdzaeazeaz daz eaaz eaz azeaez", images: ["https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"] }, { title: "aze", category: { name: "azeaze" }, description: "azdzaeazeaz daz eaaz eaz azeaez", images: ["https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"] }, { title: "aze", category: { name: "azeaze" }, description: "azdzaeazelzoe fiez jfeizfgazeu gbuzeh bvcx,nv xcvxc vcx vxvx vx vxaz daz eaaz eaz azeaez", images: ["https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"] }, { title: "aze", category: { name: "azeaze" }, description: "azdzaeazeaz daz eaaz eaz azeaez", images: ["https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"] }, { title: "aze", category: { name: "azeaze" }, description: "azdzaeazeaz daz eaaz eaz azeaez", images: ["https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"] }, { title: "aze", category: { name: "azeaze" }, description: "azdzaeazeaz daz eaaz eaz azeaez", images: ["https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"] }]
  
  return (
    <Flex direction={'column'} align={'center'} gap={'xl'}>
      <Paper shadow="sm" radius="md" p="xl" withBorder w={'80%'} pos={'relative'}>
        <Flex direction={'column'} align={'center'} gap={'lg'} pt={16}>
          <Text pos={"absolute"} top={0} fs={'italic'} color="#757575">Accueil/products/cars</Text>
          <Title>Tous les produits</Title>
          <Badge fz={'sm'} p={12}>(1432) annonces</Badge>
          <Flex gap={'sm'}>
            <Button leftIcon={<IconAdjustments />} onClick={open}>
              Filters
            </Button>
            <Button leftIcon={<IconTag />}>
              Price
            </Button>
            <Button leftIcon={<IconArticle />}>
              Condition
            </Button>
          </Flex>
        </Flex>
      </Paper>
      <Flex wrap="wrap" gap={'xl'} justify={'center'}>
        
        {productList.map((product) => (
          <Card
            shadow="sm"
            radius="md"
            withBorder
            padding={'md'}
            w={360}
            style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
            key={product.id}
          >
            {/* Image */}
            <Card.Section onClick={handleProductDetails}>
              <>
                <Image
                  src={product.images[0]}
                  height={160}
                  alt={product.title + 'banner'}
                  />
                <ActionIcon bg={'white'} pos={'absolute'} w={40} h={40} top={10} right={10} p={4} sx={{ borderRadius: '50%'}} onClick={handleLike}>
                  <IconHeart />
                </ActionIcon>
              </>
            </Card.Section>

            {/* Title + Category */}
            <Group position="apart" mt="md" mb="xs">
              <Text weight={700}>{product.title}</Text>
              <Badge color="pink" variant="light">
                {product.category.name}
              </Badge>
            </Group>

            {/* Description */}
            <Text size="md" color="dimmed" style={{ flexGrow: 1 }}>
              {product.description}
            </Text>

            {/* Localization and Contact */}
            <Group position="apart">
              <Button variant="subtle" radius="md">
                <IconMessageCircle2 />
              </Button>
              <Button leftIcon={<IconMapPinFilled />} variant="subtle" onClick={handleDistance}>95</Button>
            </Group>

          </Card>
        ))}
      </Flex>

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
