import { View, Text, ScrollView } from 'react-native';
import React, { useEffect } from 'react';
import { useGetFollowing } from '@api/user/query/useGetFollowing';
import { H1, SizableText, YStack } from 'tamagui';
import UserFollowerCard from '@components/UserFollowerCard';

const FollowingPage: React.FC<{ id: string }> = ({ id }) => {
  console.log(id);
  const { data, isSuccess } = useGetFollowing({ variables: { id } });

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <YStack padding="$4" height="100%">
      <H1 marginVertical="$4" fontSize={24} fontWeight="800">
        Following
      </H1>
      {isSuccess && (
        <ScrollView>
          <YStack>
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
