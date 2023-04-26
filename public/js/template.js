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

let like_button = document.getElementById("like_button");
let heart_icon = document.getElementById("heart_id").className;
let like_status=0;
if(document.getElementById("liked")){
    document.getElementById("heart_id").className = "fa fa-heart";
    like_status=1;
}
else{
    document.getElementById("heart_id").className = "fa fa-heart-o";
    like_status=0;
}
function likePage() {
    console.log("like button clicked...")
    const post_title_heading = like_button.previousElementSibling.innerHTML.trim();
    if (like_status==0) {
        console.log("liking the page...")
        fetch("/like", {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ like_this_blog: post_title_heading })
        });
        like_status=1;
        document.getElementById("heart_id").className = "fa fa-heart";
    }
    else if (like_status==1) {
        console.log("unliking the page...")
        fetch("/unlike", {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ unlike_this_blog: post_title_heading })
        });
        like_status=0;
        document.getElementById("heart_id").className = "fa fa-heart-o";
    }
};
