import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { View } from 'react-native';
import { Avatar, Text } from '@ui-kitten/components';
import { getNumberWithOrdinal } from './SingleStudentDisplay';

const StudentSearchResultItem = ({
  student,
  handleStudentSelect,
}: {
  student: firebase.firestore.DocumentData;
  handleStudentSelect: any;
}) => {
  return (
    <TouchableOpacity onPress={() => handleStudentSelect(student)}>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 10,
          backgroundColor: '#efefef',
          borderRadius: 10,
          paddingVertical: 20,
          paddingHorizontal: 25,
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}>
        <Avatar
          size="large"
          source={{
            uri:
              student.profilePictureUri ||
              'https://image.shutterstock.com/image-vector/male-default-placeholder-avatar-profile-260nw-387516193.jpg',
          }}
        />
        <View style={{ marginLeft: 15 }}>
          <Text category="h5" style={{ fontFamily: 'Inter_600SemiBold' }}>
            {student.displayName}
          </Text>
          <Text category="s2">
            {isNaN(parseInt(student.grade))
              ? student.grade
              : getNumberWithOrdinal(parseInt(student.grade)) + ' Grade '}
            | {student.schoolIssuedStudentId}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default StudentSearchResultItem;
