import * as THREE from './modules/three.module.js'
import { OrbitControls } from './modules/OrbitControls.js';

export class ThreeGame {
	constructor(speed, color) {
		this._gameIsReady = false;
		const divContainer = document.getElementById('webgl-container');
		this._divContainer = divContainer;

		const renderer = new THREE.WebGLRenderer({ antialias: true });
		renderer.setPixelRatio(window.devicePixelRatio);
		divContainer.appendChild(renderer.domElement);
		this._renderer = renderer;

		const scene = new THREE.Scene();
		this._scene = scene;

		this._speed = speed;
		this._ballColor = color;
		this._ballWireColor = 0xFFFFFF;
		if (color === 0xC0C0C0)
			this._ballWireColor = 0x000000;

		this._ballVec = new THREE.Vector3(1,0,0);
		this._ballVec.normalize().multiplyScalar(this._speed * 0.3);
		this._ballRot = new THREE.Vector3(0,0,0);

		this._setupCamera1P();
		this._setupCamera2P();
		this._setupLight();
		this._setupModel();
		this._setupControls();
		window.onresize = this.resize.bind(this);
		this.resize();
		this._animationId = null;
		this._keyState = {};
		this.detectKeyPress();
	}

	_setupControls() {
		new OrbitControls(this._camera1p, this._divContainer);
		new OrbitControls(this._camera2p, this._divContainer);
	}

	dispose() {
		if (this._animationId) {
			cancelAnimationFrame(this._animationId);
			this._animationId = null;
		}

		this._scene.traverse((object) => {
			if (object.geometry) {
				object.geometry.dispose();
			}
			if (object.material) {
				if (Array.isArray(object.meterial))
					object.material.forEach((material) => material.dispose());
				else
					object.material.dispose();
			}
			if (object.texture)
				object.texture.dispose();
		});

		this._renderer.dispose();
		this._divContainer.removeChild(this._renderer.domElement);

		this._scene = null;
		this._camera = null;
		this._renderer = null;
		this._group = null;
		this._ball = null;
		this._ballWire = null;
		this._ballPosX = null;
		this._ballPosZ = null;
	}

	async _render(time) {
		this._renderer.setViewport(0, 0, window.innerWidth / 2, window.innerHeight);
		this._renderer.setScissor(0, 0, window.innerWidth/ 2, window.innerHeight);
		this._renderer.setScissorTest(true);
		this._renderer.render(this._scene, this._camera1p);

		this._renderer.setViewport(window.innerWidth / 2, 0, window.innerWidth / 2, window.innerHeight);
		this._renderer.setScissor(window.innerWidth / 2, 0, window.innerWidth / 2, window.innerHeight);
		this._renderer.render(this._scene, this._camera2p);

		this.peddleMove();
		await this.ballMove();
		this._animationId = requestAnimationFrame(this._render.bind(this));
	}

	startAnimation() {
		this._animationId = requestAnimationFrame(this._render.bind(this));
	}

	stopAnimation() {
		if (this._animationId) {
			cancelAnimationFrame(this._animationId);
			this._animationId = null;
		}
	}

	_setupCamera1P() {
		const width = this._divContainer.clientWidth;
		const height = this._divContainer.clientHeight;
		const camera = new THREE.PerspectiveCamera(75, width/ 2 /height, 0.1, 1000);
		camera.position.set(40, 0, 0);
		camera.lookAt(new THREE.Vector3(0, 0, 0));
		this._camera1p = camera;
	}

	_setupCamera2P() {
		const width = this._divContainer.clientWidth;
		const height = this._divContainer.clientHeight;
		const camera = new THREE.PerspectiveCamera(75, width/ 2 /height, 0.1, 1000);
		camera.position.set(-40, 0, 0);
		camera.lookAt(new THREE.Vector3(0, 0, 0));
		this._camera2p = camera;
	}

	_setupLight() {
		const ambientLight = new THREE.AmbientLight(0xffffff, 1);
		this._scene.add(ambientLight);
	}

