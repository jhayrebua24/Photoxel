import React, { useState } from 'react';
import { SafeAreaView, TextInput, StyleSheet } from 'react-native';
import Header from './components/Header';
import PhotoContainer from './components/PhotoContainer';

const App = () => {
  const [search, setSearch] = useState('');
  return (
    <SafeAreaView style={styles.container}>
      <Header title="PhotoXel" />
      <TextInput
        onSubmitEditing={e => setSearch(e.nativeEvent.text)}
        style={styles.searchBox}
        placeholder="Search photos"
      />
      <PhotoContainer search={search} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
  },
  searchBox: {
    padding: 15,
    fontSize: 18,
    backgroundColor: '#fff',
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 3,
  },
});

export default App;
