////////////////////////////////////////////////////////////
// GAME
////////////////////////////////////////////////////////////

/*!
 * 
 * GAME SETTING CUSTOMIZATION START
 * 
 */
var enableFixedResult = false; //option to have fixed result by API, enabling this will disable 2D physics engine
var enablePercentage = false; //option to have result base on percentage, enabling this will disable 2D physics engine

var spinDirection = true; //true to spin right, false to spin left
var spinSpeed = 18; //wheel spinning speed
var touchSpin = true; //touch to spin (true/false)

//status display text
var statusText_arr = ['RINGKE SPIN THE WHEEL','SPINNING...','[NUMBER]PHP', 'WIN [NUMBER]PHP', 'BETTER LUCK NEXT TIME!', 'JACKPOT [NUMBER]','YOU LOSS ALL PHP'];
var defaultStatusBgColor = '#655643'; //status bacgkround color
var creditText = '[NUMBER]PHP'; //point display text

//game play type; true for game1, false for game2
var gamePlayType = true;

//game1 (spin using chances)
var gameChance = 1; //total chances
var chancesText = 'x [NUMBER]'; //chances display text
var instructionTxt1 = 'You have total 1 ticket chances,\nspin the wheel or tap on the spin button to begin.'; //instruction

//game2 (spin using bet number)
var gameBetPoint = 500; //total bet point
var gameCanBet = 10; //total bet increase
var gameMaxBet = 1000; //max bet
var instructionTxt2 = 'First place your bets,\nspin the wheel or tap on the spin button to begin.'; //instruction

//wheel radius
var firstWheelRadius = 230; //first wheel radius for slot color feature
var secondWheelRadius = 100; //second wheel radius for slot color feature

//wheel segments
var wheel_arr = [{src:'assets/item_wheel_01.png', highlight:'assets/item_wheel_01_h.png', color:'#FDCC09', regX:1, regY:223, point:10, type:0, percent:30,
					slot:{
							color:'#FDCC09',
							highlightColor:'#FFE600',
							stroke:5,
							strokeColor:'#fff',
							fontSize:45,
							text:'10',
							textY:140,
							textColor:'#fff'
						}
				},
				{src:'assets/item_wheel_02.png', highlight:'assets/item_wheel_02_h.png', color:'#F37621', regX:1, regY:223, point:25, type:0, percent:25},
				{src:'assets/item_wheel_03.png', highlight:'assets/item_wheel_03_h.png', color:'#7DB544', regX:1, regY:223, point:50, type:0, percent:20},
				{src:'assets/item_wheel_04.png', highlight:'assets/item_wheel_04_h.png', color:'#1A9DD8', regX:1, regY:223, point:80, type:0, percent:15},
				{src:'assets/item_wheel_11.png', highlight:'assets/item_wheel_11_h.png', color:'#3F559A', regX:1, regY:223, point:100, type:0, percent:15},
				//{src:'assets/item_wheel_06.png', highlight:'assets/item_wheel_06_h.png', color:'#91328B', regX:1, regY:223, point:1000, type:0, percent:15},
				{src:'assets/item_wheel_02.png', highlight:'assets/item_wheel_02_h.png', color:'#449BD4', regX:1, regY:223, point:25, type:0, percent:15},
				{src:'assets/item_wheel_03.png', highlight:'assets/item_wheel_03_h.png', color:'#F37621', regX:1, regY:223, point:50, type:0, percent:15},
				//{src:'assets/item_wheel_09.png', highlight:'assets/item_wheel_09_h.png', color:'#FDCC09', regX:1, regY:223, point:25, type:0, percent:25},
				{src:'assets/item_wheel_04.png', highlight:'assets/item_wheel_04_h.png', color:'#7DB544', regX:1, regY:223, point:80, type:0, percent:25},
				//{src:'assets/item_wheel_11.png', highlight:'assets/item_wheel_11_h.png', color:'#DA2027', regX:1, regY:223, point:1000000000, type:2, percent:5},
				{src:'assets/item_wheel_02.png', highlight:'assets/item_wheel_02_h.png', color:'#475C70', regX:1, regY:223, point:25, type:1, percent:5},
				];

//second wheel segments
var secondWheel = true; //option to display second wheel; (true/false)
var wheelSecond_arr = [{src:'', highlight:'', regX:0, regY:100, mutiply:1, percent:30, slot:{
							color:'#53709D',
							highlightColor:'#6386BF',
							stroke:8,
							strokeColor:'#fff',
							fontSize:35,
							text:'x1',
							textY:60,
							textColor:'#fff'
						}},
					{src:'assets/item_wheel_inner_03.png', highlight:'assets/item_wheel_inner_03_h.png', regX:0, regY:100, mutiply:2, percent:10},
					{src:'assets/item_wheel_inner_01.png', highlight:'assets/item_wheel_inner_01_h.png', regX:0, regY:100, mutiply:1, percent:10},
					{src:'assets/item_wheel_inner_04.png', highlight:'assets/item_wheel_inner_04_h.png', regX:0, regY:100, mutiply:0, percent:10},
					{src:'assets/item_wheel_inner_02.png', highlight:'assets/item_wheel_inner_02_h.png', regX:0, regY:100, mutiply:2, percent:10},
					{src:'assets/item_wheel_inner_05.png', highlight:'assets/item_wheel_inner_05_h.png', regX:0, regY:100, mutiply:1, percent:30}];

var resultTitleText = 'Congratulations!'; //result title text
var resultScoreText = '[NUMBER]PHP Voucher'; //result score text

var exitMessage = 'Are you sure\nyou want to quit?'; //go to main page message

//Social share, [SCORE] will replace with game score
var shareEnable = true; //toggle share
var shareText = ''; //social share message
var shareTitle = 'Highscore on Lucky Wheels Game is [SCORE]PTS.';//social share score title
var shareMessage = '[SCORE]PTS is mine new highscore on Lucky Wheels Game! Try it now!'; //social share score message

/*!
 *
 * GAME SETTING CUSTOMIZATION END
 *
 */
var wheelX = 872;
var wheelY = 393;
var arrowX = 872;
var arrowY = 133;

