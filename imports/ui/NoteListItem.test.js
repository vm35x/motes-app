import React from "react";
import expect from "expect";
import { Meteor } from "meteor/meteor";
import { mount } from "enzyme";

import { notes } from "../fixtures/fixtures";
import { NoteListItem } from "./NoteListItem";

if (Meteor.isClient) {
  describe("NoteListItem", function() {
    let Session;

    beforeEach(() => {
      Session = {
        set: expect.createSpy()
      };
    });

    it("should render title and timestamp", function() {
      const note = notes[0];
      const wrapper = mount(<NoteListItem note={note} Session={Session} />);

      expect(wrapper.find("h5").text()).toBe(note.title);
      expect(wrapper.find("p").text()).toBe("4/17/19");
    });

    it("should render default title if no title set", function() {
      const note = notes[1];
      const wrapper = mount(<NoteListItem note={note} Session={Session} />);

      expect(wrapper.find("h5").text()).toBe("Untitled note");
    });

    it("should call set on click", function() {
      const note = notes[1];
      const wrapper = mount(<NoteListItem note={note} Session={Session} />);

      wrapper.find("div").simulate("click");

      expect(Session.set).toHaveBeenCalledWith('selectedNoteId', note._id);
    });
  });
}
