import {StyleSheet} from 'react-native';
export const CommonStyle = StyleSheet.create({
  scrollView: {
    height: '100%',
    width: '100%',
  },
  mainContainer: {
    display: 'flex',
    height: '100%',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
  },
});

export const LoginPageStyle = StyleSheet.create({
  topBodyContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '50%',
    width: '100%',
    marginTop: '20%',
  },
  topBodyLogo: {
    width: '100%',
    height: '80%',
    marginRight: 20,
  },
  topBodyText: {
    height: '20%',
    fontSize: 50,
    fontWeight: 'bold',
    color: '#8672a5',
  },
  bottomBodyContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '30%',
    width: '100%',
  },
});

export const SocialButtonStyle = StyleSheet.create({
  Container: {
    width: '80%',
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  Image: {
    height: '100%',
    width: '70%',
  },
});

export const HomeScreenStyle = StyleSheet.create({
  SafeArea: {
    marginTop: 10,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  SafeAreaText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  Container: {
    marginTop: 10,
    width: '100%',
  },
  ScrollView: {
    width: '100%',
    marginBottom: 50,
  },
});

export const QuestionStyle = StyleSheet.create({
  Container: {
    marginBottom: 15,
    marginTop: 15,
    display: 'flex',
    width: '90%',
    height: 80,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    borderRadius: 12,
    shadowOpacity: 0.5,
    shadowRadius: 3,
    shadowOffset: {
      height: 6,
      width: 6,
    },
    elevation: 2,
  },
  IconContainer: {
    marginTop: 5,
    width: '100%',
    height: '50%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  IconTextContainer: {
    marginLeft: 5,
    fontWeight: '500',
    fontSize: 15,
    fontFamily: 'Rubik',
  },
  TextContainer: {
    width: '90%',
    height: '50%',
    marginLeft: 30,
    fontSize: 20,
    fontFamily: 'Rubik',
    color: 'black',
    fontWeight: '400',
  },
  TopIconWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flagContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export const QuestionDetailStyle = StyleSheet.create({
  SafeArea: {
    marginTop: 5,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  SafeAreaText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  Container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    height: '100%',
    width: '100%',
  },
  HeaderBox: {
    width: '85%',
    display: 'flex',
    flexDirection: 'row',
  },
  BottomBox: {
    width: '90%',
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 30,
  },
  CategoryBox: {
    marginLeft: 20,
  },
  Title: {
    width: '85%',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 15,
  },
  Content: {
    width: '85%',
    fontSize: 15,
    fontWeight: 'light',
    marginTop: 20,
  },
  ChooseBox: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    width: '80%',
    marginBottom: 20,
  },
  FilterBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  CommentContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '80%',
    marginTop: 10,
    marginBottom: 40,
  },
  ChartBox: {
    marginTop: 50,
    marginBottom: 50,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export const ChooseBoxStyle = StyleSheet.create({
  ChooseBoxButton: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    borderRadius: 10,
    height: 40,
    marginTop: 25,
  },
  ChooseBoxText: {
    marginLeft: 20,
    fontSize: 15,
    fontWeight: '500',
  },
});

export const FilterBoxStyle = StyleSheet.create({
  FilterBoxButton: {
    display: 'flex',
    justifyContent: 'center',
    width: '20%',
    borderRadius: 20,
    height: 40,
  },
  FilterBoxText: {
    fontWeight: '500',
    textAlign: 'center',
  },
});

export const ChartStyle = StyleSheet.create({
  StackBar: {
    display: 'flex',
    alignItems: 'center',
    color: 'black',
  },
});

export const SettingBlockStyle = StyleSheet.create({
  Container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 75,
    borderBottomEndRadius: 23,
    borderBottomWidth: 0.3,
    borderBottomStartRadius: 23,
  },
  TouchableOpacity: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  IconContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
  },
  IconText: {
    fontSize: 17,
  },
  Description: {
    marginRight: 20,
    color: '#7a7b7e',
  },
});

export const SettingPageStyle = StyleSheet.create({
  SafeArea: {
    width: '100%',
    height: '7%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 0.2,
  },
  SafeAreaText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  Container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    height: '100%',
    width: '100%',
  },
});

export const SettingCommonHeaderStyle = StyleSheet.create({
  SafeArea: {
    width: '100%',
    height: '7%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 0.2,
  },
  SafeAreaText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  scrollView: {
    height: '100%',
    width: '100%',
  },
  Container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    height: '100%',
    width: '100%',
  },
  BackButton: {
    marginLeft: 10,
    position: 'absolute',
    left: 0,
  },
});

