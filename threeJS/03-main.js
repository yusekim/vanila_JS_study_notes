import * as THREE from './modules/three.module.js'
import { OrbitControls } from './modules/OrbitControls.js';
import { FontLoader } from './modules/FontLoader.js';
import { TextGeometry } from './modules/TextGeometry.js';

class App {
	constructor() {
		const container = document.querySelector("#webgl-container");

		this._scene = new THREE.Scene();
		this._camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
		this._camera.position.z = 5;

		this._renderer = new THREE.WebGLRenderer({ antialias: true });
		this._renderer.setSize(window.innerWidth, window.innerHeight);
		container.appendChild(this._renderer.domElement);

		this._setupControls();
		this._setupLight();
		this._loadFont();

		window.addEventListener('resize', this._onWindowResize.bind(this), false);
		this._onWindowResize();

		this._animate();
	}

	_setupControls() {
		this._controls = new OrbitControls(this._camera, this._renderer.domElement);
		this._controls.enableDamping = true;  // 부드러운 제어 활성화
		this._controls.dampingFactor = 0.25;
		this._controls.enableZoom = true;
	}

	_setupLight() {
		const light = new THREE.DirectionalLight(0xffffff, 1);
		light.position.set(1, 1, 1).normalize();
		this._scene.add(light);
	}

	_loadFont() {
		const loader = new FontLoader();
		loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', (font) => {
			const textGeometry = new TextGeometry('Hello 3D!', {
				font: font,
				size: 1,
				height: 0.5,
				curveSegments: 12,
				bevelEnabled: true,
				bevelThickness: 0.03,
				bevelSize: 0.02,
				bevelOffset: 0,
				bevelSegments: 5
			});

			const textMaterial = new THREE.MeshPhongMaterial({ color: 0xf5deb3 });
			const textMesh = new THREE.Mesh(textGeometry, textMaterial);

			textMesh.position.set(-3, 0, 0);  // 텍스트 위치 설정
			this._scene.add(textMesh);
		});
	}

	_onWindowResize() {
		this._camera.aspect = window.innerWidth / window.innerHeight;
		this._camera.updateProjectionMatrix();
		this._renderer.setSize(window.innerWidth, window.innerHeight);
	}

	_animate() {
		requestAnimationFrame(this._animate.bind(this));
		this._controls.update();
		this._renderer.render(this._scene, this._camera);
	}
}

window.onload = function () {
	new App();
}
