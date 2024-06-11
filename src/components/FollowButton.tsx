import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Button } from 'tamagui';
import { useUnfollowUser } from '@api/user/mutation/useUnfollowUser';
import { useFollowUser } from '@api/user/mutation/useFollowUser';
import useAuth from '@modules/auth/useAuth';

const FollowButton: React.FC<{
  size: 'small' | 'medium' | 'large';
  userId: string;
  subscribed: boolean;
}> = ({ size, userId, subscribed }) => {
  const { user: me } = useAuth();

  const [followed, setFollowed] = useState<boolean>(subscribed);

  useEffect(() => {
    setFollowed(subscribed);
  }, [subscribed]);

  const unFollowMutation = useUnfollowUser({
    onSuccess(data) {
      if (data.success) {
        setFollowed(false);
      }
    },
  });
  const followMutation = useFollowUser({
    onSuccess(data) {
      if (data.success) {
        setFollowed(true);
      }
    },
  });

  return (
    <Button
      backgroundColor={followed ? '$primaryLight' : size === 'large' ? '#A372F9' : '$accentMain'}
      paddingHorizontal="$4"
      size={size === 'small' ? '$2' : size === 'medium' ? '$3' : '$4'}
      borderRadius={25}
      onPress={() => {
        if (followed) {
          unFollowMutation.mutate({ ownId: me.id, otherId: userId });
        } else {
          followMutation.mutate({ ownId: me.id, otherId: userId });
        }
      }}>
      {followed ? 'Unfollow' : 'Follow'}
    </Button>
  );
};

export default FollowButton;
