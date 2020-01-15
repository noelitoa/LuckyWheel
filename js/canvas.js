////////////////////////////////////////////////////////////
// CANVAS
////////////////////////////////////////////////////////////
var stage
var canvasW=0;
var canvasH=0;

/*!
 * 
 * START GAME CANVAS - This is the function that runs to setup game canvas
 * 
 */
function initGameCanvas(w,h){
	var gameCanvas = document.getElementById("gameCanvas");
	gameCanvas.width = w;
	gameCanvas.height = h;
	
	canvasW=w;
	canvasH=h;
	stage = new createjs.Stage("gameCanvas");
	
	createjs.Touch.enable(stage);
	stage.enableMouseOver(20);
	stage.mouseMoveOutside = true;
	
	createjs.Ticker.setFPS(60);
	createjs.Ticker.addEventListener("tick", tick);	
}

var guide = false;
var canvasContainer, mainContainer, gameContainer, wheelOuterContainer, wheelInnerContainer, lightsContainer, ticketContainer, resultContainer;
var guideline, bg, logo, buttonStart, buttonReplay, buttonFacebook, buttonTwitter, buttonWhatsapp, buttonFullscreen, buttonSoundOn, buttonSoundOff;

$.wheel = {};
$.wheelInner = {};
$.ticket = {};
$.light = {};

/*!
 * 
 * BUILD GAME CANVAS ASSERTS - This is the function that runs to build game canvas asserts
 * 
 */
