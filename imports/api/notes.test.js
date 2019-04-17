import { Meteor } from "meteor/meteor";
import expect from "expect";

import { Notes } from "./notes";

if (Meteor.isServer) {
  describe("notes", function() {
    const noteOne = {
      _id: "testNoteId1",
      title: "Some title",
      body: "Some body text",
      updatedAt: 0,
      userId: "testUserId1"
    };

    const noteTwo = {
      _id: "testNoteId2",
      title: "Some other title",
      body: "lorem ipsum dolor",
      updatedAt: 0,
      userId: "testUserId2"
    };

    beforeEach(function() {
      Notes.remove({});
      Notes.insert(noteOne);
      Notes.insert(noteTwo);
    });

    it("should insert new note", function() {
      const userId = "testid";
      const _id = Meteor.server.method_handlers["notes.insert"].apply({
        userId
      });

      expect(Notes.findOne({ _id, userId })).toExist();
    });

    it("should not insert note if not authenticated", function() {
      expect(() => {
        const _id = Meteor.server.method_handlers["notes.insert"]();
      }).toThrow();
    });

    it("should remove note", function() {
      Meteor.server.method_handlers["notes.remove"].apply(
        { userId: noteOne.userId },
        [noteOne._id]
      );

      expect(Notes.findOne({ _id: noteOne._id })).toNotExist();
    });

    it("should not remove note if not authenticated", function() {
      expect(() => {
        Meteor.server.method_handlers["notes.remove"].apply({}, [noteOne._id]);
      }).toThrow();
    });

    it("should not remove note if invalid _id", function() {
      expect(() => {
        Meteor.server.method_handlers["notes.remove"].apply(
          { userId: noteOne.userId },
          []
        );
      }).toThrow();
    });

    it("should update note", function() {
      const title = "Some new title";

      Meteor.server.method_handlers["notes.update"].apply(
        {
          userId: noteOne.userId
        },
        [noteOne._id, { title }]
      );

      const note = Notes.findOne(noteOne._id);

      expect(note.updatedAt).toBeGreaterThan(0);
      expect(note).toInclude({
        title,
        body: noteOne.body
      });
    });

    it("should throw error if extra updates", function() {
      expect(() => {
        Meteor.server.method_handlers["notes.update"].apply(
          { userId: noteOne.userId },
          [noteOne._id, { title: "New title", subtitle: "this is extra prop" }]
        );
      }).toThrow();
    });

    it("should not update note if user was not creator", function() {
      const title = "Some new title";

      Meteor.server.method_handlers["notes.update"].apply(
        {
          userId: "testid"
        },
        [noteOne._id, { title }]
      );

      const note = Notes.findOne(noteOne._id);
      expect(note).toInclude(noteOne);
    });

    it("should not update note if not authenticated", function() {
      expect(() => {
        Meteor.server.method_handlers["notes.update"].apply({}, [noteOne._id]);
      }).toThrow();
    });

    it("should not update note if invalid _id", function() {
      expect(() => {
        Meteor.server.method_handlers["notes.update"].apply(
          { userId: noteOne.userId },
          []
        );
      }).toThrow();
    });

    it("should return a users notes", function() {
      const res = Meteor.server.publish_handlers.notes.apply({
        userId: noteOne.userId
      });
      const note = res.fetch();

      expect(note.length).toBe(1);
      expect(note[0]).toEqual(noteOne);
    });

    it("should return zero for user that has none", function() {
      const res = Meteor.server.publish_handlers.notes.apply({
        userId: 'testid'
      });
      const note = res.fetch();

      expect(note.length).toBe(0);
    });
  });
}
