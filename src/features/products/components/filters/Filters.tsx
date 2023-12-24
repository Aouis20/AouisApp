import {
  Badge,
  Button,
  Group,
  HoverCard,
  Paper,
  SegmentedControl,
  Title,
} from '@mantine/core';
import {
  IconAdjustments,
  IconArticle,
  IconFilterOff,
  IconLayoutColumns,
  IconLayoutList,
  IconTag,
} from '@tabler/icons-react';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { ProductStore } from '../../store';
import ConditionFilter from './ConditionFilter';
import PriceFilter from './PriceFilter';

type FiltersProps = {
  open: () => void;
  setDisplay: Dispatch<SetStateAction<'column' | 'row'>>;
};

const Filters = ({ open, setDisplay }: FiltersProps) => {
  const totalItems = ProductStore.useState((s) => s.productList?.total_items);
  const [isModifying, setIsModifying] = useState<boolean>(false);
  const filters = ProductStore.useState((s) => s.filters);
  const [initialFilters, setInitialFilters] = useState(filters);

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
      <Group justify="center" mb={'xl'}>
        <Title>Others category</Title>
      </Group>
      <Group justify="space-between">
        <Button
          variant="light"
          leftSection={<IconFilterOff size={16} />}
          disabled={!isModifying}
          onClick={handleClearFilters}
        >
          Clear Filters
        </Button>

        <Group>
          {/* Filters */}
          <Button leftSection={<IconAdjustments />} onClick={open}>
            Filters
          </Button>
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

        <Badge fz={'md'} p={'sm'}>
          {totalItems} annonces
        </Badge>
      </Group>
      
      <Group mt={'xl'}>
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
    </Paper>
  );
};

export default Filters;
