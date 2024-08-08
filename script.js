// For smooth scrolling 

const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),  // el is element i.e in which element we want smooth scrolling like i have added id(#main)in which i want the smooth scrolling
    smooth: true
});


var timeout;

// mouse move ho to jo white circle hai jo mouse ke sath move hota hai wo limited skew ho jismai hm min-max skew dengay, and when mouse move ho toh skew value increase ho but when mouse not moving then skew back to normal place
function skewAnim(){
    // defining default scale value
    var xscale = 1;
    var yscale = 1;

    var xprev = 0;
    var yprev = 0;

    window.addEventListener("mousemove", function(dets){
        clearTimeout(timeout);
        //  clamp mai hm min and max value dete hai or uske sath input toh agar input min ya max se kum zyada ho to to wo value min ya max mai convert ya nearest to them convert ho jato ha
        xscale = gsap.utils.clamp(.8,1.2, dets.clientX - xprev);
        yscale = gsap.utils.clamp(.8,1.2, dets.clientY - yprev);


        xprev = dets.clientX;
        yprev = dets.clientY;

        circleMouseFollower(xscale, yscale);

        timer = setTimeout(function(){
            document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1, 1)`;
        }, 100);

    })
}

skewAnim();


// Animation transition
function firstPageAnim(){
    var tl = gsap.timeline();

    // for the navabr animation
    tl.from("#nav", {
        y: '-10',
        opacity: 0,
        duration: 1.5,
        ease: Expo.easeInOut
    })

    // for the text animation
    .to(".boundingelem", {
        y: 0,
        ease: Expo.easeInOut,
        duration: 2,
        delay: -1,
        stagger: .2  // used to put delay in our animation
    })


    // footer animation
    .from("#herofooter", {
        y: -10,
        opacity: 0,
        duration: 1.5,
        delay: -1,
        ease: Expo.easeInOut
    })
}


// Logic for moving circle with mouse
function circleMouseFollower(xscale, yscale){
    window.addEventListener("mousemove", function (dets){
        document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`;
    })
}


circleMouseFollower();
firstPageAnim();


// logic for when we move mouse the image taht hover on it also moves and rotates with the movement of mouse
document.querySelectorAll(".elem")
.forEach(function(elem){

    var rotate = 0;
    var difference = 0;

    elem.addEventListener("mousemove", function(dets){

        // finding the diffrence from the part from where the elem start
        var diff = dets.clientY - elem.getBoundingClientRect().top;


        // storing the precent position and minus from the new position, the difference will be the value thata how much will the image will rotate
        difference = dets.clientX - rotate;
        rotate = dets.clientX;


        // show image when we hover over the div(.elem)
        gsap.to(elem.querySelector("img"), {
            opacity: 1,
            ease: Power3,
            top: diff,
            left: dets.clientX,
            rotate: gsap.utils.clamp(-20,20,difference * 0.5),
        });
    });


    elem.addEventListener("mouseleave", function(dets){

        // removing image when we hover over the div(.elem)
        gsap.to(elem.querySelector("img"), {
            opacity: 0,
            ease: Power3,
            duration: 0.5,
        });
    });
});
