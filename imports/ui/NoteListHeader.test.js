import React from "react";
import expect from "expect";
import { mount } from "enzyme";
import { Meteor } from "meteor/meteor";

import { NoteListHeader } from "./NoteListHeader";

if (Meteor.isClient) {
  describe("NoteListItem", function() {
    it("should call meteorCall call on click", function() {
      const spy = expect.createSpy();
      const wrapper = mount(<NoteListHeader meteorCall={spy} />);

      wrapper.find("button").simulate("click");

      expect(spy).toHaveBeenCalledWith('notes.insert');
    });
  });
}
