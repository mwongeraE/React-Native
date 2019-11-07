// Enzyme and snapshot tests for our title Component

import React from 'react';
import { shallow } from 'enzyme';
import Title from '../Title.test';

it('renders correctly', () => {
  const wrapper = shallow(<Title text="sample text" />);
  expect(wrapper).toMatchSnapshot();

  expect(wrapper.prop('accessible')).toBe(true);
  expect(wrapper.prop('style')).toEqual({
    backgroundColor: '#434343',
    color: '#fff',
    fontSize: 20,
    marginTop: 20,
    padding: 20,
    textAlign: 'center',
  });
});