export const RadioButtonStyle = StyleSheet.create({
  Container: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: 85,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomEndRadius: 23,
    borderBottomWidth: 0.3,
    borderBottomStartRadius: 23,
  },
  TouchableOpacity: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  IconContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
  },
  IconTextWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '60%',
    marginLeft: 20,
  },
  DescriptionText: {
    flexWrap: 'wrap',
    color: '#7a7b7e',
  },
  RadioButton: {
    marginRight: 20,
  },
});

export const UserBoxStyle = StyleSheet.create({
  HeaderBox: {
    width: '85%',
    display: 'flex',
    flexDirection: 'row',
  },
  UserBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  InfoBox: {
    display: 'flex',
    flexDirection: 'row',
  },
  TimeStamp: {
    fontWeight: '500',
    color: 'gray',
    marginLeft: 15,
  },
  IconWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 15,
  },
  IconText: {
    fontWeight: '500',
    fontFamily: 'Rubik',
  },
});

export const UserPageStyle = StyleSheet.create({
  Container: {
    display: 'flex',
    flexDirection: 'column',
    width: '95%',
    height: '80%',
    marginTop: 10,
  },
  SafeArea: {
    marginTop: 10,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  SafeAreaText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  UserInfoBox: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '40%',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  UserInnerBox: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    width: '90%',
    height: '90%',
  },
  UserText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  WrittenQuestionList: {
    display: 'flex',
    justifyContent: 'center',
    height: '20%',
  },
  CommentedQuestionList: {
    display: 'flex',
    justifyContent: 'center',
    height: '20%',
  },
  TextContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  Text: {
    color: '#7a7b7e',
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 10,
  },
});

export const CommentBoxStyle = StyleSheet.create({
  Container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: 120,
    height: 100,
    borderRadius: 10,
    marginRight: 20,
  },
  ViewContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '90%',
    height: '90%',
  },
  UserBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '40%',
  },
  Title: {
    display: 'flex',
    height: '60%',
  },
});

export const SearchScreenStyle = StyleSheet.create({
  Container: {
    display: 'flex',
    flexDirection: 'column',
    width: '95%',
    height: '80%',
    marginTop: 10,
  },
  SafeArea: {
    marginTop: 10,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  SafeAreaText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export const PostScreenStyle = StyleSheet.create({
  Container: {
    display: 'flex',
    flexDirection: 'column',
    width: '95%',
    height: '80%',
    marginTop: 10,
  },
  SafeArea: {
    marginTop: 10,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  SafeAreaText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  PostButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 65,
    height: 25,
    borderRadius: 10,
  },
  ScrollView: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 15,
    marginBottom: 15,
    height: '100%',
    width: '90%',
  },
  Text: {
    color: '#7a7b7e',
    fontSize: 15,
    fontWeight: 'bold',
  },
  CategoryTimeContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 200,
  },
  CategoryContainer: {
    display: 'flex',
    width: '50%',
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  TimeContainer: {
    display: 'flex',
    width: '50%',
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  Picker: {
    width: '100%',
    height: '85%',
  },
  TextContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 25,
  },
  AddButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 50,
    borderRadius: 10,
  },
  inputContainerStyle: {
    width: '100%',
    borderBottomWidth: 0,
    height: 50,
    borderRadius: 10,
  },
});