var playerData = {chance:0, score:0, point:0, bet:0};
var gameData = {spinning:false, stopped:true, rotateEaseNum:0, rotateInnerNum:0, wheelNum:0, wheelInnerNum:0, lightNum:16, ticketX:0, shape:'', touch:false, paused:true, spinDirection:true, spinSpeed:0, velocity:0, spindType:false, showStatus:false, fixedRotate:-1, fixedInnerRotate:-1};
var betData = {interval:null, timer:0, timerMax:300, timerMin:10, betpoint:0, betNumber:0, betNumberPlus:0};
var lightData = {side:true, num:0};

/*!
 * 
 * GAME BUTTONS - This is the function that runs to setup button event
 * 
 */
function buildGameButton(){
	gameData.physicsEngine = true;
	if(enableFixedResult){
		gameData.physicsEngine = false;
	}
	
	if(enablePercentage){
		createPercentage();
		gameData.physicsEngine = false;	
	}
	
	buttonStart.cursor = "pointer";
	buttonStart.addEventListener("click", function(evt) {
		playSound('soundClick');
		
		//memberpayment
		if(typeof memberData != 'undefined'){
			if(!checkMemberGameType()){
				goMemberPage('user');
			}else{
				goPage('game');
			}
		}else{
			goPage('game');
		}
	});
	
	buttonMinus.cursor = "pointer";
	buttonMinus.addEventListener("mousedown", function(evt) {
		playSound('soundChips');
		toggleBetNumber('minus');
	});
	buttonMinus.addEventListener("pressup", function(evt) {
		toggleBetNumber();
	});
	
	buttonPlus.cursor = "pointer";
	buttonPlus.addEventListener("mousedown", function(evt) {
		playSound('soundChips');
		toggleBetNumber('plus');
	});
	buttonPlus.addEventListener("pressup", function(evt) {
		toggleBetNumber();
	});
	
	buttonSpin.cursor = "pointer";
	buttonSpin.addEventListener("click", function(evt) {
		getResult(1,0);
		startSpinWheel(true);
	});
	
	
	buttonReplay.cursor = "pointer";
	buttonReplay.addEventListener("click", function(evt) {
		playSound('soundClick');
		goPage('game');
	});
	
	buttonFacebook.cursor = "pointer";
	buttonFacebook.addEventListener("click", function(evt) {
		share('facebook');
	});
	buttonTwitter.cursor = "pointer";
	buttonTwitter.addEventListener("click", function(evt) {
		share('twitter');
	});
	buttonWhatsapp.cursor = "pointer";
	buttonWhatsapp.addEventListener("click", function(evt) {
		share('whatsapp');
	});
	
	buttonSoundOff.cursor = "pointer";
	buttonSoundOff.addEventListener("click", function(evt) {
		toggleGameMute(true);
	});
	
	buttonSoundOn.cursor = "pointer";
	buttonSoundOn.addEventListener("click", function(evt) {
		toggleGameMute(false);
	});
	
	buttonFullscreen.cursor = "pointer";
	buttonFullscreen.addEventListener("click", function(evt) {
		toggleFullScreen();
	});
	
	buttonExit.cursor = "pointer";
	buttonExit.addEventListener("click", function(evt) {
		toggleConfirm(true);
	});
	
	buttonSettings.cursor = "pointer";
	buttonSettings.addEventListener("click", function(evt) {
		toggleOption();
	});
	
	buttonYes.cursor = "pointer";
	buttonYes.addEventListener("click", function(evt) {
		toggleConfirm(false);
		stopGame(true);
		goPage('main');
		toggleOption();
	});
	
	buttonNo.cursor = "pointer";
	buttonNo.addEventListener("click", function(evt) {
		toggleConfirm(false);
	});
}

function toggleWheelActive(con){
	if(con){
		wheelContainer.cursor = "pointer";
	}else{
		wheelContainer.cursor = "default";	
	}
}

/*!
 * 
 * DISPLAY PAGES - This is the function that runs to display pages
 * 
 */
var curPage=''
function goPage(page){
	curPage=page;
	
	mainContainer.visible = false;
	gameContainer.visible = false;
	resultContainer.visible = false;
	
	var targetContainer = null;
	switch(page){
		case 'main':
			targetContainer = mainContainer;
			
			if(gameData.physicsEngine){
				warmUpWheel();
			}
		break;
		
		case 'game':
			targetContainer = gameContainer;
			startGame();
		break;
		
		case 'result':
			targetContainer = resultContainer;
			playSound('soundResult');
			resultScoreTxt.text = resultScoreText.replace('[NUMBER]', addCommas(playerData.score));
			stopGame();
			animateLights('static');
			saveGame(playerData.score);
		break;
	}
	
	if(targetContainer != null){
		targetContainer.visible = true;
		targetContainer.alpha = 0;
		TweenMax.to(targetContainer, .5, {alpha:1, overwrite:true});
	}
	
	resizeCanvas()
}

/*!
 * 
 * START GAME - This is the function that runs to start play game
 * 
 */

function startGame(){
	toggleWheelActive(true);
	toggleInstruction(true);
	
	playSound('soundStart');
	
	//memberpayment
	playerData.chance = gameData.startChance = gameChance;
	playerData.score = playerData.point = 0;
	
	if(gamePlayType){
		chanceTxt.visible = true;
		betTxt.visible = false;
		itemGame1.visible = true;
		itemGame2.visible = false;
		
		//memberpayment
		if(typeof memberData != 'undefined'){
			playerData.point = playerData.score = memberData.point;
			playerData.chance = gameData.startChance = memberData.chance;
		}
		
		generateTickets();
		animateInsertTicket();
		buttonPlus.visible = buttonMinus.visible = false;
	}else{
		playerData.score = playerData.point = gameBetPoint;
		playerData.bet = 0;
		betData.betNumber = 0;
		betData.betNumberPlus = 0;
		
		chanceTxt.visible = false;
		betTxt.visible = true;
		itemGame1.visible = false;
		itemGame2.visible = true;
		
		buttonPlus.visible = buttonMinus.visible = true;
		
		//memberpayment
		if(typeof memberData != 'undefined'){
			playerData.score = playerData.point = memberData.point;
		}
	}
	
	statusTxt.text = statusText_arr[0];
	gameData.shape.style = defaultStatusBgColor;
	gameData.touch = false;
	gameData.paused = false;
	gameData.wheelNum = -1;
	gameData.wheelInnerNum = -1;
	gameData.spinDirection = spinDirection;
	gameData.spinSpeed = spinSpeed;
	gameData.spindType = true;
	gameData.spinning = false;
	gameData.stopped = true;
	
	updateStat();
	if(gameData.physicsEngine){
		warmUpWheel();
	}
	animateLights('static');
	animateSpinStatus(statusTxt, false);
}

 /*!
 * 
 * STOP GAME - This is the function that runs to stop play game
 * 
 */
