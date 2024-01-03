import { Anchor, Table } from '@mantine/core';
import { useFormatter, useTranslations } from 'next-intl';

const data = [
  {
    title: 'Vélo',
    user: 'Isaac Asimov',
    price: 435,
    type: 'UNIQ',
    date: '2023-12-01T05:00:00Z',
  },
  {
    title: 'Ecouteurs',
    user: 'Mary Shelley',
    price: 200,
    type: 'UNIQ',
    date: '2023-12-01T05:00:00Z',
  },
  {
    title: 'Sweat',
    user: 'Stanislaw Lem',
    price: 8,
    type: 'WEEKLY',
    date: '2023-09-05T20:15:45Z',
  },
  {
    title: 'Tshirt blanc simple',
    user: 'Frank Herbert',
    price: 10,
    type: 'UNIQ',
    date: '2023-03-22T18:45:30Z',
  },
  {
    title: 'Macbook pro',
    user: 'Ursula K. Le Guin',
    price: 100,
    type: 'MONTHLY',
    date: '2023-01-15T08:30:00Z',
  },
];

export const HistoricTable = () => {
  const t = useTranslations();
  const format = useFormatter();

  const rows = data.map((row) => {

    return (
      <Table.Tr key={row.title}>
        <Table.Td>{row.title}</Table.Td>
        <Table.Td>
          {row.price} {t(`product.paymentTypesFormat.${row.type}`)}
        </Table.Td>
        <Table.Td>{t(`product.paymentTypes.${row.type}`)}</Table.Td>
        <Table.Td>
          <Anchor href="" fz="md">
            {row.user}
          </Anchor>
        </Table.Td>
        <Table.Td>
          {format.dateTime(new Date(row.date), {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </Table.Td>
      </Table.Tr>
    );
  });

  return (
    <Table verticalSpacing="md" striped mt={'md'}>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Titre</Table.Th>
          <Table.Th>Prix</Table.Th>
          <Table.Th>Type</Table.Th>
          <Table.Th>Avec</Table.Th>
          <Table.Th>Date</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
};
