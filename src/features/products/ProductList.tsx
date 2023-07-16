import { ActionIcon, Badge, Box, Button, Card, Container, Divider, Drawer, Flex, Group, Image, Paper, Text, Title } from "@mantine/core";
import DataTableDemo from "./ProductTable";
import { IconAdjustments, IconCalendar, IconCurrencyDollar, IconHeart, IconHeartFilled, IconMessageCircle2 } from "@tabler/icons-react";
import { Product } from "@/src/api/product.api";
import { useDisclosure } from "@mantine/hooks";

type ProductListProps = {
  productList: Product[]
}

export const ProductList = ({ productList }: ProductListProps) => {
  const [opened, { open, close }] = useDisclosure(false);
  // TODO filtres (voir la centrale)
  // Footer avec code départemental + distance en km (demande l'autorisation à l'utilsateur de prendre sa position (useEffect au changement qui va réactualiser tous les produits) puis calcul)
  // Button pour engager la discussion avec le propriétaire du product
  // [OPTIONNEL] Chatbox si need help ?

  const handleLike = () => {
    // TODO add product to user wishlist
    // + if product already exists in his wishlist ? HeartIcon fullfilled avec dans ActionIcon(color="pink") : HeartIcon
  }

  const truc = [{ title: "aze", category: { name: "azeaze" }, description: "azdzaeazeaz daz eaazheu arguhoezr gouerzh geoaruhg oueir goeiru goui regiou eaz azeaez", images: ["https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"] }, { title: "aze", category: { name: "azeaze" }, description: "azdzaeazeaz daz eaaz eaz azeaez", images: ["https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"] }, { title: "aze", category: { name: "azeaze" }, description: "azdzaeazeaz daz eaaz eaz azeaez", images: ["https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"] }, { title: "aze", category: { name: "azeaze" }, description: "azdzaeazeaz daz eaaz eaz azeaez", images: ["https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"] }, { title: "aze", category: { name: "azeaze" }, description: "azdzaeazeaz daz eaaz eaz azeaez", images: ["https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"] }, { title: "aze", category: { name: "azeaze" }, description: "azdzaeazeaz daz eaaz eaz azeaez", images: ["https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"] }, { title: "aze", category: { name: "azeaze" }, description: "azdzaeazeaz daz eaaz eaz azeaez", images: ["https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"] }, { title: "aze", category: { name: "azeaze" }, description: "azdzaeazeaz daz eaaz eaz azeaez", images: ["https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"] }, { title: "aze", category: { name: "azeaze" }, description: "azdzaeazeaz daz eaaz eaz azeaez", images: ["https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"] }]
  
  return (
    <Flex direction={'column'} align={'center'} gap={'xl'}>
      <Paper shadow="sm" radius="md" p="xl" withBorder w={'80%'} pos={'relative'}>
        <Flex direction={'column'} align={'center'} gap={'lg'} pt={16}>
          <Text pos={"absolute"} top={0} fs={'italic'} color="#757575">Accueil/products/cars</Text>
          <Title>Tous les produits</Title>
          <Badge fz={'sm'}>(1432) annonces</Badge>
          <Flex gap={'sm'}>
            <Button leftIcon={<IconAdjustments />} onClick={open}>
            Filtres
            </Button>
            <Button leftIcon={<IconCurrencyDollar />}>
              Prix
            </Button>
          <Button leftIcon={<IconCalendar />}>
            Années
            </Button>
          </Flex>
        </Flex>
      </Paper>
      <Flex wrap="wrap" gap={'xl'} justify={'center'}>
        {truc.map((product) => (
            <Card shadow="sm" padding="lg" radius="md" withBorder w={360}>
            <Card.Section>
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

            <Group position="apart" mt="md" mb="xs">
              <Text weight={500}>{product.title}</Text>
              <Badge color="pink" variant="light">
                {product.category.name}
              </Badge>
            </Group>

            <Text size="sm" color="dimmed">
             {product.description}
            </Text>
            <Divider></Divider>
            <Flex gap={"md"} mt="md">
              <Button variant="light" radius="md">
                <IconMessageCircle2 />
              </Button>
            </Flex>
          </Card>
        ))}
      </Flex>
      <Drawer opened={opened} onClose={close} title={<Title>Filtres</Title>}>
        <Text>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloremque laborum a, fugit inventore autem nemo? Perferendis temporibus pariatur magnam amet natus deleniti eaque quae itaque. Distinctio libero quasi fugiat eos.
        Minima animi laboriosam nulla quae quaerat, dolorem consectetur, aliquam repellendus natus dolorum in quasi necessitatibus ipsa eligendi labore, atque doloribus distinctio assumenda voluptatem sequi excepturi voluptates cumque. Pariatur, voluptatum aliquam!
        Quibusdam, reiciendis aliquid. Quidem vel harum totam. Laborum, labore esse illum tempore autem magni possimus doloribus facilis vitae excepturi corporis maxime vel ut, omnis quisquam culpa repellat. Sunt, recusandae eius?
        Sed nam maxime, animi expedita, quisquam facilis, quam ab voluptas voluptate veritatis sequi aperiam in exercitationem molestias dolorum nihil ratione inventore? Quae qui itaque obcaecati rem id odio magni hic!
        Quos necessitatibus placeat nam neque, repellendus quo, corrupti nisi numquam fugit labore, earum officiis consectetur ut! Perferendis ab nobis, omnis non tempore tempora libero voluptates autem minima qui nam commodi.
        Quia amet quaerat perspiciatis rerum. Ducimus molestiae, mollitia enim, minima suscipit et sunt minus adipisci nam quos repudiandae aliquid veniam id beatae voluptatem nihil similique aliquam eligendi consequatur optio voluptatum!
        Eaque itaque unde rem laboriosam, perspiciatis, exercitationem officiis dicta id amet eveniet veritatis optio dolorem magni nobis? Autem laborum, consectetur harum fugiat nisi neque molestias laudantium eius. Voluptate, molestias at.
        Quam ea porro sit ullam eaque impedit iste ipsam commodi vero totam temporibus voluptates, voluptatum non velit nobis quo nam neque veniam quibusdam qui omnis esse? Ut adipisci fuga nesciunt?
        Neque numquam voluptatem eos debitis dolorem eius eligendi ab qui architecto. Rerum nulla ut magni blanditiis non ullam amet id, odit ad veniam molestiae minus similique accusamus nesciunt, est dolor.
        Molestiae eveniet reprehenderit expedita necessitatibus! Ipsa pariatur tempora quam voluptates. Inventore delectus est sunt doloribus, quisquam laboriosam quam rerum. Natus tenetur quis iure, consectetur similique blanditiis commodi quas cumque veritatis?
        Distinctio eligendi cum voluptatem, dicta autem accusamus ex eos qui reprehenderit expedita ullam sit aperiam animi fuga inventore sequi? Reprehenderit maiores facilis necessitatibus vel sed libero doloremque sapiente ipsum voluptatum.
        Sequi, qui? Blanditiis nesciunt itaque dignissimos, necessitatibus a quaerat iure laboriosam, repellendus eveniet eum deleniti vitae voluptatibus alias aut, accusantium quidem culpa sapiente quis molestiae! Quo debitis animi blanditiis nemo.</Text>
      </Drawer>
      <DataTableDemo />
    </Flex>
  );
};

export default ProductList;