function stopGame(){
	stopSoundLoop('soundSpinning');
	TweenMax.killAll();
	
	for(var n=0;n<wheel_arr.length;n++){
		TweenMax.killTweensOf($.wheel[n]);
		$.wheel[n].visible = false;
		
		//slot color feature
		if(wheel_arr[n].slot != undefined && wheel_arr[n].slot.highlightColor != ''){
			TweenMax.killTweensOf($.wheel['slotH'+n]);
			$.wheel['slotH'+n].visible = false;
		}
	}
	
	if(secondWheel){
		for(var n=0;n<wheelSecond_arr.length;n++){
			TweenMax.killTweensOf($.wheelInner[n]);
			$.wheelInner[n].visible = false;
			
			//slot color feature
			if(wheelSecond_arr[n].slot != undefined && wheelSecond_arr[n].slot.highlightColor != ''){
				TweenMax.killTweensOf($.wheelInner['slotH'+n]);
				$.wheelInner['slotH'+n].visible = false;
			}
		}
	}
	
	gameData.touch = false;
	gameData.paused = true;
	toggleWheelActive(false);
}

/*!
 * 
 * SAVE GAME - This is the function that runs to save game
 * 
 */
function saveGame(score){
	/*$.ajax({
      type: "POST",
      url: 'saveResults.php',
      data: {score:score},
      success: function (result) {
          console.log(result);
      }
    });*/
}

function toggleInstruction(con){
	if(con){
		if(gamePlayType){
			instructionTxt.text = instructionTxt1;
		}else{
			instructionTxt.text = instructionTxt2;
		}
		instructionTxt.alpha = 0;
		TweenMax.to(instructionTxt, .2, {delay:1, alpha:1, overwrite:true});
	}else{
		TweenMax.to(instructionTxt, .2, {alpha:0, overwrite:true});	
	}
}

 /*!
 * 
 * GENERATE TICKETS - This is the function that runs to generate tickets
 * 
 */
 var maxDisplayTicket = 5;
function generateTickets(){
	ticketContainer.removeAllChildren();
	
	var startX = canvasW/100 * 34.2;
	var startY = canvasH/100 * 48.5;
	gameData.ticketX = startX;
	
	gameData.totalTickets = gameData.startChance;
	gameData.totalTickets = gameData.totalTickets >= maxDisplayTicket ? maxDisplayTicket : gameData.totalTickets;
	
	for(var n= 0;n<gameData.totalTickets; n++){
		$.ticket[n] = itemTicket.clone();
		$.ticket[n].x = startX;
		$.ticket[n].y = startY;
		startX -= $.ticket[n].image.naturalWidth+1;
		
		ticketContainer.addChild($.ticket[n]);
	}
}

 /*!
 * 
 * ANIMATE TICKETS - This is the function that runs to animate tickets
 * 
 */
function animateInsertTicket(){
	for(var n= 0;n<gameData.totalTickets; n++){
		$.ticket[n].oriX = $.ticket[n].x;
		TweenMax.to($.ticket[n], .5, {x:$.ticket[n].oriX + 36, overwrite:true});
	}	
}

function animateNextTicket(){
	if(!gamePlayType){
		return;	
	}
	
	playSound('soundTicket');
	var startX = gameData.ticketX+36;
	
	var distance = 0;
	if(gameData.startChance > maxDisplayTicket){
		distance = maxDisplayTicket - playerData.chance;
	}else{
		distance = gameData.startChance - playerData.chance;	
	}
	var distanceTicket = playerData.chance >= maxDisplayTicket ? 1 : (distance);
	
	for(var n= 0;n<gameData.totalTickets; n++){
		var newX = 0;
		if(n < distanceTicket){
			newX = gameData.ticketX + $.ticket[n].image.naturalWidth+1;
		}else{
			newX = startX;
			startX -= $.ticket[n].image.naturalWidth+1;
		}
		TweenMax.to($.ticket[n], .5, {x:newX, overwrite:true, onComplete:animateNextTicketDone});
	}	
}

function animateNextTicketDone(){
	if(playerData.chance >= maxDisplayTicket){
		var startX = gameData.ticketX+36;
		for(var n= 0;n<gameData.totalTickets; n++){
			$.ticket[n].x = startX;
			startX -= $.ticket[n].image.naturalWidth+1;
		}
	}
}

 /*!
 * 
 * ADD/DEDUCT BET NUMBER - This is the function that runs to add or deduct bet number
 * 
 */
function toggleBetNumber(con){
	if(gameData.spinning){
		return;	
	}
	
	if(con == 'plus'){
		betData.betNumberPlus = gameCanBet;
	}else if(con == 'minus'){
		betData.betNumberPlus = -(gameCanBet);
	}else{
		betData.betNumberPlus = 0;	
	}
	
	if(con != undefined){
		betData.timer = betData.timerMax;
		loopBetNumber();
	}else{
		clearInterval(betData.interval);	
		betData.interval = null;
	}
}

function loopBetNumber(){
	clearInterval(betData.interval);
	betData.interval = setInterval(loopBetNumber, betData.timer);
	betData.timer-=100;
	betData.timer=betData.timer<betData.timerMin?betData.timerMin:betData.timer;
	
	updateBetNumber();
}

function updateBetNumber(){
	var availableCredit = playerData.score;
	betData.betNumber += betData.betNumberPlus;
	betData.betNumber = betData.betNumber <= 0 ? 0 : betData.betNumber;
	betData.betNumber = betData.betNumber >= gameMaxBet ? gameMaxBet : betData.betNumber;
	betData.betNumber = betData.betNumber >= availableCredit ? availableCredit : betData.betNumber;
	
	playerData.bet = betData.betNumber;
	playerData.point = playerData.score - playerData.bet;
	
	updateStat();
}

