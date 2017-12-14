///canvas tests
var expect    = require("chai").expect;
var pbar = require("../app/progressBar");

describe("Draws the progessBar", function() {
  describe("Draws Bar", function() {
    it("Draws", function() {
      var bar = pbar.draw(5,600,600)

      expect(bar).to.equal("360000");

    });
  });
});