import React from 'react';
import useAuth from '@modules/auth/useAuth';
import { Avatar, Button, H1, Input, SizableText, TextArea, XStack, YStack } from 'tamagui';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Formik } from 'formik';
import { Pressable, TextInput, View } from 'react-native';

const EditProfilePage = () => {
  const { user } = useAuth();


  return (
    <YStack padding="$4" backgroundColor="$background" gap="$5" height="100%">
      <XStack alignItems="center" justifyContent="space-between">
        <XStack alignItems="center">
        <Pressable onPress={() => router.back()}>
          <Feather name="chevron-left" size={28} color="white" />
        </Pressable>
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
                  <SizableText color="$textWashedOut">{props.values.displayname.length}/20</SizableText>
                  </XStack>
                <Input
                  maxLength={20}
                  placeholderTextColor="$textWashedOut"
                  placeholder="displayname"
                  onChangeText={(text) => {
                    props.handleChange('displayname')(text); 
                  }}
                  value={props.values.displayname}
                />
              </YStack>

              <YStack gap="$2">
                <XStack justifyContent="space-between">
                  <SizableText color="$textWashedOut">Bio</SizableText>
                  <SizableText color="$textWashedOut">{props.values.bio.length}/100</SizableText>
                </XStack>
                <TextArea
                  maxLength={100}
                  placeholderTextColor="$textWashedOut"
                  placeholder="bio"
                  onChangeText={(text) => {
                    props.handleChange('bio')(text); 
                  }}
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
