import React from 'react';
import { Image, Text, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome5';

const PhotoDetails = props => {
  const {
    photographer,
    photoURL,
    tags,
    status: { views, favorites, likes },
  } = props;
  return (
    <View style={styles.container}>
      <Image
        style={styles.photo}
        source={{
          uri: photoURL,
        }}
      />
      <View style={styles.photoDetails}>
        <Text style={styles.photoText}>
          <Icon name="camera-retro" size={13} />
          &nbsp; {photographer}
        </Text>
      </View>
      <View style={styles.photoStatus}>
        <Text style={styles.statusText}>
          <Icon name="eye" size={14} />
          &nbsp; Views: {views}
        </Text>
        <Text style={styles.statusText}>
          <Icon name="star" size={14} />
          &nbsp; Favorites: {favorites}
        </Text>
        <Text style={styles.statusText}>
          <Icon name="heart" size={14} />
          &nbsp; Likes: {likes}
        </Text>
      </View>
      <View style={styles.photoTags}>
        {tags.split(',').map(tag => (
          <Text key={`${tag}${Math.random(1, 99)}`} style={styles.tags}>
            <Icon name="tag" size={10} />
            &nbsp;{tag}
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  photo: {
    width: '100%',
    height: 350,
  },
  photoDetails: {
    padding: 10,
  },
  photoText: {
    fontSize: 15,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  photoTags: {
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  photoStatus: {
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  statusText: {
    fontSize: 12,
  },
  tags: {
    backgroundColor: '#3498db',
    padding: 5,
    marginLeft: 2,
    marginRight: 2,
    borderRadius: 100 / 1,
    color: '#fff',
    fontSize: 10,
  },
});
export default PhotoDetails;
