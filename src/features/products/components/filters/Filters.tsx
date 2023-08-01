import { Button, Group, HoverCard, Paper } from '@mantine/core';
import { IconAdjustments, IconArticle, IconTag } from '@tabler/icons-react';
import ConditionFilter from './ConditionFilter';
import PriceFilter from './PriceFilter';

type FiltersProps = {
  open: () => void;
};

const Filters = ({ open }: FiltersProps) => {
  return (
    <Paper shadow="sm" radius="md" p="xl" withBorder w={'50%'}>
      <Group position="center">
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
    </Paper>
  );
};

export default Filters;
