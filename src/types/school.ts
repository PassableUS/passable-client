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
  startTime: firebase.firestore.Timestamp;
  endTime: firebase.firestore.Timestamp;
  locationCategory: string;
  passColor: string;
  uid?: string;
  iconGroup?: string;
  iconName?: string;
}

export interface PassRequest {
  approved: boolean;
  addressed: boolean;
  requestRecipient: firebase.firestore.DocumentReference;
  passData: Pass;
}

export interface Student {
  eventsLog: Pass[];
  displayName: string;
  grade: string;
  schoolIssuedStudentId: string;
  profilePictureUri?: string;
  uid: string;
}

export interface Room {
  category: string;
  displayName: string;
  maxPersonCount: number;
}

export interface RoomCategory {
  categorySpecifier: string;
  color: string;
  displayName: string;
  iconGroup: string;
  iconName: string;
  studentsRequireApproval: boolean;
}

export interface FirestoreCourseEnrollment {
  courseName: string;
  teacherReference: firebase.firestore.DocumentReference;
  teacherDisplayName: string;
}

export interface ReduxCourseEnrollment {
  courseName: string;
  teacherPath: string;
  teacherDisplayName: string;
}
