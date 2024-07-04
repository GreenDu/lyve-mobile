import { useCreateStream } from '@api/stream/mutation/useCreateStream';
import StreamPreviewImage from '@components/StreamPreviewImage';
import { Feather } from '@expo/vector-icons';
import useCameraActionSheet from '@hooks/useCameraActionSheet';
import GenrePicker from '@modules/stream/GenrePicker';
import { genres } from '@modules/stream/genres';
import { Link, router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { YStack, XStack, Button, H3, Spinner } from 'tamagui';

const CreateStreamPage = () => {
  const { mutate, isPending } = useCreateStream({
    onSettled(data, error) {
      console.log(data);
      if (error) {
        console.error(error);
      }
      if (data) {
        if (data.success && data.data) {
          router.navigate(`/stream/${data.data.stream.id}`);
        } else {
          Toast.show({
            type: 'error',
            text1: data.error[0]!.name,
            text2: data.error[0]!.msg,
          });
        }
      }
    },
  });

  const { show, assets } = useCameraActionSheet({
    aspect: [9, 16],
  });

  const [selectedGenre, setSelectedGenre] = useState(
    genres.map((g) => ({ ...g, selected: false }))
  );

  const [imageUri, setImageUri] = useState<{
    image: {
      uri: string;
      name: string;
      type: string;
    };
  } | null>(null);

  useEffect(() => {
    if (assets && assets[0]) {
      const { uri, mimeType, fileName, assetId } = assets[0];
      setImageUri({
        image: { uri, type: mimeType ?? 'image/jpeg', name: fileName ?? assetId ?? 'image' },
      });
    }
  }, [assets]);

  const openActionSheet = async () => {
    await show();
  };

  const addSelectedGenre = (idx: number) => {
    if (
      selectedGenre.filter((g) => g.selected === true).length >= 3 ||
      selectedGenre[idx]?.selected
    ) {
      return;
    }

    const updatedGenres = [...selectedGenre];
    updatedGenres[idx]!.selected = true;
    setSelectedGenre(updatedGenres);
  };

  const removeSelectedGenre = (idx: number) => {
    if (!selectedGenre[idx]?.selected) return;

    const updatedGenres = [...selectedGenre];
    updatedGenres[idx]!.selected = false;
    setSelectedGenre(updatedGenres);
  };

  const createStream = async () => {
    const formData = new FormData();

    if (imageUri) {
      // Dont remove this comment below
      // its needed bc typescript is retarded
      // @ts-ignore
      formData.append('image', { ...imageUri.image });
    }

    formData.append(
      'genre',
      selectedGenre
        .filter((g) => g.selected)
        .map((g) => g.text)
        .join(',')
    );

    mutate({
      data: formData,
    });
  };

  return (
    <SafeAreaView style={{ backgroundColor: '#151718' }}>
      <YStack height="100%" backgroundColor="#151718" padding="$4" justifyContent="space-between">
        <XStack>
          <Link asChild href={{ pathname: '/' }}>
            <Feather size={28} name="x" color="#fff" testID="x-icon" />
          </Link>
        </XStack>

        <StreamPreviewImage
          uri={imageUri?.image.uri ?? null}
          handleAddImage={openActionSheet}
          clearImage={() => {
            setImageUri(null);
          }}
        />

        <YStack gap="$5">
          <H3>Pick your Genre {selectedGenre.filter((g) => g.selected === true).length}/3</H3>
          <GenrePicker
            genres={selectedGenre}
            handlePress={(idx) => {
              if (selectedGenre[idx]?.selected) {
                removeSelectedGenre(idx);
              } else {
                addSelectedGenre(idx);
              }
            }}
          />
        </YStack>

        <Button
          onPress={() => createStream()}
          icon={isPending ? () => <Spinner size="small" color="$textMain" /> : undefined}
          backgroundColor={
            selectedGenre.filter((g) => g.selected === true).length < 1
              ? '$primaryLight'
              : '$accentMain'
          }
          disabled={selectedGenre.filter((g) => g.selected === true).length < 1}>
          Create Stream
        </Button>
      </YStack>
    </SafeAreaView>
  );
};

export default CreateStreamPage;
