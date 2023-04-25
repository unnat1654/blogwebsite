document.getElementById("infostore").style.display = "none";
if (document.getElementById("infostore").innerHTML == "") {
    document.getElementById("profile_picture").style.display = "none";
}
else {
    document.getElementById("sign-up").style.display = "none";
    document.getElementById("log-in").style.display = "none";
}
document.getElementById("logoutBox").style.display = "none";
document.getElementById("logoutBox").addEventListener("mouseleave", () => {
    document.getElementById("logoutBox").style.display = "none";
});

function showLogoutBox(){
    document.getElementById("dp_button").innerHTML = "<i class='fa fa-user-o' style='font-size:36px;'></i>";
    document.getElementById("logoutBox").style.display = "inline-block";
}
function changeicon(){
    document.getElementById("dp_button").innerHTML = "<i class='fa fa-user' style='font-size:36px;'></i>";
}