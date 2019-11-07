/* eslint-disable react/prop-types */
// eslint-disable-next-line import/no-unresolved
import { createDrawerNavigator, createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import { AllBooksTab, FictionBooksTab, NonfictionBooksTab } from ' components/book-type-tabs'

import BooksScreen from './src/book';
import AuthorsScreen from './src/author';

export const BookStack = createStackNavigator({
  Books: {
    screen: BooksScreen,
  },
});

export const AuthorStack = createStackNavigator({
  Authors: {
    screen: AuthorsScreen,
  },
});

export default createBottomTabNavigator({
  'All Books': AllBooksTab,
  Fiction: FictionBooksTab,
  Nonfiction: NonfictionBooksTab,
})

const App = createDrawerNavigator({
  Books: {
    screen: BookStack,
  },
  Authors: {
    screen: AuthorStack,
  },
});

export default App;
