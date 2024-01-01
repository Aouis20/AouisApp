import { CategoryStore } from '@/features/categories/store';
import { setupPrivateApi } from '@/pages/api';
import {
  Badge,
  Button,
  Chip,
  Container,
  Flex,
  Group,
  LoadingOverlay,
  Modal,
  NumberInput,
  Paper,
  Radio,
  Select,
  Stack,
  Text,
  TextInput,
  Textarea,
  Title,
  Tooltip,
} from '@mantine/core';
import { FileWithPath } from '@mantine/dropzone';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';
import _ from 'lodash';
import { useTranslations } from 'next-intl';
import router from 'next/router';
import { useState } from 'react';
import { createProduct } from '../api';
import {
  CreateProductFormType,
  CreateStatusType,
} from '../types/CreateProductForm';
import { ConditionType, PaymentType } from '../types/Product';
import { ImagesDropzone } from './ImagesDropzone';

export const ProductCreate = () => {
  const t = useTranslations();
  const categories = CategoryStore.useState((s) => s.categoryList);
  const [opened, { open, close }] = useDisclosure(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
    setIsLoading(true);
    try {
      const api = setupPrivateApi();
      const payload = values;
      payload.category = Number(payload.category);
      payload.price = String(payload.price);
      !payload.images?.length && _.omit(payload, 'images');

      await createProduct(payload, api);
      showNotification({
        title: t('product.create.notifications.success.title'),
        message: t('product.create.notifications.success.message'),
        color: 'green',
      });
      open();
    } catch (err) {
      showNotification({
        title: t('product.create.notifications.error.title'),
        message: t('product.create.notifications.error.message'),
        color: 'red',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeImages = (images: FileWithPath[]) => {
    createProductForm.setFieldValue('images', images);
  };

  const handleCreateAgain = () => {
    createProductForm.reset();
    close();
  };

  return (
    <Container size={'sm'}>
      <Paper shadow="sm" radius="md" p="lg" withBorder mb={'lg'}>
        <Title>{t('addAd.title')}</Title>
        <Text>{t('addAd.text')}</Text>
      </Paper>

      <form onSubmit={createProductForm.onSubmit(handleSubmit)}>
        <Flex direction={'column'} gap={'xl'} mb={32} pos={'relative'}>
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
              <Radio label={t('aproduct')} value="product" />
              <Radio label={t('service')} value="service" />
            </Group>
          </Radio.Group>

          {/* Title */}
          <TextInput
            label={t('addAd.form.title')}
            placeholder={t('addAd.form.title')}
            withAsterisk
            required
            {...createProductForm.getInputProps('title')}
          />

          {/* Price */}
          <NumberInput
            label={t('addAd.form.price')}
            placeholder={t('addAd.form.price')}
            withAsterisk
            hideControls
            step={0.5}
            min={0.01}
            required
            rightSection={
              <Badge style={{ position: 'absolute', right: 8 }}>
                {t(
                  `product.paymentTypesFormat.${createProductForm.values.payment_type}`
                )}
              </Badge>
            }
            decimalScale={2}
            {...createProductForm.getInputProps('price')}
          />

          {/* Images */}
          <ImagesDropzone onChange={handleChangeImages} />

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

          {/* Description */}
          <Textarea
            label={t('addAd.form.description')}
            placeholder={t('addAd.form.description')}
            autosize
            {...createProductForm.getInputProps('description')}
          />

          {/* Payment Method */}
          <Select
            label={t('addAd.form.priceMethod')}
            allowDeselect={false}
            data={Object.entries(PaymentType).map(([key, value]) => ({
              value: value,
              label: t(`product.paymentTypes.${key}`),
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
                label: t(`product.conditionTypes.${key}`),
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
                label: t(`product.statusTypes.${key}`),
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
                {createProductForm.values.visibility ? t('yes') : t('no')}
              </Chip>
            </Tooltip>
          </Group>

          <Button type="submit">{t('addAd.form.submit')}</Button>
          <LoadingOverlay
            visible={isLoading}
            zIndex={1000}
            overlayProps={{ radius: 'sm', blur: 2 }}
            loaderProps={{ color: 'secondary.4', type: 'bars' }}
          />
        </Flex>
      </form>

      {/* Modal */}
      <>
        <Modal
          opened={opened}
          onClose={close}
          title={<Title>{t('addAd.form.addAgain.title')}</Title>}
          size={'lg'}
          padding={'lg'}
          centered
          withCloseButton={false}
        >
          <Stack gap={'lg'}>
            <Text>{t('addAd.form.addAgain.message')}</Text>
            <Group>
              <Button
                onClick={() => router.push('/')}
                variant="outline"
                size="md"
              >
                {t('no')}
              </Button>
              <Button onClick={() => handleCreateAgain()} size="md">
                {t('yes')}
              </Button>
            </Group>
          </Stack>
        </Modal>
      </>
    </Container>
  );
};
