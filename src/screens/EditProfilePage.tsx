import { useUpdateUser } from '@api/user/mutation/useUpdateUser';
import { useGetUser } from '@api/user/query/useGetUser';
import { Feather } from '@expo/vector-icons';
import useCameraActionSheet from '@hooks/useCameraActionSheet';
import useAuth from '@modules/auth/useAuth';
import { router } from 'expo-router';
import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Pressable } from 'react-native';
import Toast from 'react-native-toast-message';
import { Avatar, H1, Input, SizableText, TextArea, XStack, YStack } from 'tamagui';

const EditProfilePage = () => {
  const { show, assets } = useCameraActionSheet();

  const [imageUri, setImageUri] = useState<{
    image: {
      uri: string;
      name: string;
      type: string;
    };
  } | null>(null);

  useEffect(() => {
    if (assets && assets[0]) {
      const { uri, mimeType, fileName, assetId } = assets[0];
      setImageUri({
        image: { uri, type: mimeType ?? 'image/jpeg', name: fileName ?? assetId ?? 'image' },
      });
    }
  }, [assets]);

  const openActionSheet = async () => {
    console.log('fnjkgjrngjrj');
    await show();
  };

  const { user } = useAuth();

  const { data } = useGetUser({
    variables: { id: user.id },
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  const { mutateAsync } = useUpdateUser();

  const updateUser = async (displayname: string, bio: string) => {
    const formData = new FormData();

    if (imageUri) {
      // @ts-ignore
      formData.append('image', { ...imageUri.image });
    }

    formData.append('dispname', displayname);
    formData.append('bio', bio);
    const response = await mutateAsync({
      id: user.id,
      data: formData,
    });

    if (response.success) {
      router.back();
    } else {
      Toast.show({
        type: 'error',
        text1: response.error[0]!.name,
        text2: response.error[0]!.msg,
      });
    }
  };

  const handleFinishPress = (displayname: string, bio: string) => {
    updateUser(displayname, bio);
  };

  return (
    <Formik
      initialValues={{ displayname: user.dispname || '', bio: data?.data?.user.bio || '' }}
      onSubmit={(values) => updateUser(values.displayname, values.bio)}>
      {(props) => (
        <YStack padding="$4" backgroundColor="$background" gap="$5" flexGrow={1}>
          <XStack alignItems="center" justifyContent="space-between">
            <XStack alignItems="center">
              <Pressable onPress={() => router.back()} testID="back-pressable">
                <Feather name="chevron-left" size={28} color="white" />
              </Pressable>
              <H1 fontSize={24} testID="heading">
                Edit Profile
              </H1>
            </XStack>
            <Pressable
              disabled={
                props.values.bio.length > 100 ||
                props.values.displayname.length < 3 ||
                props.values.displayname.length > 20
              }
              onPress={() => handleFinishPress(props.values.displayname, props.values.bio)}>
              <SizableText
                fontSize={18}
                color={
                  props.values.bio.length > 100 ||
                  props.values.displayname.length < 3 ||
                  props.values.displayname.length > 20
                    ? '$textWashedOut'
                    : '$accentWashedOut'
                }>
                Finish
              </SizableText>
            </Pressable>
          </XStack>

          <YStack alignItems="center">
            <Avatar circular size="$10" testID="profile-avatar">
              <Avatar.Image
                accessibilityLabel={data?.data?.user.username ?? ''}
                src={
                  imageUri?.image.uri ??
                  data?.data?.user.avatar_url ??
                  'https://lyveblobstorage.blob.core.windows.net/images/avatar_placeholder.png'
                }
              />
              <Avatar.Fallback delayMs={600} backgroundColor="$blue10" />
            </Avatar>
            <Pressable onPress={openActionSheet}>
              <SizableText color="$textWashedOut">Edit Avatar</SizableText>
            </Pressable>
          </YStack>

          <YStack gap="$2">
            <YStack gap="$6">
              <YStack gap="$2">
                <XStack justifyContent="space-between">
                  <SizableText color="$textWashedOut">Displayname</SizableText>
                  <SizableText
                    color={props.values.displayname.length >= 20 ? 'red' : '$textWashedOut'}>
                    {props.values.displayname.length}/20
                  </SizableText>
                </XStack>
                <Input
                  maxLength={20}
                  testID="displayname-input"
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
                  testID="bio-input"
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
