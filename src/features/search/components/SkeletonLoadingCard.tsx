import { Skeleton } from '@mantine/core';

export const SkeletonLoadingCard = () => {
  return (
    <>
      <Skeleton mt={6} width={600} height={200} radius="xl" />
      <Skeleton mt={6} width={600} height={200} radius="xl" />
      <Skeleton mt={6} width={600} height={200} radius="xl" />
    </>
  );
};
