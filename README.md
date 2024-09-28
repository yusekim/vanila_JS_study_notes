# vanila_JS_study_notes

## JS 클래스
안녕하세요! JavaScript에서 클래스를 만드는 방법에 대해 예제를 통해 설명해 드리겠습니다. ES6(ECMAScript 2015)부터 JavaScript는 `class` 키워드를 도입하여 객체 지향 프로그래밍 방식을 지원합니다.

### 1. **기본 클래스 선언**

```javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  // 메서드 정의
  sayHello() {
    console.log(`안녕하세요, 저는 ${this.name}이고, 나이는 ${this.age}살입니다.`);
  }
}

// 인스턴스 생성
const person1 = new Person('홍길동', 30);
person1.sayHello(); // 안녕하세요, 저는 홍길동이고, 나이는 30살입니다.
```

#### 설명:

- **`class` 키워드**를 사용하여 `Person` 클래스를 정의합니다.
- **`constructor` 메서드**는 클래스의 생성자로, 인스턴스를 생성할 때 호출됩니다.
- **`this` 키워드**를 사용하여 인스턴스의 속성에 접근하거나 설정합니다.
- 클래스 내부에 메서드를 정의하여 인스턴스가 사용할 수 있습니다.

### 2. **상속**

클래스를 상속하여 다른 클래스를 만들 수 있습니다.

```javascript
class Student extends Person {
  constructor(name, age, grade) {
    super(name, age); // 부모 클래스의 생성자 호출
    this.grade = grade;
  }

  // 메서드 오버라이딩
  sayHello() {
    super.sayHello(); // 부모 클래스의 메서드 호출
    console.log(`저는 ${this.grade}학년입니다.`);
  }
}

// 인스턴스 생성
const student1 = new Student('김철수', 16, 10);
student1.sayHello();
// 출력:
// 안녕하세요, 저는 김철수이고, 나이는 16살입니다.
// 저는 10학년입니다.
```

#### 설명:

- **`extends` 키워드**를 사용하여 `Person` 클래스를 상속받는 `Student` 클래스를 만듭니다.
- **`super()`**를 사용하여 부모 클래스의 생성자를 호출하고, 부모 클래스의 메서드도 호출할 수 있습니다.
- 자식 클래스에서 부모 클래스의 메서드를 **오버라이딩**할 수 있습니다.

### 3. **정적 메서드와 정적 속성**

정적 메서드와 정적 속성은 클래스 자체에 속하며, 인스턴스가 아닌 클래스 이름으로 호출합니다.

```javascript
class MathUtil {
  static PI = 3.14159;

  static square(x) {
    return x * x;
  }
}

console.log(MathUtil.PI); // 3.14159
console.log(MathUtil.square(5)); // 25
```

#### 설명:

- **`static` 키워드**를 사용하여 정적 속성과 메서드를 정의합니다.
- 정적 멤버는 인스턴스에서 접근할 수 없으며, 클래스 이름을 통해 접근합니다.

### 4. **게터(Getter)와 세터(Setter)**

클래스에서 속성처럼 동작하는 메서드를 정의할 수 있습니다.

```javascript
class Rectangle {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  // 면적을 게터로 정의
  get area() {
    return this.width * this.height;
  }

  // 면적을 세터로 정의
  set area(value) {
    this.width = value / this.height;
  }
}

const rect = new Rectangle(10, 5);
console.log(rect.area); // 50

rect.area = 100;
console.log(rect.width); // 20 (height는 5로 그대로, width가 변경됨)
```

#### 설명:

- **`get` 키워드**를 사용하여 게터를 정의합니다.
- **`set` 키워드**를 사용하여 세터를 정의합니다.
- 게터와 세터는 속성처럼 사용됩니다.

### 5. **프라이빗 필드와 메서드**

ES2020부터 **프라이빗 필드**와 **프라이빗 메서드**를 지원합니다. 이는 클래스 외부에서 접근할 수 없습니다.

```javascript
class Counter {
  #count = 0; // 프라이빗 필드

  increment() {
    this.#count++;
  }

  get value() {
    return this.#count;
  }
}

const counter = new Counter();
counter.increment();
console.log(counter.value); // 1
console.log(counter.#count); // 오류: 프라이빗 필드에 접근 불가
```

#### 설명:

- **`#`**를 필드나 메서드 이름 앞에 붙여서 프라이빗으로 만듭니다.
- 프라이빗 멤버는 클래스 외부에서 접근할 수 없으며, 접근하려고 하면 **SyntaxError**가 발생합니다.

### 6. **예제: 은행 계좌 클래스**

실제 사례를 통해 클래스를 만들어 보겠습니다.

```javascript
class BankAccount {
  #balance = 0; // 프라이빗 속성

  constructor(owner) {
    this.owner = owner;
  }

  deposit(amount) {
    if (amount > 0) {
      this.#balance += amount;
      console.log(`${amount}원이 입금되었습니다. 잔액: ${this.#balance}원`);
    } else {
      console.log('유효한 금액을 입금하세요.');
    }
  }

  withdraw(amount) {
    if (amount > 0 && this.#balance >= amount) {
      this.#balance -= amount;
      console.log(`${amount}원이 출금되었습니다. 잔액: ${this.#balance}원`);
    } else {
      console.log('잔액이 부족하거나 유효하지 않은 금액입니다.');
    }
  }

  get balance() {
    return this.#balance;
  }
}

