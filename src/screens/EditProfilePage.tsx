import React from 'react';
import useAuth from '@modules/auth/useAuth';
import { Avatar, Button, H1, Input, SizableText, TextArea, XStack, YStack } from 'tamagui';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Formik } from 'formik';
import { TextInput, View } from 'react-native';

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
        <Formik initialValues={{ displayname: '', bio: '' }} onSubmit={(values) => {}}>
          {(props) => (
            <YStack gap="$6">
              <YStack gap="$2">
                <XStack justifyContent="space-between">
                  <SizableText color="$textWashedOut">Displayname</SizableText>
                  <SizableText color="$textWashedOut">0/20</SizableText>
                </XStack>
                <Input
                  placeholderTextColor="$textWashedOut"
                  placeholder="displayname"
                  onChangeText={props.handleChange('displayname')}
                  value={props.values.displayname}
                />
              </YStack>

              <YStack gap="$2">
                <XStack justifyContent="space-between">
                  <SizableText color="$textWashedOut">Bio</SizableText>
                  <SizableText color="$textWashedOut">0/100</SizableText>
                </XStack>
                <TextArea
                  maxHeight="$8"
                  placeholderTextColor="$textWashedOut"
                  placeholder="bio"
                  onChangeText={props.handleChange('bio')}
                  value={props.values.bio}
                />
              </YStack>
            </YStack>
          )}
        </Formik>
      </YStack>
    </YStack>
  );
};

export default EditProfilePage;