/*!
 * 
 * UPDATE STAT - This is the function that runs to update game stat
 * 
 */
function updateStat(){
	if(gamePlayType){
		chanceTxt.text = chancesText.replace('[NUMBER]', playerData.chance);
		creditTxt.text = creditText.replace('[NUMBER]', addCommas(Math.floor(playerData.point)));
	}else{
		creditTxt.text = creditText.replace('[NUMBER]', addCommas(Math.floor(playerData.point)));
		betTxt.text = creditText.replace('[NUMBER]', addCommas(Math.floor(playerData.bet)));	
	}
}

/*!
 * 
 * UPDATE GAME - This is the function that runs to loop game update
 * 
 */
function updateGame(){
	if(gameData.physicsEngine){
		updatePhysics();
	}
	
	//wheel
	if(gameData.spinDirection){
		wheelInnerContainer.rotation -= gameData.rotateInnerNum;
	}else{
		wheelInnerContainer.rotation += gameData.rotateInnerNum;	
	}
	
	if(!gameData.physicsEngine){
		wheelPinContainer.rotation = wheelOuterContainer.rotation;
	}
}

/*!
 * 
 * DRAW WHEELS - This is the function that runs to draw wheels
 * 
 */
function drawWheel(){
	var wheelRadius = 360 / wheel_arr.length;
	for(var n=0;n<wheel_arr.length;n++){
		//pin
		var thisPin = itemPin.clone();
		
		getAnglePosition(thisPin, 0, 0, 205, (wheelRadius * n));
		wheelPinContainer.addChild(thisPin);
		
		//wheel
		var thisWheel = new createjs.Bitmap(loader.getResult('wheel'+n));
		thisWheel.regX = wheel_arr[n].regX;
		thisWheel.regY = wheel_arr[n].regY;
		thisWheel.x = 0;
		thisWheel.y = 0;
		setDirection(thisWheel, thisPin);
		
		if(gameData.physicsEngine){
			thisWheel.rotation -= (wheelRadius * Math.floor(wheel_arr.length/4));
		}else{
			thisWheel.rotation = (wheelRadius * n) + 90;	
		}
		
		$.wheel[n] = new createjs.Bitmap(loader.getResult('wheelH'+n));
		$.wheel[n].regX = wheel_arr[n].regX;
		$.wheel[n].regY = wheel_arr[n].regY;
		$.wheel[n].x = 0;
		$.wheel[n].y = 0;
		$.wheel[n].rotation = thisWheel.rotation;
		$.wheel[n].visible = false;
		
		wheelOuterContainer.addChild(thisWheel, $.wheel[n]);
		
		//slot color feature
		if(wheel_arr[n].slot != undefined){
			$.wheel['slot'+n] = new createjs.Container();
			$.wheel['slot'+n].rotation = thisWheel.rotation;
			wheelOuterContainer.addChild($.wheel['slot'+n]);
			
			if(wheel_arr[n].slot.color != ''){
				var newSlotColor = new createjs.Shape();
				newSlotColor.graphics.clear();
				newSlotColor.graphics.beginFill(wheel_arr[n].slot.color);
				
				var endAngle = Number((360/wheel_arr.length) * (Math.PI / 180));
				newSlotColor.graphics.moveTo(0, 0).arc(0, 0, firstWheelRadius, 0, endAngle, false).closePath();
				newSlotColor.rotation = -90;
				
				$.wheel['slot'+n].addChild(newSlotColor);
			}
				
			//highlight
			if(wheel_arr[n].slot.highlightColor != ''){
				$.wheel['slotH'+n] = new createjs.Shape();
				$.wheel['slotH'+n].graphics.clear();
				$.wheel['slotH'+n].graphics.beginFill(wheel_arr[n].slot.highlightColor).setStrokeStyle(wheel_arr[n].slot.stroke).beginStroke(wheel_arr[n].slot.strokeColor)
				$.wheel['slotH'+n].visible = false;
				
				$.wheel['slotH'+n].graphics.moveTo(0, 0).arc(0, 0, firstWheelRadius, 0, endAngle, false).closePath();
				$.wheel['slotH'+n].rotation = -90;
				$.wheel['slot'+n].addChild($.wheel['slotH'+n]);
			}
			
			//text
			if(wheel_arr[n].slot.text != ''){
				$.wheel['slotText'+n] = new createjs.Text();
				$.wheel['slotText'+n].font = wheel_arr[n].slot.fontSize+"px libel_suitregular";
				$.wheel['slotText'+n].lineHeight = wheel_arr[n].slot.fontSize;
				$.wheel['slotText'+n].color = wheel_arr[n].slot.textColor;
				$.wheel['slotText'+n].textAlign = "center";
				$.wheel['slotText'+n].textBaseline='alphabetic';
				$.wheel['slotText'+n].text = wheel_arr[n].slot.text;
				$.wheel['slotText'+n].regY = wheel_arr[n].slot.textY;
				$.wheel['slotText'+n].rotation = (360/wheel_arr.length)/2;
				
				$.wheel['slot'+n].addChild($.wheel['slotText'+n]);
			}
		}
	}
	
	//inner
	if(secondWheel){
		var wheelInnerRadius = 360 / wheelSecond_arr.length;
		for(var n=0;n<wheelSecond_arr.length;n++){
			var thisWheel = new createjs.Bitmap(loader.getResult('wheelInner'+n));
			thisWheel.regX = wheelSecond_arr[n].regX;
			thisWheel.regY = wheelSecond_arr[n].regY;
			thisWheel.x = 0;
			thisWheel.y = 0;
			thisWheel.rotation = (wheelInnerRadius * n);
			
			$.wheelInner[n] = new createjs.Bitmap(loader.getResult('wheelInnerH'+n));
			$.wheelInner[n].regX = wheelSecond_arr[n].regX;
			$.wheelInner[n].regY = wheelSecond_arr[n].regY;
			$.wheelInner[n].x = 0;
			$.wheelInner[n].y = 0;
			$.wheelInner[n].rotation = (wheelInnerRadius * n);
			$.wheelInner[n].visible = false;
			
			wheelInnerContainer.addChild(thisWheel, $.wheelInner[n]);
			
			//slot color feature
			if(wheelSecond_arr[n].slot != undefined){
				$.wheelInner['slot'+n] = new createjs.Container();
				$.wheelInner['slot'+n].rotation = thisWheel.rotation;
				wheelInnerContainer.addChild($.wheelInner['slot'+n]);
				
				if(wheelSecond_arr[n].slot.color != ''){
					var thisWheel = new createjs.Shape();
					thisWheel.graphics.clear();
					thisWheel.graphics.beginFill(wheelSecond_arr[n].slot.color);
					
					var endAngle = Number((360/wheelSecond_arr.length) * (Math.PI / 180));
					thisWheel.graphics.moveTo(0, 0).arc(0, 0, secondWheelRadius, 0, endAngle, false).closePath();
					thisWheel.rotation = -90;
					
					$.wheelInner['slot'+n].addChild(thisWheel);
				}
					
				//highlight
				if(wheelSecond_arr[n].slot.highlightColor != ''){
					$.wheelInner['slotH'+n] = new createjs.Shape();
					$.wheelInner['slotH'+n].graphics.clear();
					$.wheelInner['slotH'+n].graphics.beginFill(wheelSecond_arr[n].slot.highlightColor).setStrokeStyle(wheelSecond_arr[n].slot.stroke).beginStroke(wheelSecond_arr[n].slot.strokeColor);
					$.wheelInner['slotH'+n].visible = false;
					
					$.wheelInner['slotH'+n].graphics.moveTo(0, 0).arc(0, 0, secondWheelRadius, 0, endAngle, false).lineTo(0, 0).closePath();
					$.wheelInner['slotH'+n].rotation = -90;
					$.wheelInner['slot'+n].addChild($.wheelInner['slotH'+n]);
				}
				
				//text
				if(wheelSecond_arr[n].slot.text != ''){
					$.wheelInner['slotText'+n] = new createjs.Text();
					$.wheelInner['slotText'+n].font = wheelSecond_arr[n].slot.fontSize+"px libel_suitregular";
					$.wheelInner['slotText'+n].lineHeight = wheelSecond_arr[n].slot.fontSize;
					$.wheelInner['slotText'+n].color = wheelSecond_arr[n].slot.textColor;
					$.wheelInner['slotText'+n].textAlign = "center";
					$.wheelInner['slotText'+n].textBaseline='alphabetic';
					$.wheelInner['slotText'+n].text = wheelSecond_arr[n].slot.text;
					$.wheelInner['slotText'+n].regY = wheelSecond_arr[n].slot.textY;
					$.wheelInner['slotText'+n].rotation = (360/wheelSecond_arr.length)/2;
					
					$.wheelInner['slot'+n].addChild($.wheelInner['slotText'+n]);
				}
			}
		}
	}
	
	//lights
	gameData.lightNum = 16;
	var wheelRadius = 360 / gameData.lightNum;
	for(var n=0;n<gameData.lightNum;n++){
		$.light[n] = itemLightAnimate.clone();
		getAnglePosition($.light[n], 0, 0, 238, (wheelRadius * n));
		
		lightsContainer.addChild($.light[n]);	
	}
}

