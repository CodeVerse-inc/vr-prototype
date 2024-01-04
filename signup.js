document.addEventListener("DOMContentLoaded", function () {
    const follower = document.querySelector(".blur_ball");

    document.addEventListener("mousemove", function (e) {
        const x = e.clientX;
        const y = e.clientY;

        follower.style.transform = `translate(${x * 0.5}px, ${y * 0.5}px)`;;
        console.log(x)
        if(x <= 100 && y <= 100){
            follower.style.backgroundColor = "blue";
        }else if(x >= 100 && y >= 100){
            follower.style.backgroundColor = "pink";
        }
        else{
            follower.style.backgroundColor = "cyan";
        }
    });
});