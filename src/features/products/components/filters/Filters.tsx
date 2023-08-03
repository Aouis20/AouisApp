import { Badge, Button, Group, HoverCard, Paper } from '@mantine/core';
import {
  IconAdjustments,
  IconArticle,
  IconFilterOff,
  IconTag,
} from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { ProductStore } from '../../ProductStore';
import ConditionFilter from './ConditionFilter';
import PriceFilter from './PriceFilter';

type FiltersProps = {
  open: () => void;
};

const Filters = ({ open }: FiltersProps) => {
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
      <Group position="apart">
        <Button
          variant="light"
          leftIcon={<IconFilterOff size={16} />}
          disabled={!isModifying}
          onClick={handleClearFilters}
        >
          Clear Filters
        </Button>

        <Group>
          {/* Filters */}
          <Button leftIcon={<IconAdjustments />} onClick={open}>
            Filters
          </Button>
          {/* Price Filter */}
          <HoverCard withArrow arrowPosition="center" width={400}>
            <HoverCard.Target>
              <Button leftIcon={<IconTag />}>Price</Button>
            </HoverCard.Target>
            <HoverCard.Dropdown>
              <PriceFilter />
            </HoverCard.Dropdown>
          </HoverCard>

          {/* Condition Filter */}
          <HoverCard withArrow arrowPosition="center" width={400}>
            <HoverCard.Target>
              <Button leftIcon={<IconArticle />}>Condition</Button>
            </HoverCard.Target>
            <HoverCard.Dropdown>
              <ConditionFilter />
            </HoverCard.Dropdown>
          </HoverCard>
        </Group>

        <Badge>annonces</Badge>
      </Group>
    </Paper>
  );
};

export default Filters;
