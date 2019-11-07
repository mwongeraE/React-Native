/* eslint-disable react/prop-types */
/* eslint-disable import/no-unresolved */
import React from 'react';
import { View, Button } from 'react-native';

// eslint-disable-next-line react/prop-types
const BooksScreen = ({ navigation }) => (
  <View>
    <Button
      // eslint-disable-next-line react/prop-types
      onPress={() => navigation.navigate('Authors')}
      title="Go to Authors"
    />

    <Button onPress={() => navigation.openDrawer()} title="Open Drawer" />
  </View>
);

let store = null

export default () => {
    if (store) return store

    store = BookStore.create({ books: {} })
    return store
}

.view(self => ({
    get api() {
        return getEnv(self).api
    },
}))