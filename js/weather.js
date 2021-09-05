// navigator , geolocation , getCurrentPosition() 좌표를 알려주는 JS.

const API_KEY = "08f841ff5310514857f776f59cea661d"

function onGeoOk(position){
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    console.log("You live it", lat, lng);

    //JS에서 URL 불러오기
    //https://api.openweathermap.org/data/2.5/weather?lat=37.8863616&lon=127.75915520000001&appid=08f841ff5310514857f776f59cea661d
    //&units=metric의 추가
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`;
    
     
    // fetch의 사용
    // fetch = promise (당장 뭔가 일어나지 않고 시간이 좀 걸린 뒤에 일어남.)
    // fetch(url);
    fetch(url)
        // 서버가 응답하면 json 객체로 받도록 한다.
        .then(response => response.json())  
        .then((data) => {
            // 지역이름과, 날씨를 제대로 가져오는지 콘솔로 확인
            console.log(data.name, data.weather[0].main);

            const weather = document.querySelector("#weather span:first-child");
            const city = document.querySelector("#weather span:last-child");

            city.innerText = data.name;
            weather.innerText = `${data.weather[0].main} / ${data.main.temp}`;
        });;

}

function onGeoError(){
    alert("Can't find you. No whether for you.");
}

//현재 위치의 좌표값을 구해주는 함수. 파라미터(success, error)
navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);


