import React from 'react';
import { View, Text, Platform, StyleSheet } from 'react-native';

const Header = props => {
  const { title } = props;
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};
const marginTop = Platform.OS === 'android' ? 0 : 20;
const styles = StyleSheet.create({
  header: {
    marginTop,
    backgroundColor: '#34495e',
    paddingTop: 15,
    paddingBottom: 15,
  },
  title: {
    color: '#fff',
    fontSize: 22,
    textAlign: 'center',
  },
});

export default Header;