/*!
 * 
 * SPIN WHEEL - This is the function that runs to spin wheel
 * 
 */
function startSpinWheel(con){
	if(gameData.spinning){
		return;	
	}
	
	if(gamePlayType){
		if(playerData.chance <= 0){
			return;	
		}
	}else{
		if(playerData.bet <= 0){
			return;	
		}
	}
	
	toggleInstruction(false);
	gameData.wheelNum = -1;
	gameData.wheelInnerNum = -1;
	gameData.showStatus = false;
	statusTxt.text = statusText_arr[1];
	animateSpinStatus(statusTxt, true);
	gameData.shape.style = defaultStatusBgColor;
	
	for(var n=0;n<wheel_arr.length;n++){
		TweenMax.killTweensOf($.wheel[n]);
		$.wheel[n].visible = false;
		
		//slot color feature
		if(wheel_arr[n].slot != undefined && wheel_arr[n].slot.highlightColor != ''){
			TweenMax.killTweensOf($.wheel['slotH'+n]);
			$.wheel['slotH'+n].visible = false;
		}
	}
	
	if(secondWheel){
		for(var n=0;n<wheelSecond_arr.length;n++){
			TweenMax.killTweensOf($.wheelInner[n]);
			$.wheelInner[n].visible = false;
			
			//slot color feature
			if(wheelSecond_arr[n].slot != undefined && wheelSecond_arr[n].slot.highlightColor != ''){
				TweenMax.killTweensOf($.wheelInner['slotH'+n]);
				$.wheelInner['slotH'+n].visible = false;
			}
		}
	}
	
	playSound('soundSpin');
	playSoundLoop('soundSpinning');
	
	if(con){
		gameData.spinDirection = spinDirection;
		
		if(!gameData.physicsEngine){
			startSpinWheelBig();
		}else{
			startPhysicsSpin();	
		}
	}
	startSpinWheelInner();
	animateLights('spin');
	
	playerData.chance--;
	playerData.chance = playerData.chance < 0 ? 0 : playerData.chance;
		
	//memberpayment
	if(typeof memberData != 'undefined'){
		updateUserPoint();
	}

	updateStat();
	animateNextTicket();
}

function getAnglePosition(obj, x1, y1, radius, angle){
    obj.x = x1 + radius * Math.cos(angle * Math.PI/180);
    obj.y = y1 + radius * Math.sin(angle * Math.PI/180);
}


/*!
 * 
 * START SPIN WHEEL INNER - This is the function that runs to spin inner wheel
 * 
 */
