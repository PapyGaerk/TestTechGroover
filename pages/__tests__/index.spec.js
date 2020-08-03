import {mount} from '@vue/test-utils'
import index from '../index'

describe('index', () => {
    test('is a Vue instance', () => {
        const wrapper = mount(index);
        expect(wrapper.vm).toBeTruthy()
    })
})
