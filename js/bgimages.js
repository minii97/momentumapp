const arr = ['0.jpg', '1.jpg', '2.jpg', '3.jpg', '4.jpg'];
//img 폴더 내의 파일들을 array로 할당

const ranNum = arr[Math.floor(Math.random() * arr.length)];
// array의 length를 이용해 1이하의 random한 실수값을 곱해주고 그 수를 Math.floor로 정수화 해준다.
// Math.floor() -> 주어진 수 이하의 가장 큰 정수를 return해줌.

const img = document.createElement('img');
// img 요소를 동적으로 생성함.

img.src = `img/${ranNum}`;
//ranNum에서 받은 0~2(arr.length)의 랜덤한 숫자값을 arr의 index 넘버로 활용해 0.jpg~2.jpg 파일 중 랜덤하게 img 요소의 src 속성으로 사용한다.

document.body.appendChild(img);
// body의 자식요소로 img 변수를 추가시킴. 비로소 우리가 동적으로 생성한 img 변수가 화면에 나타나고 우리는 새로고침 할 때마다 0~2번의 배경화면 사진을 random하게 보게 된다.
