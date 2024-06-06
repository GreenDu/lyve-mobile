import { View } from 'react-native';
import React from 'react';
import { useGetUser } from '@api/user/useGetUser';
import { Button, H2, SizableText, XStack, YStack } from 'tamagui';
import UserStats from '@components/profile/ProfileHeader';
import { Feather } from '@expo/vector-icons';

const ProfilePage: React.FC<{ userid: string }> = ({ userid }) => {
  const { data } = useGetUser({ variables: { id: userid } });

  if (data) {
    data.data.user.bio = "fjbgjkrkgjkgrfbrhjgbdrgfbjlbgfjlbgjrbjgerjgberjgbrjgbjrbgjlrgtrgjntrgjntrgbjrtbgjrbjhrgtfbrhbgrbgjerfnejtngejbgjerbgjebjfnke";
  }

  return (
    <View>
      <YStack height="100%" backgroundColor="$color.background">
        <YStack height="35%" backgroundColor={'$color.accentDark'} borderRadius={30}>
          <YStack top="$5" left="$5">
            <UserStats
              followerCount={data?.data.user.followerCount}
              followingCount={data?.data.user.followingCount}></UserStats>

            <YStack justifyContent="flex-start" gap="$2" maxWidth="90%">
              <H2 fontWeight="800">{data?.data.user.username}</H2>
              <SizableText opacity={0.8}>@{data?.data.user.username}</SizableText>
              <SizableText >{data?.data.user.bio.substring(0,100)}</SizableText>
            </YStack>
            <XStack gap="$18">

              <Button
                onPress={() => console.log('Edit Profile View')}
                backgroundColor="#A372F9"
                maxWidth="40%"
                borderRadius="$10"
                height="$5"
                mt="$5"
                fontSize={18}>
                Edit Profile
              </Button>
              
              <Button
                onPress={() => console.log('Settings View')}
                backgroundColor="#A372F9"
                minWidth="20%"
                borderRadius="$10"
                height="$5"
                mt="$5"
                icon={<Feather name="settings" size={24} color="white" />}
                >
              </Button>
            </XStack>
          </YStack>
        </YStack>
      </YStack>
    </View>
  );
};

export default ProfilePage;
