import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import uuid from 'react-native-uuid';
import PhotoDetails from './PhotoDetails';

const PhotoContainer = ({ search }) => {
  const apikey = 'key=15982744-88484e136ae1603de7931f22c';
  const [photos, setPhotos] = useState([]);
  const [settings, setSettings] = useState({
    pageSize: 5,
    page: 1,
    loading: false,
    isLoadingNextPage: false,
    currentURL: 'https://pixabay.com/api/',
  });
  const fetchPhotos = loadType => {
    const page = loadType === 'nextPage' ? settings.page + 1 : settings.page;
    const searchQuery =
      search && search.trim() !== ''
        ? `&q=${search
            .trim()
            .toString()
            .replace(' ', '+')}`
        : '';
    const loading = !loadType;
    const isLoadingNextPage = loadType === 'nextPage';
    console.log(searchQuery);
    setSettings(current => ({
      ...current,
      loading,
      page,
      isLoadingNextPage,
    }));
    fetch(
      `${settings.currentURL}?${apikey}&order=popular&page=${page}
        &per_page=${settings.pageSize}${searchQuery}`,
    )
      .then(res => res.json())
      .then(data => {
        if (loadType === 'nextPage') {
          setPhotos(currentHits => [...currentHits, ...data.hits]);
        } else {
          setPhotos(data.hits);
        }
        setSettings(current => ({
          ...current,
          loading: false,
          isLoadingNextPage: false,
        }));
      });
  };
  useEffect(fetchPhotos, [search]);
  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.flatList}
        keyExtractor={item => uuid.v4() + item.id.toString()}
        data={photos}
        renderItem={({ item }) => {
          const { user, tags, webformatURL, views, favorites, likes } = item;
          return (
            <PhotoDetails
              photographer={user}
              tags={tags}
              photoURL={webformatURL}
              status={{
                views,
                favorites,
                likes,
              }}
            />
          );
        }}
        refreshControl={
          <RefreshControl
            refreshing={settings.loading}
            onRefresh={() => fetchPhotos()}
          />
        }
        onEndReachedThreshold={0.4}
        onEndReached={() => fetchPhotos('nextPage')}
        ListFooterComponent={() => {
          if (!settings.isLoadingNextPage) {
            return null;
          }
          return <ActivityIndicator style={styles.activityIndicator} />;
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 10,
    paddingBottom: 100,
  },
  flatList: {
    paddingBottom: 20,
  },
  activityIndicator: {
    color: '#000',
    marginBottom: 10,
  },
});
export default PhotoContainer;
