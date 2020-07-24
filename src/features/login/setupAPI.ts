import axios from '../../utils/axios';

export const setFullName = async (fullName: string) => {
  const data = axios.post('/session/name', { fullName }).then(res => res.data);
  console.log('Sending request');
  return data;
};

export const setUsername = async (username: string) => {
  const data = axios.post('/session/username', { username }).then(res => res.data);
  return data;
};

export const searchSchools = async (schoolName: string) => {
  if (!schoolName)
    return console.log('API request handler for school search recieved no school name');
  // const encodedSchoolName = encodeURI(schoolName);
  // const requestURL = `https://services1.arcgis.com/Hp6G80Pky0om7QvQ/arcgis/rest/services/Public_Schools/FeatureServer/0/query?where=NAME%20%3D%20%27${encodedSchoolName}%27&outFields=NAME,ADDRESS,CITY,STATE,ZIP,ST_GRADE,END_GRADE,NCESID,DISTRICTID&outSR=4326&f=json`;
  const data = axios.get('/schools/find', { params: { name: schoolName } }).then(res => res.data);
  return data;
};

export default {
  setFullName,
  setUsername,
  searchSchools,
};