const myAccount = new BankAccount('이영희');
myAccount.deposit(1000); // 1000원이 입금되었습니다. 잔액: 1000원
myAccount.withdraw(500); // 500원이 출금되었습니다. 잔액: 500원
console.log(myAccount.balance); // 500
console.log(myAccount.#balance); // 오류: 프라이빗 속성에 접근 불가
```

#### 설명:

- `BankAccount` 클래스는 은행 계좌를 모델링합니다.
- **프라이빗 속성** `#balance`를 사용하여 잔액을 관리합니다.
- `deposit`과 `withdraw` 메서드를 통해 입출금을 관리합니다.
- 잔액은 게터를 통해 읽을 수 있지만, 직접 수정할 수는 없습니다.

### 7. **추상 클래스처럼 사용하기**

JavaScript에는 추상 클래스 개념이 없지만, **상속을 통해 특정 메서드를 구현하도록 강제**할 수 있습니다.

```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    throw new Error('이 메서드는 서브클래스에서 구현되어야 합니다.');
  }
}

class Dog extends Animal {
  speak() {
    console.log(`${this.name}가 멍멍 짖습니다.`);
  }
}

const dog = new Dog('바둑이');
dog.speak(); // 바둑이가 멍멍 짖습니다.

const animal = new Animal('동물');
animal.speak(); // Error: 이 메서드는 서브클래스에서 구현되어야 합니다.
```

#### 설명:

- `Animal` 클래스에서 `speak` 메서드를 정의하지만, 구현하지 않고 에러를 던집니다.
- 서브클래스인 `Dog`에서 `speak` 메서드를 구현합니다.

### 8. **클래스 표현식**

클래스는 표현식으로도 만들 수 있습니다.

```javascript
const MyClass = class {
  constructor(value) {
    this.value = value;
  }

  showValue() {
    console.log(`값은 ${this.value}입니다.`);
  }
};

const instance = new MyClass(10);
instance.showValue(); // 값은 10입니다.
```

#### 설명:

- 클래스 표현식을 사용하여 클래스를 변수에 할당합니다.
- 이 방법은 익명 클래스를 만들거나, 동적으로 클래스를 생성할 때 유용합니다.

### 9. **심볼(Symbol)을 사용한 프라이빗 멤버**

프라이빗 멤버를 심볼을 사용하여 구현할 수도 있습니다.

```javascript
const _radius = Symbol('radius');

class Circle {
  constructor(radius) {
    this[_radius] = radius;
  }

  get radius() {
    return this[_radius];
  }

  get area() {
    return Math.PI * this[_radius] ** 2;
  }
}

const circle = new Circle(5);
console.log(circle.radius); // 5
console.log(circle.area);   // 78.53981633974483
console.log(circle._radius); // undefined
```

#### 설명:

- 심볼을 사용하여 외부에서 접근할 수 없는 프라이빗 멤버를 만듭니다.
- 심볼은 유일한 값이므로 같은 이름의 속성이 충돌하지 않습니다.

---

이렇게 JavaScript에서 클래스를 만드는 여러 가지 방법과 예제를 살펴보았습니다. 클래스를 사용하면 객체 지향 프로그래밍 패턴을 더 쉽게 구현할 수 있습니다. 필요한 기능에 따라 클래스를 정의하고 활용해 보세요.

혹시 추가로 궁금하신 점이나 도움이 필요한 부분이 있으시면 말씀해 주세요!

```javascript
// tweenJS 카메라 무브먼트 애니메이션 예제코드
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Three.js and Tween.js Camera Animation</title>
  <style>
    body { margin: 0; }
    canvas { display: block; }
  </style>
</head>
<body>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/tween.js/18.6.4/tween.umd.js"></script>

  <script>
    // Three.js 기본 설정
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // 바닥을 위한 PlaneGeometry 생성
    const planeGeometry = new THREE.PlaneGeometry(200, 200);
    const planeMaterial = new THREE.MeshBasicMaterial({ color: 0x999999, side: THREE.DoubleSide });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = Math.PI / 2;
    scene.add(plane);

    // 큐브 생성
    const cubeGeometry = new THREE.BoxGeometry();
    const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.position.set(0, 0.5, 0);
    scene.add(cube);

    // 초기 카메라 위치 설정
    camera.position.set(10, 10, 10);
    camera.lookAt(0, 0, 0); // 카메라가 원점을 바라보게 설정

    // Tween.js를 사용하여 카메라 이동 애니메이션 설정
    function animateCameraWithTween() {
      let startPosition = { x: camera.position.x, y: camera.position.y, z: camera.position.z };
      let targetPosition = { x: 0, y: 5, z: 10 }; // 목표 위치

      new TWEEN.Tween(startPosition)
        .to(targetPosition, 3000) // 3초 동안 목표 위치로 이동
        .easing(TWEEN.Easing.Quadratic.InOut) // 부드러운 애니메이션 (Ease In-Out)
        .onUpdate(() => {
          // 카메라의 위치를 업데이트
          camera.position.set(startPosition.x, startPosition.y, startPosition.z);
          camera.lookAt(cube.position); // 카메라는 계속해서 큐브를 바라봄
        })
        .start(); // 애니메이션 시작
    }

    // 애니메이션 루프
    function animate() {
      requestAnimationFrame(animate);

      // Tween 업데이트 (필수)
      TWEEN.update();

      // 씬을 렌더링
      renderer.render(scene, camera);
    }

    // 애니메이션 시작
    animate();

    // 2초 후 카메라 이동 시작
    setTimeout(animateCameraWithTween, 2000);

    // 윈도우 리사이즈 처리
    window.addEventListener('resize', () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    });
  </script>
</body>
</html>

```
