import React, { useCallback, useMemo, useState } from 'react';
import {
  Alert,
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Common from 'components/Common';
import { PostScreenStyle } from 'style';
import { useSelector } from 'react-redux';
import {
  BannerAd,
  TestIds,
  BannerAdSize,
} from 'react-native-google-mobile-ads';
import { Picker } from '@react-native-picker/picker';
import { Input, Icon } from '@rneui/themed';
import store from 'reducers/index';
import { PostQuestion } from 'reducers/actions/UserAction';

const PostPage = ({ navigation }: any): React.JSX.Element => {
  const [category, setCategory] = useState<string>('');
  const [time, setTime] = useState<string>('none');
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [option, setOption] = useState<string[]>([]);
  const isDarkMode = useSelector((state: any) => state.user.darkmode);
  const handleSubmit = useCallback(async () => {
    const hasSavedChanges: boolean = Boolean(
      category &&
        time !== 'none' &&
        title &&
        description &&
        option.length > 0 &&
        option.every((opt) => opt.trim() !== '')
    );

    if (hasSavedChanges) {
      const post_data = {
        category,
        title,
        time,
        description,
        option,
      };
      store.dispatch(PostQuestion(post_data));
    } else {
      Alert.alert('Please fill out every options', '', [
        { text: 'OK', style: 'cancel' },
      ]);
    }
  }, [category, time, title, description, option]);

  const onCategory = useCallback(
    (text: string) => {
      setCategory(text);
    },
    [category]
  );
  const onTime = useCallback(
    (text: string) => {
      setTime(text);
    },
    [time]
  );

  const onTitle = useCallback(
    (text: string) => {
      setTitle(text);
    },
    [time]
  );

  const onDescription = useCallback(
    (text: string) => {
      setDescription(text);
    },
    [time]
  );

  const handleAddOption = useCallback(() => {
    setOption((prev) => [...prev, '']);
  }, [option]);

  const handleClose = useCallback(() => {
    const hasUnsavedChanges: boolean = Boolean(
      category || time !== 'none' || title || description || option.length
    );

    if (hasUnsavedChanges) {
      Alert.alert(
        'Discard changes?',
        'You have unsaved changes. Are you sure to discard them and leave the screen?',
        [
          { text: "Don't leave", style: 'cancel' },
          {
            text: 'Discard',
            style: 'destructive',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } else {
      navigation.goBack();
    }
  }, [category, time, title, description, option]);

  const handleRemoveOption = useCallback(
    (index: number) => {
      setOption((prev) => prev.filter((_, idx) => idx !== index));
    },
    [option]
  );

  const handleUpdateOption = useCallback((index: number, newValue: string) => {
    setOption((prev) => {
      const updatedOptions = [...prev];
      updatedOptions[index] = newValue;
      return updatedOptions;
    });
  }, []);

  const handleClearOption = useCallback((index: number) => {
    setOption((prev) => {
      const clearOptions = [...prev];
      clearOptions[index] = '';
      return clearOptions;
    });
  }, []);

  const categoryList = useMemo(() => {
    return ['Living', 'Career', 'Food', 'RelationShip'];
  }, []);

  const timeList = useMemo(() => {
    return ['none', '5 min', '30 min', '1 hr', '1 day'];
  }, []);

  return (
    <Common style={{ backgroundColor: isDarkMode ? '#222428' : '#e1e9fc' }}>
      <SafeAreaView style={PostScreenStyle.SafeArea}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={isDarkMode ? '#222428' : 'white'}
        />
        <TouchableOpacity
          style={{ position: 'absolute', left: 0, marginLeft: 20 }}
          onPress={handleClose}
        >
          <Ionicons name="close" size={30} color="gray" />
        </TouchableOpacity>
        <Text
          style={{
            ...PostScreenStyle.SafeAreaText,
            color: isDarkMode ? 'white' : '#222428',
          }}
        >
          Post
        </Text>
        <TouchableOpacity
          style={{ position: 'absolute', right: 0, marginRight: 20 }}
          onPress={handleSubmit}
        >
          <View
            style={{
              ...PostScreenStyle.PostButton,
              backgroundColor: '#8672a5',
            }}
          >
            <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'white' }}>
              Post
            </Text>
          </View>
        </TouchableOpacity>
      </SafeAreaView>
      <ScrollView style={PostScreenStyle.ScrollView}>
        <View style={PostScreenStyle.CategoryTimeContainer}>
          <View style={PostScreenStyle.CategoryContainer}>
            <Text
              style={{
                ...PostScreenStyle.Text,
                height: '15%',
              }}
            >
              Category
            </Text>
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-evenly',
                height: '85%',
              }}
            >
              {categoryList.map((item: any) => (
                <TouchableOpacity
                  onPress={() => onCategory(item)}
                  key={item}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '80%',
                  }}
                >
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 13,
                      color: isDarkMode ? 'white' : '#222428',
                    }}
                  >
                    {item}
                  </Text>
                  {category === item ? (
                    <Ionicons
                      name="radio-button-on"
                      size={30}
                      style={{ color: isDarkMode ? 'white' : '#222428' }}
                    />
                  ) : (
                    <Ionicons
                      name="radio-button-off"
                      size={30}
                      style={{ color: isDarkMode ? 'white' : '#222428' }}
                    />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <View style={PostScreenStyle.TimeContainer}>
            <Text
              style={{
                ...PostScreenStyle.Text,
                height: '15%',
              }}
            >
              Time
            </Text>
            <Picker
              onValueChange={(itemValue) => onTime(itemValue)}
              selectedValue={time}
              style={PostScreenStyle.Picker}
            >
              {timeList.map((item: any) => (
                <Picker.Item
                  label={item}
                  value={item}
                  key={time}
                  color={
                    Platform.OS === 'android'
                      ? '#7a7b7e'
                      : isDarkMode
                      ? 'white'
                      : '#222428'
                  }
                />
              ))}
            </Picker>
          </View>
        </View>
        <Text
          style={{ ...PostScreenStyle.Text, marginTop: 10, marginBottom: 10 }}
        >
          Title
        </Text>
        <Input
          placeholder="Title"
          placeholderTextColor={isDarkMode ? 'white' : '#222428'}
          inputStyle={{
            ...PostScreenStyle.TextContainer,
            color: isDarkMode ? 'white' : '#222428',
          }}
          inputContainerStyle={{
            ...PostScreenStyle.inputContainerStyle,
            height: 50,
            borderRadius: 10,
            backgroundColor: isDarkMode ? '#70747e' : 'white',
          }}
          scrollEnabled={false}
          onChangeText={(text) => onTitle(text)}
          leftIconContainerStyle={{
            position: 'absolute',
            left: 0,
          }}
          leftIcon={
            title ? (
              <Ionicons
                name="close-circle"
                onPress={() => setTitle('')}
                size={20}
                color={isDarkMode ? '#222428' : 'gray'}
              />
            ) : undefined
          }
          value={title}
        />
        <Text
          style={{ ...PostScreenStyle.Text, marginTop: 10, marginBottom: 10 }}
        >
          Description
        </Text>
        <Input
          placeholder="Description"
          multiline
          leftIconContainerStyle={{
            position: 'absolute',
            left: 0,
            top: -8,
          }}
          leftIcon={
            description ? (
              <Ionicons
                name="close-circle"
                onPress={() => setDescription('')}
                size={20}
                color={isDarkMode ? '#222428' : 'gray'}
              />
            ) : undefined
          }
          placeholderTextColor={isDarkMode ? 'white' : '#222428'}
          inputStyle={{
            ...PostScreenStyle.TextContainer,
            color: isDarkMode ? 'white' : '#222428',
          }}
          inputContainerStyle={{
            ...PostScreenStyle.inputContainerStyle,
            height: 100,
            backgroundColor: isDarkMode ? '#70747e' : 'white',
            flexWrap: 'wrap',
          }}
          value={description}
          onChangeText={(text) => onDescription(text)}
        />
        <Text
          style={{ ...PostScreenStyle.Text, marginTop: 10, marginBottom: 10 }}
        >
          Options
        </Text>
        {option.map((item, idx) => (
          <Input
            scrollEnabled={false}
            key={`option-${idx}`}
            placeholder={`Option ${idx + 1}`}
            multiline
            placeholderTextColor={isDarkMode ? 'white' : '#222428'}
            inputStyle={{
              ...PostScreenStyle.TextContainer,
              paddingVertical: 15,
              color: isDarkMode ? 'white' : '#222428',
            }}
            inputContainerStyle={{
              ...PostScreenStyle.inputContainerStyle,
              backgroundColor: isDarkMode ? '#70747e' : 'white',
            }}
            leftIconContainerStyle={{
              position: 'absolute',
              left: 0,
            }}
            value={option[idx]}
            onChangeText={(text) => handleUpdateOption(idx, text)}
            leftIcon={
              option[idx] ? (
                <Ionicons
                  name="close-circle"
                  onPress={() => handleClearOption(idx)}
                  size={20}
                  color={isDarkMode ? '#222428' : 'gray'}
                />
              ) : undefined
            }
            rightIcon={
              <Icon
                name="close"
                type="material"
                color="#e06666"
                onPress={() => handleRemoveOption(idx)}
              />
            }
          />
        ))}
        {option.length < 3 && (
          <TouchableOpacity
            onPress={handleAddOption}
            style={{
              ...PostScreenStyle.AddButton,
              backgroundColor: isDarkMode ? '#70747e' : 'white',
            }}
          >
            <Ionicons
              name="add-circle"
              size={40}
              color={isDarkMode ? '#222428' : '#70747e'}
            />
          </TouchableOpacity>
        )}
      </ScrollView>
      <BannerAd
        unitId={TestIds.BANNER}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
      />
    </Common>
  );
};

export default React.memo(PostPage);
