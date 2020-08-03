import React from 'react';
import { Student } from '../features/main/StudentInfoScreen';
import { Avatar, Button, Text } from '@ui-kitten/components';
import StudentActivePasses from './StudentActivePasses';

export const getNumberWithOrdinal = (n: number) => {
  let s = ['th', 'st', 'nd', 'rd'],
    v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
};

const SingleStudentDisplay = ({ student }: { student: Student }) => {
  return (
    <>
      <Avatar
        size="giant"
        source={{
          uri:
            student.profilePictureUri ||
            'https://image.shutterstock.com/image-vector/male-default-placeholder-avatar-profile-260nw-387516193.jpg',
        }}
      />
      <Text category="h1">{student.displayName}</Text>
      <Text category="h4">{getNumberWithOrdinal(parseInt(student.grade))} Grade</Text>
      <Text category="h1" style={{ marginTop: 20, marginBottom: 10 }}>
        Active Passes
      </Text>

      <StudentActivePasses student={student} />
      <Button>View Student History</Button>
    </>
  );
};

export default SingleStudentDisplay;
