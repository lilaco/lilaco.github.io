const clock = document.querySelector("h2#clock");

function getClock() {
    // Date 객체 생성
    const date = new Date();
    // String() 은 number 데이터를 String 유형으로 바꿔준다.
    // padStart로 한자리 숫자일때 앞에 0 넣어주기.
    const hours = String(date.getHours()).padStart(2,"0");
    const minutes = String(date.getMinutes()).padStart(2,"0");
    const seconds = String(date.getSeconds()).padStart(2,"0");

    clock.innerText = `${hours}:${minutes}:${seconds}`;
}

getClock();
//getClock function을 매 1초(1000ms) 마다 실행
setInterval(getClock, 1000);

//초를 불러내는데 String이 한자리 수가 나올때, 무조건 두자리로 표현하고 싶을때, ("1" -> "01") padStart 사용
