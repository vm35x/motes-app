import React from "react";
import expect from "expect";
import { Meteor } from "meteor/meteor";
import { mount } from "enzyme";

import NoteListItem from "./NoteListItem";

if (Meteor.isClient) {
  describe("NoteListItem", function() {
    it("should render title and timestamp", function() {
      const title = "Some title";
      const updatedAt = 1555505950742;
      const wrapper = mount(<NoteListItem note={{ title, updatedAt }} />);

      expect(wrapper.find("h5").text()).toBe(title);
      expect(wrapper.find("p").text()).toBe("4/17/19");
    });

    it("should render default title if no title set", function() {
      const title = "";
      const updatedAt = 1555505950742;
      const wrapper = mount(<NoteListItem note={{ title, updatedAt }} />);

      expect(wrapper.find("h5").text()).toBe("Untitled note");
    });
  });
}
