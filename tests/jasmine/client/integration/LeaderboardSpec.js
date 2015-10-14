var selectGraceHopper = function (callback) {
  Session.set("selected_player", Players.findOne({name: "Grace Hopper"})._id);
  if (callback) {
    Deps.afterFlush(callback);
  }
};

var unselectPlayer = function () {
  Session.set("selected_player", null);
};

describe("Selecting Grace Hopper", function () {

  beforeEach(function (done) {

    PlayersService.generateRandomPlayers(); // no tengo claro porque asi si que funciona

    Meteor.autorun(function (c) {
      var grace = Players.findOne({name: "Grace Hopper"});
      if (grace) {
        c.stop();
        selectGraceHopper(done);
      }
    })
  });

  it("should show Grace above the give points button", function () {
    expect($("div.details > div.name").html()).toEqual("Grace Hopper");
  });


  it("should highlight Grace's name", function () {
    var parentDiv = $("span.name:contains(Grace Hopper)").parent();
    expect(parentDiv.hasClass("selected")).toBe(true);
  });
});

describe("Point Assignment", function () {
  beforeEach(function (done) {
    selectGraceHopper(done);
  });

  it("should GIVE a player 5 points when he is selected and the button is pressed", function () {
    var graceInitialPoints = Players.findOne({name: "Grace Hopper"}).score;
    $("input:button.inc").click();
    expect(Players.findOne({name: "Grace Hopper"}).score).toBe(graceInitialPoints + 5);
  });

  it("should TAKE a player 5 points when he is selected and the button is pressed", function () {
    var graceInitialPoints = Players.findOne({name: "Grace Hopper"}).score;
    $("input:button.dec").click();
    expect(Players.findOne({name: "Grace Hopper"}).score).toBe(graceInitialPoints - 5);
  });
});

describe("Player Ordering", function () {
  it("should result in a list where the first player has as many or more points than the second player", function () {
    var players = PlayersService.getPlayerList().fetch();
    expect(players[0].score >= players[1].score).toBe(true);
  });
});
//MIS TESTS 


describe("Removing player", function () {
  beforeEach(function (done) {
    selectGraceHopper(done);
  });
 
  it("should remove when he is selected and the button remove is pressed", function () {
    var player_id = Players.findOne({name: "Grace Hopper"})._id ;
    spyOn(Players , 'remove') ;
    $("input:button.remove").click();
    expect(Players.remove.calls.argsFor(0)).toEqual([player_id]);
  });
});