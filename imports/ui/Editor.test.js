import { Meteor } from "meteor/meteor";
import React from "react";
import expect from "expect";
import { mount } from "enzyme";

import { Editor } from "./Editor";
import { notes } from "../fixtures/fixtures";

if (Meteor.isClient) {
  describe("Editor", function() {
    let browserHistory;
    let call;

    beforeEach(function() {
      call = expect.createSpy();
      browserHistory = {
        push: expect.createSpy()
      };
    });

    it("should render pick note message", function() {
      const wrapper = mount(<Editor browserHistory={browserHistory} call={call} />);

      expect(wrapper.find('p').first().text()).toBe('Pick or create a note to get started.')
    });

    it("should render Note not found message", function() {
      const wrapper = mount(<Editor browserHistory={browserHistory} call={call} selectedNoteId={notes[1]._id} />);
      
      expect(wrapper.find('p').first().text()).toBe('Note not found.')
    });

    it("should remove note", function() {
      const wrapper = mount(<Editor browserHistory={browserHistory} call={call} selectedNoteId={notes[0]._id} note={notes[0]} />);

      wrapper.find('button').simulate('click')

      expect(call).toHaveBeenCalledWith('notes.remove', notes[0]._id);
      expect(browserHistory.push).toHaveBeenCalledWith('/dashboard');
    });

    it("should update the note body on textarea change", function() {
      const newBodyText = "this is new text";
      const wrapper = mount(<Editor browserHistory={browserHistory} call={call} selectedNoteId={notes[0]._id} note={notes[0]} />);

      wrapper.find('textarea').simulate('change', {
        target: {
          value: newBodyText
        }
      })

      expect(wrapper.state("body")).toBe(newBodyText);
      expect(call).toHaveBeenCalledWith('notes.update', notes[0]._id, { body: newBodyText });
    });

    it("should update the note title on input change", function() {
      const newTitleText = "this is new title";
      const wrapper = mount(<Editor browserHistory={browserHistory} call={call} selectedNoteId={notes[0]._id} note={notes[0]} />);

      wrapper.find('input').simulate('change', {
        target: {
          value: newTitleText
        }
      })

      expect(wrapper.state("title")).toBe(newTitleText);
      expect(call).toHaveBeenCalledWith('notes.update', notes[0]._id, { title: newTitleText });
    });

    it("should set state for new note", function() {
      const wrapper = mount(<Editor browserHistory={browserHistory} call={call} />);

      wrapper.setProps({
        selectedNoteId: notes[0]._id,
        note: notes[0]
      })

      expect(wrapper.state("title")).toBe(notes[0].title);
      expect(wrapper.state("body")).toBe(notes[0].body);
    });

    it("should not set state if note prop not provided", function() {
      const wrapper = mount(<Editor browserHistory={browserHistory} call={call} />);

      wrapper.setProps({
        selectedNoteId: notes[0]._id
      })

      expect(wrapper.state("title")).toBe('');
      expect(wrapper.state("body")).toBe('');
    });

    // it("should abcd 1234", function() {});
  });
}
