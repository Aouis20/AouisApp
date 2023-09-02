import { AspectRatio, Box, Image, SimpleGrid, Text } from '@mantine/core';
import { Dropzone, FileWithPath, MIME_TYPES } from '@mantine/dropzone';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const ImagesDropzone = () => {
  const { t } = useTranslation('content');

  const [files, setFiles] = useState<FileWithPath[]>([]);

  const previews = files.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);
    return (
      <AspectRatio ratio={3 / 4}>
        <Image
          key={index}
          src={imageUrl}
          imageProps={{ onLoad: () => URL.revokeObjectURL(imageUrl) }}
        />
      </AspectRatio>
    );
  });

  return (
    <Box>
      {/* Render Images */}
      <SimpleGrid
        cols={4}
        breakpoints={[{ maxWidth: 'sm', cols: 1 }]}
        mt={previews.length > 0 ? 'xl' : 0}
      >
        {previews}
      </SimpleGrid>

      {/* Dropzone */}
      <Dropzone
        mt={'md'}
        accept={[MIME_TYPES.png, MIME_TYPES.jpeg]}
        onDrop={setFiles}
      >
        <Text align="center">{t('addAd.form.dropzone.placeholder')}</Text>
        <Text align="center" mt={'sm'} fs={'italic'} c={'gray'}>
          {t('addAd.form.dropzone.tips')}
        </Text>
      </Dropzone>
    </Box>
  );
};

export default ImagesDropzone;
