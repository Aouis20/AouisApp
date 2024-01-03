import { Tabs } from '@mantine/core';
import { DiscussionMessage } from './DiscussionMessage';

const discussions = [
  {
    to: 'John Doe',
    product: 'Polo Ralph lauren',
    messages: [
      {
        text: 'Bonjour, je suis intéressé par votre article concernant le polo Ralph lauren, est-il toujours disponible ?',
        user: 'Me',
        date: '2023-01-15T08:30:00Z',
      },
      {
        text: 'Si oui, seriez-vous prêt à négocier ?',
        user: 'Me',
        date: '2023-01-15T08:31:00Z',
      },
      {
        text: 'Oui, bien sûr, je vous écoute.',
        user: 'John Doe',
        date: '2023-01-15T08:32:00Z',
      },
    ],
  },
  {
    to: 'Aouis',
    product: 'Iphone 15 Pro max',
    messages: [
      {
        text: 'Possible ?',
        user: 'Aouis',
        date: '2023-01-15T08:30:00Z',
      },
      {
        text: 'Peut-être',
        user: 'Me',
        date: '2023-01-15T08:31:00Z',
      },
      {
        text: 'Ok',
        user: 'Aouis',
        date: '2023-01-15T08:32:00Z',
      },
    ],
  },
  {
    to: 'tomdoe@gmail.com',
    product: 'Audi A5 Sportback',
    messages: [
      {
        text: 'Possible ?',
        user: 'tomdoe@gmail.com',
        date: '2023-01-15T08:30:00Z',
      },
      {
        text: 'Peut-être',
        user: 'Me',
        date: '2023-01-15T08:31:00Z',
      },
      {
        text: 'Ok',
        user: 'tomdoe@gmail.com',
        date: '2023-01-15T08:32:00Z',
      },
    ],
  },
];

export const Discussions = () => {
  return (
    <Tabs variant="outline" orientation="vertical" defaultValue="user1">
      <Tabs.List defaultValue={discussions[0].to}>
        {discussions.map((discussion) => (
          <Tabs.Tab value={discussion.to}>{discussion.to}</Tabs.Tab>
        ))}
      </Tabs.List>

      {discussions.map((discussion) => (
        <Tabs.Panel value={discussion.to}>
          <DiscussionMessage discussion={discussion} />
        </Tabs.Panel>
      ))}
    </Tabs>
  );
};
