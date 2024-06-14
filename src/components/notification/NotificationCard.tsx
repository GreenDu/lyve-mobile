import { View, Text } from 'react-native';
import React from 'react';
import { SizableText, XStack, YStack } from 'tamagui';
import moment from 'moment';
import { Notification } from '@api/responses';
import { FontAwesome6, Feather, Ionicons } from '@expo/vector-icons';

const NotificationCard: React.FC<{ notification: Notification }> = ({ notification }) => {
  const icon: React.JSX.Element | null =
    notification.type === 'NEW_FOLLOWER' ? (
      <FontAwesome6 name="user-group" size={24} color="white" />
    ) : notification.type === 'STREAM_STARTED' ? (
      <Feather name="video" size={24} color="black" />
    ) : notification.type === 'REWARD_RECEIVED' ? (
      <Feather name="gift" size={24} color="white" />
    ) : notification.type === 'ACHIEVEMENT_RECEIVED' ? (
      <Ionicons name="ribbon-outline" size={24} color="white" />
    ) : null;

  return (
    <XStack
      backgroundColor="transparent"
      borderRadius="$4"
      paddingVertical="$3"
      paddingHorizontal="$3"
      space="$2"
      alignItems="center">
      <YStack
        backgroundColor="$accentMain"
        width="$6"
        height="$6"
        alignItems="center"
        justifyContent="center"
        borderRadius="$4"
        marginRight="$2">
        {icon}
      </YStack>
      <YStack flex={1}>
        <SizableText>{notification?.message}</SizableText>
        <SizableText color="$textWashedOut">
          {moment(notification.created_at).fromNow()}
        </SizableText>
      </YStack>
    </XStack>
  );
};

export default NotificationCard;
