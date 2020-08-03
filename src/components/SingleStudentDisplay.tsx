import React from 'react';
import { Student } from '../features/main/StudentInfoScreen';
import { Avatar, Button, Text } from '@ui-kitten/components';
import StudentActivePasses from './StudentActivePasses';
import Icon from 'react-native-dynamic-vector-icons';
import { View } from 'react-native';

export const getNumberWithOrdinal = (n: number) => {
  let s = ['th', 'st', 'nd', 'rd'],
    v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
};

const SingleStudentDisplay = ({ student }: { student: Student }) => {
  return (
    <>
      <View style={{ flexDirection: 'row' }}>
        <Avatar
          style={{ width: 100, height: 100 }}
          size="giant"
          source={{
            uri:
              student.profilePictureUri ||
              'https://image.shutterstock.com/image-vector/male-default-placeholder-avatar-profile-260nw-387516193.jpg',
          }}
        />
        <View style={{ marginLeft: 15 }}>
          <Text category="h1">{student.displayName}</Text>
          <Text category="h4">{getNumberWithOrdinal(parseInt(student.grade))} Grade</Text>
        </View>
      </View>
      <Text category="h1" style={{ marginTop: 20, marginBottom: 10 }}>
        Active Passes
      </Text>

      <StudentActivePasses student={student} />
      <Button style={{ marginTop: 5 }}>View Student History</Button>
    </>
  );
};

export default SingleStudentDisplay;
