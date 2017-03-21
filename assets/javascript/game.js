var obiWan = new character("obiWan", "Obi-Wan Kenobi", 120, 6, 6, 26, "neutralTeam","assets/images/temp.png", "select");
var luke = new character("luke", "Luke Skywalker", 90, 10, 10, 20, "neutralTeam", "assets/images/temp.png", "select");
var sidious = new character("sidious", "Darth Sidious", 150, 7, 7, 34, "neutralTeam", "assets/images/temp.png", "select");
var maul = new character("maul", "Darth Maul", 180, 8, 8, 30, "neutralTeam", "assets/images/temp.png", "select");

var characterArr = [obiWan, luke, sidious, maul];
var characterElementArr = [];


var player = null;
var playerElement = null;


var defender = null;
var defenderElement = null;

var isPlayerSelected = false;
var isDefenderSelected = false;
var gamestate = "selection"; // selection, enemy, attacking

function character(id, name, health, baseAttack, attack, counterAttack, team, img, loc) {
	this.id = id;
	this.name = name;
	this.health = health;
	this.baseAttackPower = baseAttack;
	this.attackPower = attack;
	this.counterAttackPower = counterAttack;
	this.team = team;
	this.img = img;
	this.loc = loc;
};

$( document ).ready(function(){

	var playerSelectionList = $("#select-list");

	var enemyList = $("#enemy-list");

	var defenderList = $("#defender-list");

	for(var i = 0; i < characterArr.length; i++){
		characterElementArr.push(buildCharacter(characterArr[i]));
	}

	function attack(player, enemy){
		ememy.health -= player.attackPower;
		player.attackPower += player.baseAttackPower;
		player.health -= ememy.counterAttackPower;
	}

	function pickChar(type) {
		// type: "player" || "defender"
		var char, charElement;

		if(type === "player"){
			char = player;
			charElement = playerElement;
			console.log( 	)
		} else if(type === "defender"){
			char = defender;
			charElement = defenderElement;
		}
		// char.team = type + "Team";
		// char.loc = type;

		var charIndex = characterArr.indexOf(char);

		charElement = characterElementArr[charIndex];

		charElement.attr("class", "selectable " + char.team);

		characterArr.splice(charIndex, 1);
		characterElementArr.splice(charIndex, 1);

		for(var i = 0; i < characterArr.length; i++){
			characterArr[i].team = "enemyTeam";
			characterArr[i].loc = "enemy";
		}

		// console.log("Player: - " + player);
		// console.log(characterArr);

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
			console.log(player);
			pickChar("player");
		}
		// console.log(player);
		updateDisplay();
	});

	enemyList.on("click", function(){
		var target = $(event.target);
		
		if (!target.is(".selectable")){
			target = target.parent();
		}

		if(!isDefenderSelected){
			defender = window[target.attr("charname")];
			isDefenderSelected = true;
			console.log("DefenderSelected: - " + defender);
			pickChar("defender");
		}

	});

	function buildCharacter(character){
		//Builds character jquery html element with proper attributes
		var characterSpan = $("<span>");
		var characterName = $("<p>");
		var characterImg = $("<img>");
		var characterHealth = $("<p>");

		characterSpan.attr("id", character.id);
		characterSpan.attr("charname", character.id);
		characterSpan.attr("class", "selectable " + character.team);
		
		characterName.attr("id", character.id + "-name");
		characterName.attr("class", "character-name");
		characterName.text(character.name);

		characterImg.attr("id", character.id + "-img");
		characterImg.attr("src", character.img);
		characterImg.attr("alt", character.name);

		characterHealth.attr("id", character.id + "-health");
		characterHealth.attr("class", character.id + "health");
		characterHealth.attr("value", character.health);
		characterHealth.text(character.health);

		characterSpan.append(characterName);
		characterSpan.append(characterImg);
		characterSpan.append(characterHealth);

		return characterSpan;
	}

	function updateDisplay(caller){

		var curChar = null;
		var curCharElem = null;

		var curDiv = null;

		var playerDiv = null;

		for(var i = 0; i < characterArr.length; i++){
			curChar = characterArr[i];
			curCharElem = characterElementArr[i];
			console.log(curChar);
			curDiv = $("#" + curChar.loc + "-list");
			console.log(curDiv);
			curDiv.append($('<li id="' + curChar.id + '-li">').append(curCharElem));  
		}

		if(isPlayerSelected){
			playerDiv = $("#" + player.loc + "-list");
			playerDiv.append($('<li id="' + player.id + '-li">').append(playerElement));  
		}

		if(caller === "attackButton"){
			// Show attack values
			// Update health
		}

	}

	updateDisplay("window");

});
