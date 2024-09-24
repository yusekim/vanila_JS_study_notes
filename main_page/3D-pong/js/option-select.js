import * as THREE from '../modules/three.module.js';
import { OrbitControls } from '../modules/OrbitControls.js';


class App {
	constructor() {
		const divContainer = document.querySelector("#webgl-container");
		this._divContainer = divContainer;

		const renderer = new THREE.WebGLRenderer({ antialias: true });
		renderer.setPixelRatio(window.devicePixelRatio);
		divContainer.appendChild(renderer.domElement);
		this._renderer = renderer;

		const scene = new THREE.Scene();
		this._scene = scene;

		this._vec = new THREE.Vector3(0.6, 0.2, 0.7);
		this._randomRot = 0.2;
		let ballSpeed = this._getSpeed();
		this._vec.normalize().multiplyScalar(ballSpeed * 0.3);
		const ballColors = [0x8A2BE2, 0xC0C0C0, 0xFF00FF];
		this._ballColor = ballColors[this._getColor()];
		this._ballWireColor = 0xFFFFFF;

		this._setupCamera();
		this._setupLight();
		this._setupModel();
		// this._setupControls(); // 마우스로 카메라 수정

		window.onresize = this.resize.bind(this);
		this.resize();

		const speedOptions = document.querySelectorAll('input[name="speed"]');
		speedOptions.forEach(button => {
			button.addEventListener('change', () => {
				ballSpeed = this._getSpeed();
				this._vec.normalize().multiplyScalar(ballSpeed * 0.3);
			})
		})

		const colorOptions = document.querySelectorAll('input[name="color"]');
		colorOptions.forEach(button => {
			button.addEventListener('change', () => {
				this._ballColor = ballColors[this._getColor()];

				this._ball.material.color.set(this._ballColor);
				if (this._ballColor == ballColors[1])
					this._ballWire.material.color.set(0x000000);
				else
					this._ballWire.material.color.set(0xFFFFFF);
			})
		})

		requestAnimationFrame(this.render.bind(this));
	}

	_getColor() {
		const selectedColor = document.querySelector('input[name="color"]:checked');

		console.log(selectedColor.value);
		return Number(selectedColor.value);
	}

	_getSpeed() {
		const selectedSpeed = document.querySelector('input[name="speed"]:checked');

		console.log(selectedSpeed.value);
		return Number(selectedSpeed.value);
	}


	_setupControls() {
		new OrbitControls(this._camera, this._renderer.domElement); // 컨트롤을 올바르게 설정
	}

	_setupCamera() {
		const width = this._divContainer.clientWidth;
		const height = this._divContainer.clientHeight;
		const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
		camera.position.set(40, 20, 30); // 카메라 위치를 더 가까이 설정
		camera.lookAt(new THREE.Vector3(0, 0, 0)); // 원점 좌표를 바라보게 설정
		this._camera = camera;
	}

	_setupLight() {
		const ambientLight = new THREE.AmbientLight(0xffffff, 1); // 흰색 빛, 강도는 1
		this._scene.add(ambientLight);
	}

	_setupModel() {
		// 그룹 생성
		const group = new THREE.Group();

		// 공 모델
		const geometry = new THREE.SphereGeometry(1.5, 10, 10);
		const geoWire = new THREE.EdgesGeometry(geometry);
		const fillMaterial = new THREE.MeshPhongMaterial({ color: this._ballColor });
		const WireMaterial = new THREE.LineBasicMaterial({ color: this._ballWireColor });
		const geoWireCol = new THREE.LineSegments(geoWire, WireMaterial);
		const ball = new THREE.Mesh(geometry, fillMaterial);

		// 공 위치 그리드 모델
		const ballPosX = new THREE.PlaneGeometry(20, 20);
		const ballPosXEdge = new THREE.EdgesGeometry(ballPosX);
		const ballPosXEdgeMat = new THREE.LineBasicMaterial({ color: 0x00FFFF });
		const ballPosXWire = new THREE.LineSegments(ballPosXEdge, ballPosXEdgeMat);
		ballPosXWire.rotation.y = Math.PI / 2;

		const ballPosZ = new THREE.PlaneGeometry(30, 20);
		const ballPosZEdge = new THREE.EdgesGeometry(ballPosZ);
		const ballPosZEdgeMat = new THREE.LineBasicMaterial({ color: 0xFF1493 });
		const ballPosZWire = new THREE.LineSegments(ballPosZEdge, ballPosZEdgeMat);

		// 와이어프레임 맵 모델
		const room = new THREE.BoxGeometry(30, 20, 20);
		const wireframeGeometry = new THREE.EdgesGeometry(room);
		const wireframeMaterial = new THREE.LineBasicMaterial({ color: 0x39FF14 });
		const wireframeCube = new THREE.LineSegments(wireframeGeometry, wireframeMaterial);

		// 그룹에 객체 추가
		group.add(ball);
		group.add(geoWireCol);
		group.add(ballPosXWire);
		group.add(ballPosZWire);
		group.add(wireframeCube);

		let axes = new THREE.AxesHelper(50);
		let gridhelper = new THREE.GridHelper(100, 5);

		this._scene.add(axes);
		this._scene.add(gridhelper);
		this._scene.add(group); // 그룹을 씬에 추가

		// 그룹을 전역 변수로 저장하여 회전 적용
		this._group = group;
		this._ball = ball;
		this._ballWire = geoWireCol;
		this._ballPosX = ballPosXWire;
		this._ballPosZ = ballPosZWire;
		this._room = wireframeCube;
	}

	resize() {
		const width = this._divContainer.clientWidth;
		const height = this._divContainer.clientHeight;

		this._camera.aspect = width / height;
		this._camera.updateProjectionMatrix();

		this._renderer.setSize(width, height);
	}

	render(time) {
		this._renderer.render(this._scene, this._camera);
		this.update(time);
		requestAnimationFrame(this.render.bind(this));
	}

	setRandomRotation() {
		const x = Math.random();
		return x;
	}

	update(time) {
		time *= 0.001;

		// 회전 적용 (y축을 기준으로)
		this._group.rotation.y += 0.01; // 그룹 자체에 회전 적용

		// 공의 위치 이동
		if (Math.abs(this._ball.position.x) > 14)
			this._vec.x *= -1;
		if (Math.abs(this._ball.position.y) > 9)
			this._vec.y *= -1;
		if (Math.abs(this._ball.position.z) > 9)
			this._vec.z *= -1;

		this._ballWire.rotation.z -= this._randomRot;
		this._ball.position.x += this._vec.x;
		this._ball.position.y += this._vec.y;
		this._ball.position.z += this._vec.z;
		this._ballWire.position.x += this._vec.x;
		this._ballWire.position.y += this._vec.y;
		this._ballWire.position.z += this._vec.z;

		// 공 위치 표시도 함께 이동
		this._ballPosX.position.x = this._ball.position.x;
		this._ballPosZ.position.z = this._ball.position.z;
	}
}

window.onload = function () {
	new App();
};
