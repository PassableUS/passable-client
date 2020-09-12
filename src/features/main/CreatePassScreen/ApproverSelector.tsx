
import React from "react"

import {Text} from "@ui-kitten/components"
import IDScanner from "../../../components/IDScanner";
import StudentSearch from "../../../components/StudentSearch";

const StudentSelector = ({ context }: { context: string }) => {
  // STUDENT CONTEXT: Automatically select the current student if it's a student assigning the role
  

  return (
    <>
      <Text category="h1">Student Search</Text>
      <Text category="s1" style={{ marginBottom: 10 }}>
        Search for any student in your school.
      </Text>
      {context === 'scan' && (
        // TODO: FIX HANDLING OF SCANNER
        <IDScanner
          handleStudentScan={(data: any) =>
            // navigation.navigate('StudentInfo', {
            //   schoolIssuedStudentId: data,
            //   context: 'schoolIssuedStudentId',
            // })
          }
        />
      )}
      {context === 'search' && (
        <StudentSearch
          handleStudentSelect={(student: firebase.firestore.DocumentData) => {
            setSelectedStudent(student);

            setStep('selectCategory');
          }}
        />
      )}
    </>
  );
};