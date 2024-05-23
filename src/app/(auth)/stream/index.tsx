import { Feather } from '@expo/vector-icons';
import { Link, router } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, H3, XStack, YStack } from 'tamagui';

import GenreBadge from '../../../components/GenreBadge';
import useAuth from '../../../hooks/useAuth';

const StreamPage = () => {
  const { user } = useAuth();
  const [selectedGenre, setSelectedGenre] = useState<
    {
      text: string;
      color: string;
      selected: boolean;
    }[]
  >([
    {
      text: 'Chatting 💬',
      color: '#E16F6F',
      selected: false,
    },
    {
      text: 'Beauty 💄',
      color: '#E16FDD',
      selected: false,
    },
    {
      text: 'Gaming 🎮',
      color: '#6FB1E1',
      selected: false,
    },
    {
      text: 'Nature 🌳',
      color: '#85D95D',
      selected: false,
    },
    {
      text: 'Sport 🏈',
      color: '#FBC151',
      selected: false,
    },
    {
      text: 'Art 🎨',
      color: '#E4D3A6',
      selected: false,
    },
    {
      text: 'IRL 😄',
      color: '#F4F2C3',
      selected: false,
    },
    {
      text: 'Football ⚽️',
      color: '#DDDDDD',
      selected: false,
    },
    {
      text: 'Cooking 🍜',
      color: '#FFE9CE',
      selected: false,
    },
    {
      text: 'Music 🎶',
      color: '#D283F8',
      selected: false,
    },
    {
      text: 'Podcast 🎙️',
      color: '#C2C2C2',
      selected: false,
    },
    {
      text: 'Education 👨‍🏫',
      color: '#E6E890',
      selected: false,
    },
    {
      text: 'Camping  ⛺️',
      color: '#2AE3A1',
      selected: false,
    },
  ]);

  const addSelectedGenre = (idx: number) => {
    if (
      selectedGenre.filter((g) => g.selected === true).length >= 3 ||
      selectedGenre[idx].selected
    ) {
      return;
    }

    const updatedGenres = [...selectedGenre];
    updatedGenres[idx].selected = true;
    setSelectedGenre(updatedGenres);
  };

  const removeSelectedGenre = (idx: number) => {
    if (!selectedGenre[idx].selected) return;

    const updatedGenres = [...selectedGenre];
    updatedGenres[idx].selected = false;
    setSelectedGenre(updatedGenres);
  };

  const createStream = async () => {
    const createdStream: any = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/stream/create`, {
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
    }).then((res) => res.json());

    console.log(createdStream);

    if (createdStream?.success && createdStream?.data?.id) {
      router.navigate(`/stream/${createdStream?.data?.id}`);
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
          <XStack gap="$3" flexWrap="wrap" justifyContent="flex-start">
            {selectedGenre.map((g, idx) => {
              return (
                <GenreBadge
                  key={`genre:${idx}:${g.text}`}
                  text={g.text}
                  color={g.color}
                  selected={g.selected}
                  onPress={() => {
                    if (selectedGenre[idx].selected) {
                      removeSelectedGenre(idx);
                    } else {
                      addSelectedGenre(idx);
                    }
                  }}
                />
              );
            })}
          </XStack>
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

export default StreamPage;
