var obiWan = new character("obiWan", "Obi-Wan Kenobi", 120, 6, 6, 26, "neutral");
var luke = new character("luke", "Luke Skywalker", 100, 10, 10, 20, "neutral");
var sidious = new character("sidious", "Darth Sidious", 150, 7, 7, 34, "neutral");
var maul = new character("maul", "Darth Maul", 180, 8, 8, 30, "neutral");

var characterArr = [obiWan, luke, sidious, maul];
var characterElementArr = [];


var player = null;

var playerElement = null;

var isPlayerSelected = false;

var gamestate = "selection"; // selection, enemy, attacking

function character(id, name, health, baseAttack, attack, counterAttack, team) {
	this.id = id;
	this.name = name;
	this.health = health;
	this.baseAttackPower = baseAttack;
	this.attackPower = attack;
	this.counterAttackPower = counterAttack;
	this.team = team;
};

$( document ).ready(function(){

	var playerSelectionList = $("#player-selection-list");

	for(var i = 0; i < characterArr.length; i++){
		characterElementArr[i] = $("#" + characterArr[i].id);
	}

	function attack(player, enemy){
		ememy.health -= player.attackPower;
		player.attackPower += player.baseAttackPower;
		player.health -= ememy.counterAttackPower;
	}

	function pickPlayer() {

		player.team = "friendly";

		var playerIndex = characterArr.indexOf(player);

		characterArr.splice(playerIndex, 1);
		characterElementArr.splice(playerIndex, 1);

		for(var i = 0; i < characterArr.length; i++){
			characterArr[i].team = "enemy";
		}
		// console.log("Player: - " + player);
		// console.log(characterArr);

		playerElement = $("#" + player.id);

		playerElement.class("selectable friendly")

		console.log(playerElement);
	}

		
	playerSelectionList.on("click", function(event) {

		var target = $(event.target);
		
		if (!target.is(".selectable")){
			target = target.parent();
		}

		if(!isPlayerSelected){
			player = window[target.attr("charname")];
			isPlayerSelected = true;
			console.log("PlayerSelected: - " + isPlayerSelected);
			pickPlayer();
		}
		// console.log(player);
	
	});

	function updateDisplay(type){

		if(type === "attack"){
			// Show attack values
			// Update health
		}
	}

});
