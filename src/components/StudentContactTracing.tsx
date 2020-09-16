import React from 'react';
import { Text, Select, SelectItem, IndexPath, Avatar, Spinner } from '@ui-kitten/components';
import { View } from 'react-native';
import PrimaryButton from './PrimaryButton';

const dummyData = [{}];

const selectTitles = ['14 days', '7 days', '3 days'];

interface StudentItemProps {
  pillColor?: string;
  studentId: string;
  avatar?: string;
  contactText: string;
  noBottomBorder: boolean;
}
const StudentItem = ({
  pillColor = 'red',
  studentId,
  noBottomBorder = false,
  studentName,
  avatar = 'https://image.shutterstock.com/image-vector/male-default-placeholder-avatar-profile-260nw-387516193.jpg',
  contactText,
}) => {
  return (
    <View
      style={{
        display: 'flex',
        height: 100,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
        borderBottomWidth: noBottomBorder ? 0 : 3,
        borderBottomColor: '#efefef',
      }}>
      <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <Avatar
          size="large"
          source={{
            uri: avatar,
          }}
        />
        <View style={{ marginLeft: 10 }}>
          <Text category="s1">{studentName}</Text>
          <Text>
            {studentId} |{' '}
            <Text style={{ fontFamily: 'Inter_600SemiBold' }}>Student Attending School</Text>
          </Text>
        </View>
      </View>

      <View
        style={{
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderRadius: 1000,
          backgroundColor: pillColor,
        }}>
        <Text style={{ color: 'white', fontFamily: 'Inter_800ExtraBold' }}>{contactText}</Text>
      </View>
    </View>
  );
};

const StudentContactTracing = () => {
  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));

  const displayValue = selectTitles[selectedIndex.row];

  return (
    <>
      <Text category="s1" style={{ marginBottom: 10 }}>
        Backtracking Length
      </Text>
      <Select
        selectedIndex={selectedIndex}
        value={displayValue}
        onSelect={index => setSelectedIndex(index as IndexPath)}>
        <SelectItem title="14 Days" />
        <SelectItem title="7 Days" />
        <SelectItem title="3 days" />
      </Select>
      <Text category="h6" style={{ marginTop: 20 }}>
        1st Degree Contacts
      </Text>

      <View
        style={{
          backgroundColor: 'white',
          borderRadius: 10,
          marginTop: 10,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.22,
          shadowRadius: 2.22,

          elevation: 3,
          height: 400,
        }}>
        <StudentItem
          studentId="4300254691"
          studentName="Jesse Entro"
          avatar="https://jsartco.com/wp-content/uploads/2018/12/river-football-senior-900x525.jpg"
          contactText="4 Other Contacts"
        />
        <StudentItem
          studentId="4300215921"
          contactText="2 Other Contacts"
          studentName="Jeff Bezos"
          pillColor="#f39c12"
          avatar="https://cdn.britannica.com/s:300x300/56/199056-050-CCC44482/Jeff-Bezos-2017.jpg"
        />
        <StudentItem
          studentId="4300123512"
          studentName="Maurice Jeloknowitz"
          avatar="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS2W2hkzKbaJKK61pNdRULZmzam4RXmUXVGqA&usqp=CAU"
          pillColor="#2ecc71"
          contactText="1 Other Contact"
        />
        <StudentItem
          studentId="4300254691"
          studentName="Madison Altenez"
          pillColor="#3498db"
          contactText="No Other Contacts"
          avatar="https://www.pashabelmanphotography.com/wp-content/uploads/2017/04/24-20278-post/Stunning-West-Virginia-Senior-Pictures-and-ideas-Charleston-west-virginia-senior-in-South-Carolina-1(pp_w768_h1024).jpg"
          noBottomBorder
        />
      </View>

      <Text category="h6" style={{ marginTop: 20 }}>
        2nd Degree Contacts
      </Text>

      <View
        style={{
          backgroundColor: 'white',
          borderRadius: 10,
          marginTop: 10,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.22,
          shadowRadius: 2.22,

          elevation: 3,
          height: 400,
        }}>
        <StudentItem
          studentId="4300253521"
          studentName="Luther Lyons"
          avatar="https://bloximages.newyork1.vip.townnews.com/insightnews.com/content/tncms/assets/v3/editorial/2/1b/21ba5abe-564c-11e9-b735-1ff563da2be4/5ca5128b7774a.image.jpg"
          contactText="10 Other Contacts"
        />
        <StudentItem
          studentId="4300252452"
          studentName="Britney Robles"
          contactText="6 Other Contacts"
          avatar="https://images.squarespace-cdn.com/content/v1/535bee8de4b03ecd54f122ae/1503439470513-CCIVGGOCMB1FFFNWC84W/ke17ZwdGBToddI8pDm48kDbnpQxwQBixyvFpqjtuQgB7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1Ub56rFZG7Tc9F7DhkuUBDDKBauZ2oerGxQnFn7UYoWMwJilkUu7eIyBb-AQDEk_nZw/Pittsburgh+Rachel+Rossetti+High+School+Senior+Portrait+Photography_0165.jpg?format=2500w"
          pillColor="#f39c12"
        />
        <StudentItem
          studentId="4300164512"
          studentName="Bradlee Madden"
          contactText="6 Other Contacts"
          pillColor="#f39c12"
        />
        <StudentItem
          studentId="4300254691"
          studentName="Wilbur Sumner"
          avatar="https://www.morinstudio.com/wp-content/uploads/high-school-seniors.jpg"
          contactText="6 Other Contacts"
          pillColor="#f39c12"
          noBottomBorder
        />
      </View>

      <PrimaryButton
        text="Export Detailed Report"
        color="#2ecc71"
        onPress={() => {
          alert('A report has been sent to your email!');
        }}
      />
    </>
  );
};

const FakeLoadingStudentContactTracing = () => {
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => setLoaded(true), 2000);
  }, []);

  if (!loaded)
    return (
      <>
        <Text category="h5">Generating Report...</Text>

        <Spinner />
      </>
    );

  return <StudentContactTracing />;
};

export default FakeLoadingStudentContactTracing;
