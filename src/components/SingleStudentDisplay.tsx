import React from 'react';
import { Student } from '../features/main/StudentInfoScreen';
import { Avatar, Button, Text } from '@ui-kitten/components';
import StudentActivePasses from './StudentActivePasses';
import Icon from 'react-native-dynamic-vector-icons';
import { View } from 'react-native';
import StudentPastPasses from './StudentPastPasses';

export const getNumberWithOrdinal = (n: number) => {
  let s = ['th', 'st', 'nd', 'rd'],
    v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
};

const convertInfoTypeToReadable = (infoType: string) => {
  switch (infoType) {
    case 'pastPasses':
      return 'Pass History';
    case 'activePasses':
      return 'Active Passes';
    default:
      return 'Invalid info request.';
  }

  return 'Invalid info request.';
};

const SingleStudentDisplay = ({ student }: { student: Student }) => {
  const ContextualStudentInfo = ({ infoType }: { infoType: string }) => {
    switch (infoType) {
      case 'pastPasses':
        return <StudentPastPasses student={student} />;
      case 'activePasses':
        return <StudentActivePasses displayTeacher student={student} />;
    }

    return <Text>No info type provided.</Text>;
  };

  const [infoType, setInfoType] = React.useState('activePasses');
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
          <Text category="label">{student.schoolIssuedId}</Text>
        </View>
      </View>
      <Text category="h1" style={{ marginTop: 20, marginBottom: 10 }}>
        {convertInfoTypeToReadable(infoType)}
      </Text>

      <ContextualStudentInfo infoType={infoType} />
      <Button style={{ marginTop: 5 }} onPress={() => setInfoType('pastPasses')}>
        View Student History
      </Button>
      <Button style={{ marginTop: 5 }} status="danger">
        Build Contact Tracing Report
      </Button>
    </>
  );
};

export default SingleStudentDisplay;
