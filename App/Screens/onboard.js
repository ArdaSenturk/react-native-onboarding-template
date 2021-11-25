import React, {useRef, useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import theme, {COLOR, SIZES} from '../Components/theme';
import Config from '../Config';
import Icon from 'react-native-vector-icons/Ionicons';

const Onboard = ({bgStyle}) => {
  const flatListRef = useRef();
  const [currentPage, setCurrentPage] = useState(0);
  const [viewableItems, setViewableItems] = useState([]);

  const handleViewableItemsChanged = useRef(({viewableItems}) => {
    setViewableItems(viewableItems);
  });

  useEffect(() => {
    if (!viewableItems[0] || currentPage === viewableItems[0].index) return;
    setCurrentPage(viewableItems[0].index);
  }, [viewableItems]);

  const handleNext = () => {
    if (currentPage == Config.length - 1) return;
    flatListRef.current.scrollToIndex({
      animated: true,
      index: currentPage + 1,
    });
  };

  const handleBack = () => {
    if (currentPage == 0) return;
    flatListRef.current.scrollToIndex({
      animated: true,
      index: currentPage - 1,
    });
  };

  const handleSkip = () => {
    if (currentPage == Config.length - 1) return;
    flatListRef.current.scrollToIndex({
      animated: true,
      index: Config.length - 1,
    });
  };

  const topSection = bgStyle => {
    return (
      <View style={[styles.sectionsContainer, bgStyle]}>
        {/*BACK BUTTON*/}
        <TouchableOpacity activeOpacity={0.6} onPress={handleBack}>
          <Icon
            name="chevron-back-outline"
            size={SIZES.base * 2.5}
            color={COLOR.primary}
            style={{opacity: currentPage == 0 ? 0 : 1}}
          />
        </TouchableOpacity>
        {/*SKIP BUTTON*/}
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={handleSkip}
          style={[
            styles.skipButton,
            styles.shadowStyle,
            {display: currentPage == Config.length - 1 ? 1 : 0},
          ]}>
          <Text
            style={{
              fontSize: SIZES.base * 2,
              color: COLOR.primary,
            }}>
            Skip
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const bottomSection = bgStyle => {
    return (
      <View style={[styles.sectionsContainer, bgStyle]}>
        {/*PAGINATION*/}
        <View style={{flexDirection: 'row'}}>
          {Config.map((item, index) => {
            return (
              <View
                style={[
                  styles.pagination,
                  styles.shadowStyle,
                  {
                    backgroundColor:
                      index === currentPage
                        ? COLOR.primary
                        : COLOR.primary + '20',
                  },
                ]}
              />
            );
          })}
        </View>
        {/*NEXT BUTTON*/}
        {currentPage !== Config.length - 1 ? (
          <TouchableOpacity
            onPress={handleNext}
            activeOpacity={0.6}
            style={[styles.getStartedButton, styles.shadowStyle]}>
            <Icon
              name="arrow-forward-outline"
              size={SIZES.base * 2}
              color={COLOR.lighter}
              style={{padding: 10}}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            activeOpacity={0.6}
            style={[styles.getStartedButton, styles.shadowStyle]}>
            <Text style={{fontSize: SIZES.base * 2.5, color: COLOR.lighter}}>
              Get Started
            </Text>
            <Icon
              name="chevron-forward-outline"
              size={SIZES.base * 2}
              color={COLOR.lighter}
            />
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const flatListRenderItem = ({item}) => {
    return (
      <View style={styles.container} key={item._id}>
        <ImageBackground
          resizeMode="contain"
          style={{width: SIZES.width, height: SIZES.width}}
          source={item.image}
        />
        <View
          style={{
            paddingHorizontal: SIZES.base * 4,
            marginVertical: SIZES.base * 4,
          }}>
          <Text
            style={[
              styles.title,
              {color: bgStyle.backgroundColor === '#222' ? '#f3f3f3' : '#222'},
            ]}>
            {item.title}
          </Text>
          <Text
            style={[
              styles.subTitle,
              {color: bgStyle.backgroundColor === '#222' ? '#f3f3f3' : '#222'},
            ]}>
            {item.subTitle}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={[styles.container, bgStyle]}>
      {/*Top Section - Back and Skip Button*/}
      {topSection(bgStyle)}
      {/*FLAT LIST with pages*/}
      <FlatList
        data={Config}
        renderItem={flatListRenderItem}
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item._id}
        ref={flatListRef}
        onViewableItemsChanged={handleViewableItemsChanged.current}
        viewabilityConfig={{viewAreaCoveragePercentThreshold: 100}}
        initialNumToRender={1}
        extraData={SIZES.width}
      />
      {/*Bottom Section - Pagination and Next Button*/}
      {bottomSection(bgStyle)}
    </View>
  );
};

export default Onboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionsContainer: {
    width: SIZES.width,
    height: 60,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 15,
  },
  skipButton: {
    backgroundColor: '#fefefe',
    borderRadius: 15,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  getStartedButton: {
    backgroundColor: COLOR.primary,
    borderRadius: 30,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shadowStyle: {
    shadowColor: COLOR.primary,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
  pagination: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLOR.primary,
    marginHorizontal: 2,
  },
  title: {
    fontSize: SIZES.base * 3,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: SIZES.base * 1.5,
    opacity: 0.4,
    textAlign: 'center',
    marginTop: 15,
    lineHeight: 28,
    width: (SIZES.width / 3) * 2,
  },
});
