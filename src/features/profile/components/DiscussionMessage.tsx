import {
  ActionIcon,
  Anchor,
  Box,
  Button,
  Flex,
  Group,
  Paper,
  ScrollArea,
  Text,
  Textarea,
  Title,
} from '@mantine/core';
import { IconSend, IconUpload } from '@tabler/icons-react';
import { useFormatter, useTranslations } from 'next-intl';
import { DiscussionType } from '../types/DiscussionType';

type DiscussionMessageProps = {
  discussion: DiscussionType;
};
export const DiscussionMessage = ({ discussion }: DiscussionMessageProps) => {
  const format = useFormatter();
  const t = useTranslations();

  return (
    <Flex direction={'column'}>
      <Group
        style={{ borderBottom: '1px solid lightgray' }}
        justify="space-between"
        wrap="nowrap"
        p={'sm'}
      >
        <Title order={4}>{discussion.product}</Title>
        <Anchor>{t('messages.viewAd')}</Anchor>
      </Group>
      <ScrollArea h={'60vh'} offsetScrollbars>
        <Flex direction={'column'} p={'sm'} gap={'xl'} mt={'xl'}>
          {discussion.messages.map((message) => (
            <Box
              maw={'50%'}
              style={{
                alignSelf: discussion.to !== message.user ? 'end' : 'start',
              }}
            >
              <Group justify="center">
                <Text c={'dimmed'} fz={'xs'} fs={'italic'}>
                  {message.user}
                  {', '}
                  {format.dateTime(new Date(message.date), {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </Text>
              </Group>
              <Paper withBorder>
                <Text fz={'sm'} p={'xs'}>
                  {message.text}
                </Text>
              </Paper>
            </Box>
          ))}
        </Flex>
      </ScrollArea>
      <Group mx={'sm'} py={'lg'} justify="center" wrap="nowrap" align="center">
        <ActionIcon variant="default">
          <IconUpload size={16} />
        </ActionIcon>
        <Textarea
          rightSection={
            <ActionIcon variant="transparent">
              <IconSend size={16} />
            </ActionIcon>
          }
          miw={'40%'}
          placeholder="Message..."
          autosize
        />
        <Button>{t('messages.makeAnOffer')}</Button>
      </Group>
    </Flex>
  );
};
