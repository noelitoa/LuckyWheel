////////////////////////////////////////////////////////////
// P2
////////////////////////////////////////////////////////////

var timeStep = (1/60);
var ppm = 24, // pixels per meter
    physicsWidth = 0,
    physicsHeight = 0,
    physicsCenterX = 0,
    physicsCenterY = 0;

var world, wheel, arrow, mouseBody, mouseConstraint;
var arrowMaterial, pinMaterial, contactMaterial;
var oldAngle = 0;
var oldCount = 0;

/*!
 * 
 * START PHYSICS - This is the function that runs to setup physics
 * 
 */
 
function initPhysics(w, h, x, y) {
	physicsWidth = w / ppm,
    physicsHeight = h / ppm,
    physicsCenterX = physicsWidth / 2,
    physicsCenterY = physicsHeight / 2;
	
    world = new p2.World();
    world.solver.iterations = 100;
    world.solver.tolerance = 0;

    arrowMaterial = new p2.Material();
    pinMaterial = new p2.Material();
    contactMaterial = new p2.ContactMaterial(arrowMaterial, pinMaterial, {
        friction:0.0,
        restitution:0.1
    });
    world.addContactMaterial(contactMaterial);
	world.on('beginContact', function (e) {playSound('soundArrow');});
	
	var wheelRadius = 9,
        wheelX = x / ppm,
        wheelY = y / ppm,
        arrowX = wheelX,
        arrowY = wheelY + 8.625;
	
	
    wheel = new Wheel(wheelX, wheelY, wheelRadius, wheel_arr.length, 0.25, 7.5);
	wheel.body.angle = (Math.PI / 32.5);
    arrow = new Arrow(arrowX, arrowY, 0.5, 1.5);
	mouseBody = new p2.Body();
    world.addBody(mouseBody);
	
	if(touchSpin){
		stage.on("stagemousedown", beginDrag);
		stage.on("stagemousemove", updateMouseBodyPosition);
		stage.on("stagemouseup", endDrag);
		stage.on("mouseleave", endDrag);
	}
}

/*!
 * 
 * DRAG AND DROP PHYSICS - This is the function that runs for drag and drop events
 * 
 */
function updateMouseBodyPosition(e) {
    mouseBody.position[0] = (e.stageX) / ppm;
    mouseBody.position[1] = physicsHeight -(e.stageY) / ppm;
}

function beginDrag(e) {
	world.removeConstraint(mouseConstraint);
	mouseConstraint = null;
	
	if(gameData.paused || gameData.spinning){
		return;	
	}else{
		if(!gamePlayType){
			if(playerData.bet <= 0){
				return;	
			}
		}
		gameData.touch = true;
	}
	
    if (world.hitTest(mouseBody.position, [wheel.body])[0]) {
        mouseConstraint = new p2.RevoluteConstraint(mouseBody, wheel.body, {
            worldPivot:mouseBody.position,
            collideConnected:false
        });
        world.addConstraint(mouseConstraint);
    }
}

function endDrag(e) {
	if (mouseConstraint) {
		world.removeConstraint(mouseConstraint);
        mouseConstraint = null;

        if (gameData.spinning === false && gameData.stopped === true) {
            if ( Math.abs(wheel.body.angularVelocity) > 7.5) {
				if(wheel.body.angularVelocity > 0){
					gameData.spinDirection = false;	
				}else{
					gameData.spinDirection = true;	
				}
				gameData.velocity = wheel.body.angularVelocity;
				gameData.spinSpeed = Math.abs(gameData.velocity);
                startSpinWheel(false);
				startPhysicsTouchSpin();
            }
        }
    }
	gameData.touch = false;
}

/*!
 * 
 * UPDATE PHYSICS - This is the function that runs to update physics
 * 
 */
function updatePhysics() {
    world.step(timeStep * 0.25);
    world.step(timeStep * 0.25);
	
	wheel.updateCanvas();
    arrow.updateCanvas();
	
	var spinComplete = false;
	if(gameData.spinDirection){
		if (gameData.spinning === true && gameData.stopped === false && wheel.body.angularVelocity > -.5 && arrow.hasStopped()) {
			spinComplete = true;
		}
	}else{
		if (gameData.spinning === true && gameData.stopped === false && wheel.body.angularVelocity < .5 && arrow.hasStopped()) {
			spinComplete = true;
		}	
	}
	
	if(gameData.spinning){
		oldCount++;
		if(oldCount > 30){
			oldCount = 0;
			if(oldAngle == wheel.body.angularVelocity){
				console.log('stuck : '+gameData.spindType);
				if(gameData.spindType){
					startPhysicsSpin();
				}else{
					startPhysicsTouchSpin();
				}
			}
		}
		
	}
	
    if (spinComplete) {
		gameData.stopped = true;
		
		var currentRotation = wheel.body.angle % (Math.PI * 2),
        currentSegment = Math.floor(currentRotation / wheel.deltaPI);
		
		if(wheel.body.angle < 0){
			currentSegment = wheel_arr.length - Math.abs(currentSegment)
		}else{
			currentSegment = Math.abs(currentSegment);
		}
		gameData.wheelNum = currentSegment;
		checkWheelScore();
    }
}

function warmUpWheel(){
	wheel.body.angularVelocity = -1;	
}

