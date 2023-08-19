import { AspectRatio, Box, Image, SimpleGrid, Text } from '@mantine/core';
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { useState } from 'react';

const ImagesDropzone = () => {
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
      <Dropzone accept={IMAGE_MIME_TYPE} onDrop={setFiles}>
        <Text align="center">
          Glisser des images ici ou cliquer pour séléctionner des images.
        </Text>
        <Text align="center" mt={'sm'} fs={'italic'} c={'gray'}>
          Les images ne doivent pas excéder plus de 10MB.
        </Text>
      </Dropzone>
    </Box>
  );
};

export default ImagesDropzone;