function startSpinWheelBig(){
	gameData.spindType = true;
	gameData.spinning = true;
	gameData.stopped = false;
	
	wheelOuterContainer.rotation = 0;
	var wheelRadius = 360 / wheel_arr.length;
	var rotateNum = gameData.fixedRotate;
	if(rotateNum == -1){
		if(enablePercentage){
			rotateNum = getResultOnPercent();
		}else{
			rotateNum = Math.floor(Math.random()*wheel_arr.length);	
		}
	}
	
	var innerNum = rotateNum;
	if(gameData.spinDirection){
		rotateNum = wheel_arr.length - rotateNum;
	}
	if(!gameData.spinDirection){
		rotateNum = Math.abs((wheelRadius * (rotateNum)) + (wheelRadius/2));
		rotateNum += 90;
	}else{
		rotateNum = Math.abs((wheelRadius * (rotateNum)) - (wheelRadius/2));
		rotateNum -= 90;	
	}
	
	var totalRound = Math.floor(spinSpeed/3.5);
	var totalRoundNum = 360 * totalRound;
	var toRotate = -(totalRoundNum + rotateNum);
	if(gameData.spinDirection){
		toRotate = Math.abs(totalRoundNum + rotateNum);
	}
	
	TweenMax.to(wheelOuterContainer, totalRound, {rotation:toRotate, overwrite:true, ease: Circ.easeOut, onComplete:function(){
		gameData.wheelNum = innerNum;
		TweenMax.to(wheelOuterContainer, 1, {overwrite:true, onComplete:function(){
			checkWheelScore();
		}});
	}});
}


/*!
 * 
 * START SPIN WHEEL INNER - This is the function that runs to spin inner wheel
 * 
 */
function startSpinWheelInner(){
	if(!secondWheel){
		return;	
	}
	
	wheelInnerContainer.rotation = 0;
	var wheelInnerRadius = 360 / wheelSecond_arr.length;
	var rotateNum = gameData.fixedInnerRotate;
	if(rotateNum == -1){
		if(enablePercentage){
			rotateNum = getResultOnPercentInner();
		}else{
			rotateNum = Math.floor(Math.random()*wheelSecond_arr.length);
		}
	}
	var innerNum = rotateNum;
	if(!gameData.spinDirection){
		rotateNum = wheelSecond_arr.length - rotateNum;
	}
	if(gameData.spinDirection){
		rotateNum = Math.abs((wheelInnerRadius * (rotateNum+1)) - (wheelInnerRadius/2));
	}else{
		rotateNum = Math.abs((wheelInnerRadius * (rotateNum)) - (wheelInnerRadius/2));	
	}
	
	var totalRound = Math.floor(spinSpeed/4);
	var totalRoundNum = 360 * totalRound;
	var toRotate = -(totalRoundNum + rotateNum);
	if(!gameData.spinDirection){
		toRotate = Math.abs(totalRoundNum + rotateNum);
	}
	TweenMax.to(wheelInnerContainer, totalRound, {rotation:toRotate, overwrite:true, ease: Circ.easeOut, onComplete:function(){
		playSound('soundSelect');
		gameData.wheelInnerNum = innerNum;
		$.wheelInner[gameData.wheelInnerNum].visible = true;
		animateWheelSegment($.wheelInner[gameData.wheelInnerNum], true);
		
		//slot color feature
		if(wheelSecond_arr[gameData.wheelInnerNum].slot != undefined && wheelSecond_arr[gameData.wheelInnerNum].slot.highlightColor != ''){
			$.wheelInner['slotH'+gameData.wheelInnerNum].visible = true;
			animateWheelSegment($.wheelInner['slotH'+gameData.wheelInnerNum], true);
					
			wheelInnerContainer.setChildIndex($.wheelInner['slot'+gameData.wheelInnerNum], wheelInnerContainer.getNumChildren()-1);
		}
		
		TweenMax.to(wheelInnerContainer, 1, {overwrite:true, onComplete:function(){
			checkWheelScore();
		}});
	}});
}

/*!
 * 
 * CHECK WHEEL SCORE - This is the function that runs to check wheel score
 * 
 */
function checkWheelScore(){
	if(gameData.wheelNum == -1){
		return;	
	}
	
	if(secondWheel && gameData.wheelInnerNum == -1){
		return;
	}
	
	if(gameData.showStatus){
		return;	
	}
	
	stopSoundLoop('soundSpinning');
	gameData.showStatus = true;
	
	$.wheel[gameData.wheelNum].visible = true;
	animateWheelSegment($.wheel[gameData.wheelNum], true);
	
	//slot color feature
	if(wheel_arr[gameData.wheelNum].slot != undefined && wheel_arr[gameData.wheelNum].slot.highlightColor != ''){
		$.wheel['slotH'+gameData.wheelNum].visible = true;
		animateWheelSegment($.wheel['slotH'+gameData.wheelNum], true);
		wheelOuterContainer.setChildIndex($.wheel['slot'+gameData.wheelNum], wheelOuterContainer.getNumChildren()-1);
	}
	
	playSound('soundSelect');
	
	//gameData.wheelNum = 8;
	//gameData.wheelInnerNum = 1;
	var wheelSegmentNumber = wheel_arr[gameData.wheelNum].point;
	var wheelSegmentType = wheel_arr[gameData.wheelNum].type;
	
	if(!gamePlayType){
		playerData.score -= playerData.bet;
		playerData.point = playerData.score;
		betData.betNumber = betData.betNumberPlus = 0;
	}
	
	TweenMax.to(playerData, 1, {overwrite:true, onComplete:function(){
		playSound('soundTone');
		if(secondWheel){
			var wheelInnerSegmentNumber = wheelSecond_arr[gameData.wheelInnerNum].mutiply;
			if(wheelSegmentType == 1){
				//loss all
				playSound('soundLossall');
				statusTxt.text = statusText_arr[6];
				animateLights('lose');
				gameData.spinning = false;
				playerData.score = playerData.bet = 0;
				TweenMax.to(playerData, 1, {point:playerData.score, overwrite:true, onUpdate:updateStat});
				gameData.shape.style = wheel_arr[gameData.wheelNum].color;
				
				checkGameEnd();
			}else{
				statusTxt.text = statusText_arr[2].replace('[NUMBER]', addCommas(wheelSegmentNumber));
				var speedTween = .5;
				TweenMax.to(itemStatusBg, speedTween, {overwrite:true, onComplete:function(){
					playSound('soundTone');
					statusTxt.text = statusText_arr[2].replace('[NUMBER]', addCommas(wheelSegmentNumber)) +' x '+wheelInnerSegmentNumber;
					
					TweenMax.to(itemStatusBg, speedTween, {overwrite:true, onComplete:function(){
						playSound('soundTone');
						var winPoint = wheelSegmentNumber * wheelInnerSegmentNumber;
						if(!gamePlayType){
							winPoint = winPoint * playerData.bet;
							playerData.bet = 0;	
						}
						statusTxt.text = statusText_arr[3].replace('[NUMBER]', addCommas(winPoint));
						
						if(winPoint > 0){
							//win
							if(wheelSegmentType == 2){
								playSound('soundJackpot');
								statusTxt.text = statusText_arr[5].replace('[NUMBER]', addCommas(winPoint));
							}else{
								playSound('soundWin');	
							}
							
							gameData.shape.style = wheel_arr[gameData.wheelNum].color;
							playerData.score += winPoint;
							
							animateLights('win');
							TweenMax.to(playerData, 1, {point:playerData.score, overwrite:true, onUpdate:updateStat});
						}else{
							playSound('soundLoss');
							//no win
							statusTxt.text = statusText_arr[4];
							animateLights('lose');
							if(!gamePlayType){
								updateStat();
							}
						}
						
						gameData.spinning = false;
						checkGameEnd();
					}});
				}});
			}
		}else{
			if(wheelSegmentType == 1){
				//loss all
				playSound('soundLossall');
				statusTxt.text = statusText_arr[6];
				animateLights('lose');
				playerData.score = playerData.bet = 0;
				TweenMax.to(playerData, 1, {point:playerData.score, overwrite:true, onUpdate:updateStat});
				gameData.shape.style = wheel_arr[gameData.wheelNum].color;
				gameData.spinning = false;
				
				checkGameEnd();
			}else{
				var winPoint = wheelSegmentNumber;
				if(!gamePlayType){
					winPoint = winPoint * playerData.bet;
					playerData.bet = 0;
				}
				statusTxt.text = statusText_arr[3].replace('[NUMBER]', addCommas(winPoint));
				
				if(winPoint > 0){
					//win
					if(wheelSegmentType == 2){
						playSound('soundJackpot');
						statusTxt.text = statusText_arr[5].replace('[NUMBER]', addCommas(winPoint));
					}else{
						playSound('soundWin');	
					}
					
					gameData.shape.style = wheel_arr[gameData.wheelNum].color;
					playerData.score += winPoint;
					
					animateLights('win');
					TweenMax.to(playerData, 1, {point:playerData.score, overwrite:true, onUpdate:updateStat});
				}else{
					//no win
					playSound('soundLoss');
					statusTxt.text = statusText_arr[4];
					animateLights('lose');	
					if(!gamePlayType){
						updateStat();
					}
				}
				
				gameData.spinning = false;
				checkGameEnd();
			}
		}
	}});
}