function buildGameCanvas(){
	canvasContainer = new createjs.Container();
	mainContainer = new createjs.Container();
	gameContainer = new createjs.Container();
	wheelContainer = new createjs.Container();
	wheelOuterContainer = new createjs.Container();
	wheelInnerContainer = new createjs.Container();
	wheelPinContainer = new createjs.Container();
	lightsContainer = new createjs.Container();
	ticketContainer = new createjs.Container();
	resultContainer = new createjs.Container();
	
	bg = new createjs.Bitmap(loader.getResult('background'));
	logo = new createjs.Bitmap(loader.getResult('logo'));
	
	buttonStart = new createjs.Bitmap(loader.getResult('buttonStart'));
	centerReg(buttonStart);
	buttonStart.x = canvasW/100 * 28;
	buttonStart.y = canvasH/100 * 60;
	
	//game
	bgWheel = new createjs.Bitmap(loader.getResult('bgWheel'));
	
	itemWheel = new createjs.Bitmap(loader.getResult('itemWheel'));
	centerReg(itemWheel);
	itemWheelCentre = new createjs.Bitmap(loader.getResult('itemWheelCentre'));
	centerReg(itemWheelCentre);
	itemWheel.x = itemWheelCentre.x = wheelOuterContainer.x = wheelInnerContainer.x = wheelPinContainer.x = lightsContainer.x = wheelX;
	itemWheel.y = itemWheelCentre.y = wheelOuterContainer.y = wheelInnerContainer.y = wheelPinContainer.y = lightsContainer.y = wheelY;
	
	itemArrow = new createjs.Bitmap(loader.getResult('itemArrow'));
	itemArrow.regX = 27;
	itemArrow.regY = 14;
	itemArrow.x = arrowX;
	itemArrow.y = arrowY;
	
	itemPin = new createjs.Bitmap(loader.getResult('itemPin'));
	centerReg(itemPin);
	itemPin.x = -500;
	
	itemSide = new createjs.Bitmap(loader.getResult('itemSide'));
	centerReg(itemSide);
	itemSide.x = canvasW/100 * 28;
	itemSide.y = canvasH/100 * 50;
	
	itemGame1 = new createjs.Bitmap(loader.getResult('itemGame1'));
	centerReg(itemGame1);
	itemGame1.x = canvasW/100 * 28;
	itemGame1.y = canvasH/100 * 50;
	
	itemGame2 = new createjs.Bitmap(loader.getResult('itemGame2'));
	centerReg(itemGame2);
	itemGame2.x = canvasW/100 * 28;
	itemGame2.y = canvasH/100 * 50;
	
	buttonSpin = new createjs.Bitmap(loader.getResult('buttonSpin'));
	centerReg(buttonSpin);
	buttonSpin.x = canvasW/100 * 28;
	buttonSpin.y = canvasH/100 * 67;
	
	buttonPlus = new createjs.Bitmap(loader.getResult('buttonPlus'));
	centerReg(buttonPlus);
	buttonPlus.x = canvasW/100 * 18;
	
	buttonMinus = new createjs.Bitmap(loader.getResult('buttonMinus'));
	centerReg(buttonMinus);
	buttonMinus.x = canvasW/100 * 38;
	buttonPlus.y = buttonMinus.y = canvasH/100 * 53;
		
	itemStatusBg = new createjs.Shape();
 	itemStatusBg.graphics.beginFill("red");
	gameData.shape = itemStatusBg.graphics.beginFill("red").command;
	itemStatusBg.graphics.drawRoundRectComplex(canvasW/100 * 13.9, canvasH/100 * 27.3, 360, 63, 5, 5, 5, 5);
	
	statusTxt = new createjs.Text();
	statusTxt.font = "45px libel_suitregular";
	statusTxt.color = "#fff";
	statusTxt.textAlign = "center";
	statusTxt.textBaseline='alphabetic';
	statusTxt.text = '$300';
	statusTxt.x = canvasW/100 * 28;
	statusTxt.y = canvasH/100 * 34;
	
	instructionTxt = new createjs.Text();
	instructionTxt.font = "30px libel_suitregular";
	instructionTxt.color = "#fff";
	instructionTxt.textAlign = "center";
	instructionTxt.textBaseline='alphabetic';
	instructionTxt.text = '';
	instructionTxt.lineHeight = 32;
	instructionTxt.x = canvasW/100 * 28;
	instructionTxt.y = canvasH/100 * 80;
	
	var _frameW=22;
	var _frameH=22;
	var _frame = {"regX": _frameW/2, "regY": _frameH/2, "height": _frameH, "count": 2, "width": _frameW};
	var _animations = {off:{frames: [0], speed:1},
						on:{frames: [1], speed:1}};
						
	itemLightData = new createjs.SpriteSheet({
		"images": [loader.getResult("itemLight").src],
		"frames": _frame,
		"animations": _animations
	});
	
	itemLightAnimate = new createjs.Sprite(itemLightData, "off");
	itemLightAnimate.framerate = 20;
	itemLightAnimate.x = -100;
	
	itemTicket = new createjs.Bitmap(loader.getResult('itemTicket'));
	itemTicket.regX = itemTicket.image.naturalWidth;
	itemTicket.x = -500;
	
	itemTicketMask = new createjs.Shape();
 	itemTicketMask.graphics.beginFill("red");
	itemTicketMask.graphics.drawRect(0, canvasH/100 * 48.5, 438, 70);
	itemTicketMask.alpha = 0;
	ticketContainer.mask = itemTicketMask;
	
	chanceTxt = new createjs.Text();
	chanceTxt.font = "45px libel_suitregular";
	chanceTxt.color = "#652312";
	chanceTxt.textAlign = "center";
	chanceTxt.textBaseline='alphabetic';
	chanceTxt.text = '$300';
	chanceTxt.x = canvasW/100 * 39;
	chanceTxt.y = canvasH/100 * 56;
	
	betTxt = new createjs.Text();
	betTxt.font = "45px libel_suitregular";
	betTxt.color = "#652312";
	betTxt.textAlign = "center";
	betTxt.textBaseline='alphabetic';
	betTxt.text = '0';
	betTxt.x = canvasW/100 * 28;
	betTxt.y = canvasH/100 * 56;
	
	creditTxt = new createjs.Text();
	creditTxt.font = "45px libel_suitregular";
	creditTxt.color = "#652312";
	creditTxt.textAlign = "center";
	creditTxt.textBaseline='alphabetic';
	creditTxt.text = 'CREDIT : $500';
	creditTxt.x = canvasW/100 * 28;
	creditTxt.y = canvasH/100 * 43.5;
	
	//result
	itemResultSide = new createjs.Bitmap(loader.getResult('itemSide'));
	centerReg(itemResultSide);
	itemResultSide.x = canvasW/100 * 28;
	itemResultSide.y = canvasH/100 * 50;
	
	resultTitleTxt = new createjs.Text();
	resultTitleTxt.font = "60px libel_suitregular";
	resultTitleTxt.color = "#652312";
	resultTitleTxt.textAlign = "center";
	resultTitleTxt.textBaseline='alphabetic';
	resultTitleTxt.text = resultTitleText;
	resultTitleTxt.x = canvasW/100 * 28;
	resultTitleTxt.y = canvasH/100 * 35;
	
	resultScoreTxt = new createjs.Text();
	resultScoreTxt.font = "45px libel_suitregular";
	resultScoreTxt.color = "#652312";
	resultScoreTxt.textAlign = "center";
	resultScoreTxt.textBaseline='alphabetic';
	resultScoreTxt.text = 'CREDIT : $500';
	resultScoreTxt.x = canvasW/100 * 28;
	resultScoreTxt.y = canvasH/100 * 43.5;
	
	resultShareTxt = new createjs.Text();
	resultShareTxt.font = "20px libel_suitregular";
	resultShareTxt.color = "#666";
	resultShareTxt.textAlign = "center";
	resultShareTxt.textBaseline='alphabetic';
	resultShareTxt.text = shareText;
	resultShareTxt.x = canvasW/100 * 28;
	resultShareTxt.y = canvasH/100 * 49.5;
	
	buttonFacebook = new createjs.Bitmap(loader.getResult('buttonFacebook'));
	buttonTwitter = new createjs.Bitmap(loader.getResult('buttonTwitter'));
	buttonWhatsapp = new createjs.Bitmap(loader.getResult('buttonWhatsapp'));
	centerReg(buttonFacebook);
	createHitarea(buttonFacebook);
	centerReg(buttonTwitter);
	createHitarea(buttonTwitter);
	centerReg(buttonWhatsapp);
	createHitarea(buttonWhatsapp);
	buttonFacebook.x = canvasW/100 * 20;
	buttonTwitter.x = canvasW/100 * 28;
	buttonWhatsapp.x = canvasW/100 * 36;
	buttonFacebook.y = buttonTwitter.y = buttonWhatsapp.y = canvasH/100*54.5;
	
	buttonReplay = new createjs.Bitmap(loader.getResult('buttonReplay'));
	centerReg(buttonReplay);
	createHitarea(buttonReplay);
	buttonReplay.x = canvasW/100 * 28;
	buttonReplay.y = canvasH/100 * 67;
	
	//option
	buttonFullscreen = new createjs.Bitmap(loader.getResult('buttonFullscreen'));
	centerReg(buttonFullscreen);
	buttonSoundOn = new createjs.Bitmap(loader.getResult('buttonSoundOn'));
	centerReg(buttonSoundOn);
	buttonSoundOff = new createjs.Bitmap(loader.getResult('buttonSoundOff'));
	centerReg(buttonSoundOff);
	buttonSoundOn.visible = false;
	buttonExit = new createjs.Bitmap(loader.getResult('buttonExit'));
	centerReg(buttonExit);
	buttonSettings = new createjs.Bitmap(loader.getResult('buttonSettings'));
	centerReg(buttonSettings);
	
	createHitarea(buttonFullscreen);
	createHitarea(buttonSoundOn);
	createHitarea(buttonSoundOff);
	createHitarea(buttonExit);
	createHitarea(buttonSettings);
	optionsContainer = new createjs.Container();
	optionsContainer.addChild(buttonFullscreen, buttonSoundOn, buttonSoundOff, buttonExit);
	optionsContainer.visible = false;
	
	//exit
	itemExit = new createjs.Bitmap(loader.getResult('itemExit'));
	
	buttonYes = new createjs.Bitmap(loader.getResult('buttonYes'));
	centerReg(buttonYes);
	buttonYes.x = canvasW/100* 40;
	buttonYes.y = canvasH/100 * 60;
	
	buttonNo = new createjs.Bitmap(loader.getResult('buttonNo'));
	centerReg(buttonNo);
	buttonNo.x = canvasW/100 * 60;
	buttonNo.y = canvasH/100 * 60;
	
	confirmMessageTxt = new createjs.Text();
	confirmMessageTxt.font = "45px libel_suitregular";
	confirmMessageTxt.lineHeight = 50;
	confirmMessageTxt.color = "#662312";
	confirmMessageTxt.textAlign = "center";
	confirmMessageTxt.textBaseline='alphabetic';
	confirmMessageTxt.text = exitMessage;
	confirmMessageTxt.x = canvasW/2;
	confirmMessageTxt.y = canvasH/100 *37;
	
	confirmContainer = new createjs.Container();
	confirmContainer.addChild(itemExit, buttonYes, buttonNo, confirmMessageTxt);
	confirmContainer.visible = false;
	
	if(guide){
		guideline = new createjs.Shape();	
		guideline.graphics.setStrokeStyle(2).beginStroke('red').drawRect((stageW-contentW)/2, (stageH-contentH)/2, contentW, contentH);
	}
	
	mainContainer.addChild(logo, buttonStart);
	wheelContainer.addChild(bgWheel, wheelOuterContainer, wheelInnerContainer, itemWheelCentre, itemWheel, lightsContainer, itemArrow, wheelPinContainer);
	gameContainer.addChild(itemPin, itemLightAnimate, itemTicket, itemSide, itemGame1, itemGame2, itemTicketMask, ticketContainer, creditTxt, chanceTxt, betTxt, buttonMinus, buttonPlus, buttonSpin, itemStatusBg, statusTxt, instructionTxt);
	resultContainer.addChild(itemResultSide, resultTitleTxt, resultScoreTxt, buttonReplay);
	
	if(shareEnable){
		resultContainer.addChild(resultShareTxt, buttonFacebook, buttonTwitter, buttonWhatsapp);
	}
	
	canvasContainer.addChild(bg, wheelContainer, mainContainer, gameContainer, resultContainer, confirmContainer, optionsContainer, buttonSettings, guideline);
	stage.addChild(canvasContainer);
	
	resizeCanvas();
}


