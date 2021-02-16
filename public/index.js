function start() {
    const username = document.getElementById("username").value;
    if(username == "") {
        alert("닉네임을 입력해주세요");
        return;
    }
    location.href = "game/?" + username;
}