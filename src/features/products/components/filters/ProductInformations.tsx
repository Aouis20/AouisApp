import {
  Badge,
  Button,
  Flex,
  Group,
  HoverCard,
  Paper,
  SegmentedControl,
  Title,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import {
  IconAdjustments,
  IconArticle,
  IconFilterOff,
  IconLayoutColumns,
  IconLayoutList,
  IconTag,
} from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { ProductStore } from '../../store';
import { ConditionFilter } from './ConditionFilter';
import { PriceFilter } from './PriceFilter';
import { CategoryStore } from '@/features/categories/store';

type ProductInformationProps = {
  open: () => void;
  setDisplay: Dispatch<SetStateAction<'column' | 'row'>>;
};

export const ProductInformation = ({
  open,
  setDisplay,
}: ProductInformationProps) => {
  const totalItems = ProductStore.useState((s) => s.productList?.total_items);
  const [isModifying, setIsModifying] = useState<boolean>(false);
  const filters = ProductStore.useState((s) => s.filters);
  const [initialFilters, setInitialFilters] = useState(filters);
  const matches = useMediaQuery('(min-width: 1055px)');
  const router = useRouter();
  const inCategoryPage = router.pathname === '/categories/[id]';
  const t = useTranslations();
  const category = CategoryStore.useState((s) => s.category)

  useEffect(() => {
    filters != initialFilters ? setIsModifying(true) : setIsModifying(false);
  }, [filters, initialFilters]);

  const handleClearFilters = () => {
    ProductStore.update((s) => {
      s.filters = initialFilters;
    });
  };

  return (
    <Paper shadow="sm" radius="md" p="xl" withBorder w={'50%'} pos={'relative'}>
      <Flex direction={'column'} gap={'lg'} align={'center'}>
        {inCategoryPage && (<Title>{category?.title}</Title>)}
        <Badge fz={'sm'} p={'sm'} tt={'lowercase'} variant="light">
          {t('ads', { count: totalItems })}
        </Badge>

        <Group justify={matches ? 'space-between' : 'center'}>
          <Button
            variant="light"
            leftSection={<IconFilterOff size={16} />}
            disabled={!isModifying}
            onClick={handleClearFilters}
          >
            {t('clearFilters')}
          </Button>

          <Group justify="center">
            {/* Filters */}
            {inCategoryPage && (
              <Button leftSection={<IconAdjustments />} onClick={open}>
                {t('filters')}
              </Button>
            )}
            {/* Price Filter */}
            <HoverCard withArrow arrowPosition="center" width={400}>
              <HoverCard.Target>
                <Button leftSection={<IconTag />}>Price</Button>
              </HoverCard.Target>
              <HoverCard.Dropdown>
                <PriceFilter />
              </HoverCard.Dropdown>
            </HoverCard>

            {/* Condition Filter */}
            <HoverCard withArrow arrowPosition="center" width={400}>
              <HoverCard.Target>
                <Button leftSection={<IconArticle />}>Condition</Button>
              </HoverCard.Target>
              <HoverCard.Dropdown>
                <ConditionFilter />
              </HoverCard.Dropdown>
            </HoverCard>
          </Group>

          <SegmentedControl
            onChange={(e) => setDisplay(e as 'column' | 'row')}
            data={[
              {
                label: <IconLayoutList size={16} style={{ marginTop: 4 }} />,
                value: 'column',
              },
              {
                label: <IconLayoutColumns size={16} style={{ marginTop: 4 }} />,
                value: 'row',
              },
            ]}
          />
        </Group>
      </Flex>
    </Paper>
  );
};
