import { useGetFollowedBy } from '@api/user/query/useGetFollowedBy';
import UserFollowerCard from '@components/UserFollowerCard';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect } from 'react';
import { Pressable, ScrollView } from 'react-native';
import { H1, XStack, YStack } from 'tamagui';

const FollowersPage: React.FC<{ id: string }> = ({ id }) => {
  console.log(id);
  const { data, isSuccess } = useGetFollowedBy({ variables: { id } });

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <YStack padding="$4" height="100%">
      <XStack alignItems="center" space="$2">
        <Pressable onPress={() => router.back()}>
          <Feather name="chevron-left" size={28} color="white" />
        </Pressable>
        <H1 marginVertical="$4" fontSize={24} fontWeight="800">
          Following
        </H1>
      </XStack>
      {isSuccess && (
        <ScrollView>
          <YStack space="$3">
            {data?.data?.user.followedBy.map((u) => {
              return (
                <UserFollowerCard
                  key={u.user.id}
                  id={u.user.id}
                  username={u.user.username}
                  dispname={u.user.dispname}
                  avatar_url={u.user.avatar_url}
                  subscribed={u.subscribed}
                />
              );
            })}
          </YStack>
        </ScrollView>
      )}
    </YStack>
  );
};

export default FollowersPage;
