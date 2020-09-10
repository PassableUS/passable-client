export interface Pass {
  fromLocation: firebase.firestore.DocumentReference | 'default';
  toLocation: firebase.firestore.DocumentReference;
  fromLocationName: string;
  toLocationName: string;
  issuingUserName: string;
  issuingUser: firebase.firestore.DocumentReference;
  passRecipientUser: firebase.firestore.DocumentReference;
  passRecipientName: string;
  passSchemaVersion: number;
  startTime: firebase.firestore.Timestamp | Date;
  endTime: firebase.firestore.Timestamp | Date;
  locationCategory: string;
  passColor: string;
  uid?: string;
}
export interface Student {
  eventsLog: Pass[];
  displayName: string;
  grade: string;
  schoolIssuedStudentId: string;
  profilePictureUri?: string;
  uid: string;
}