function startPhysicsSpin(){
	gameData.spindType = true;
	gameData.spinning = true;
	gameData.stopped = false;
	
	var randomAngle = Math.random()*5;
	randomAngle += spinSpeed;
	
	if(gameData.spinDirection){
		wheel.body.angularVelocity = -randomAngle;
	}else{
		wheel.body.angularVelocity = randomAngle;
	}
	
	grabOldVelocity();
}

function startPhysicsTouchSpin(){
	gameData.spindType = false;
	gameData.spinning = true;
	gameData.stopped = false;
	
	wheel.body.angularVelocity = gameData.velocity;
	grabOldVelocity();
}

function grabOldVelocity(){
	oldAngle = 0;
	oldCount = 0;
	oldAngle = wheel.body.angularVelocity;
}

/*!
 * 
 * WHEEL - This is the function that runs to build wheel
 * 
 */
function Wheel(x, y, radius, segments, pinRadius, pinDistance) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.segments = segments;
    this.pinRadius = pinRadius;
    this.pinDistance = pinDistance;

    this.pX = this.x * ppm;
    this.pY = (physicsHeight - this.y) * ppm;
    this.pRadius = this.radius * ppm;
    this.pPinRadius = this.pinRadius * ppm;
    this.pPinPositions = [];

    this.deltaPI = (Math.PI * 2) / this.segments;

    this.createBody();
    this.createPins();
}
Wheel.prototype = {
    createBody:function() {
        this.body = new p2.Body({mass:.8, position:[this.x, this.y]});
        this.body.angularDamping = 0.0;
        this.body.addShape(new p2.Circle(this.radius));
        this.body.shapes[0].sensor = true; //TODO use collision bits instead

        var axis = new p2.Body({position:[this.x, this.y]});
        var constraint = new p2.LockConstraint(this.body, axis);
        constraint.collideConnected = false;

        world.addBody(this.body);
        world.addBody(axis);
        world.addConstraint(constraint);
    },
    createPins:function() {
        var l = this.segments,
            pin = new p2.Circle(this.pinRadius);

        pin.material = pinMaterial;
		
        for (var i = 0; i < l; i++) {
            var x = Math.cos(i / l * (Math.PI * 2)) * this.pinDistance,
                y = Math.sin(i / l * (Math.PI * 2)) * this.pinDistance;
			
            this.body.addShape(pin, [x, y]);
            this.pPinPositions[i] = [x * ppm, -y * ppm];
        }
    },
    updateCanvas:function() {
		wheelOuterContainer.rotation = wheelPinContainer.rotation = -(this.body.angle) * 180 / Math.PI;
    }
};

/*!
 * 
 * ARROW - This is the function that runs to build arrow
 * 
 */
function Arrow(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.verts = [];

    this.pX = this.x * ppm;
    this.pY = (physicsHeight - this.y) * ppm;
    this.pVerts = [];

    this.createBody();
}
Arrow.prototype = {
    createBody:function() {
        this.body = new p2.Body({mass:1, position:[this.x, this.y]});
        this.body.addShape(this.createArrowShape());

        var axis = new p2.Body({position:[this.x, this.y]});
        var constraint = new p2.RevoluteConstraint(this.body, axis, {
            worldPivot:[this.x, this.y]
        });
        constraint.collideConnected = false;

        var left = new p2.Body({position:[this.x - 2, this.y]});
        var right = new p2.Body({position:[this.x + 2, this.y]});
        var leftConstraint = new p2.DistanceConstraint(this.body, left, {
            localAnchorA:[-this.w * 2, this.h * 0.25],
            collideConnected:false
        });
        var rightConstraint = new p2.DistanceConstraint(this.body, right, {
            localAnchorA:[this.w * 2, this.h * 0.25],
            collideConnected:false
        });
        var s = 200,
            r = 10;

        leftConstraint.setStiffness(s);
        leftConstraint.setRelaxation(r);
        rightConstraint.setStiffness(s);
        rightConstraint.setRelaxation(r);

        world.addBody(this.body);
        world.addBody(axis);
        world.addConstraint(constraint);
        world.addConstraint(leftConstraint);
        world.addConstraint(rightConstraint);
    },

    createArrowShape:function() {
        this.verts[0] = [0, this.h * 0.25];
        this.verts[1] = [-this.w * 0.5, 0];
        this.verts[2] = [0, -this.h * 0.75];
        this.verts[3] = [this.w * 0.5, 0];

        this.pVerts[0] = [this.verts[0][0] * ppm, -this.verts[0][1] * ppm];
        this.pVerts[1] = [this.verts[1][0] * ppm, -this.verts[1][1] * ppm];
        this.pVerts[2] = [this.verts[2][0] * ppm, -this.verts[2][1] * ppm];
        this.pVerts[3] = [this.verts[3][0] * ppm, -this.verts[3][1] * ppm];

        var shape = new p2.Convex(this.verts);
        shape.material = arrowMaterial;

        return shape;
    },
    hasStopped:function() {
        var angle = Math.abs(this.body.angle % (Math.PI * 2));
        return (angle < 1e-3 || ((Math.PI * 2) - angle) < 1e-3);
    },
    updateCanvas:function() {
		//var maxAngularVelocity = 50;
		//this.body.angularVelocity = this.body.angularVelocity > maxAngularVelocity ? maxAngularVelocity : this.body.angularVelocity;
		//this.body.angularVelocity = this.body.angularVelocity < -maxAngularVelocity ? -maxAngularVelocity : this.body.angularVelocity;
		itemArrow.rotation = -(this.body.angle) * 180 / Math.PI;
    }
};