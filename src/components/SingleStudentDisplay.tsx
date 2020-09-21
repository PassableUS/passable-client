import React from 'react';
import { Avatar, Button, Text } from '@ui-kitten/components';
import StudentActivePasses from './StudentActivePasses';
import Icon from 'react-native-dynamic-vector-icons';
import { View } from 'react-native';
import StudentPastPasses from './StudentPastPasses';
import { Student } from '../types/school';
import PrimaryButton from './PrimaryButton';
import DefaultLayout from './layouts/DefaultLayout';
import StudentContactTracing from './StudentContactTracing';

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
    case 'contactTracing':
      return 'Contact Tracing Report';
    default:
      return 'Invalid info request.';
  }
};

const SingleStudentDisplay = ({ student }: { student: firebase.firestore.DocumentSnapshot }) => {
  const studentData = student.data();

  const ContextualStudentInfo = ({ infoType }: { infoType: string }) => {
    switch (infoType) {
      case 'pastPasses':
        return <StudentPastPasses student={student} />;
      case 'activePasses':
        return <StudentActivePasses displayIssuer student={student} />;
      case 'contactTracing':
        return <StudentContactTracing />;
    }

    return <Text>No info type provided.</Text>;
  };

  const [infoType, setInfoType] = React.useState('activePasses');
  return (
    <DefaultLayout scrollable>
      <View style={{ flexDirection: 'row' }}>
        <Avatar
          style={{ width: 100, height: 100 }}
          size="giant"
          source={{
            uri:
              studentData.profilePictureUri ||
              'https://image.shutterstock.com/image-vector/male-default-placeholder-avatar-profile-260nw-387516193.jpg',
          }}
        />
        <View style={{ marginLeft: 15 }}>
          <Text category="h1">{studentData.displayName}</Text>
          <Text category="h4">
            {isNaN(parseInt(studentData.grade))
              ? studentData.grade
              : getNumberWithOrdinal(parseInt(studentData.grade)) + ' Grade'}
          </Text>
          <Text category="label">{studentData.schoolIssuedStudentId}</Text>
        </View>
      </View>
      <Text category="h1" style={{ marginTop: 20, marginBottom: 10 }}>
        {convertInfoTypeToReadable(infoType)}
      </Text>

      <ContextualStudentInfo infoType={infoType} />
      <PrimaryButton
        icon="history"
        iconType="FontAwesome"
        text={infoType === 'pastPasses' ? 'View Active Passes' : 'View Student History'}
        color="#2253ff"
        onPress={() =>
          setInfoType(infoType => (infoType === 'pastPasses' ? 'activePasses' : 'pastPasses'))
        }
      />
      {!(infoType == 'contactTracing') && (
        <PrimaryButton
          icon="plus"
          iconType="FontAwesome"
          text="Build Contact Tracing Report"
          color="#ff223c"
          onPress={() => setInfoType('contactTracing')}
        />
      )}
    </DefaultLayout>
  );
};

export default SingleStudentDisplay;
