import React from 'react';
import useAuth from '@modules/auth/useAuth';
import { Avatar, Button, H1, Input, SizableText, TextArea, XStack, YStack } from 'tamagui';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Formik } from 'formik';
import { Pressable, TextInput, View } from 'react-native';
import { useUpdateUser } from '@api/user/mutation/useUpdateUser';
import { useGetUser } from '@api/user/query/useGetUser';

const EditProfilePage = () => {
  const { user } = useAuth();

  const { data } = useGetUser({
    variables: { id: user.id },
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  const { mutate } = useUpdateUser();

  const updateUser = async (displayname: string, bio: string) => {
    const formData = new FormData();
    formData.append('dispname', displayname);
    formData.append('bio', bio);
    mutate({
      id: user.id,
      data: formData,
    });
  };

  const handleFinishPress = (displayname: string, bio: string) => {
    updateUser(displayname, bio);
    router.back();
  };

  return (
    <Formik
      initialValues={{ displayname: user.dispname || '', bio: data?.data?.user.bio || '' }}
      onSubmit={(values) => updateUser(values.displayname, values.bio)}
    >
      {(props) => (
          <YStack padding="$4" backgroundColor="$background" gap="$5" height="100%">
            <XStack alignItems="center" justifyContent="space-between">
              <XStack alignItems="center">
                <Pressable onPress={() => router.back()}>
                  <Feather name="chevron-left" size={28} color="white" />
                </Pressable>
                <H1 fontSize={24}>Edit Profile</H1>
              </XStack>
              <Pressable onPress={() => handleFinishPress(props.values.displayname, props.values.bio)}>
                <SizableText fontSize={18} color="$accentWashedOut">
                  Finish
                </SizableText>
              </Pressable>
            </XStack>

            <YStack alignItems="center">
              <Avatar circular size="$10" testID="profile-avatar">
                <Avatar.Image
                  accessibilityLabel="Nate Wienert"
                  src={
                    data?.data?.user.avatar_url ??
                    'https://lyveblobstorage.blob.core.windows.net/images/avatar_placeholder.png'
                  }
                />
                <Avatar.Fallback delayMs={600} backgroundColor="$blue10" />
              </Avatar>
              <SizableText color="$textWashedOut">Edit Avatar</SizableText>
            </YStack>

            <YStack gap="$2">
              <YStack gap="$6">
                <YStack gap="$2">
                  <XStack justifyContent="space-between">
                    <SizableText color="$textWashedOut">Displayname</SizableText>
                    <SizableText
                      color={props.values.displayname.length >= 20 ? 'red' : '$textWashedOut'}
                    >
                      {props.values.displayname.length}/20
                    </SizableText>
                  </XStack>
                  <Input
                    maxLength={20}
                    placeholderTextColor="$textWashedOut"
                    placeholder="displayname"
                    onChangeText={props.handleChange('displayname')}
                    value={props.values.displayname}
                  />
                </YStack>

                <YStack gap="$2">
                  <XStack justifyContent="space-between">
                    <SizableText color="$textWashedOut">Bio</SizableText>
                    <SizableText color={props.values.bio.length >= 100 ? 'red' : '$textWashedOut'}>
                      {props.values.bio.length}/100
                    </SizableText>
                  </XStack>
                  <TextArea
                    maxLength={100}
                    placeholderTextColor="$textWashedOut"
                    placeholder="bio"
                    onChangeText={props.handleChange('bio')}
                    value={props.values.bio}
                  />
                </YStack>
              </YStack>
            </YStack>
          </YStack>
      )}
    </Formik>
  );
};

export default EditProfilePage;
