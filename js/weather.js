const API_KEY = config.apikey;

navigator.geolocation.getCurrentPosition(getPositionSucces, getPositionFail);
//해당 메서드를 통해 현 위치를 얻어올 수 있음
//getCurrentPosition(성공 시 호출할 함수, 실패 시 호출할 함수)

function getPositionSucces(pos) {
  const lat = pos.coords.latitude;
  const lon = pos.coords.longitude;
  //위도와 경도의 정보를 변수에 할당
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  // 호출할 api url을 변수에 할당
  // 위도/경도/api key 값엔 변수로 지정한 값을 넣어줌

  fetch(url).then((response) =>
    response.json().then((data) => {
      const location = document.querySelector('#weather span:first-child');
      const weather = document.querySelector('#weather span:last-child');
      //위치값과 날씨 정보를 넣을 html 요소를 변수에 할당
      const temp = Math.round(data.main.temp);
      // 온도값은 소숫점 두자리까지 표기 됨 > 이를 정수화 시키기 위해 반올림 해주는 함수인 Math.round 사용

      location.innerText = `${data.name}, ${data.sys.country}`;
      //span에 읽어들인 경도/위도 값을 기반으로 받아온 도시명과 국가명을 입력해줌
      weather.innerHTML = `${data.weather[0].main} / ${temp}&deg;C`;
      //span에 읽어들인 경도/위도 값을 기반으로 받아온 날씨 정보와 온도 값을 넣어줌
      //innerText가 아닌 이유는 온도 기호를 표기하기 위해 &deg;를 사용했기 때문
    })
  );
}
// fetch -> javascipt에서 url을 호출해주는 함수, 서버의 응답을 기다려야 하기 때문에 .then을 사용해줌
// response를 받고 그 response의 json data를 얻어낸

function getPositionFail() {
  alert("Sorry, We can't find your location. Please check your option");
}
