import { CategoryStore } from '@/features/categories/store';
import { setupPrivateApi } from '@/pages/api';
import {
  Badge,
  Button,
  Chip,
  Container,
  FileInput,
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
import { showNotification } from '@mantine/notifications';
import { useTranslation } from 'react-i18next';
import { createProduct } from '../api';
import {
  CreateProductFormType,
  CreateStatusType,
} from '../types/CreateProductForm';
import { ConditionType, PaymentType } from '../types/Product';

export const ProductCreate = () => {
  const { t } = useTranslation('content');
  const categories = CategoryStore.useState((s) => s.categoryList);

  const createProductForm = useForm<CreateProductFormType>({
    initialValues: {
      is_service: false,
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
      price: (value) => Number(value) < 0.01 && t('addAd.form.error.price'),
    },
  });

  const handleSubmit = async (values: CreateProductFormType) => {
    try {
      const api = setupPrivateApi();
      const payload = values;
      payload.category = Number(payload.category);
      payload.price = String(payload.price);

      console.log(payload);

      await createProduct(payload, api);
      showNotification({
        title: t('product.create.notifications.success.title'),
        message: t('product.create.notifications.success.message'),
        color: 'green',
      });
      // TODO ask user create a new one ?
      // if yes back to form
      // else redirect to homepage
    } catch (err) {
      console.log(err);
      showNotification({
        title: t('product.create.notifications.error.title'),
        message: t('product.create.notifications.error.message'),
        color: 'red',
      });
    }
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
                ? createProductForm.setFieldValue('is_service', true)
                : createProductForm.setFieldValue('is_service', false)
            }
          >
            <Group mt="xs">
              <Radio label="Produit" value="product" />
              <Radio label="Service" value="service" />
            </Group>
          </Radio.Group>

          {/* Images */}
          <FileInput
            label="Photos"
            description={t('addAd.form.dropzone.tips') as string}
            placeholder={t('addAd.form.dropzone.placeholder') as string}
            accept="image/png,image/jpeg"
            multiple
            clearable
            {...createProductForm.getInputProps('images')}
          />

          {/* Categories */}
          {!createProductForm.values.is_service && (
            <Select
              label={t('addAd.form.categories')}
              allowDeselect={false}
              searchable
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
            autosize
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
            required
            style={{ position: 'relative' }}
            rightSection={
              <Badge style={{ position: 'absolute', right: 8 }}>
                {t(
                  `product.paymentTypesFormat.${
                    createProductForm.values.payment_type as string
                  }`
                )}
              </Badge>
            }
            decimalScale={2}
            {...createProductForm.getInputProps('price')}
          />

          {/* Payment Method */}
          <Select
            label={t('addAd.form.priceMethod')}
            allowDeselect={false}
            data={Object.entries(PaymentType).map(([key, value]) => ({
              value: value,
              label: t(`product.paymentTypes.${key}`) as string,
            }))}
            {...createProductForm.getInputProps('payment_type')}
          />

          {/* Condition */}
          {!createProductForm.values.is_service && (
            <Select
              label={t('addAd.form.condition')}
              allowDeselect={false}
              data={Object.entries(ConditionType).map(([key, value]) => ({
                value: value,
                label: t(`product.conditionTypes.${key}`) as string,
              }))}
              {...createProductForm.getInputProps('condition')}
            />
          )}

          {/* Status */}
          {!createProductForm.values.is_service && (
            <Select
              label={t('addAd.form.status')}
              allowDeselect={false}
              data={Object.entries(CreateStatusType).map(([key, value]) => ({
                value: value,
                label: t(`product.statusTypes.${key}`) as string,
              }))}
              {...createProductForm.getInputProps('status')}
            />
          )}

          {/* Visibility */}
          <Group>
            <Text>{t('addAd.form.visibility')} :</Text>
            <Tooltip label={t('addAd.form.visibilityTooltip')}>
              <Chip
                defaultChecked
                variant="filled"
                {...createProductForm.getInputProps('visibility')}
              >
                {createProductForm.values.visibility
                  ? t('common:yes')
                  : t('common:no')}
              </Chip>
            </Tooltip>
          </Group>

          <Button type="submit">{t('addAd.form.submit')}</Button>
        </Flex>
      </form>
    </Container>
  );
};
