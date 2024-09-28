import * as THREE from '../../3Dmodules/three.module.js';
import { OrbitControls } from '../../3Dmodules/OrbitControls.js';

export class App {
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

		window.onresize = this.resize.bind(this);
		this.resize();

		const speedOptions = document.querySelectorAll('input[name="speed"]');
		speedOptions.forEach(button => {
			button.addEventListener('change', () => {
				ballSpeed = this._getSpeed();
				this._vec.normalize().multiplyScalar(ballSpeed * 0.3);
			});
		});

		const colorOptions = document.querySelectorAll('input[name="color"]');
		colorOptions.forEach(button => {
			button.addEventListener('change', () => {
				this._ballColor = ballColors[this._getColor()];
				this._ball.material.color.set(this._ballColor);
				if (this._ballColor == ballColors[1]) {
					this._ballWire.material.color.set(0x000000);
				} else {
					this._ballWire.material.color.set(0xFFFFFF);
				}
			});
		});

		// 애니메이션 관련 변수
		this._animationId = null;
	}

	dispose() {
		// 애니메이션 루프 종료
		if (this._animationId) {
			cancelAnimationFrame(this._animationId);
			this._animationId = null;
		}

		// 씬에서 모든 객체 제거
		this._scene.traverse((object) => {
			if (object.geometry) {
				object.geometry.dispose(); // 기하학 해제
			}
			if (object.material) {
				if (Array.isArray(object.material)) {
					// 여러 개의 재질이 있는 경우 각 재질 해제
					object.material.forEach((material) => material.dispose());
				} else {
					object.material.dispose(); // 단일 재질 해제
				}
			}
			if (object.texture) {
				object.texture.dispose(); // 텍스처 해제
			}
		});

		// 렌더러 해제
		this._renderer.dispose();

		// DOM 요소에서 WebGL 컨테이너 제거
		this._divContainer.removeChild(this._renderer.domElement);

		// 기타 null 처리를 통해 참조 해제
		this._scene = null;
		this._camera = null;
		this._renderer = null;
		this._group = null;
		this._ball = null;
		this._ballWire = null;
		this._ballPosX = null;
		this._ballPosZ = null;

		console.log("App resources have been disposed.");
	}

	// 애니메이션 루프 시작
	startAnimation() {
		this._animationId = requestAnimationFrame(this._render.bind(this));
	}

	// 애니메이션 루프 중지
	stopAnimation() {
		if (this._animationId) {
			cancelAnimationFrame(this._animationId);
			this._animationId = null;
		}
	}

	// 렌더링 및 애니메이션을 위한 별도 함수
	_render(time) {
		this._renderer.render(this._scene, this._camera);
		this._update(time);
		this._animationId = requestAnimationFrame(this._render.bind(this));
	}

	// 씬 업데이트 (회전 및 위치 변경 등)
	_update(time) {
		time *= 0.001;

		// 그룹의 y축 회전
		this._group.rotation.y += 0.01;

		// 공의 위치 이동
		if (Math.abs(this._ball.position.x) > 14) this._vec.x *= -1;
		if (Math.abs(this._ball.position.y) > 9) this._vec.y *= -1;
		if (Math.abs(this._ball.position.z) > 11.5) this._vec.z *= -1;

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

	_getColor() {
		const selectedColor = document.querySelector('input[name="color"]:checked');
		return Number(selectedColor.value);
	}

	_getSpeed() {
		const selectedSpeed = document.querySelector('input[name="speed"]:checked');
		return Number(selectedSpeed.value);
	}

	_setupCamera() {
		const width = this._divContainer.clientWidth;
		const height = this._divContainer.clientHeight;
		const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
		camera.position.set(40, 20, 30);
		camera.lookAt(new THREE.Vector3(0, 0, 0));
		this._camera = camera;
	}

	_setupLight() {
		const ambientLight = new THREE.AmbientLight(0xffffff, 1);
		this._scene.add(ambientLight);
	}

	_setupModel() {
		const group = new THREE.Group();

		const geometry = new THREE.SphereGeometry(1.5, 10, 10);
		const geoWire = new THREE.EdgesGeometry(geometry);
		const fillMaterial = new THREE.MeshPhongMaterial({ color: this._ballColor });
		const WireMaterial = new THREE.LineBasicMaterial({ color: this._ballWireColor });
		const geoWireCol = new THREE.LineSegments(geoWire, WireMaterial);
		const ball = new THREE.Mesh(geometry, fillMaterial);

		const ballPosX = new THREE.PlaneGeometry(25, 20);
		const ballPosXEdge = new THREE.EdgesGeometry(ballPosX);
		const ballPosXEdgeMat = new THREE.LineBasicMaterial({ color: 0x00FFFF });
		const ballPosXWire = new THREE.LineSegments(ballPosXEdge, ballPosXEdgeMat);
		ballPosXWire.rotation.y = Math.PI / 2;

		const ballPosZ = new THREE.PlaneGeometry(30, 20);
		const ballPosZEdge = new THREE.EdgesGeometry(ballPosZ);
		const ballPosZEdgeMat = new THREE.LineBasicMaterial({ color: 0xFF1493 });
		const ballPosZWire = new THREE.LineSegments(ballPosZEdge, ballPosZEdgeMat);

		const room = new THREE.BoxGeometry(30, 20, 25);
		const wireframeGeometry = new THREE.EdgesGeometry(room);
		const wireframeMaterial = new THREE.LineBasicMaterial({ color: 0x39FF14 });
		const wireframeCube = new THREE.LineSegments(wireframeGeometry, wireframeMaterial);

		group.add(ball);
		group.add(geoWireCol);
		group.add(ballPosXWire);
		group.add(ballPosZWire);
		group.add(wireframeCube);

		let axes = new THREE.AxesHelper(50);
		let gridhelper = new THREE.GridHelper(100, 5);

		this._scene.add(axes);
		this._scene.add(gridhelper);
		this._scene.add(group);

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
}
