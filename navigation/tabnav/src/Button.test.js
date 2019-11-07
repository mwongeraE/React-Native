import React from 'react'
import { shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Button from './Button'
import toJson from 'enzyme-to-json'

configure({adapter: new Adapter()})

describe('Button', () => {
    describe('Rendering', () => {
        it('should match to snapshot', () => {
            const component = shallow(<Button label="test label"/>)
            expect(toJson(component)).toMatchSnapshot() 
        })
    })
})