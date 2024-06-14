import React from 'react';
import useAuth from '@modules/auth/useAuth';
import {
  Avatar,
  Button,
  H1,
  SizableText,
  XStack,
  YStack,
} from 'tamagui';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';


const EditProfilePage = () => {
  const { user } = useAuth();

  return (
    <YStack padding="$4" backgroundColor="$background" gap="$5">
      <XStack alignItems="center" justifyContent="space-between">
        <XStack alignItems="center">
          <Button
            backgroundColor="#151718"
            icon={<Feather name="chevron-left" size={24} color="white" />}
            onPress={() => router.back()}
          />
          <H1 fontSize={24}>Edit Profile</H1>
        </XStack>
        <SizableText fontSize={18} color="$accentWashedOut">
          Finish
        </SizableText>
      </XStack>
      <YStack alignItems="center">
        <Avatar circular size="$10">
          <Avatar.Image
            accessibilityLabel="Cam"
            src="https://images.unsplash.com/photo-1548142813-c348350df52b?&w=150&h=150&dpr=2&q=80"
          />
          <Avatar.Fallback backgroundColor="$blue10" />
        </Avatar>
        <SizableText color="$textWashedOut">Edit Avatar</SizableText>
      </YStack>
      <YStack gap="$2">
        <XStack justifyContent="space-between">
          <SizableText>Display-name</SizableText>
          <SizableText>0/20</SizableText>
        </XStack>
      </YStack>
    </YStack>
  );
};

export default EditProfilePage;
