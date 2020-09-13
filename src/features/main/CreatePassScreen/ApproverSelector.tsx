import React, { Dispatch } from 'react';

import { Text } from '@ui-kitten/components';
import IDScanner from '../../../components/IDScanner';
import StudentSearch from '../../../components/StudentSearch';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/rootReducer';
import { ReduxCourseEnrollment } from '../../../types/school';
import { View } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import { SelectedApproverInfo } from '.';

const ApproverSelector = ({
  setSelectedApproverInfo,
  setStep,
}: {
  setSelectedApproverInfo: Dispatch<React.SetStateAction<ReduxCourseEnrollment>>;
  setStep: any;
}) => {
  const courseEnrollments = useSelector(
    (state: RootState) => state.setup.studentInformation.courseEnrollments
  );

  return (
    <>
      <Text category="h1">Where are you coming from?</Text>
      <Text category="s2" style={{ marginBottom: 10 }}>
        The pass that you're trying to create requires teacher approval. The teacher for the class
        you select will be sent a request.
      </Text>

      {courseEnrollments.map((enrollment: ReduxCourseEnrollment) => (
        <TouchableHighlight
          key={enrollment.courseName}
          style={{
            width: '100%',
            height: 125,
            borderRadius: 10,

            marginVertical: 5,
          }}
          onPress={() => {
            setSelectedApproverInfo(enrollment);
            setStep('selectTime');
          }}>
          <LinearGradient
            colors={['#36d1dc', '#5b86e5']}
            start={[0.0, 0.5]}
            end={[1.0, 0.5]}
            locations={[0.0, 1.0]}
            style={{
              width: '100%',
              height: '100%',
              borderRadius: 10,

              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: 'white',
                textAlign: 'center',
                fontFamily: 'Inter_600SemiBold',
                fontSize: 18,
              }}>
              {enrollment.courseName}
            </Text>
          </LinearGradient>
        </TouchableHighlight>
      ))}
    </>
  );
};

export default ApproverSelector;
