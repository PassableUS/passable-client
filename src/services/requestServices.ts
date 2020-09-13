import { createPass, createPassFromPassData } from './passServices';
import { Pass, PassRequest } from '../types/school';

const approveRequest = (requestDocumentSnapshot: firebase.firestore.DocumentSnapshot) => {
  requestDocumentSnapshot.ref.update({
    addressed: true,
    approved: true,
  });

  const requestData = requestDocumentSnapshot.data() as PassRequest;
  const passData = requestData.passData;

  createPassFromPassData(passData);
};

const declineRequest = (requestReference: firebase.firestore.DocumentReference) => {
  requestReference.update({
    addressed: true,
    approved: false,
  });
};

export { approveRequest, declineRequest };