/*!
 * 
 * CHECK GAME END - This is the function that runs to check game end
 * 
 */
function checkGameEnd(){
	if(gamePlayType){
		//memberpayment
		if(typeof memberData != 'undefined'){
			updateUserPoint();
		}

		if(playerData.chance <= 0){
			TweenMax.to(itemStatusBg, 3, {overwrite:true, onComplete:function(){
				goPage('result');
			}});
		}
	}else{
		//memberpayment
		if(typeof memberData != 'undefined'){
			playerData.point = playerData.score;
			updateUserPoint();
		}
		
		if(playerData.score <= 0){
			TweenMax.to(itemStatusBg, 3, {overwrite:true, onComplete:function(){
				goPage('result');
			}});
		}
	}
}

/*!
 * 
 * ANIMATE WHEEL LIGHTS - This is the function that runs to animate wheel lights
 * 
 */
function animateLights(type){
	TweenMax.killTweensOf(lightData);
	TweenMax.killTweensOf(itemWheel);
	
	switch(type){
		case 'static':
			lightData.side = true;
			loopAnimateLights();
		break;
		
		case 'spin':
			lightData.num = 0;
			loopAnimateSpinLights();
		break;
		
		case 'win':
			lightData.side = true;
			loopAnimateWinLights();
			
			TweenMax.to(itemWheel, 3, {overwrite:true, onComplete:animateLights, onCompleteParams:['static']});
		break;
		
		case 'lose':
			for(var n=0;n<gameData.lightNum;n++){
				$.light[n].gotoAndStop('off');
				if(isEven(n)){
					$.light[n].gotoAndStop('on');	
				}
			}
			
			TweenMax.to(itemWheel, 3, {overwrite:true, onComplete:animateLights, onCompleteParams:['static']});
		break;
	}
}

function loopAnimateLights(){
	for(var n=0;n<gameData.lightNum;n++){
		$.light[n].gotoAndStop('off');
		if(lightData.side && isEven(n)){
			$.light[n].gotoAndStop('on');	
		}
		
		if(!lightData.side && !isEven(n)){
			$.light[n].gotoAndStop('on');	
		}
	}
	
	lightData.side = lightData.side == false ? true : false;
	TweenMax.to(lightData, .5, {overwrite:true, onComplete:loopAnimateLights});
}

function loopAnimateSpinLights(){
	for(var n=0;n<gameData.lightNum;n++){
		$.light[n].gotoAndStop('off');
		if(n == lightData.num){
			$.light[n].gotoAndStop('on');	
		}
	}
	
	if(gameData.spinDirection){
		lightData.num++;
		lightData.num = lightData.num >= gameData.lightNum ? 0 : lightData.num;	
	}else{
		lightData.num--;
		lightData.num = lightData.num < 0 ? gameData.lightNum-1 : lightData.num;
	}
	
	TweenMax.to(lightData, .05, {overwrite:true, onComplete:loopAnimateSpinLights});
}

function loopAnimateWinLights(){
	for(var n=0;n<gameData.lightNum;n++){
		$.light[n].gotoAndStop('off');
		if(lightData.side){
			$.light[n].gotoAndStop('on');
		}
	}
	
	lightData.side = lightData.side == false ? true : false;
	TweenMax.to(lightData, .1, {overwrite:true, onComplete:loopAnimateWinLights});
}

/*!
 * 
 * ANIMATE WHEEL SEGMENT - This is the function that runs to animate wheel segment
 * 
 */
