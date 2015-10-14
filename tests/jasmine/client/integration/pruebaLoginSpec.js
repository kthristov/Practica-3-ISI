describe("Pruebas con login y logout", function(){

	beforeEach(function(done){
		Meteor.loginWithPassword("pepe@gmail.com", "mipassword", function(err) {
			Tracker.afterFlush(done);
		});
	});

	afterEach(function(done){
		Meteor.logout(function(){
			Tracker.afterFlush(done);
		}) ;
	});

	describe("Adding Player", function () {
	  it("should add a new player by submiting the form" , function() {
	    $("form input:text").val("Doomie");
	    spyOn(Players , 'insert') ;
	    $("form").submit();
	    expect(Players.insert.calls.argsFor(0)).toEqual([{ name : 'Doomie' ,
	    												   score : 0, 
	    												   createdBy: Meteor.userId() }]) ;

 	 });
});


	it ("despues de login muestra input para añadir players", function() {

	});

});
