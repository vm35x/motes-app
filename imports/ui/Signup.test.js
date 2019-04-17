import { Meteor } from "meteor/meteor";
import React from "react";
import expect from "expect";
import { shallow, mount } from "enzyme";

import { Signup } from "./Signup";

if (Meteor.isClient) {
  describe("Signup", function() {
    it("should show error messages", function() {
      const error = "This is not working";
      const wrapper = mount(<Signup createUser={() => {}} />);
      // const wrapper = shallow(<Login createUser={() => {}} />);

      wrapper.setState({ error });

      // expect(wrapper.find('p').text()).toBe(error)
      expect(
        wrapper
          .find("p")
          .first()
          .text()
      ).toBe(error);
      // console.log(wrapper.find('p').first().text())

      wrapper.setState({ error: "" });
      expect(
        wrapper
          .find("p")
          .first()
          .text()
      ).toBe("");
      expect(wrapper.find("p").length).toBe(1);
    });

    it("should call createUser with form data", function() {
      const email = "test@test.com";
      const password = "password123";
      const spy = expect.createSpy();
      const wrapper = mount(<Signup createUser={spy} />);

      wrapper.ref("email").node.value = email;
      wrapper.ref("password").node.value = password;
      wrapper.find("form").simulate("submit");

      expect(spy.calls[0].arguments[0]).toEqual({ email, password });
    });

    it("should set error if short password", function() {
      const email = "test@test.com";
      const password = "p3          ";
      const spy = expect.createSpy();
      const wrapper = mount(<Signup createUser={spy} />);

      wrapper.ref("email").node.value = email;
      wrapper.ref("password").node.value = password;
      wrapper.find("form").simulate("submit");

      // console.log(wrapper.state('error'))
      expect(wrapper.state("error").length).toNotBe(0);
      expect(wrapper.state("error")).toBe(
        "Password must be more than 3 chars long."
      );
    });

    it("should call set createUser callback errors", function() {
      const password = "password123";
      const reason = "This is why it failed";
      const spy = expect.createSpy();
      const wrapper = mount(<Signup createUser={spy} />);

      wrapper.ref("password").node.value = password;
      wrapper.find("form").simulate("submit");

      spy.calls[0].arguments[1]({ reason });
      console.log(wrapper.state("error"));
      expect(wrapper.state("error")).toBe(reason);

      spy.calls[0].arguments[1]()
      console.log(wrapper.state('error'))
      // expect(wrapper.state('error')).toBe('')
      expect(wrapper.state('error').length).toBe(0)
    });
  });
}
