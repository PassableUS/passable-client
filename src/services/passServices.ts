import { Pass, Student, ReduxCourseEnrollment, PassRequest } from '../types/school';
import { db } from '../app/AppAuthentication';
import firebase from 'firebase';
// Extract business logic here eventually for ending passes, creating passes, etc. depending on data and document references

const endPass = (schoolPassRef: firebase.firestore.DocumentReference) => {
  // TODO: Doesn't update the student's collection of passes

  schoolPassRef.update({
    endTime: new Date(),
  });
};

const createPassFromPassData = (passData: Pass) => {
  const selectedStudentRef = passData.passRecipientUser;
  const selectedRoomRef = passData.toLocation;

  selectedStudentRef
    .collection('passes')
    .add(passData)
    .then(() => {
      // setCreationStatus('Updating school records...');

      // TODO: Address whether to access .school or .parent in order to access the school from the parent
      // selectedStudent.school
      //   .collection('passes')
      const studentsCollectionRef = selectedStudentRef.parent;
      const schoolDocRef = studentsCollectionRef.parent;
      schoolDocRef
        .collection('passes')
        .add(passData)
        .then(() => {
          // setCreationStatus('Updating room records...');
          if (selectedRoomRef) {
            selectedRoomRef
              .collection('passes')
              .add(passData)
              .then(() => {
                // setCreationStatus('Successfully created pass.');
              })
              .catch((e: any) => alert(e.message));
          } else {
            console.log('No selected room reference. Creating general pass...');
          }
        })
        .catch((e: any) => alert(e.message));
    })
    .catch((e: any) => alert(e.message));
};

const createPass = (
  selectedStudent: firebase.firestore.DocumentData,
  selectedRoom: firebase.firestore.DocumentSnapshot,
  selectedCategory: firebase.firestore.DocumentData,
  selectedTime: number,
  issuingDisplayName: string,
  issuingUid: string
) => {
  // TODO: Track from location
  // ALERT: Tracks from location only for approval-required passes
  const currentDate = new Date();
  const futureDate = new Date(currentDate.getTime() + selectedTime * 60000);

  const selectedRoomData = selectedRoom.data();

  const passData: Pass = {
    fromLocation: 'default',
    toLocation: selectedRoom.ref,
    fromLocationName: 'default',
    passColor: selectedCategory.color || '#00BFFF',
    toLocationName: selectedRoomData.displayName,
    locationCategory: selectedRoomData.category,
    issuingUserName: issuingDisplayName,
    issuingUser: db.collection('users').doc(issuingUid),
    passRecipientUser: selectedStudent.ref,
    passRecipientName: selectedStudent.displayName,
    passSchemaVersion: 1,
    startTime: firebase.firestore.Timestamp.fromDate(new Date()),
    endTime: firebase.firestore.Timestamp.fromDate(futureDate), // use SelectedTime
    iconGroup: selectedCategory.iconGroup,
    iconName: selectedCategory.iconName,
  };

  createPassFromPassData(passData);
};

const createPassRequest = (
  selectedStudent: firebase.firestore.DocumentData,
  selectedRoom: firebase.firestore.DocumentSnapshot,
  selectedCategory: firebase.firestore.DocumentData,
  selectedTime: number,
  selectedApproverInfo: ReduxCourseEnrollment
) => {
  // TODO: Track from location
  // ALERT: Tracks from location only for approval-required passes
  const currentDate = new Date();
  const futureDate = new Date(currentDate.getTime() + selectedTime * 60000);

  const selectedRoomData = selectedRoom.data();

  const passData: Pass = {
    fromLocation: 'default',
    toLocation: selectedRoom.ref,
    fromLocationName: 'default',
    passColor: selectedCategory.color || '#00BFFF',
    toLocationName: selectedRoomData.displayName,
    locationCategory: selectedRoomData.category,
    issuingUserName: selectedApproverInfo.teacherDisplayName,
    issuingUser: db.doc(selectedApproverInfo.teacherPath),
    passRecipientUser: selectedStudent.ref,
    passRecipientName: selectedStudent.displayName,
    passSchemaVersion: 1,
    startTime: firebase.firestore.Timestamp.fromDate(new Date()),
    endTime: firebase.firestore.Timestamp.fromDate(futureDate), // use SelectedTime
    iconGroup: selectedCategory.iconGroup,
    iconName: selectedCategory.iconName,
  };

  const requestData: PassRequest = {
    approved: false,
    addressed: false,
    requestRecipient: db.doc(selectedApproverInfo.teacherPath),
    passData,
  };

  const studentsCollectionRef = selectedStudent.ref.parent;
  const schoolDocRef = studentsCollectionRef.parent;
  schoolDocRef
    .collection('requests')
    .add(requestData)
    .catch((e: any) => alert(e.message));

  // selectedStudent.ref
  //   .collection('requests')
  //   .add(requestData)
  //   .then(() => {

  //     const studentsCollectionRef = selectedStudent.ref.parent;
  //     const schoolDocRef = studentsCollectionRef.parent;
  //     schoolDocRef
  //       .collection('requests')
  //       .add(requestData)
  //                 // TODO: Evaluate whether we want to add the pass request to the teacher

  //       .catch((e: any) => alert(e.message));
  //   })
  //   .catch((e: any) => alert(e.message));
};

export { endPass, createPass, createPassRequest, createPassFromPassData };
