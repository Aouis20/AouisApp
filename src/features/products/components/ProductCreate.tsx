import ImagesDropzone from '@/common/ImagesDropzone';
import { CategoryStore } from '@/features/categories/store';
import {
  Container,
  Flex,
  Paper,
  Select,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useRouter } from 'next/router';
import { ConditionType, PaymentType, StatusType } from '../types/Product';

type ProductCreateProps = {};

const ProductCreate = ({}: ProductCreateProps) => {
  const router = useRouter();
  const categories = CategoryStore.useState((s) => s.categoryList);
  const createProductForm = useForm({
    initialValues: {
      images: [],
      title: '',
      description: '',
      price: '',
      category: '',
      payment_type: '',
      condition: '',
      status: '',
    },
  });

  return (
    <Container size={'sm'}>
      <Paper shadow="sm" radius="md" p="lg" withBorder mb={'lg'}>
        <Title>Déposer une annonce</Title>
        <Text>
          Crée ici une annonce, vous pourrez modifiez ce que vous voulez plus
          tard.
        </Text>
      </Paper>

      <form>
        <Flex direction={'column'} gap={'xl'} mb={32}>
          <ImagesDropzone />
          <Select
            label="Catégories"
            data={categories.map((category) => ({
              value: String(category.id),
              label: category.title,
            }))}
            {...createProductForm.getInputProps('category')}
          />
          <TextInput
            label="Title"
            placeholder="Title"
            {...createProductForm.getInputProps('title')}
          />
          <TextInput
            label="Description"
            placeholder="Description"
            {...createProductForm.getInputProps('description')}
          />
          <TextInput
            label="Price"
            placeholder="Price"
            {...createProductForm.getInputProps('price')}
          />
          <Select
            label="Price Method"
            data={Object.entries(PaymentType).map(([key, value]) => ({
              value: value,
              label: key,
            }))}
            {...createProductForm.getInputProps('payment_type')}
          />
          <Select
            label="Condition"
            data={Object.entries(ConditionType).map(([key, value]) => ({
              value: value,
              label: key,
            }))}
            {...createProductForm.getInputProps('condition')}
          />
          <Select
            label="Status"
            data={Object.entries(StatusType).map(([key, value]) => ({
              value: value,
              label: key,
            }))}
            {...createProductForm.getInputProps('status')}
          />
        </Flex>
      </form>
    </Container>
  );
};

export default ProductCreate;