	_setupModel() {
		// Wireframed map
		const room = new THREE.BoxGeometry(30, 20, 25);
		const wireframeGeometry = new THREE.EdgesGeometry(room);
		const wireframeMaterial = new THREE.LineBasicMaterial({ color: 0x39FF14 });
		const wireframeCube = new THREE.LineSegments(wireframeGeometry, wireframeMaterial);

		// Ball
		const geometry = new THREE.SphereGeometry(2, 10, 10);
		const geoWire = new THREE.EdgesGeometry(geometry);
		const fillMaterial = new THREE.MeshPhongMaterial({ color: this._ballColor });
		const WireMaterial = new THREE.LineBasicMaterial({ color: this._ballWireColor });
		const ball = new THREE.Mesh(geometry, fillMaterial);
		const geoWireCol = new THREE.LineSegments(geoWire, WireMaterial);
		geoWireCol.rotation.x = Math.PI / 2;
		// group ball and ballwireframe
		const ballgroup = new THREE.Group();
		ballgroup.add(ball);
		ballgroup.add(geoWireCol);

		// Ball position guideline
		const ballPosX = new THREE.PlaneGeometry(25, 20);
		const ballPosXEdge = new THREE.EdgesGeometry(ballPosX);
		const ballPosXEdgeMat = new THREE.LineBasicMaterial({ color: 0x00FFFF });
		const ballPosXWire = new THREE.LineSegments(ballPosXEdge, ballPosXEdgeMat);
		ballPosXWire.rotation.y = Math.PI / 2;
		const ballPosZ = new THREE.PlaneGeometry(30, 20);
		const ballPosZEdge = new THREE.EdgesGeometry(ballPosZ);
		const ballPosZEdgeMat = new THREE.LineBasicMaterial({ color: 0xFF1493 });
		const ballPosZWire = new THREE.LineSegments(ballPosZEdge, ballPosZEdgeMat);

		const whiteWireMat = new THREE.LineBasicMaterial({ color: 0xffffff });
		// Peddles group
		const p1PeddleGroup = new THREE.Group();
		const p2PeddleGroup = new THREE.Group();
		// box peddle
		const peddleGeo = new THREE.BoxGeometry(0.4, 5, 5);
		const peddleWire = new THREE.EdgesGeometry(peddleGeo);
		const peddleWireFrame = new THREE.LineSegments(peddleWire, whiteWireMat);
		// 재질 생성 (반투명 설정)
		const p1PeddleMat = new THREE.MeshBasicMaterial({
			color: 0xD9A6A6, // 색상 설정 (핑크)
			transparent: true, // 투명성 활성화
			opacity: 0.5      // 투명도 설정 (0: 완전히 투명, 1: 불투명)
		});
		const p2PeddleMat = new THREE.MeshBasicMaterial({
			color: 0xA6E1F9, // 색상 설정 (핑크)
			transparent: true, // 투명성 활성화
			opacity: 0.5      // 투명도 설정 (0: 완전히 투명, 1: 불투명)
		});
		const p1Peddle = new THREE.Mesh(peddleGeo, p1PeddleMat);
		const p2Peddle = new THREE.Mesh(peddleGeo, p2PeddleMat);

		// CrossHair
		// 원(CircleGeometry) 생성 (반지름, 분할 수)
		const circleGeo = new THREE.CircleGeometry(2, 64); // 반지름 5, 64개의 세그먼트
		const circleGeo2 = new THREE.CircleGeometry(0.5, 64); // 반지름 5, 64개의 세그먼트
		const circleEdge = new THREE.EdgesGeometry(circleGeo);
		const circleEdge2 = new THREE.EdgesGeometry(circleGeo2);
		const circleWire = new THREE.LineSegments(circleEdge, whiteWireMat);
		const circleWire2 = new THREE.LineSegments(circleEdge2, whiteWireMat);
		circleWire.rotation.y = Math.PI / 2;
		circleWire2.rotation.y = Math.PI / 2;

		const half = 5 / 2;
		const pointX = [new THREE.Vector3(-half, 0 ,0), new THREE.Vector3(half, 0, 0)];
		const pointY = [new THREE.Vector3(0, -half ,0), new THREE.Vector3(0, half, 0)];
		const lineGeometryX = new THREE.BufferGeometry().setFromPoints(pointX);
		const lineX = new THREE.Line(lineGeometryX, whiteWireMat);
		const lineGeometryY = new THREE.BufferGeometry().setFromPoints(pointY);
		const lineY = new THREE.Line(lineGeometryY, whiteWireMat);
		lineX.rotation.y = Math.PI / 2;
		lineY.rotation.y = Math.PI / 2;

		p1PeddleGroup.add(p1Peddle);
		p1PeddleGroup.add(peddleWireFrame);
		p1PeddleGroup.add(circleWire);
		p1PeddleGroup.add(circleWire2);
		p1PeddleGroup.add(lineX);
		p1PeddleGroup.add(lineY);

		p2PeddleGroup.add(p2Peddle);
		p2PeddleGroup.add(peddleWireFrame.clone());
		p2PeddleGroup.add(circleWire.clone());
		p2PeddleGroup.add(circleWire2.clone());
		p2PeddleGroup.add(lineX.clone());
		p2PeddleGroup.add(lineY.clone());

		this._1pPeddle = p1PeddleGroup;
		this._2pPeddle = p2PeddleGroup;

		p1PeddleGroup.position.set(15, 0, 0);
		p2PeddleGroup.position.set(-15, 0, 0);

		let axis = new THREE.AxesHelper(50);
		let gridhelper = new THREE.GridHelper(100, 5);

		this._scene.add(axis);
		this._scene.add(gridhelper);
		this._scene.add(wireframeCube);
		this._scene.add(ballgroup);
		this._scene.add(ballPosXWire);
		this._scene.add(ballPosZWire);

		this._scene.add(p1PeddleGroup);
		this._scene.add(p2PeddleGroup);

		this._room = wireframeCube;
		this._ball = ball;
		this._ballWire = geoWireCol;
		this._ballGroup = ballgroup;
		this._ballPosX = ballPosXWire;
		this._ballPosZ = ballPosZWire;
		this._gameIsReady = true;
	}