/*!
 * 
 * RESIZE GAME CANVAS - This is the function that runs to resize game canvas
 * 
 */
function resizeCanvas(){
 	if(canvasContainer!=undefined){
		buttonSettings.x = (canvasW - offset.x) - 50;
		buttonSettings.y = offset.y + 45;
		
		var distanceNum = 50;
		if(curPage != 'game'){
			buttonExit.visible = false;
			buttonSoundOn.x = buttonSoundOff.x = buttonSettings.x;
			buttonSoundOn.y = buttonSoundOff.y = buttonSettings.y+distanceNum;
			buttonSoundOn.x = buttonSoundOff.x;
			buttonSoundOn.y = buttonSoundOff.y = buttonSettings.y+(distanceNum);
			
			buttonFullscreen.x = buttonSettings.x;
			buttonFullscreen.y = buttonSettings.y+(distanceNum*2);
		}else{
			buttonExit.visible = true;
			buttonSoundOn.x = buttonSoundOff.x = buttonSettings.x;
			buttonSoundOn.y = buttonSoundOff.y = buttonSettings.y+distanceNum;
			buttonSoundOn.x = buttonSoundOff.x;
			buttonSoundOn.y = buttonSoundOff.y = buttonSettings.y+(distanceNum);
			
			buttonFullscreen.x = buttonSettings.x;
			buttonFullscreen.y = buttonSettings.y+(distanceNum*2);
			
			buttonExit.x = buttonSettings.x;
			buttonExit.y = buttonSettings.y+(distanceNum*3);
		}
	}
}

/*!
 * 
 * REMOVE GAME CANVAS - This is the function that runs to remove game canvas
 * 
 */
 function removeGameCanvas(){
	 stage.autoClear = true;
	 stage.removeAllChildren();
	 stage.update();
	 createjs.Ticker.removeEventListener("tick", tick);
	 createjs.Ticker.removeEventListener("tick", stage);
 }

/*!
 * 
 * CANVAS LOOP - This is the function that runs for canvas loop
 * 
 */ 
function tick(event) {
	updateGame();
	stage.update(event);
}

/*!
 * 
 * CANVAS MISC FUNCTIONS
 * 
 */
function centerReg(obj){
	obj.regX=obj.image.naturalWidth/2;
	obj.regY=obj.image.naturalHeight/2;
}

function createHitarea(obj){
	obj.hitArea = new createjs.Shape(new createjs.Graphics().beginFill("#000").drawRect(0, 0, obj.image.naturalWidth, obj.image.naturalHeight));	
}