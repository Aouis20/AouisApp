import { Pagination } from '@mantine/core';

type PaginationProps = {
  page: number;
  setPage: (page: number) => void;
  total: number;
};

export const PaginationComponent = ({
  page,
  setPage,
  total,
}: PaginationProps) => {
  return (
    <Pagination
      value={page}
      onChange={setPage}
      total={total}
      position="center"
    />
  );
};
