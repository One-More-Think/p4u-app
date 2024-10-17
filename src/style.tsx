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
  Container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    height: '100%',
    width: '100%',
  },
  ScrollView: {
    width: '100%',
    height: '100%',
  },
});

export const QuestionStyle = StyleSheet.create({
  Container: {
    marginBottom: 30,
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
    marginTop: 30,
    height: '100%',
    width: '100%',
  },
  HeaderBox: {
    width: '85%',
    display: 'flex',
    flexDirection: 'row',
    // backgroundColor: 'red',
  },
  BottomBox: {
    width: '85%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'red',
  },
  UserBox: {
    display: 'flex',
    flexDirection: 'column',
  },
  CategoryBox: {
    marginLeft: 20,
  },
  InfoBox: {
    display: 'flex',
    flexDirection: 'row',
  },
  TimeStamp: {
    fontSize: 12,
    fontWeight: '500',
    color: 'gray',
    marginLeft: 15,
  },
  Title: {
    width: '85%',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 15,
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
    fontSize: 15,
    fontFamily: 'Rubik',
  },
});
