import { Anchor, Table } from '@mantine/core';

const data = [
  {
    title: 'Vélo',
    user: 'Isaac Asimov',
    price: 435,
    type: 'PERMANENT',
    date: '20-09-2011',
  },
  {
    title: 'Ecouteurs',
    user: 'Mary Shelley',
    price: 200,
    type: 'PERMANENT',
    date: '20-09-2011',
  },
  {
    title: 'Sweat',
    user: 'Stanislaw Lem',
    price: 50,
    type: 'PERMANENT',
    date: '20-09-2011',
  },
  {
    title: 'Tshirt blanc simple',
    user: 'Frank Herbert',
    price: 10,
    type: 'PERMANENT',
    date: '20-09-2011',
  },
  {
    title: 'Macbook pro',
    user: 'Ursula K. Le Guin',
    price: 100,
    type: 'MONTHLY',
    date: '20-09-2011',
  },
];

export const HistoricTable = () => {
  const rows = data.map((row) => {
    return (
      <Table.Tr key={row.title}>
        <Table.Td>{row.title}</Table.Td>
        <Table.Td>{row.price}</Table.Td>
        <Table.Td>{row.type}</Table.Td>
        <Table.Td>
          <Anchor href="" fz="md">
            {row.user}
          </Anchor>
        </Table.Td>
        <Table.Td>{row.date}</Table.Td>
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
