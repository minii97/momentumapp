const clock = document.querySelector('#clock');
//h2(id=clock)을 변수에 저장

paintClock();
//paintClock 함수 호출 = page load시 html상의 h2의 textnode인 00:00:00가 아닌 우리가 받아온 시계 값을 호출하기 위해

setInterval(paintClock, 1000);
// 1초에 한번씩 paintClock 함수 호출, 1초당 한번 씩 카운팅 되는 시계가 되는 것

function paintClock() {
  const date = new Date();
  // date 생성자를 변수에 할당, 이 때 new를 선언하는 이유는 date 객체를 생성하기 위하여.
  // Date()를 작성하면 현재 시각을 문자열로 반환할 뿐 객체를 생성하지 않음.

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  //현재 시,분,초 값을 변수에 할당
  //string을 쓴 이유는 padStart 함수는 string type에만 적용되기 때문에
  //padStart는 maxlength(현재는 2)를 검사하고 이에 충족하지 않으면 사용자가 지정한 string값을 (현재는 "0")을 왼쪽부터 채워 maxlength에 글자 수를 맞춰준다
  //시,분 값이 0:0 가 아닌 00:00으로 표시하기 위함임

  clock.innerText = `${hours}:${minutes}`;
  //h2의 text node값을 다음과 할당한 변수값을 활용해 표시
  //``을 이용하여 표기하였는데 이는 clock.innerText = hours + ':' + minutes + code와 출력값이 같다
}
