import { View, Text, ActivityIndicator, ScrollView } from 'react-native';
import React from 'react';
import useAuth from '@modules/auth/useAuth';
import { useGetNotifications } from '@api/user/query/useGetNotifications';
import { H1, SizableText, YStack } from 'tamagui';
import { GetNotificationsResponse, Notification } from '@api/responses';
import NotificationCard from '@components/notification/NotificationCard';

const NotificationPage = () => {
  const { user } = useAuth();

  const { data, isFetching } = useGetNotifications({ variables: { id: user.id } });

  if (isFetching) {
    return (
      <YStack
        padding="$4"
        justifyContent="center"
        alignItems="center"
        height="100%"
        backgroundColor="$background">
        <ActivityIndicator size="large" />
      </YStack>
    );
  }
  return (
    <YStack padding="$4" height="100%">
      <H1 marginTop="$2" fontSize={28} fontWeight="800">
        Notifications
      </H1>

      <ScrollView bounces testID="notification-list">
        <YStack space="$3">
          {data?.data?.notifications.map((n) => {
            return <NotificationCard key={n.id} notification={n} />;
          })}
        </YStack>
      </ScrollView>
    </YStack>
  );
};

export default NotificationPage;
