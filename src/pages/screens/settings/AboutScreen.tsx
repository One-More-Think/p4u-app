import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import SettingCommonHeader from 'components/SettingCommonHeader';
import SettingBlock from 'components/SettingBlock';
import { CommonHeaderStyle } from 'screens/settings/style';
import { useSelector } from 'react-redux';

const AboutScreen = ({ route, navigation }: any): React.JSX.Element => {
  const { title } = route.params;
  const isDarkMode = useSelector((state: any) => state.user.darkmode);
  // const policyList = [
  //   {
  //     title: 'Privacy Policy',
  //     onPress: () =>
  //       navigation.navigate('PrivacyPolicyScreen', {
  //         title: 'Privacy Policy',
  //         navigation,
  //       }),
  //   },
  // ];
  const config = useSelector((state: any) => state.config.appInfo);
  return (
    <SettingCommonHeader title={title} navigation={navigation}>
      <View style={CommonHeaderStyle.Container}>
        <Text style={CommonHeaderStyle.ContainerText}>
          App Version {config.version}
        </Text>
        {/* {policyList.map((policy: any) => (
          <SettingBlock
            title={policy.title}
            key={policy.title}
            onPress={policy.onPress}
          />
        ))} */}
        <ScrollView
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '100%',
            marginLeft: 20,
            marginTop: 20,
          }}
        >
          <Text style={{ color: isDarkMode ? 'white' : 'dark' }}>
            <Text style={{ fontWeight: 'bold' }}>Terms & Conditions</Text>
            {'\n'}
            These terms and conditions apply to the P4U app (hereby referred to
            as "Application") for mobile devices that was created by Younghoon
            Yu (hereby referred to as "Service Provider") as a Free service.
            {'\n'}
            {'\n'}Upon downloading or utilizing the Application, you are
            automatically agreeing to the following terms. It is strongly
            advised that you thoroughly read and understand these terms prior to
            using the Application. Unauthorized copying, modification of the
            Application, any part of the Application, or our trademarks is
            strictly prohibited. Any attempts to extract the source code of the
            Application, translate the Application into other languages, or
            create derivative versions are not permitted. All trademarks,
            copyrights, database rights, and other intellectual property rights
            related to the Application remain the property of the Service
            Provider.{'\n'}
            {'\n'}The Service Provider is dedicated to ensuring that the
            Application is as beneficial and efficient as possible. As such,
            they reserve the right to modify the Application or charge for their
            services at any time and for any reason. The Service Provider
            assures you that any charges for the Application or its services
            will be clearly communicated to you.{'\n'}
            {'\n'}The Application stores and processes personal data that you
            have provided to the Service Provider in order to provide the
            Service. It is your responsibility to maintain the security of your
            phone and access to the Application. The Service Provider strongly
            advise against jailbreaking or rooting your phone, which involves
            removing software restrictions and limitations imposed by the
            official operating system of your device. Such actions could expose
            your phone to malware, viruses, malicious programs, compromise your
            phone's security features, and may result in the Application not
            functioning correctly or at all.{'\n'}
            {'\n'}
            <Text style={{ fontWeight: 'bold' }}>
              Location-Based Information
            </Text>
            {'\n'}
            The Application collects and uses location-based information to
            enhance user experience and provide location-specific services. This
            may include approximate or precise location data obtained via GPS,
            Wi-Fi, or mobile networks. The Service Provider ensures that such
            data is handled in compliance with privacy regulations and is not
            shared with unauthorized third parties. Users can disable location
            services in their device settings if they do not wish to share
            location data.
            {'\n'}
            {'\n'}
            <Text style={{ fontWeight: 'bold' }}>Youth Protection Policy</Text>
            {'\n'}
            The Service Provider is committed to ensuring a safe and appropriate
            experience for users of all ages. If the Application is used by
            minors, it is recommended that parents or guardians supervise their
            usage. The Application does not knowingly collect personal
            information from children under the age of 13 without parental
            consent. If a parent or guardian discovers that their child has
            provided personal data without consent, they should contact the
            Service Provider immediately to remove the information. The Service
            Provider reserves the right to restrict access to certain features
            to ensure the safety of young users. Please note that the
            Application utilizes third-party services that have their own Terms
            and Conditions. Below are the links to the Terms and Conditions of
            the third-party service providers used by the Application:{'\n'}
            {'\n'}* Google Login Services{'\n'}* Apple Login Services{'\n'}*
            AdMob
            {'\n'}
            {'\n'}Please be aware that the Service Provider does not assume
            responsibility for certain aspects. Some functions of the
            Application require an active internet connection, which can be
            Wi-Fi or provided by your mobile network provider. The Service
            Provider cannot be held responsible if the Application does not
            function at full capacity due to lack of access to Wi-Fi or if you
            have exhausted your data allowance.{'\n'}
            {'\n'}If you are using the application outside of a Wi-Fi area,
            please be aware that your mobile network provider's agreement terms
            still apply. Consequently, you may incur charges from your mobile
            provider for data usage during the connection to the application, or
            other third-party charges. By using the application, you accept
            responsibility for any such charges, including roaming data charges
            if you use the application outside of your home territory (i.e.,
            region or country) without disabling data roaming. If you are not
            the bill payer for the device on which you are using the
            application, they assume that you have obtained permission from the
            bill payer.{'\n'}
            {'\n'}Similarly, the Service Provider cannot always assume
            responsibility for your usage of the application. For instance, it
            is your responsibility to ensure that your device remains charged.
            If your device runs out of battery and you are unable to access the
            Service, the Service Provider cannot be held responsible.{'\n'}
            {'\n'}In terms of the Service Provider's responsibility for your use
            of the application, it is important to note that while they strive
            to ensure that it is updated and accurate at all times, they do rely
            on third parties to provide information to them so that they can
            make it available to you. The Service Provider accepts no liability
            for any loss, direct or indirect, that you experience as a result of
            relying entirely on this functionality of the application.{'\n'}
            {'\n'}The Service Provider may wish to update the application at
            some point. The application is currently available as per the
            requirements for the operating system (and for any additional
            systems they decide to extend the availability of the application
            to) may change, and you will need to download the updates if you
            want to continue using the application. The Service Provider does
            not guarantee that it will always update the application so that it
            is relevant to you and/or compatible with the particular operating
            system version installed on your device. However, you agree to
            always accept updates to the application when offered to you. The
            Service Provider may also wish to cease providing the application
            and may terminate its use at any time without providing termination
            notice to you. Unless they inform you otherwise, upon any
            termination, (a) the rights and licenses granted to you in these
            terms will end; (b) you must cease using the application, and (if
            necessary) delete it from your device.{'\n'}
            {'\n'}
            <Text style={{ fontWeight: 'bold' }}>
              Changes to These Terms and Conditions
            </Text>
            {'\n'}The Service Provider may periodically update their Terms and
            Conditions. Therefore, you are advised to review this page regularly
            for any changes. The Service Provider will notify you of any changes
            by posting the new Terms and Conditions on this page.{'\n'}
            {'\n'}These terms and conditions are effective as of 2025-02-22
            {'\n'}
            {'\n'}
            <Text style={{ fontWeight: 'bold' }}>Contact Us</Text>
            {'\n'}If you have any questions or suggestions about the Terms and
            Conditions, please do not hesitate to contact the Service Provider
            at 0623hoon@gmail.com.
          </Text>
        </ScrollView>
      </View>
    </SettingCommonHeader>
  );
};

export default React.memo(AboutScreen);
