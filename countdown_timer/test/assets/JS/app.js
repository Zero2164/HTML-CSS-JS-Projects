// Wait for window load
$(window).load(function () {
    // Animate loader off screen
    $(".se-pre-con").fadeOut("slow");
    countDownTimerApp();
});


function countDownTimerApp() {

    const FULL_DASH_ARRAY = [283];

    let TIME_LIMIT = 0;
    let TIME_HISTORY = 0;
    let audio = new Audio("https://bigsoundbank.com/UPLOAD/mp3/0035.mp3");

    // Initially, no time has passed, but this will count up
    // and subtract from the TIME_LIMIT
    let timePassed = 0;
    let timeLeft = TIME_LIMIT;

    // Implement timer interval 
    let timerInterval = null;


    // obtain dom buttoms
    let editBtnOne = document.getElementById("btn-edit-one");
    let editBtnTwo = document.getElementById("btn-edit-two");
    let pauseBtn = document.getElementById("btn-pause");
    let playBtn = document.getElementById("btn-play");
    let sndBtn = document.getElementById("btn-sound");
    let muteBtn = document.getElementById("btn-mute");
    let resetBtn = document.getElementById("btn-reset");
    let stopBtn = document.getElementById("btn-stop");
    let delBtn = document.getElementById("btn-del");
    let timerSetBtn = document.getElementById("btn-timerset");
    let inptHours = document.getElementById("inpt-hours");
    let inptMinutes = document.getElementById("inpt-minutes");
    let inptSeconds = document.getElementById("inpt-seconds");
    let notifications = document.getElementById("notify");
    // create variables for functions
    let isPaused = false;
    let hours = 0;
    let minutes = 0;
    let seconds = 0;
    let alertMsg = "";
    let timerStarted = false;

    document.getElementById("app").innerHTML = `...Loading...`
    document.getElementById("app").innerHTML = `
        <div class="base-timer">
        <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <g class="base-timer__circle">
            <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
            <path
                id="base-timer-path-remaining"
                stroke-dasharray="283 283"
                class="base-timer__path-remaining"
                d="
                M 50, 50
                m -45, 0
                a 45,45 0 1,0 90,0
                a 45,45 0 1,0 -90,0
                "
            ></path>
            </g>
        </svg>
        <span id="base-timer-label" class="base-timer__label">
            ${formatTime(timeLeft)}
        </span>
        </div>
        `;
    notifications.innerHTML = `
        <div class="container d-flex justify-content-center pt-3">
        <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
        <symbol id="check-circle-fill" fill="currentColor" viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
        </symbol>
        <symbol id="info-fill" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
        </symbol>
        <symbol id="exclamation-triangle-fill" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
        </symbol>
        </svg>
        <div class="alert alert-warning alert-dismissible fade show animate__animated animate__bounceInDown col-lg-6 col-xl-4" role="alert">
        <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Warning:"><use xlink:href="#exclamation-triangle-fill"/></svg>
        <span id="alert-msg">
        ${alertMsg}
        </span>
        <button id="close-msg" type="button" class="btn-close" aria-label="Close"></button>
        </div>
        </div>
        `;
    let notifymsg = document.getElementById("alert-msg");
    let closeMsg = document.getElementById("close-msg");



    function getTime() {
        hours = Number(inptHours.value) * 60 * 60;
        minutes = Number(inptMinutes.value) * 60;
        seconds = Number(inptSeconds.value);
        if (isNaN(hours || minutes || seconds) || ((hours < 0) || (minutes < 0) || (seconds < 0))) {
            ifValueFalse(true);
        } else if ((hours === 0) && (minutes === 0) && (seconds === 0)) {
            ifValueFalse(false);
        } else {
            result();
        }

    }

    function result() {
        clearInterval(timerInterval);
        TIME_LIMIT = 0;
        timePassed = 0;
        TIME_LIMIT = hours += minutes += seconds;
        TIME_HISTORY = TIME_LIMIT;
        timeLeft = TIME_LIMIT;
        document.getElementById("base-timer-label").innerHTML = formatTime(timeLeft);
        isPaused = true;
        pauseBTN();
        timerStarted = true;
        startTimer();
    }

    function dismissFunc() {
        notifications.className = "animate__animated animate__bounceOutUp";
        setTimeout(() => { notifications.style.display = "none"; }, 1000);
    }

    function ifValueFalse(inptVal) {
        if (inptVal) {
            alertMsg = "Invalid Value or Number. Try again.";
            notifymsg.innerHTML = alertMsg;
        }
        if (!inptVal) {
            alertMsg = "Value cannot be 0. Try again."
            notifymsg.innerHTML = alertMsg;
        }
        if (!timerStarted) {
            inptMinutes.value = null;
            inptSeconds.value = null;
            inptHours.value = null;
        }
        notifications.style.display = "inline";
        notifications.className = "animate__animated animate__bounceInDown";
        setTimeout(() => {
            dismissFunc();
        }, 4000);


    }

    function stoppedBTN() {
        audio.pause();
        stopBtn.style.display = "none";
    }

    function editedBTN() {
        inptHours.focus();
        stopBtn.style.display = "none";
        if(timerStarted) {
            pauseBTN();
        }
        if (!timerStarted) {
            isPaused = true;
            audio.pause();
        }
    }

    function playBTN() {
        isPaused = false;
        playBtn.style.display = "none";
        pauseBtn.style.display = "inline";
    }

    function pauseBTN() {
        isPaused = true;
        pauseBtn.style.display = "none";
        playBtn.style.display = "inline";
        audio.pause();
    }

    function soundBTN() {
        sndBtn.style.display = "none";
        muteBtn.style.display = "inline";
        audio.muted = true;
    }
    function mutedBTN() {
        muteBtn.style.display = "none";
        sndBtn.style.display = "inline";
        audio.muted = false;
    }

    function resetTimeBtn() {
        stoppedBTN();
        document.querySelector('html').style.cursor = "progress";
        document.querySelector('button').style.cursor = "progress";
        setTimeout(() => {
            document.querySelector('html').style.cursor = "default";
            document.querySelector('button').style.cursor = "default";
        }, 2000)
        clearInterval(timerInterval);
        TIME_LIMIT = TIME_HISTORY;
        timeLeft = TIME_LIMIT;
        timePassed = 0;
        document.getElementById("base-timer-label").innerHTML = formatTime(timeLeft);
        resetBtn.style.display = "none";
        isPaused = true;
        pauseBtn.style.display = "none";
        playBtn.style.display = "inline";
        startTimer();
    }




    function formatTime(time) {
        // The largest round integer less than or equal to the result of time divided by 60.
        let fmtMinutes = Math.floor(time / 60 % 60);
        // Seconds are the remainder of the time divided by 60 (modulus operator)
        let fmtSeconds = time % 60;
        // The largest round integer less than or equal to the result of time divided by 60 by 60.  
        let fmtHours = Math.floor(time / 60 / 60);;

        if (fmtSeconds < 10) {
            fmtSeconds = `0${fmtSeconds}`;
        }
        if (fmtMinutes < 10) {
            fmtMinutes = `0${fmtMinutes}`;
        }
        if (fmtHours < 10) {
            fmtHours = `0${fmtHours}`;
        }

        return `${fmtHours}:${fmtMinutes}:${fmtSeconds}`;
    }


    // Divides time left by the defined time limit.
    function calculateTimeFraction() {
        const rawTimeFraction = timeLeft / TIME_LIMIT;
        return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
    }

    // Update the dasharray value as time passes, starting with 283
    function setCircleDasharray() {
        const circleDasharray = `${(
            calculateTimeFraction() * FULL_DASH_ARRAY
        ).toFixed(0)} 283`;
        document
            .getElementById("base-timer-path-remaining")
            .setAttribute("stroke-dasharray", circleDasharray);
    }

    function startTimer() {
        resetBtn.style.display = "inline";
        delBtn.style.display = "inline";
        if (TIME_LIMIT <= timePassed) {
            clearInterval(timerInterval);
        } else {
            timerInterval = setInterval(() => {
                if (!isPaused) {
                    // The amount of time passed increments by one
                    timePassed = timePassed += 1;
                    timeLeft = TIME_LIMIT - timePassed;
                }


                // The time left label is updated
                document.getElementById("base-timer-label").innerHTML = formatTime(timeLeft);

                setCircleDasharray();

                if (TIME_LIMIT === timePassed) {
                    clearInterval(timerInterval);
                    timePassed = 0;
                    audio.play();
                    pauseBtn.style.display = "none";
                    playBtn.style.display = "none";
                    stopBtn.style.display = "inline";
                    resetBtn.style.display = "inline";
                    timerStarted = false;
                    setTimeout(() => {
                        stopBtn.style.display = "none";
                    }, 21000)
                }
            }, 1000);
        }

    }


    editBtnOne.addEventListener("click", () => {
        editedBTN();
    })
    editBtnTwo.addEventListener("click", () => {
        editedBTN();
    })
    pauseBtn.addEventListener("click", () => {
        pauseBTN();
    })
    playBtn.addEventListener("click", () => {
        playBTN();
    })
    sndBtn.addEventListener("click", () => {
        soundBTN();
    })
    muteBtn.addEventListener("click", () => {
        mutedBTN();
    })
    stopBtn.addEventListener("click", () => {
        stoppedBTN();
    })
    resetBtn.addEventListener("click", () => {
        resetTimeBtn();
    })
    delBtn.addEventListener("click", () => {
        window.location.reload();
    })
    timerSetBtn.addEventListener("click", () => {
        getTime();
    })
    closeMsg.addEventListener("click", () => {
        dismissFunc();
    })

};


