import { AspectRatio, Box, Image, SimpleGrid, Text } from '@mantine/core';
import { Dropzone, FileWithPath, MIME_TYPES } from '@mantine/dropzone';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

interface ImagesDropzoneProps {
  onChange?: (images: FileWithPath[]) => void;
}

export const ImagesDropzone = ({ onChange }: ImagesDropzoneProps) => {
  const t = useTranslations();

  const [files, setFiles] = useState<FileWithPath[]>([]);

  const handleChange = (images: FileWithPath[]) => {
    if (images.length) {
      setFiles(images);
    } else {
      setFiles([]);
    }
    onChange?.(images);
  };

  const previews = files.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);
    return (
      <AspectRatio ratio={3 / 4} key={index}>
        <Image src={imageUrl} onLoad={() => URL.revokeObjectURL(imageUrl)} />
      </AspectRatio>
    );
  });

  return (
    <Box>
      {/* Dropzone */}
      <Dropzone
        mt={'md'}
        accept={[MIME_TYPES.png, MIME_TYPES.jpeg]}
        onDrop={handleChange}
      >
        <Text ta="center">{t('addAd.form.dropzone.placeholder')}</Text>
        <Text ta="center" mt={'sm'} fs={'italic'} c={'gray'}>
          {t('addAd.form.dropzone.tips')}
        </Text>
      </Dropzone>

      {/* Render Images */}
      <SimpleGrid cols={{ base: 1, sm: 4 }} mt={previews.length > 0 ? 'xl' : 0}>
        {previews}
      </SimpleGrid>
    </Box>
  );
};
