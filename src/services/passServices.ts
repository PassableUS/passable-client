// Extract business logic here eventually for ending passes, creating passes, etc. depending on data and document references

const endPass = (passRef: firebase.firestore.DocumentReference) => {
  passRef.update({
    endTime: new Date(),
  });
};

export { endPass };
