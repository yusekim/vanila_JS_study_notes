import * as THREE from './modules/three.module.js'
import { OrbitControls } from './modules/OrbitControls.js';


class App {
	constructor() {
	  this._scene = new THREE.Scene();

	  // 렌더러 설정
	  this._renderer = new THREE.WebGLRenderer();
	  this._renderer.setSize(window.innerWidth, window.innerHeight);
	  document.body.appendChild(this._renderer.domElement);

	  // 첫 번째 카메라 생성 (왼쪽 화면)
	  this._cameraLeft = new THREE.PerspectiveCamera(75, window.innerWidth / 2 / window.innerHeight, 0.1, 1000);
	  this._cameraLeft.position.set(5, 5, 10); // 카메라 위치 설정

	  // 두 번째 카메라 생성 (오른쪽 화면)
	  this._cameraRight = new THREE.PerspectiveCamera(75, window.innerWidth / 2 / window.innerHeight, 0.1, 1000);
	  this._cameraRight.position.set(-5, 5, 10); // 카메라 위치 설정

	  // 조명 추가
	  const light = new THREE.DirectionalLight(0xffffff, 1);
	  light.position.set(10, 10, 10).normalize();
	  this._scene.add(light);

	  // 간단한 큐브 추가
	  const geometry = new THREE.BoxGeometry();
	  const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
	  this._cube = new THREE.Mesh(geometry, material);
	  this._scene.add(this._cube);

	  this._animate();
	}

	_animate() {
	  requestAnimationFrame(this._animate.bind(this));

	  // 큐브를 회전
	  this._cube.rotation.x += 0.01;
	  this._cube.rotation.y += 0.01;

	  // 1. 첫 번째 카메라로 왼쪽 절반을 렌더링
	  this._renderer.setViewport(0, 0, window.innerWidth / 2, window.innerHeight);
	  this._renderer.setScissor(0, 0, window.innerWidth / 2, window.innerHeight);
	  this._renderer.setScissorTest(true);
	  this._renderer.render(this._scene, this._cameraLeft);

	  // 2. 두 번째 카메라로 오른쪽 절반을 렌더링
	  this._renderer.setViewport(window.innerWidth / 2, 0, window.innerWidth / 2, window.innerHeight);
	  this._renderer.setScissor(window.innerWidth / 2, 0, window.innerWidth / 2, window.innerHeight);
	  this._renderer.render(this._scene, this._cameraRight);
	}
  }

  // 애플리케이션 실행
  new App();
