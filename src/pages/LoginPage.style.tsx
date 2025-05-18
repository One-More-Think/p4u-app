import { StyleSheet } from 'react-native';

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
    fontFamily: 'lucida grande',
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

export const ModalStyle = StyleSheet.create({
  Container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: -10,
  },
  SubContainer: {
    display: 'flex',
    backgroundColor: 'white',
    width: '90%',
    height: '65%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 5,
  },
});
