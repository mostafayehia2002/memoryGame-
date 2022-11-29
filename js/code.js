
/*start screen action*/
document.querySelector(`.controls-button span`).onclick = function screen() {
    let yourName = window.prompt("Enter your name");
    //function to calulate time
    time();

    if (yourName == null || yourName == "") {
        document.querySelector(`.name span`).innerHTML = "unKnown";

    } else {
        document.querySelector(`.name span`).innerHTML = yourName;

    }
    //remove screen to start game
    document.querySelector(`.controls-button`).style.display = "none";
}
/*end screen action*/
let duration = 1000;
let containerBlocks = document.querySelector(`.memory-game-blocks`);
let blocks = Array.from(containerBlocks.children);
// let orderRange = [...blocks.keys()];


//adding order to block items
blocks.forEach((block,) => {
    block.style.order = RandomNumber(blocks);

    block.onclick = () => {
        flipped(block);

    }

});

//method to get random number and return it
function RandomNumber(array) {

    return Math.floor(Math.random() * array.length);
};


//function to add flipped class to selected block
function flipped(selectedBlock) {
    selectedBlock.classList.add("flipped");

    let numberOFFlipped = blocks.filter((e) => {
        return e.classList.contains("flipped");
    });

    if (numberOFFlipped.length == 2) {
        console.log("two element flipped");
        stopClicking();
        checkBlocks(numberOFFlipped[0], numberOFFlipped[1]);
        success();
    }



}
// function to stop clicking if you clicked in to blocks
function stopClicking() {
    containerBlocks.classList.add(`no-clicking`);
    setTimeout(() => {
        containerBlocks.classList.remove(`no-clicking`);
    }, duration)

}


//function to check blocks if to blocks are the same
let tries = document.querySelector(".tries span");
function checkBlocks(firstBlock, secondBlock) {
    if (firstBlock.dataset.technology === secondBlock.dataset.technology) {
        firstBlock.classList.remove("flipped");
        secondBlock.classList.remove("flipped");
        firstBlock.classList.add("has-math");
        secondBlock.classList.add("has-math");
        document.getElementById("success").play();



    } else {
        tries.innerHTML = parseInt(tries.innerHTML) + 1;
        document.getElementById("faild").play();
        setTimeout(() => {
            firstBlock.classList.remove("flipped");
            secondBlock.classList.remove("flipped");
        }, duration);

    }


};

//congratulations function
let p = document.querySelector(".success");
let screen = document.querySelector(".controls-button");
let btn = document.querySelector(`.controls-button span`);
function success() {

    let value = blocks.every((e) => {

        return e.classList.contains("has-math");
    });


    if (value == true) {
        screen.style.display = "block";
        document.getElementById("finish").play();
        p.innerHTML = "congratulations";
        btn.innerHTML = "try again";
        btn.onclick = () => {

            window.location.reload();

        };
    }

}

// function to caluculate time 
function time() {
    let minutes = document.querySelector(".m");
    let second = document.querySelector(".s");
    let time = document.querySelector(".time");
    let t = setInterval(() => {
        second.innerHTML = parseInt(second.innerHTML) - 1;
        if (parseInt(minutes.innerHTML) === 0 && parseInt(second.innerHTML) === 0 || parseInt(tries.innerHTML) == 10) {
            clearInterval(t);
            screen.style.display = "block";
            p.innerHTML = "Game over";
            btn.innerHTML = "try again";
            btn.onclick = () => {
                window.location.reload();

            }
        }

        if (parseInt(second.innerHTML) === 0) {
            second.innerHTML = 59;
            if (parseInt(minutes.innerHTML) == 0) {
                minutes.innerHTML = 0;
            } else {
                minutes.innerHTML = parseInt(minutes.innerHTML) - 1;

            }

        }
        if (parseInt(second.innerHTML) < 10 && parseInt(minutes.innerHTML) === 0) {
            time.style.color = "red";

        }


    }, duration);




}