function animateWheelSegment(obj, con, alpha){
	var tweenSpeed = .1;
	if(con){
		var alphaNum = 1;
		if(alpha){
			alpha = false;
			alphaNum = 0;
		}else{
			alpha = true;
		}
		TweenMax.to(obj, tweenSpeed, {alpha:alphaNum, overwrite:true, onComplete:animateWheelSegment, onCompleteParams:[obj, con, alpha]});
	}else{
		TweenMax.to(obj, tweenSpeed, {alpha:0, overwrite:true});	
	}
}

/*!
 * 
 * ANIMATE STATUS - This is the function that runs to animate status
 * 
 */
function animateSpinStatus(obj, con, alpha){
	var tweenSpeed = .1;
	if(con){
		var alphaNum = 1;
		if(alpha){
			alpha = false;
			alphaNum = .5;
		}else{
			alpha = true;
		}
		TweenMax.to(obj, tweenSpeed, {alpha:alphaNum, overwrite:true, onComplete:animateSpinStatus, onCompleteParams:[obj, con, alpha]});
	}else{
		TweenMax.to(obj, tweenSpeed, {alpha:1, overwrite:true});	
	}
}

/*!
 * 
 * SAVE GAME - This is the function that runs to fixed result
 * 
 */
function getResult(wheelNum, wheelInnerNum){
	gameData.fixedRotate = wheelNum;
	gameData.fixedInnerRotate = wheelInnerNum;
}

/*!
 * 
 * PERCENTAGE - This is the function that runs to create result percentage
 * 
 */
function createPercentage(){
	gameData.percentageArray = [];
	gameData.percentageInnerArray = [];
	
	//outer
	for(var n=0; n<wheel_arr.length; n++){
		gameData.percentageArray.push({slot:n, percent:wheel_arr[n].percent});
	}
	sortOnObject(gameData.percentageArray, 'percent', false);
	
	//inner
	for(var n=0; n<wheelSecond_arr.length; n++){
		gameData.percentageInnerArray.push({slot:n, percent:wheelSecond_arr[n].percent});
	}
	sortOnObject(gameData.percentageInnerArray, 'percent', false);
}

function getResultOnPercent(){
	var randomInt = Math.floor(Math.random()*100);
	var currentPercent = -1;
	var resultArray = [];
	
	for(var n=0; n<gameData.percentageArray.length; n++){
		if(n == gameData.percentageArray.length-1){
			if(currentPercent == -1){
				resultArray.push(gameData.percentageArray[n].slot);
			}else if(currentPercent == gameData.percentageArray[n].percent){
				resultArray.push(gameData.percentageArray[n].slot);	
			}
		}else if(randomInt <= gameData.percentageArray[n].percent){
			if(currentPercent == -1){
				resultArray.push(gameData.percentageArray[n].slot);
			}else if(currentPercent == gameData.percentageArray[n].percent){
				resultArray.push(gameData.percentageArray[n].slot);	
			}
		}
		
		if(currentPercent == -1 && resultArray.length > 0){
			currentPercent = gameData.percentageArray[n].percent;
		}
	}
	
	shuffle(resultArray);
	return resultArray[0];
}

function getResultOnPercentInner(){
	var randomInt = Math.floor(Math.random()*100);
	var currentPercent = -1;
	var resultArray = [];
	
	for(var n=0; n<gameData.percentageInnerArray.length; n++){
		if(n == gameData.percentageInnerArray.length-1){
			if(currentPercent == -1){
				resultArray.push(gameData.percentageInnerArray[n].slot);
			}else if(currentPercent == gameData.percentageInnerArray[n].percent){
				resultArray.push(gameData.percentageInnerArray[n].slot);	
			}
		}else if(randomInt <= gameData.percentageInnerArray[n].percent){
			if(currentPercent == -1){
				resultArray.push(gameData.percentageInnerArray[n].slot);
			}else if(currentPercent == gameData.percentageInnerArray[n].percent){
				resultArray.push(gameData.percentageInnerArray[n].slot);	
			}
		}
		
		if(currentPercent == -1 && resultArray.length > 0){
			currentPercent = gameData.percentageInnerArray[n].percent;
		}
	}
	
	shuffle(resultArray);
	return resultArray[0];	
}

/*!
 * 
 * OPTIONS - This is the function that runs to toggle options
 * 
 */

function toggleOption(){
	if(optionsContainer.visible){
		optionsContainer.visible = false;
	}else{
		optionsContainer.visible = true;
	}
}


/*!
 * 
 * OPTIONS - This is the function that runs to mute and fullscreen
 * 
 */
function toggleGameMute(con){
	buttonSoundOff.visible = false;
	buttonSoundOn.visible = false;
	toggleMute(con);
	if(con){
		buttonSoundOn.visible = true;
	}else{
		buttonSoundOff.visible = true;	
	}
}

function toggleFullScreen() {
  if (!document.fullscreenElement &&    // alternative standard method
      !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement ) {  // current working methods
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) {
      document.documentElement.msRequestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
}

function toggleConfirm(con){
	confirmContainer.visible = con;
	
	if(con){
		TweenMax.pauseAll(true, true);
		gameData.paused = true;
	}else{
		TweenMax.resumeAll(true, true)
		gameData.paused = false;
	}
}


/*!
 * 
 * SHARE - This is the function that runs to open share url
 * 
 */
function share(action){
	gtag('event','click',{'event_category':'share','event_label':action});
	
	var loc = location.href
	loc = loc.substring(0, loc.lastIndexOf("/") + 1);
	
	var title = '';
	var text = '';
	
	title = shareTitle.replace("[SCORE]", addCommas(playerData.score));
	text = shareMessage.replace("[SCORE]", addCommas(playerData.score));
	var shareurl = '';
	
	if( action == 'twitter' ) {
		shareurl = 'https://twitter.com/intent/tweet?url='+loc+'&text='+text;
	}else if( action == 'facebook' ){
		shareurl = 'https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(loc+'share.php?desc='+text+'&title='+title+'&url='+loc+'&thumb='+loc+'share.jpg&width=590&height=300');
	}else if( action == 'google' ){
		shareurl = 'https://plus.google.com/share?url='+loc;
	}else if( action == 'whatsapp' ){
		shareurl = "whatsapp://send?text=" + encodeURIComponent(text) + " - " + encodeURIComponent(loc);
	}
	
	window.open(shareurl);
}