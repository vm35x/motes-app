import { Meteor } from "meteor/meteor";
import React from "react";
import expect from "expect";
import { shallow, mount } from "enzyme";

import { Login } from "./Login";

if (Meteor.isClient) {
  describe('Login', function(){
    it('should show error messages', function(){
      const error = 'This is not working'
      const wrapper = mount(<Login loginWithPassword={() => {}} />);
      // const wrapper = shallow(<Login loginWithPassword={() => {}} />);

      wrapper.setState({error})

      // expect(wrapper.find('p').text()).toBe(error)
      expect(wrapper.find('p').first().text()).toBe(error)
      // console.log(wrapper.find('p').first().text())
      
      wrapper.setState({error: ''})
      expect(wrapper.find('p').first().text()).toBe('')
      expect(wrapper.find('p').length).toBe(1)
    })

    it('should call loginWithPassword with form data', function(){
      const email = 'test@test.com'
      const password = 'password123'
      const spy = expect.createSpy()
      const wrapper = mount(<Login loginWithPassword={spy} />);

      wrapper.ref('email').node.value = email
      wrapper.ref('password').node.value = password
      wrapper.find('form').simulate('submit')

      expect(spy.calls[0].arguments[0]).toEqual({email})
      expect(spy.calls[0].arguments[1]).toBe(password)
    })

    it('should call set loginWithPassword callback errors', function(){
      const spy = expect.createSpy()
      const wrapper = mount(<Login loginWithPassword={spy} />);

      wrapper.find('form').simulate('submit')

      spy.calls[0].arguments[2]({})
      // console.log(wrapper.state('error'))
      // expect(wrapper.state('error').length).toNotBe(0)
      expect(wrapper.state('error')).toNotBe('')

      spy.calls[0].arguments[2]()
      // console.log(wrapper.state('error'))
      // expect(wrapper.state('error').length).toBe(0)
      expect(wrapper.state('error')).toBe('')
    })
  })
}
