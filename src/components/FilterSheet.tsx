import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SearchBar } from '@rneui/themed';
import CountryBox, { countryCodes } from './CountryBox';
import store from 'reducers/index';
import { GetQuestions } from 'reducers/actions/UserAction';
import { useTranslation } from 'react-i18next';

const FilterSheet = ({ bottomSheetRef, setData }: any): React.JSX.Element => {
  enum CategoryEnum {
    'Living' = 0,
    'Career' = 1,
    'Food' = 2,
    'RelationShip' = 3,
  }
  const { t, i18n } = useTranslation();
  const isDarkMode = useSelector((state: any) => state.user.darkmode);
  const snapPoints = useMemo<string[]>(() => ['65%'], []);
  const [filter, setFilter] = useState<string>('Category');
  const [category, setCategory] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [sort, setSort] = useState<string>('');
  const [country, setCountry] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const [selected, setSelected] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);

  const FilterList = useMemo<string[]>(
    () => ['Category', 'Age', 'Country', 'Gender'], // Sort next release
    []
  );
  const CategoryList = useMemo<string[]>(
    () => ['Living', 'Career', 'Food', 'RelationShip'],
    []
  );
  const AgeList = useMemo<string[]>(
    () => ['10s', '20s', '30s', '40s', '50s'],
    []
  );
  // const SortList = useMemo<string[]>(
  //   () => ['Recent', 'View', 'Comment', 'Progress'],
  //   []
  // );
  const GenderList = useMemo<string[]>(() => ['Male', 'Female', 'None'], []);
  const onFilter = useCallback(
    (item: any) => {
      setFilter(item);
    },
    [filter]
  );

  const handleSearch = useCallback((text: string) => {
    setSearch(text);
  }, []);

  const onCategory = useCallback(
    (item: string) => {
      setCategory(item);
    },
    [category]
  );
  const onAge = useCallback(
    (item: string) => {
      setAge(item);
    },
    [age]
  );
  const onGender = useCallback(
    (item: string) => {
      setGender(item);
    },
    [gender]
  );
  const onCountry = useCallback(
    (item: string) => {
      setCountry(item);
    },
    [country]
  );
  const onSort = useCallback(
    (item: string) => {
      setSort(item);
    },
    [sort]
  );
  const handleCloseModal = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);

  const filterCountry = useCallback(
    (country: string) => {
      return (
        countryCodes.find((item: any) =>
          Object.values(item).includes(country)
        ) &&
        Object.keys(
          countryCodes.find((item: any) =>
            Object.values(item).includes(country)
          )!
        )[0]
      );
    },
    [country]
  );

  const handleFilter = async () => {
    // dispatch search from api
    bottomSheetRef.current?.close();
    const categoryNumber = CategoryEnum[category as keyof typeof CategoryEnum];
    const countryCode = filterCountry(country);
    const questions = await store.dispatch(
      GetQuestions(
        currentPage,
        null,
        categoryNumber || null,
        sort || null,
        age || null,
        gender || null,
        country ? countryCode.toLowerCase() : null
      )
    );
    setData(questions);
  };
  const FilterBox = (
    filterList: string[],
    action: any,
    onChange: any
  ): React.JSX.Element => {
    return (
      <>
        {filterList.map((item: string) => (
          <TouchableOpacity
            onPress={() => onChange(item)}
            key={item}
            style={{
              display: 'flex',
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: isDarkMode ? 'white' : '#222428',
              }}
            >
              {t(item)}
            </Text>
            {action === item ? (
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
      </>
    );
  };
  const FilterDetail = useMemo((): React.JSX.Element => {
    switch (filter) {
      case 'Category':
        return FilterBox(CategoryList, category, onCategory);
      // case 'Sort':
      //   return FilterBox(SortList, sort, onSort);
      case 'Age':
        return FilterBox(AgeList, age, onAge);
      case 'Country':
        return (
          <>
            <SearchBar
              round
              placeholder={`${t('Search')}`}
              cancelButtonTitle="Cancel"
              containerStyle={{
                backgroundColor: '#0000',
                borderTopWidth: 0,
                borderBottomWidth: 0,
              }}
              inputContainerStyle={{
                display: 'flex',
                height: 40,
                backgroundColor: isDarkMode ? '#4e4f52' : '#e1e9fc',
              }}
              onChangeText={(text) => handleSearch(text)}
              value={search}
            />
            <CountryBox
              country={country}
              search={search}
              onCountry={onCountry}
            />
          </>
        );
      case 'Gender':
        return FilterBox(GenderList, gender, onGender);
      default:
        return <></>;
    }
  }, [
    filter,
    category,
    country,
    age,
    gender,
    sort,
    isDarkMode,
    search,
    i18n.language,
  ]);
  const renderItem = useCallback(
    ({ item }: any) => (
      <View
        style={{
          width: '100%',
          borderBottomWidth: 0.2,
          borderColor: isDarkMode ? 'white' : '#222428',
          height: 50,
        }}
      >
        <TouchableOpacity
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
          }}
          onPress={() => onFilter(item)}
        >
          <Text
            style={{
              textAlign: 'center',
              fontSize: 15,
              fontWeight: 'bold',
              color: isDarkMode
                ? filter === item
                  ? 'white'
                  : '#70747e'
                : filter === item
                ? '#2d2e32'
                : '#cad1e2',
            }}
          >
            {t(item)}
          </Text>
        </TouchableOpacity>
      </View>
    ),
    [isDarkMode, filter, i18n.language]
  );

  const handleReset = useCallback(() => {
    setFilter('Category');
    setCategory('');
    setAge('');
    setGender('');
    setCountry('');
    setSort('');
    setSearch('');
    setSelected(0);
  }, []);

  useEffect(() => {
    const selectedCount = [category, age, gender, country, sort].filter(
      (value) => value !== ''
    ).length;
    setSelected(selectedCount);
  }, [category, age, gender, country, sort]);
  return (
    <BottomSheet
      backgroundStyle={{ backgroundColor: isDarkMode ? '#222428' : 'white' }}
      snapPoints={snapPoints}
      ref={bottomSheetRef}
      index={-1}
      onChange={() => handleReset()}
      enablePanDownToClose
    >
      <BottomSheetView
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '92%',
        }}
      >
        <BottomSheetView
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderBottomWidth: 0.2,
            borderBottomColor: isDarkMode ? 'white' : '#222428',
            height: '10%',
            width: '100%',
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: isDarkMode ? 'white' : '#222428',
              marginLeft: 20,
            }}
          >
            {t('Filter')}
          </Text>
          <TouchableOpacity
            style={{ marginRight: 20 }}
            onPress={handleCloseModal}
          >
            <Ionicons name="close-circle" size={20} color="gray" />
          </TouchableOpacity>
        </BottomSheetView>
        <BottomSheetView
          style={{
            display: 'flex',
            flexDirection: 'row',
            height: '75%',
          }}
        >
          <BottomSheetView
            style={{
              width: '30%',
              borderRightColor: isDarkMode ? 'white' : '#222428',
              borderRightWidth: 0.2,
            }}
          >
            <FlatList
              data={FilterList}
              renderItem={renderItem}
              keyExtractor={(item) => item}
              showsVerticalScrollIndicator={false}
            />
          </BottomSheetView>
          <BottomSheetView
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '70%',
            }}
          >
            <BottomSheetView
              style={{
                display: 'flex',
                width: '90%',
                height: '90%',
                flexDirection: 'column',
                justifyContent: 'space-evenly',
              }}
            >
              {FilterDetail}
            </BottomSheetView>
          </BottomSheetView>
        </BottomSheetView>
        <BottomSheetView
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            width: '100%',
            height: '15%',
            borderTopWidth: 0.2,
            borderColor: isDarkMode ? 'white' : '#222428',
          }}
        >
          <TouchableOpacity
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '30%',
              height: '50%',
              backgroundColor: isDarkMode ? 'white' : '#e1e9fc',
              borderRadius: 10,
            }}
            onPress={handleReset}
          >
            <Text
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                color: '#222428',
              }}
            >
              {t('Reset')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleFilter}
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              width: '30%',
              height: '50%',
              backgroundColor: isDarkMode ? 'white' : '#e1e9fc',
              borderRadius: 10,
            }}
          >
            <Text
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                width: '15%',
                backgroundColor: '#e06666',
                textAlign: 'center',
                color: isDarkMode ? 'white' : '#222428',
                marginRight: 5,
              }}
            >
              {selected}
            </Text>
            <Text
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                color: '#222428',
              }}
            >
              {t('Filter')}
            </Text>
          </TouchableOpacity>
        </BottomSheetView>
      </BottomSheetView>
    </BottomSheet>
  );
};

export default FilterSheet;
