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
const QuestionComment = ({
  data,
  timestamp,
  refreshMainPage,
}: any): React.JSX.Element => {
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
      <TouchableOpacity
        style={{
          ...UserBoxStyle.HeaderBox,
          marginTop: 20,
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
                name={writer?.gender}
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
            >
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-around',
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
                      color={isLiked ? '#2a6096' : 'lightgrey'}
                    />
                  </TouchableOpacity>
                  <Text style={{ fontWeight: 'bold', marginLeft: 5 }}>
                    {like}
                  </Text>
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
                      color={isDisliked ? '#d73c3c' : 'lightgrey'}
                    />
                  </TouchableOpacity>
                  <Text style={{ fontWeight: 'bold', marginLeft: 5 }}>
                    {dislike}
                  </Text>
                </View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                ></View>
              </View>
            </View>
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
        <MenuView
          title="Options"
          onPressAction={({ nativeEvent }) => {
            switch (JSON.parse(JSON.stringify(nativeEvent)).event) {
              case 'report':
                Alert.alert(
                  'Report Comment',
                  'Do you want to report this comment?',
                  [
                    {
                      text: 'Cancel',
                      style: 'destructive',
                    },
                    {
                      text: 'OK',
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
                  'Delete Comment',
                  'Do you want to delete this comment?',
                  [
                    {
                      text: 'Cancel',
                      style: 'destructive',
                    },
                    {
                      text: 'OK',
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
                    title: 'Delete',
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
                    title: 'Report',
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
          <TouchableOpacity onPress={() => {}}>
            <Ionicons name="ellipsis-vertical" size={20} color="grey" />
          </TouchableOpacity>
        </MenuView>
      </TouchableOpacity>
      <Text style={{ fontFamily: 'Rubik', marginBottom: 10, marginTop: 10 }}>
        {context}
      </Text>
    </View>
  );
};

export default React.memo(QuestionComment);
