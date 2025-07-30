import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity, Platform, Alert } from 'react-native';
import { UserBoxStyle } from 'style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CountryFlag from 'components/CountryFlag';
import { useNavigation } from '@react-navigation/native';
import store from 'reducers/index';
import {
  DeleteComment,
  LikeComment,
  ReportComment,
} from 'reducers/actions/UserAction';
import { MenuView } from '@react-native-menu/menu';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
const QuestionComment = ({
  data,
  timestamp,
  refreshMainPage,
}: any): React.JSX.Element => {
  const { t } = useTranslation();
  const navigation: any = useNavigation();
  const { id, writer, context, like, dislike, isLiked, isDisliked } = data;
  const userInfo = useSelector((state: any) => state.user.userInfo);

  const GenderColor = (gender: string) => {
    if (gender === 'male') return '#7dc9e0';
    else if (gender === 'female') return '#ee92ba';
    return 'gray';
  };
  const handleLikeComment = useCallback(async () => {
    await store.dispatch(LikeComment(id, 'isLike'));
    await refreshMainPage();
  }, []);

  const handleReportComment = useCallback(async () => {
    await store.dispatch(LikeComment(id, 'isDislike'));
    await refreshMainPage();
  }, []);

  const handleDeleteComment = useCallback(async () => {
    await store.dispatch(DeleteComment(id));
    await refreshMainPage();
  }, []);
  return (
    <View
      style={{
        borderBottomWidth: 0.2,
      }}
    >
      <View
        style={{
          ...UserBoxStyle.HeaderBox,
          marginTop: 20,
        }}
      >
        <TouchableOpacity
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: '65%',
          }}
          onPress={() =>
            navigation.navigate('UserDetailScreen', {
              userId: writer?.id,
            })
          }
        >
          <CountryFlag
            isoCode={writer?.country}
            size={20}
            style={{ borderWidth: 0.5, borderColor: 'black' }}
          />

          <View style={UserBoxStyle.UserBox}>
            <View style={UserBoxStyle.InfoBox}>
              <View style={UserBoxStyle.IconWrapper}>
                <Ionicons
                  name={writer.gender === 'none' ? 'remove' : writer.gender}
                  color={GenderColor(writer?.gender)}
                  size={18}
                />
              </View>
              <View style={UserBoxStyle.IconWrapper}>
                <Ionicons name="accessibility" size={15} color="#222428" />
                <Text
                  style={{
                    ...UserBoxStyle.IconText,
                    color: '#222428',
                    fontSize: 12,
                  }}
                >
                  {writer?.age}
                </Text>
              </View>
              <View style={UserBoxStyle.IconWrapper}>
                <Ionicons name="bag" size={13} color="#9a7969" />
                <Text
                  style={{
                    ...UserBoxStyle.IconText,
                    maxWidth: 80,
                    flexWrap: 'wrap',
                    color: '#222428',
                    fontSize: 10,
                  }}
                >
                  {writer?.occupation}
                </Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  right: 0,
                  width: '35%',
                }}
              ></View>
            </View>
            <Text
              style={{
                ...UserBoxStyle.TimeStamp,
                fontSize: 9,
              }}
            >
              {timestamp}
            </Text>
          </View>
        </TouchableOpacity>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            width: '35%',
          }}
        >
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
              width: '85%',
            }}
          >
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <TouchableOpacity onPress={handleLikeComment}>
                <Ionicons
                  name="thumbs-up-sharp"
                  size={20}
                  color={isLiked ? '#3d85c6' : 'lightgrey'}
                />
              </TouchableOpacity>
              <Text style={{ fontWeight: 'bold', marginLeft: 5 }}>{like}</Text>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <TouchableOpacity onPress={handleReportComment}>
                <Ionicons
                  name="thumbs-down-sharp"
                  size={20}
                  color={isDisliked ? '#df6262' : 'lightgrey'}
                />
              </TouchableOpacity>
              <Text style={{ fontWeight: 'bold', marginLeft: 5 }}>
                {dislike}
              </Text>
            </View>
          </View>
          <MenuView
            style={{ width: '15%' }}
            title={t('Options')}
            onPressAction={({ nativeEvent }) => {
              switch (JSON.parse(JSON.stringify(nativeEvent)).event) {
                case 'report':
                  Alert.alert(
                    t('Report_Comment'),
                    t('Report_Comment_message'),
                    [
                      {
                        text: t('Cancel'),
                        style: 'destructive',
                      },
                      {
                        text: t('OK'),
                        onPress: async () =>
                          await store.dispatch(ReportComment(id)),
                      },
                    ]
                  );
                  break;
                  // case 'edit':
                  //   break;
                  // case 'share':
                  break;
                case 'delete':
                  Alert.alert(
                    t('Delete_Comment'),
                    t('Delete_Comment_message'),
                    [
                      {
                        text: t('Cancel'),
                        style: 'destructive',
                      },
                      {
                        text: t('OK'),
                        onPress: () => handleDeleteComment(),
                      },
                    ]
                  );
                  break;
              }
            }}
            actions={
              writer.id === userInfo.id
                ? [
                    // {
                    //   id: 'edit',
                    //   title: 'Edit',
                    //   titleColor: '#2367A2',
                    //   image: Platform.select({
                    //     ios: 'pencil',
                    //     android: 'ic_menu_pencil',
                    //   }),
                    //   imageColor: '#2367A2',
                    // },
                    // {
                    //   id: 'share',
                    //   title: 'Share',
                    //   titleColor: '#46F289',
                    //   image: Platform.select({
                    //     ios: 'square.and.arrow.up',
                    //     android: 'ic_menu_share',
                    //   }),
                    //   imageColor: '#46F289',
                    // },
                    {
                      id: 'delete',
                      title: t('Delete'),
                      attributes: {
                        destructive: true,
                      },
                      image: Platform.select({
                        ios: 'trash',
                        android: 'ic_menu_delete',
                      }),
                    },
                  ]
                : [
                    // {
                    //   id: 'share',
                    //   title: 'Share',
                    //   titleColor: '#46F289',
                    //   image: Platform.select({
                    //     ios: 'square.and.arrow.up',
                    //     android: 'ic_menu_share',
                    //   }),
                    //   imageColor: '#46F289',
                    // },
                    {
                      id: 'report',
                      title: t('Report'),
                      image: Platform.select({
                        ios: 'flag',
                        android: 'ic_menu_report_image',
                      }),
                      imageColor: 'red',
                    },
                  ]
            }
            shouldOpenOnLongPress={false}
          >
            <Ionicons name="ellipsis-vertical" size={20} color="grey" />
          </MenuView>
        </View>
      </View>
      <Text style={{ fontFamily: 'Rubik', marginBottom: 10, marginTop: 10 }}>
        {context}
      </Text>
    </View>
  );
};

export default React.memo(QuestionComment);
