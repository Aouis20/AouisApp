import ImagesDropzone from '@/common/ImagesDropzone';
import { CategoryStore } from '@/features/categories/store';
import {
  Badge,
  Box,
  Button,
  Chip,
  Container,
  Flex,
  Group,
  NumberInput,
  Paper,
  Radio,
  Select,
  Text,
  TextInput,
  Textarea,
  Title,
  Tooltip,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconHelp } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import {
  CreateProductFormType,
  CreateStatusType,
} from '../types/CreateProductForm';
import { ConditionType, PaymentType } from '../types/Product';

const ProductCreate = () => {
  const { t } = useTranslation('content');
  const categories = CategoryStore.useState((s) => s.categoryList);
  const createProductForm = useForm<CreateProductFormType>({
    initialValues: {
      isService: false,
      images: [],
      title: '',
      description: '',
      price: 0,
      category: '',
      payment_type: PaymentType.UNIQ,
      condition: ConditionType.GOOD,
      status: CreateStatusType.FOR_SALE,
      visibility: true,
    },
    validate: {
      title: (value) => value.length < 2 && t('addAd.form.error.title'),
      price: (value) => value < 0.01 && t('addAd.form.error.price'),
    },
  });

  const handleChangeImages = () => {
    createProductForm.setFieldValue('images', []);
  };

  const handleSubmit = (values: CreateProductFormType) => {
    console.log('oui submitted');
    console.log(values);
  };

  return (
    <Container size={'sm'}>
      <Paper shadow="sm" radius="md" p="lg" withBorder mb={'lg'}>
        <Title>{t('addAd.title')}</Title>
        <Text>{t('addAd.text')}</Text>
      </Paper>

      <form onSubmit={createProductForm.onSubmit(handleSubmit)}>
        <Flex direction={'column'} gap={'xl'} mb={32}>
          {/* Ad Type */}
          <Radio.Group
            name="adType"
            label={t('addAd.form.type')}
            defaultValue="product"
            onChange={(value) =>
              value == 'service'
                ? createProductForm.setFieldValue('isService', true)
                : createProductForm.setFieldValue('isService', false)
            }
          >
            <Group mt="xs">
              <Radio label="Produit" value="product" />
              <Radio label="Service" value="service" />
            </Group>
          </Radio.Group>

          {/* Images */}
          <ImagesDropzone />
          {/* TODO SET IMAGES INTO CREATEPRODUCTFORM */}

          {/* Categories */}
          {!createProductForm.values.isService && (
            <Select
              label={t('addAd.form.categories')}
              data={categories.map((category) => ({
                value: String(category.id),
                label: category.title,
              }))}
              {...createProductForm.getInputProps('category')}
            />
          )}

          {/* Title */}
          <TextInput
            label={t('addAd.form.title')}
            placeholder={t('addAd.form.title') as string}
            withAsterisk
            {...createProductForm.getInputProps('title')}
          />

          {/* Description */}
          <Textarea
            label={t('addAd.form.description')}
            placeholder={t('addAd.form.description') as string}
            {...createProductForm.getInputProps('description')}
          />

          {/* Price */}
          <NumberInput
            label={t('addAd.form.price')}
            placeholder={t('addAd.form.price') as string}
            withAsterisk
            hideControls
            step={0.5}
            min={0.01}
            rightSectionWidth={'xl'}
            required={true}
            rightSection={
              <Badge mr={'sm'}>
                {t(
                  `product.paymentTypesFormat.${
                    createProductForm.values.payment_type as string
                  }`
                )}
              </Badge>
            }
            precision={2}
            {...createProductForm.getInputProps('price')}
          />

          {/* Payment Method */}
          <Select
            label={t('addAd.form.priceMethod')}
            data={Object.entries(PaymentType).map(([key, value]) => ({
              value: value,
              label: t(`product.paymentTypes.${key}`) as string,
            }))}
            {...createProductForm.getInputProps('payment_type')}
          />

          {/* Condition */}
          {!createProductForm.values.isService && (
            <Select
              label={t('addAd.form.condition')}
              data={Object.entries(ConditionType).map(([key, value]) => ({
                value: value,
                label: t(`product.conditionTypes.${key}`) as string,
              }))}
              {...createProductForm.getInputProps('condition')}
            />
          )}

          {/* Status */}
          {!createProductForm.values.isService && (
            <Select
              label={t('addAd.form.status')}
              data={Object.entries(CreateStatusType).map(([key, value]) => ({
                value: value,
                label: t(`product.statusTypes.${key}`) as string,
              }))}
              {...createProductForm.getInputProps('status')}
            />
          )}

          {/* Visibility */}
          <Box>
            <Group>
              <Text>{t('addAd.form.visibility')} :</Text>
              <Tooltip label={t('addAd.form.visibilityTooltip')}>
                <IconHelp />
              </Tooltip>
            </Group>
            <Box>
              <Chip
                defaultChecked
                mt={'sm'}
                variant="filled"
                {...createProductForm.getInputProps('visibility')}
              >
                {createProductForm.values.visibility
                  ? t('common:yes')
                  : t('common:no')}
              </Chip>
            </Box>
          </Box>

          <Button type="submit">{t('addAd.form.submit')}</Button>
        </Flex>
      </form>
    </Container>
  );
};

export default ProductCreate;
