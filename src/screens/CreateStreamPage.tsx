import { CreateStreamResponse } from '@api/responses';
import { Feather } from '@expo/vector-icons';
import useAuth from '@modules/auth/useAuth';
import GenrePicker from '@modules/stream/GenrePicker';
import { genres } from '@modules/stream/genres';
import { router, Link } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { YStack, XStack, Button, H3 } from 'tamagui';

const CreateStreamPage = () => {
  const { user } = useAuth();
  const [selectedGenre, setSelectedGenre] = useState(genres);

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
    const createdStream = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/stream/create`, {
      method: 'POST',
      body: JSON.stringify({
        streamerId: user.id,
        previewImgUrl: 'dummy',
        genre: selectedGenre
          .filter((g) => g.selected === true)
          .map((m) => m.text)
          .join(','),
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json() as Promise<CreateStreamResponse>);

    if (createdStream && createdStream.data) {
      if (createdStream.success) {
        router.navigate(`/stream/${createdStream.data.stream.id}`);
      } else {
        if (createdStream.error[0]) {
          Toast.show({
            type: 'error',
            text1: createdStream.error[0]?.name,
            text2: createdStream.error[0]?.msg,
          });
        }
      }
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: '#151718' }}>
      <YStack height="100%" backgroundColor="#151718" padding="$4" justifyContent="space-between">
        <XStack>
          <Link asChild href={{ pathname: '/' }}>
            <Feather size={28} name="x" color="#fff" />
          </Link>
        </XStack>
        <YStack
          width="60%"
          height="45%"
          backgroundColor="#ddd"
          borderRadius={25}
          alignSelf="center"
          alignItems="center"
          justifyContent="center">
          <YStack backgroundColor="#00000044" borderRadius={25} padding="$4">
            <Feather size={28} name="plus" color="#fff" />
          </YStack>
        </YStack>
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
          disabled={selectedGenre.filter((g) => g.selected === true).length < 1}>
          Create Stream
        </Button>
      </YStack>
    </SafeAreaView>
  );
};

export default CreateStreamPage;
