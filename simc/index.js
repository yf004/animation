const card = document.getElementById("card");
const frontImg = document.getElementById("frontImg");
const backImg = document.getElementById("backImg");

const cards = [
  {
    front: "assets/card1-front.png",
    back: "assets/card1-back.png"
  },
  {
    front: "assets/card2-front.png",
    back: "assets/card2-back.png"
  },
  {
    front: "assets/card3-front.png",
    back: "assets/card3-back.png"
  },
  {
    front: "assets/card4-front.png",
    back: "assets/card4-back.png"
  }
];

function setCard(index) {
  frontImg.src = cards[index].front;
  backImg.src = cards[index].back;
}

gsap.set(card, {
  scale: 0.01,
  rotateY: 0,
  rotateZ: 0
});

const tl = gsap.timeline();

//
// scale in once
//
tl.to(card, {
  duration: 2,
  scale: 1.15,
  rotateY: 720,
  ease: "power1.out",
  rotateZ: 0,
}, 0)

tl.to(card, {
    rotateZ: -1.5,
    duration: 0.2,
    repeat: 7,
    yoyo: true,
    ease: "sine.inOut",
}, 0)

for (let i = 0; i < cards.length; i++) {


    // slow display of front
    tl.to(card, {
        rotateY: "+=25",
        rotateZ: "1.5",
        ease: "sine.in",
        duration: 2
    })

    // turn to back
    tl.to(card, {
        rotateY: "+=160", 
        rotateZ: "-=1",
        duration: 1,   
        ease: "sine.inOut",
    })  

    // slow display of back
    tl.to(card, {
        rotateY: "+=15", 
        rotateZ: "-=1",
        duration: 1,   
        ease: "power1.out",
    }) 

  
    if (i < cards.length - 1) {

        tl.to(card, {
            rotateY: "+=540",
            rotateZ: "3",
            duration: 0.6,
            ease: "power3.in",
            scale: 0.6,
        });

        tl.call(() => {
            setCard(i + 1);
        });

        tl.to(card, {
            rotateY: "+=340",
            rotateZ: -1.5,
            duration: 0.7,
            ease: "power2.out",
            scale: 1.15,

        });

    }
}



//
// spin out
//
tl.to(card, {
  duration: 1.2,
  scale: 0.01,
  rotateY: "+=720",
  ease: "power2.out"
});