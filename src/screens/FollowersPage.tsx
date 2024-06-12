import { View, Text, ScrollView } from 'react-native';
import React, { useEffect } from 'react';
import { useGetFollowedBy } from '@api/user/query/useGetFollowedBy';
import { H1, SizableText, YStack } from 'tamagui';
import UserFollowerCard from '@components/UserFollowerCard';

const FollowersPage: React.FC<{ id: string }> = ({ id }) => {
  console.log(id);
  const { data, isSuccess } = useGetFollowedBy({ variables: { id } });

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <YStack padding="$4" height="100%">
      <H1 marginVertical="$4" fontSize={24} fontWeight="800">
        Followers
      </H1>
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
