/*

Copyright (c) 2014 Jakub Bilko (http://jakubbilko.pl)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/


(function () {

var BatGame = {};

var game = new Phaser.Game(640, 960, Phaser.CANVAS, 'game');

BatGame.Init = function(game) {
	this.menu = null;
};
BatGame.Credits = function(game) {
	this.creds = null;
	this.cgroup = null;	
};
BatGame.Intro = function(game) {
	this.preloader = null;
	this.pgroup = null;
	this.copyl = null;
	this.stars = null;
	this.gf = null;
 };
BatGame.Preload = function(game) {
	this.pgroup2 = null;
	this.cem = null;
	this.prel = null;
};
BatGame.Gameplay = function(game) {
	this.score = 0;
	this.bestScore = 0;
	this.wallrate = 1500;
	this.nextwall = 0;
	this.walls = null;
	this.pos = 480;
	this.killed = false;
	this.hero = null;
	this.graves1 = null;
	this.graves2 = null;
	this.graves3 = null;
	this.graves4 = null;
	this.graves5 = null;
	this.graves6 = null;
	this.graves7 = null;
	this.graves8 = null;
	this.points = null;
	this.fence = null;
	this.cemetary = null;
	this.moon = null;
	this.clouds = null;
	this.lastobj = null;
	this.socoreText;
	this.lastHit = ' ';
	this.summary = null;
	this.jump = null;
	this.point = null;
	this.hit = null;
	this.graveRects = [
	'',
	[106, 0, 106, 26, 77, 26, 82, 36, 106, 38, 106, 66, 90, 65, 90, 81, 106, 80, 106, 107, 80, 105, 47, 673, 16, 628, 0, 735, 198, 735, 182, 649, 159, 648, 142, 108, 118, 107, 118, 81, 138, 80, 134, 70, 110, 67, 120, 39, 151, 42, 151, 26, 122, 28, 124, 0],
	[15, 20, 17, 433, 99, 433, 99, 19, 91, 19, 78, 7, 63, 0],
	[53, 0, 53, 40, 18, 75, 0, 77, 7, 92, 18, 91, 53, 126, 53, 584, 74, 584, 83, 127, 116, 99, 138, 102, 138, 74, 119, 74, 86, 40, 86, 0],
	[68, 0, 36, 11, 20, 37, 15, 502, 0, 502, 0, 554, 125, 554, 125, 502, 112, 502, 114, 39, 104, 17],
	[0, 0, 16, 108, 46, 103, 81, 629, 106, 629, 105, 565, 91, 655, 91, 671, 107, 668, 106, 697, 81, 700, 77, 709, 106, 709, 107, 735, 124, 735, 122, 709, 152, 708, 151, 692, 121, 696, 121, 667, 135, 663, 137, 665, 119, 655, 118, 628, 143, 627, 160, 88, 182, 86, 198, 0],
	[17, 0, 15, 413, 39, 423, 63, 433, 82, 422, 94, 412, 100, 414, 102, 309, 99, 0],
	[53, 0, 53, 459, 19, 492, 7, 493, 0, 509, 18, 508, 53, 546, 53, 584, 87, 584, 86, 544, 120, 509, 138, 509, 138, 483, 117, 484, 83, 457, 73, 0],
	[0, 0, 0, 53, 15, 53, 20, 518, 36, 543, 67, 554, 102, 540, 115, 510, 111, 54, 125, 52, 125, 0]
	];
};

BatGame.Credits.prototype = {
	
	preload: function() {
		game.load.image('creds', 'images/credits_text.png');
	},
	
	create: function() {
	
		this.cgroup = this.add.group();
		
		var bg = this.add.sprite(0, 0, 'bg');
		var moon = this.add.sprite(30, 650, 'menumoon');
		var c = this.add.sprite(0, 350, 'clouds');
		this.creds = this.add.tileSprite(0, 0, 640, 2210, 'creds');
		var cem = this.add.sprite(0, 770, 'cemetary2');
		this.cgroup.add(bg);
		this.cgroup.add(moon);
		this.cgroup.add(c);
		this.cgroup.add(this.creds);
		this.cgroup.add(cem);
		this.cgroup.alpha = 0;
		this.add.tween(this.cgroup._container).to({alpha: 1}, 500, Phaser.Easing.Quartic.Out, true, 0);
		this.input.onDown.add(this.back, this);
	},
	
	back: function() {
		var t = this.add.tween(this.cgroup._container).to({alpha: 0}, 500, Phaser.Easing.Quartic.Out, true, 0);
		t.onComplete.add(this.ret);
	},
	
	ret: function() {
		game.state.start('Init');
	},
	
	update: function() {
		this.creds.tilePosition.y -= 2;
	}
};

BatGame.Intro.prototype = {
	preload: function() {
	
		game.load.image('logo', 'images/menu/logo.png');
		game.load.image('clouds', 'images/bg_clouds.png');
		game.load.image('bg', 'images/bg_main.png');
		game.load.image('ttf', 'images/ttf.png');
		game.load.image('gflogo', 'images/gf_logo.png');
		game.load.image('preloader', 'images/preloader.png');
		game.load.image('copyl', 'images/copyloading.png');
		game.load.image('stars', 'images/bg_stars.png');
		game.load.spritesheet('bat', 'images/bat_sprite.png', 77, 77);
		game.load.image('cemetary', 'images/bg_cementary.png');
		game.load.image('cemetary2', 'images/cemetary2.png');
		game.load.image('summary', 'images/summgrave.png');
		game.load.bitmapFont('white', 'fonts/white.png', 'fonts/white.xml');
		game.load.bitmapFont('gradient', 'fonts/gradient.png', 'fonts/gradient.xml');
		game.load.audio('jump', ['sounds/jump.mp3', 'sounds/jump.ogg']);
		game.load.audio('point', ['sounds/point.mp3', 'sounds/point.ogg']);
		game.load.audio('hit', ['sounds/hit.mp3', 'sounds/hit.ogg']);
	
		this.game.input.maxPointers = 1;
		this.game.stage.disableVisibilityChange = true;
		this.game.stage.scaleMode = Phaser.StageScaleMode.SHOW_ALL;
		
		if (this.game.device.desktop){
	            this.game.stage.scaleMode = Phaser.StageScaleMode.SHOW_ALL;
	            this.game.stage.scale.minWidth = 320;
	            this.game.stage.scale.minHeight = 480;
	            this.game.stage.scale.maxWidth = 640;
	            this.game.stage.scale.maxHeight = 960;
	            this.game.stage.scale.pageAlignHorizontally = true;
	            this.game.stage.scale.pageAlignVertically = true;
	            this.game.stage.scale.setScreenSize(true);
	     } else {
	            this.game.stage.scaleMode = Phaser.StageScaleMode.SHOW_ALL;
	            this.game.stage.scale.minWidth = 320;
	            this.game.stage.scale.minHeight = 480;
	            this.game.stage.scale.maxWidth = 640;
	            this.game.stage.scale.maxHeight = 960;
	            this.game.stage.scale.pageAlignHorizontally = true;
	            this.game.stage.scale.pageAlignVertically = true;
	            this.game.stage.scale.forceOrientation(false, true);
	            this.game.stage.scale.setScreenSize(true);
	    }
	    this.stage.backgroundColor = '#000';
		
	},
	
	create: function() {
	
		this.pgroup = this.add.group();
	
		this.stars = this.add.tileSprite(0, 0, 640, 2242, 'stars');
		this.copyl = this.add.sprite(0, 886, 'copyl');
		this.preloader = this.add.sprite(604, 924, 'preloader');
		this.preloader.anchor.x = 0.5;
		this.preloader.anchor.y = 0.5;
		this.gf = this.add.sprite(this.world.centerX, this.world.centerY+100, 'gflogo');
		this.gf.anchor.x = 0.5;
		this.gf.anchor.y = 0.5;
		
		this.pgroup.add(this.stars);
		this.pgroup.add(this.copyl);
		this.pgroup.add(this.preloader);
		this.pgroup.add(this.gf);
		
		this.gf.alpha = 0;
		this.add.tween(this.gf).to({y: this.world.centerY, alpha: 1}, 1000, Phaser.Easing.Quartic.Out, true, 500).to({y: this.world.centerY-100, alpha: 0}, 1000, Phaser.Easing.Quartic.Out, true, 3000);
		var fadeout = this.add.tween(this.pgroup._container).to({alpha: 0}, 500, Phaser.Easing.Quartic.Out, true, 5000, false);
		fadeout.onComplete.add(this.animComplete);
	},
	
	animComplete: function() {
		game.state.start('Init');
	},
	
	update: function() {
		this.preloader.rotation += 0.1;
		this.stars.tilePosition.y += 5;
	}
};

BatGame.Preload.prototype = {
	preload: function() {
		game.load.image('wall', 'images/wall.png');
		game.load.image('grave1', 'images/obj_grave01.png');
		game.load.image('grave2', 'images/obj_grave02.png');
		game.load.image('grave3', 'images/obj_grave03.png');
		game.load.image('grave4', 'images/obj_grave04.png');
		game.load.image('grave5', 'images/obj_grave05.png');
		game.load.image('grave6', 'images/obj_grave06.png');
		game.load.image('grave7', 'images/obj_grave07.png');
		game.load.image('grave8', 'images/obj_grave08.png');
		game.load.image('ground', 'images/bg_ground.png');
		game.load.image('fence', 'images/bg_hedge.png');
		game.load.image('moon', 'images/bg_moon.png');
		game.load.image('points', 'images/points.png');
		game.load.image('restart', 'images/restartbtn.png');
		game.load.image('sumfb', 'images/sumfb.png');
	},
	
	create: function() {
		this.pgroup2 = this.add.group();
		var bg = this.add.sprite(0, 0, 'bg');
		var c = this.add.sprite(0, 350, 'clouds');
		c.body.velocity.x = -10;
		var moon = this.add.sprite(30, 650, 'menumoon');
		var b = this.add.sprite(this.world.centerX, this.world.centerY-100, 'bat');
		this.pgroup2.add(bg);
		this.pgroup2.add(moon);
		this.pgroup2.add(b);
		this.pgroup2.add(c);
		b.anchor.x = 0.5;
		b.animations.add('fly', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);
		b.animations.play('fly');
		this.cem = this.add.tileSprite(0, 770, 640, 198, 'cemetary2');
		var copyl = this.add.sprite(0, 886, 'copyl');
		this.prel = this.add.sprite(604, 924, 'preloader');
		this.prel.anchor.x = 0.5;
		this.prel.anchor.y = 0.5;
		var ttf = this.add.sprite(this.world.centerX, b.position.x+150, 'ttf');
		ttf.anchor.x = 0.5;
		this.pgroup2.add(this.cem);
		this.pgroup2.add(copyl);
		this.pgroup2.add(this.prel);
		this.pgroup2.add(ttf);
		this.pgroup2.alpha = 0.1;
		var t = this.add.tween(ttf);
		t.to({y: b.position.x+160}, 500, Phaser.Easing.Quartic.In, false, 250, false);
		t.to({y: b.position.x+150}, 500, Phaser.Easing.Quartic.Out, false, 0, false);
		t.loop();
		t.start();
		this.add.tween(this.pgroup2._container).to({alpha: 1}, 500, Phaser.Easing.Quartic.Out, true, 0, false).to({alpha: 0}, 500, Phaser.Easing.Quartic.Out, true, 5000, false);
	},
	
	startGame: function() {
		game.state.start('Gameplay');
	},
	
	update: function() {
		this.cem.tilePosition.x -= 2;
		this.prel.rotation += 0.1;
		if(this.pgroup2.alpha == 0) {
			game.state.start('Gameplay');
		}
	}
};

BatGame.Init.prototype = { 
	preload: function() {
		game.load.image('copy', 'images/menu/copyright.png');
		game.load.image('batbranch', 'images/menu/menubat.png');
		game.load.image('menubg', 'images/menu/menubg.png');
		game.load.image('menucem', 'images/menu/menucem.png');
		game.load.image('menumoon', 'images/menu/menumoon.png');
		game.load.image('play', 'images/menu/playbtn.png');
		game.load.image('mainfb', 'images/menu/mainfb.png');
		game.load.image('maini', 'images/menu/maini.png');
		
	},
	create: function() {
	
		this.menu = this.add.group();
	    
	    var bg = this.add.sprite(0, 200, 'menubg');
	    bg.alpha = 0;
	    var logo = this.add.sprite(0, 0, 'logo');
	    var moon = this.add.sprite(30, 850, 'menumoon');
	    moon.alpha = 0;
	    var cem = this.add.sprite(0, 928, 'menucem');
	    cem.alpha = 0;
	    var b = this.add.sprite(-120, 684, 'batbranch');
	    b.alpha = 0;
	    var copy = this.add.sprite(5, 915, 'copy');
	    copy.alpha = 0;
	    var p = this.add.button(this.world.centerX, 430, 'play', this.startGame, this);
	    var f = this.add.button(408, 592, 'mainfb', this.onFb, this);
	    var i = this.add.button(307, 592, 'maini', this.onInfo, this);
	    this.menu.add(bg);
	    this.menu.add(logo);
	    this.menu.add(moon);
	    this.menu.add(cem);
	    this.menu.add(b);
	    this.menu.add(p);
	    this.menu.add(f);
	    this.menu.add(i);
	     this.menu.add(copy);
	    p.anchor.x = 0.5;
	    p.anchor.y = 0.5;
	    p.scale.x = 0;
	    p.scale.y = 0;
	    f.anchor.x = 0.5;
	    f.anchor.y = 0.5;
	    f.scale.x = 0;
	    f.scale.y = 0;
	    i.anchor.x = 0.5;
	    i.anchor.y = 0.5;
	    i.scale.x = 0;
	    i.scale.y = 0;
	    
	    this.add.tween(bg).to({alpha:1, y: 0}, 1000, Phaser.Easing.Quartic.Out, true, 0, false);
	    this.add.tween(moon).to({alpha:1, y: 650}, 1000, Phaser.Easing.Quartic.Out, true, 0, false);
	    this.add.tween(cem).to({alpha:1, y: 828}, 1000, Phaser.Easing.Quartic.Out, true, 0, false);
	    this.add.tween(copy).to({alpha:1}, 10, Phaser.Easing.Quartic.Out, true, 400, false);
	    this.add.tween(b).to({alpha:1, y: 584}, 1000, Phaser.Easing.Quartic.Out, true, 1200, false);
	    
	    this.add.tween(p.scale).to({x:1, y: 1}, 500, Phaser.Easing.Bounce.Out, true, 1200, false);
	    this.add.tween(i.scale).to({x:1, y: 1}, 500, Phaser.Easing.Bounce.Out, true, 1300, false);
	    this.add.tween(f.scale).to({x:1, y: 1}, 500, Phaser.Easing.Bounce.Out, true, 1400, false);
	    
	},
	
	onInfo: function() {
		var t = this.add.tween(this.menu._container).to({alpha:0}, 500, Phaser.Easing.Quartic.Out, true, 0, false);
		t.onComplete.add(this.creds, this);
	},
	
	creds: function() {
		game.state.start('Credits');
	},
	
	onFb: function() {
		document.getElementById('fb').click();
	},
	
	startGame: function() {
		var t = this.add.tween(this.menu._container).to({alpha:0}, 500, Phaser.Easing.Quartic.Out, true, 0, false);
		t.onComplete.add(this.start, this);
	},
	
	start: function() {
		game.state.start('Preload');
	}
};

BatGame.Gameplay.prototype = {

	preload: function() {
		
	},
	
	create: function() {
	
		this.killed = false;
		this.score = 0;
		
		this.jump = this.add.sound('jump');
		this.point = this.add.sound('point');
		this.hit = this.add.sound('hit');
	
		this.add.sprite(0, 0,'bg');
		this.add.sprite(0, 810,'ground');
		this.cemetary = this.add.tileSprite(0, 620, 640, 198, 'cemetary');
		this.moon = this.add.sprite(300, 50, 'moon');
		this.clouds = this.add.sprite(250, 50, 'clouds');
		this.fence = this.add.tileSprite(0, 710, 640, 99, 'fence');
		
		this.walls = game.add.group();
		var wall = this.walls.create(0, -50, 'wall');
		wall.body.immovable = true;
		wall = this.walls.create(0, 1030, 'wall');
		wall.body.immovable = true;
		
		this.graves1 = game.add.group();
		this.graves2 = game.add.group();
		this.graves3 = game.add.group();
		this.graves4 = game.add.group();
		this.graves5 = game.add.group();
		this.graves6 = game.add.group();
		this.graves7 = game.add.group();
		this.graves8 = game.add.group();
		this.points = game.add.group();
		
		this.graves1.createMultiple(3, 'grave1');
		this.graves2.createMultiple(3, 'grave2');
		this.graves3.createMultiple(3, 'grave3');
		this.graves4.createMultiple(3, 'grave4');
		this.graves5.createMultiple(3, 'grave5');
		this.graves6.createMultiple(3, 'grave6');
		this.graves7.createMultiple(3, 'grave7');
		this.graves8.createMultiple(3, 'grave8');
		this.points.createMultiple(3, 'points');
		
		this.graves1.setAll('anchor.y', 0.5);
		this.graves2.setAll('anchor.y', 0.5);
		this.graves3.setAll('anchor.y', 0.5);
		this.graves4.setAll('anchor.y', 0.5);
		this.graves5.setAll('anchor.y', 0.5);
		this.graves6.setAll('anchor.y', 0.5);
		this.graves7.setAll('anchor.y', 0.5);
		this.graves8.setAll('anchor.y', 0.5);
		this.graves1.setAll('anchor.x', 0.5);
		this.graves2.setAll('anchor.x', 0.5);
		this.graves3.setAll('anchor.x', 0.5);
		this.graves4.setAll('anchor.x', 0.5);
		this.graves5.setAll('anchor.x', 0.5);
		this.graves6.setAll('anchor.x', 0.5);
		this.graves7.setAll('anchor.x', 0.5);
		this.graves8.setAll('anchor.x', 0.5);
		this.points.setAll('anchor.x', 0.5);
		this.points.setAll('anchor.y', 0.5);
		
		this.graves1.setAll('outOfBoundsKill',true);
		this.graves2.setAll('outOfBoundsKill',true);
		this.graves3.setAll('outOfBoundsKill',true);
		this.graves4.setAll('outOfBoundsKill',true);
		this.graves5.setAll('outOfBoundsKill',true);
		this.graves6.setAll('outOfBoundsKill',true);
		this.graves7.setAll('outOfBoundsKill',true);
		this.graves8.setAll('outOfBoundsKill',true);
		this.points.setAll('outOfBoundsKill',true);
	
		this.hero = game.add.sprite(200, 480, 'bat');
		this.hero.reset(200, 480);
		this.hero.pivot.x = 40;
		this.hero.pivot.y = 28;
		this.hero.body.gravity.y = 1100;
		this.hero.body.setRectangle(47, 40, 15, 29);
		
		this.hero.animations.add('fly', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);
		this.hero.animations.play('fly');
		
		this.input.onDown.add(this.fly, this);
		
		this.socoreText = this.add.bitmapText(this.world.centerX, 50, this.score.toString(), { font: '52px White', align: 'center' });

	},
	
	render: function() {
		//this.game.debug.renderPhysicsBody(this.hero.body);
		//this.game.debug.renderPhysicsBody(this.lastobj.body);
	},
	
	fly: function() {
		if(!this.killed)  {
			this.jump.play();
			this.hero.body.velocity.y = -300;
		}
	},
	
	update: function() {
	
		if(!this.killed) {
			this.fence.tilePosition.x -= 3;
			this.cemetary.tilePosition.x -= 2;
			this.clouds.x -= 0.5;
		}
	
		this.physics.collide(this.hero, this.walls);
		this.physics.overlap(this.hero, this.graves1, this.obstCollision, null, this);
		this.physics.overlap(this.hero, this.graves2, this.obstCollision, null, this);
		this.physics.overlap(this.hero, this.graves3, this.obstCollision, null, this);
		this.physics.overlap(this.hero, this.graves4, this.obstCollision, null, this);
		this.physics.overlap(this.hero, this.graves5, this.obstCollision, null, this);
		this.physics.overlap(this.hero, this.graves6, this.obstCollision, null, this);
		this.physics.overlap(this.hero, this.graves7, this.obstCollision, null, this);
		this.physics.overlap(this.hero, this.graves8, this.obstCollision, null, this);
		this.physics.overlap(this.hero, this.points, this.pointsCollision, null, this);
		this.hero.body.velocity.x = 0;
		
		if(this.time.now > this.nextwall && !this.killed) {
			this.pos = this.getRandomInt(200);
			this.nextwall = this.time.now + this.wallrate;
			
			var rand1 = this.getRandomGrave(4);
			var rand2 = this.getRandomGrave(4);
			
			if(rand1 == rand2) {
				if(rand1 == 1) rand2 = 4;
				else if(rand1 == 4) rand2 = 1;
				else rand2++;
			}
			
			rand2 += 4;
			
			var obst;
			var obst2;
			var point;
			
			obst2 = this['graves'+rand1].getFirstDead();
			obst = this['graves'+rand2].getFirstDead();
			point = this.points.getFirstDead();
			
			obst2.body.setPolygon(this.graveRects[rand1]);
			obst.body.setPolygon(this.graveRects[rand2]);
			
			obst.reset(660, this.pos+50);
			obst2.reset(660, obst.y+obst.height/2+obst2.height/2+115);
			point.reset(660, this.world.centerY);
			point.name = 'point' + Math.random().toString();
			
			obst.body.velocity.x = -200;
			obst2.body.velocity.x = -200;
			point.body.velocity.x = -200;
		}
		
		this.socoreText.setText(this.score.toString());
		
	},
	
	getRandomInt: function(seed) {
		var num = Math.floor(Math.random()*seed) + 1;
		return num;
	},
	
	getRandomGrave: function(seed) {
		var num = Math.floor(Math.random()*seed) + 1;
		return num;
	},
	
	pointsCollision: function(obj1, obj2) {
		if(this.lastHit != obj2.name && obj2.x < this.hero.x) {
			this.score++;
			this.lastHit = obj2.name;
			this.point.play();
		}
		
	},
	
	obstCollision: function(obj1, obj2) {
		if(!this.killed) {
			this.hit.play();
			if(this.score > this.bestScore) this.bestScore = this.score;
			this.graves1.setAll('body.velocity.x', 0);
			this.graves2.setAll('body.velocity.x', 0);
			this.graves3.setAll('body.velocity.x', 0);
			this.graves4.setAll('body.velocity.x', 0);
			this.graves5.setAll('body.velocity.x', 0);
			this.graves6.setAll('body.velocity.x', 0);
			this.graves7.setAll('body.velocity.x', 0);
			this.graves8.setAll('body.velocity.x', 0);
			this.points.setAll('body.velocity.x', 0);
			this.summary = game.add.group();
			var sumbg = this.summary.create(0, 0, 'summary');
			var reset = this.add.button(384, 646, 'restart', this.onResetClick, this);
			var sumtxt = this.add.bitmapText(this.world.centerX, 440, this.score.toString(), { font: '150px Gradient', align: 'center' });
			var besttxt = this.add.bitmapText(440, 850, this.bestScore.toString(), { font: '52px White', align: 'center' });
			var sfb = this.add.button(278, 693, 'sumfb', this.onFbClick, this);
			besttxt.anchor.x = 0.5;
			sumtxt.anchor.x = 0.5;
			this.summary.y = 960;
			this.summary.add(sumtxt);
			this.summary.add(besttxt);
			this.summary.add(reset);
			this.summary.add(sfb);
			this.add.tween(this.summary._container.position).to( {y: 0}, 1000, Phaser.Easing.Quartic.Out, true, 0, false);
			this.hero.rotation = 1;
			this.hero.animations.stop();
			this.killed = true;
		}
	},
	
	onFbClick: function() {
		document.getElementById('fb').click();
	},
	
	onResetClick: function() {
		game.state.start('Gameplay', true, true);
	}
	
};

game.state.add('Init', BatGame.Init);
game.state.add('Gameplay', BatGame.Gameplay);
game.state.add('Preload', BatGame.Preload);
game.state.add('Intro', BatGame.Intro);
game.state.add('Credits', BatGame.Credits);

game.state.start('Intro');

})();