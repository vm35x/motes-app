import { Meteor } from "meteor/meteor";
import expect from "expect";

import { validateNewUser } from "./users";

if (Meteor.isServer) {
  describe("users", function() {
    it("should allow valid email address email", function() {
      const testUser = {
        emails: [
          {
            address: "test@example.com"
          }
        ]
      };
      const res = validateNewUser(testUser);
      expect(res).toBe(true);
    });

    it("should reject invalid email", function() {
      const testUser = {
        emails: [
          {
            address: "testexample.com"
          }
        ]
      };

      expect(() => {
        validateNewUser(testUser);
      }).toThrow();
    });
  });
}

// console.log(validateUser())

// const add = (a, b) => {
//   if (typeof b !== "number") {
//     return a + a;
//   }
//   return a + b;
// };

// const square = a => a * a;

// describe("add", function() {
//   it("should add 2 numbers", function() {
//     const res = add(3, 4);

//     expect(res).toBe(7)
//   });

//   it("should double a single number", function() {
//     const res = add(44);

//     expect(res).toBe(88)
//   });
// });

// describe("square", function() {
//   it("should square a number", function() {
//     const res = square(4);

//     expect(res).toBe(16)
//   });
// });