	resize() {
		this._renderer.setSize(window.innerWidth, window.innerHeight);

		this._camera1p.aspect = window.innerWidth / 2 / window.innerHeight;
		this._camera1p.updateProjectionMatrix();

		this._camera2p.aspect = window.innerWidth / 2 / window.innerHeight;
		this._camera2p.updateProjectionMatrix();
	}

	detectKeyPress() {
		window.addEventListener('keydown', (event) => {
			this._keyState[event.code] = true;
		});

		window.addEventListener('keyup', (event) => {
			this._keyState[event.code] = false;
		});
	}

	sleep(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}

	async ballMove() {
		this._ballVec.normalize().multiplyScalar(this._speed * 0.3);

		console.log(this._ball.position.x);
		if (Math.abs(this._ball.position.x) > 12.7 && Math.abs(this._ball.position.x) < 13.4)
		{
			if (this.isPeddleHitted())
				this._ballVec.x *= -1;
		}
		else if (Math.abs(this._ball.position.x) > 13.6) {
			this._1pPeddle.position.set(15, 0, 0);
			this._2pPeddle.position.set(-15, 0, 0);
			this._ballVec.set(this._ball.position.x > 0 ? 1 : -1,0,0);
			this._ballRot.set(0,0,0);
			this._ball.position.set(0, 0, 0);
			this._ballWire.position.set(0, 0, 0);
			await this.sleep(1000); // 1초간 대기
		}
		if (Math.abs(this._ball.position.y) > 8) this._ballVec.y *= -1;
		if (Math.abs(this._ball.position.z) > 10.5) this._ballVec.z *= -1;

		this._ballWire.rotation.z += this._ballRot.z;
		this._ballWire.rotation.y += this._ballRot.y;
		this._ball.position.x += this._ballVec.x;
		this._ball.position.y += this._ballVec.y;
		this._ball.position.z += this._ballVec.z;
		this._ballWire.position.x += this._ballVec.x;
		this._ballWire.position.y += this._ballVec.y;
		this._ballWire.position.z += this._ballVec.z;
		// 공 위치 표시도 함께 이동
		this._ballPosX.position.x = this._ball.position.x;
		this._ballPosZ.position.z = this._ball.position.z;
	}

	peddleMove() {
		const moveSpd = 0.3;

		if (this._keyState['KeyW'] && this._1pPeddle.position.y < 7.5)
			this._1pPeddle.position.y += moveSpd;
		if (this._keyState['KeyS'] && this._1pPeddle.position.y > -7.5)
			this._1pPeddle.position.y -= moveSpd;
		if (this._keyState['KeyA'] && this._1pPeddle.position.z < 10)
			this._1pPeddle.position.z += moveSpd;
		if (this._keyState['KeyD'] && this._1pPeddle.position.z > -10)
			this._1pPeddle.position.z -= moveSpd;

		if (this._keyState['ArrowUp'] && this._2pPeddle.position.y < 7.5)
			this._2pPeddle.position.y += moveSpd;
		if (this._keyState['ArrowDown'] && this._2pPeddle.position.y > -7.5)
			this._2pPeddle.position.y -= moveSpd;
		if (this._keyState['ArrowLeft'] && this._2pPeddle.position.z > -10)
			this._2pPeddle.position.z -= moveSpd;
		if (this._keyState['ArrowRight'] && this._2pPeddle.position.z < 10)
			this._2pPeddle.position.z += moveSpd;
	}

	isPeddleHitted() {
		let peddlePos = [];
		let isPlayer1 = null;
		if (this._ball.position.x > 0) {
			isPlayer1 = true;
			peddlePos[0] = this._1pPeddle.position.z;
			peddlePos[1] = this._1pPeddle.position.y;
		}
		else {
			isPlayer1 = false;
			peddlePos[0] = this._2pPeddle.position.z;
			peddlePos[1] = this._2pPeddle.position.y;
		}
		let zDiff = peddlePos[0] - this._ball.position.z;
		let yDiff = peddlePos[1] - this._ball.position.y;
		if (Math.abs(zDiff) <= 2.7 && Math.abs(yDiff) <= 2.7)
		{
			console.log(zDiff);
			console.log(yDiff);
			this.adjustBallVec(zDiff, yDiff, isPlayer1);
			return true;
		}
	}

 	adjustBallVec(zDiff, yDiff, isPlayer1) {
		if (Math.sqrt(Math.pow(zDiff, 2) + Math.pow(yDiff, 2)) <= 0.5) {
			this._ballVec.z = 0;
			this._ballVec.y = 0;
			this._ballRot.set(0,0,0);
		}
		else {
			let vecZ = zDiff / 5;
			let vecY = yDiff / 5;
			this._ballVec.z = -vecZ;
			this._ballVec.y = -vecY;
			this._ballRot.z = -vecZ / 2;
			this._ballRot.y = -vecY / 2;
			this._ballVec.x = 0.8;
			if (!isPlayer1)
				this._ballVec.x *= -1;
		}
		this._ballVec.normalize().multiplyScalar(this._speed * 0.3);
	}
};



window.onload = function () {
	let a = new ThreeGame(1, 0x8A2BE2);
	if (a._gameIsReady)
		a.startAnimation();
}
