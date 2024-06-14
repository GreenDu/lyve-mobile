import { View, Text, ScrollView, Pressable } from 'react-native';
import React, { useEffect } from 'react';
import { useGetFollowing } from '@api/user/query/useGetFollowing';
import { Button, H1, SizableText, XStack, YStack } from 'tamagui';
import UserFollowerCard from '@components/UserFollowerCard';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';

const FollowingPage: React.FC<{ id: string }> = ({ id }) => {
  console.log(id);
  const { data, isSuccess } = useGetFollowing({
    variables: { id },
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <YStack padding="$4" height="100%">
      <XStack
        alignItems="center"
        space="$2"
        justifyContent="flex-start"
        marginTop="$2"
        paddingBottom="$4">
        <Pressable onPress={() => router.back()}>
          <Feather name="chevron-left" size={28} color="white" />
        </Pressable>
        <H1 fontSize={28} fontWeight="800">
          Following
        </H1>
      </XStack>
      {isSuccess && (
        <ScrollView>
          <YStack space="$3">
            {data?.data?.user.following.map((u) => {
              return (
                <UserFollowerCard
                  key={u.user.id}
                  id={u.user.id}
                  username={u.user.username}
                  dispname={u.user.dispname}
                  avatar_url={u.user.avatar_url}
                  subscribed={true}
                />
              );
            })}
          </YStack>
        </ScrollView>
      )}
    </YStack>
  );
};

export default FollowingPage;
