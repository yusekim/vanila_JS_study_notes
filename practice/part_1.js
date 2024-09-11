let a = 6;
const b = 2;
let something;
const myName = "YSK"


// var c = 0 거의 안쓰고 권장하지 않음
// let 은 변수, const 는 상수
// a = 3 문제없음
// b = 9 오류

console.log(a/b);
console.log("Hello " + myName);
console.log(something);


function sayHello(a, b) {
	if (a && b)
	console.log("Hello my name is " + a + " and I'm " + b);
else
console.log("Hello stranger!");
}

sayHello("YSK", 24);
sayHello("SJL", 21);
sayHello();

const player = {
	name: "YSK",
	points: 10,
	fat: false,
	sayhi : function (name) {
		console.log("Hi there, its" + name);
	}
};

console.log(player);
player.lastName = "Kim";
player.points += 5;
console.log(player);

function plus(a, b) {
	if (!a && !b)
		console.log("No input detected..");
	else if (!b)
		console.log(a);
	else
		console.log(a + b);
}

plus();
plus(3);
plus(4, 5);


