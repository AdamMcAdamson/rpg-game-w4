	var obiWan = new character("obiWan", "Obi-Wan Kenobi", 120, 8, 8, 10, "neutralTeam","assets/images/obiWan.jpg", "select");
	var luke = new character("luke", "Luke Skywalker", 90, 15, 15, 5, "neutralTeam", "assets/images/lukeSkywalker.png", "select");
	var sidious = new character("sidious", "Darth Sidious", 150, 5, 5, 20, "neutralTeam", "assets/images/darthSidious.png", "select");
	var maul = new character("maul", "Darth Maul", 180, 3, 3, 25, "neutralTeam", "assets/images/darthMaul.jpg", "select");

	var characterArr = [obiWan, luke, sidious, maul];
	var characterElementArr = [];


	var player = null;
	var playerElement = null;

	var defender = null;
	var defenderElement = null;

	var isPlayerSelected = false;
	var isDefenderSelected = false;
	var gameOver = false;
	var win = null;
	var killUpdate = false;

	var damageDealt = 0;
	var damageTaken = 0;

	var removeDefIndex = null;


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
	var playerList = $("#player-list");
	var enemyList = $("#enemy-list");
	var defenderList = $("#defender-list");

	var playerUpdate = $("#player-update");
	var enemyUpdate = $("#enemy-update");

	var attackButton = $("#attack");

	var restartButton = $("#restart");

	for(var i = 0; i < characterArr.length; i++){
		characterElementArr.push(buildCharacter(characterArr[i]));
	}

	function attack(){
		damageDealt = player.attackPower;
		defender.health -= damageDealt;
		player.attackPower += player.baseAttackPower;
		if(defender.health > 0){
			damageTaken = defender.counterAttackPower;
			player.health -= damageTaken;
		} else {
			removeDefender();
			damageTaken = 0;
		}
		if(player.health <= 0){
			player.health = 0;
			win = false;
			gameOver = true;
		}
	}

	function removeDefender(){
		defenderElement.css("display", "none");
		defender.loc = "dead";
		defenderElement = null;
		isDefenderSelected = false;
		var checkOver = true;
		for(var i = 0; i < characterArr.length; i++){
			if(characterArr[i].loc !== "dead"){
				checkOver = false;
			}
		}
		if(checkOver){
			win = true;
			gameOver = checkOver;
		}
	}

	function pickChar(type) {
		// type: "player" || "defender"
		var char, charElement, charElementDiv;

		if(type === "player"){
			char = player;
			charElement = playerElement;
			// console.log( 	)
		} else if(type === "defender"){
			char = defender;
			charElement = defenderElement;
		}
		// char.team = type + "Team";
		// char.loc = type;

		char.team = type + "Team";
		char.loc = type;

		var charIndex = characterArr.indexOf(char);

		charElement = characterElementArr[charIndex];

		charElementDiv = charElement.find("#" + char.id + "-div"); 
		charElementDiv.attr("class", "selectable " + char.team);

		window[type + "Element"] = charElement;

		if(type === "player" && !isPlayerSelected){
			characterArr.splice(charIndex, 1);
			characterElementArr.splice(charIndex, 1);
			for(var i = 0; i < characterArr.length; i++){
				if(characterArr[i].team === "neutralTeam"){
					characterArr[i].team = "enemyTeam";
					characterArr[i].loc = "enemy";
				}
			}
		}
		if(type === "defender" && !isDefenderSelected){
			for(var i = 0; i < characterArr.length; i++){
				if(characterArr[i].team === "neutralTeam"){
					characterArr[i].team = "enemyTeam";
					characterArr[i].loc = "enemy";
				}
			}
		}
		// console.log("Player: - " + player);
		// console.log(characterArr);

	}

		
	playerSelectionList.on("click", function(event) {

		var target = $(event.target);
		
		if (!target.is(".selectable")){
			target = target.parent();
		}
		if (!target.is(".selectable")){
			target = target.parent();
		}
		target = target.parent();

		if(!isPlayerSelected){
			player = window[target.attr("charname")];
			// console.log("PlayerSelected: - " + isPlayerSelected);
			// console.log(player);
			pickChar("player");
			isPlayerSelected = true;
		}
		// console.log(player);
		updateDisplay();
	});

	enemyList.on("click", function(){
		var target = $(event.target);
		
		if (!target.is(".selectable")){
			target = target.parent();
		}
		if (!target.is(".selectable")){
			target = target.parent();
		}
		target = target.parent();

		if(!isDefenderSelected){
			defender = window[target.attr("charname")];
			console.log("DefenderSelected: - " + defender);
			pickChar("defender");
			isDefenderSelected = true;
		}
		console.log(defenderElement);
		updateDisplay();
	});

	attackButton.on("click", function(){
		if(!gameOver){
			if(isDefenderSelected){
				attack();
				updateDisplay("attackButton");
			}else {
				updateDisplay("failAttackButton");
			}
		}
	});

	restartButton.on("click", function(){
		reset();
		updateDisplay();
	});

	function updateDisplay(info){

		if(killUpdate){
			console.log("Update Killed");
			return;
		}

		var curChar = null;
		var curCharElem = null;
		var curCharElemHealth = null;
		var curCharElemDiv = null;

		var curDiv = null;

		var playerDiv = null;
		var playerElementHealth = null;
		
		playerSelectionList.empty();
		playerList.empty();
		enemyList.empty();
		defenderList.empty();
		playerUpdate.text("");
		enemyUpdate.text("");

		restartButton.css("visibility", "hidden");

		if(isPlayerSelected){

			playerElementHealth = playerElement.find("#" + player.id + "-health");
			playerElementHealth.attr("value", player.health);
			playerElementHealth.text(player.health);

			playerDiv = $("#" + player.loc + "-list");
			playerDiv.append(playerElement);  
		}		


		for(var i = 0; i < characterArr.length; i++){
			curChar = characterArr[i];
			curCharElem = characterElementArr[i];
			// console.log(curChar);
			curCharElemHealth = curCharElem.find("#" + curChar.id + "-health");
			curCharElemHealth.attr("value", curChar.health);
			curCharElemHealth.text(curChar.health);

			curCharElemDiv = curCharElem.find("#" + curChar.id + "-div");
			curCharElemDiv.attr("class", "selectable " + curChar.team);

			curDiv = $("#" + curChar.loc + "-list");
			// console.log(curDiv);
			curDiv.append(curCharElem);  
		}

		if(gameOver){
			enemyUpdate.text("");
			if(win){
				playerUpdate.text("You Won!!!!");
			}else{
				playerUpdate.text("You have been defeated....GAME OVER!!!");
			}
			restartButton.css("visibility", "visible");
			killUpdate = true;
			return;
		}

		if(info === "attackButton"){
			// Show attack values
			// Update health
			if(isDefenderSelected){
				playerUpdate.text("You attacked " + defender.name + " for " + damageDealt + " damage.");
				enemyUpdate.text(defender.name + " attacked you back for " + damageTaken + " damage.");
			} else {
				playerUpdate.text("You have defeated " + defender.name + ", you can choose to fight another enemy.");
				enemyUpdate.text("");
			}
		}

		if(info === "failAttackButton"){
			playerUpdate.text("No enemy here.");
			enemyUpdate.text("");
		}
		console.log(characterArr);

	}

	function buildCharacter(character){
		//Builds character jquery html element with proper attributes
		var characterli = $("<li>")
		var characterDiv = $("<div>");
		var characterName = $("<p>");
		var characterImgDiv = $("<div>");
		var characterImg = $("<img>");
		var characterHealth = $("<p>");

		characterli.attr("id", character.id);
		characterli.attr("charname", character.id);

		characterDiv.attr("id", character.id + "-div");

		characterDiv.attr("class", "selectable " + character.team);
		
		characterName.attr("id", character.id + "-name");
		characterName.attr("class", "character-name");
		characterName.text(character.name);

		characterImgDiv.attr("class", "img-div");

		characterImg.attr("id", character.id + "-img");
		characterImg.attr("src", character.img);
		characterImg.attr("alt", character.name);

		characterHealth.attr("id", character.id + "-health");
		characterHealth.attr("class", "health");
		characterHealth.attr("value", character.health);
		characterHealth.text(character.health);

		characterDiv.append(characterName);
		characterImgDiv.append(characterImg);
		characterDiv.append(characterImgDiv);
		characterDiv.append(characterHealth);

		characterli.append(characterDiv);

		return characterli;
	}

	function reset(){
		
		obiWan = new character("obiWan", "Obi-Wan Kenobi", 120, 8, 8, 10, "neutralTeam","assets/images/obiWan.jpg", "select");
		luke = new character("luke", "Luke Skywalker", 90, 15, 15, 5, "neutralTeam", "assets/images/lukeSkywalker.png", "select");
		sidious = new character("sidious", "Darth Sidious", 150, 5, 5, 20, "neutralTeam", "assets/images/darthSidious.png", "select");
		maul = new character("maul", "Darth Maul", 180, 3, 3, 25, "neutralTeam", "assets/images/darthMaul.jpg", "select");

		characterArr = [obiWan, luke, sidious, maul];
		characterElementArr = [];


		player = null;
		playerElement = null;

		defender = null;
		defenderElement = null;

		isPlayerSelected = false;
		isDefenderSelected = false;
		gameOver = false;
		win = null;
		killUpdate = false;

		damageDealt = 0;
		damageTaken = 0;

		removeDefIndex = null;

		for(var i = 0; i < characterArr.length; i++){
			characterElementArr.push(buildCharacter(characterArr[i]));
		}

	}

	updateDisplay("window");

});
