function initLayout() {
    initHome();

    // clearActiveScreen('countdown');
    // showCountdown(() => {
    // clearActiveScreen('gameplay');
    // initGameplay();
    // })

}
// const playerData = {
//     username: "Walid",
//     level: "medium",
//     gun: "gun2",
//     target: "target1",
//     score: 0
// }
const playerData = {
    username: "",
    level: "",
    gun: "",
    target: "",
    score: 0
}

function initHome() {
    const inputUsername = document.getElementById('username'),
        inputLevel = document.getElementById('level'),
        selectGun = document.querySelectorAll("input[name='guns']"),
        selectTarget = document.querySelectorAll("input[name='targets']"),
        btnPlay = document.getElementById('btn-play'),
        instruction = document.getElementById('instruction'),
        closeInstr = document.getElementById('close-instr'),
        btnInstruction = document.getElementById('btn-instruction')
        ;

    inputUsername.oninput = (e) => {
        const username = e.target.value.trim();
        btnPlay.classList.toggle('disabled', username === '');
        playerData['username'] = username;
    }

    inputLevel.onchange = (e) => {
        const target = e.target.value;
        playerData['level'] = target
    }

    selectGun.forEach((gun) => {
        gun.onchange = (e) => {
            const { checked, value } = e.target

            if (checked) {
                playerData['gun'] = value
            }
        }
    })
    selectTarget.forEach((target) => {
        target.onchange = (e) => {
            const { checked, value } = e.target

            if (checked) {
                playerData['target'] = value
            }
        }
    })

    btnPlay.onclick = () => {
        // console.log(playerData);
        if (playerData['username'] === '') {
            alert('Username must be filled !')
            return;
        }

        if (playerData['level'] === '') {
            alert('Must be choose one level !')
            return;
        }
        if (playerData['gun'] === '') {
            alert('Must be choose one gun !')
            return;
        }
        if (playerData['target'] === '') {
            alert('Must be choose one target !')
            return;
        }


        clearActiveScreen('countdown');
        showCountdown(() => {
            clearActiveScreen('gameplay');
            initGameplay();
        })




    }

    btnInstruction.onclick = () => {
        instruction.classList.add('open')
    }

    closeInstr.onclick = () => {
        instruction.classList.remove('open');
    }
}

function initGameplay() {

    const playerName = document.querySelectorAll('.player-name'),
        playerScore = document.querySelectorAll('.player-score'),
        playerTime = document.querySelectorAll('.player-time'),
        timerLevel = playerData['level'] === 'hard' ? 30 : playerData['level'] === 'medium' ? 20 : 15,
        timer = gameTimer({
            MAX_TIME: timerLevel * 100,
            ELEMENT: playerTime,
            onCompleted: () => {
                showPopover('gameover');
                overGame();
                // playerData['time']


            }
        });

    playerData['score'] = 0;
    playerName.forEach((name) => name.textContent = playerData['username']);

    const canvas = document.getElementById('gameCanvas'),
        ctx = canvas.getContext('2d'),
        canvasW = canvas.width,
        canvasH = canvas.height,
        targetImage = new Image(),
        gunImage = new Image();


    function fetchImage() {
        let promise = [];

        targetImage.src = `./Sprites/${playerData['target']}.png`
        gunImage.src = `./Sprites/${playerData['gun']}.png`;

        promise.push(new Promise((resolve) => gunImage.onload = resolve))
        promise.push(new Promise((resolve) => targetImage.onload = resolve))
        return Promise.all(promise);
    }

    fetchImage()
        .then(() => {
            console.log('berhasil')
        })
        .catch((err) => {
            console.log(err);
        })
        ;

    const targets = [],
        targetW = 90,
        targetH = 90,
        gap = 20,
        gunH = 160,
        gunW = 200;

    function drawTarget() {
        targets.forEach((target) => {
            ctx.drawImage(
                targetImage,
                target.x,
                target.y,
                target.width,
                target.height
            )
        })
    }

    function drawGun() {
        ctx.drawImage(
            gunImage,
            (canvasW - gunW) / 2,
            canvasH - gunH,
            gunW,
            gunH
        )
    }



    let targetInterval = null;



    function spawnTarget() {

        const attempts = 20;
        for (let i = 0; i < attempts; i++) {

            const x = Math.random() * (canvasW - targetW) + gap,
                y = Math.random() * (canvasH - targetH - gunH) + gap;

            // console.log(x + " : " + y)
            let collisionScore = 0;
            targets.forEach((target) => {
                const isCollision =
                    x < target.x + target.width + gap &&
                    x + targetW + gap > target.x &&
                    y < target.y + target.width + gap &&
                    y + targetH + gap > target.y;

                console.log(isCollision)

                if (!isCollision) {
                    collisionScore++;
                }
            });


            if (collisionScore === targets.length) {
                console.log(collisionScore)
                targets.push({
                    x: x,
                    y: y,
                    width: targetW,
                    height: targetH,
                    hit: false
                });
                return;
            } else {
                continue;
            }
        }
    }

    function firstSpawnTarget() {
        targets.push({
            x: Math.random() * (canvasW - targetW),
            y: Math.random() * (canvasH - targetH - gunH),
            width: targetW,
            height: targetH,
            clicked: false
        });
        for (let i = 0; i < 2; i++) {
            spawnTarget();
        }
    }

    firstSpawnTarget();


    function startSpawnTarget() {

        if (targetInterval === null) {
            targetInterval = setInterval(spawnTarget, 3000);
        }
    }


    function stopSpawnTarget() {
        clearInterval(targetInterval);
        targetInterval = null
    }


    let animationFrameId = null;

    function render() {
        ctx.clearRect(0, 0, canvasW, canvasH);

        drawTarget();
        drawGun();

        playerScore.forEach((score) => score.textContent = playerData['score'])


        animationFrameId = requestAnimationFrame(render);
    }



    canvas.onclick = (e) => {
        const rect = canvas.getBoundingClientRect(),
            mouseX = e.clientX - rect.left,
            mouseY = e.clientY - rect.top;



        let out = 0;
        for (let i = 0; i < targets.length; i++) {
            const checkHit =
                mouseX > targets[i].x &&
                mouseX < targets[i].x + targets[i].width &&
                mouseY > targets[i].y &&
                mouseY < targets[i].y + targets[i].height;

            if (checkHit) {
                targets.splice(i, 1);
                playerData['score']++;
            } else {
                out++;
            }
        }

        if (out === targets.length) {
            timer.reduced(5);

        }
    }

    function startGame() {
        render();
        startSpawnTarget();
        timer.resume();
    }

    startGame();

    function overGame() {
        cancelAnimationFrame(animationFrameId);
        stopSpawnTarget();
        timer.reset();
        savePlayerData();

    }

    function pauseGame() {
        stopSpawnTarget();
        timer.stop();

    }

    function savePlayerData() {
        const storedData = JSON.parse(localStorage.getItem('USER_DATA')) || [];
        if (storedData) {
            localStorage.setItem('USER_DATA', JSON.stringify([...storedData, playerData]));
        } else {
            localStorage.setItem('USER_DATA', JSON.stringify(playerData));
        }
    }

    function readData() {
        const storedData = localStorage.getItem('USER_DATA') || [];

        const parsed = JSON.parse(storedData)

        if (storedData) {
            alert(JSON.stringify(parsed, null, 2));
        }
    }


    const btnRestarts = document.querySelectorAll('.btn-restart'),
        btnContinue = document.getElementById('btn-continue'),
        btnHome = document.getElementById('btn-home'),
        btnHistory = document.getElementById('btn-history');

    btnRestarts.forEach((btn) => {
        btn.onclick = () => {
            closePopover();
            playerData['score'] = 0;
            overGame();
            timer.reset();
            clearActiveScreen('countdown');
            showCountdown(() => {
                clearActiveScreen('gameplay')
                initGameplay();
            })
        }
    })

    btnHome.onclick = () => {
        closePopover();
        clearActiveScreen('home')
    }

    btnContinue.onclick = () => {
        closePopover();
        startGame();

    }

    btnHistory.onclick = () => {
        readData();
    }


    let gameState = 'playing'
    document.onkeydown = (e) => {
        if (e.key === 'Escape') {
            if (gameState === 'playing') {
                showPopover('pause');
                pauseGame();
                gameState = 'paused'
            } else {
                closePopover();
                startGame();
                gameState = 'playing'
            }
        }
    }



    const selectSortBy = document.getElementById('sortBy'),
        leaders = document.getElementById('leaders')
        ;


    function updateLeaderboards() {
        const storedData = JSON.parse(localStorage.getItem('USER_DATA'));
        if (storedData) {
            const sortBy = selectSortBy.value;

            if (sortBy === 'score') {
                storedData.sort((a, b) => {
                    return b.score - a.score
                });
            }

             leaders.innerHTML = '';
            storedData.forEach((data) => {
                const detail = document.createElement('div');
                detail.className = 'detail';
                detail.innerHTML = `
                                   
                        <div class="info">
                            <p>Name :  <span>${data.username}</span></p>
                        <p>Score : <span>${data.score}</span></p>
                        </div>

                        <button id="${data.username}">
                            Detail
                        </button>
                    `
                leaders.append(detail);
            })



            // if(storedData == 'timestamp')
        }
    }

    updateLeaderboards();

    selectSortBy.onchange = updateLeaderboards;


}

function gameTimer(options = {}) {
    let elapsedTime = options.MAX_TIME,
        ELEMENT = options.ELEMENT,
        timerInterval = null;

    function updateDisplay() {
        const second = Math.ceil(elapsedTime / 100),
            centisecond = elapsedTime % 100

        ELEMENT.forEach((el) => el.textContent = `${second.toString().padStart(2, "0")} : ${centisecond.toString().padStart(2, "0")}`)
    }

    function startTimer() {

        if (timerInterval === null) {
            timerInterval = setInterval(() => {
                elapsedTime--;
                updateDisplay();

                if (elapsedTime <= 0) {
                    clearInterval(timerInterval)
                    timerInterval = null;
                    elapsedTime = 0;
                    options.onCompleted();
                }

                updateDisplay();
            }, 10)
        }
    }

    startTimer();

    return {
        reduced: (seconds) => {
            elapsedTime -= seconds * 100;
            if (elapsedTime <= 0) {
                elapsedTime = 0
            }
        },
        stop: () => {
            clearInterval(timerInterval);
            timerInterval = null;
        },
        resume: () => {
            if (timerInterval === null) startTimer();
        },
        reset: () => {
            clearInterval(timerInterval);
            timerInterval = null;
            elapsedTime = options.MAX_TIME
        }
    }
}

function showCountdown(callback) {
    let count = 3,
        countdownInterval = null,
        ELEMENT = document.getElementById('count');

    countdownInterval = setInterval(() => {
        count--;

        if (count <= 0) {
            clearInterval(countdownInterval);
            countdownInterval = null;
            ELEMENT.textContent = '3';
            callback();
            return;
        }

        ELEMENT.textContent = count;
    }, 1000)
}

function clearActiveScreen(screenId, clearAll = true) {
    if (clearAll) {
        const screens = document.querySelectorAll('.screen.active');
        screens.forEach((screen) => screen.classList.remove('active'))
    }

    const screen = document.getElementById(screenId);
    screen.classList.add('active');
}

function showPopover(popoverId) {
    const popover = document.getElementById(popoverId);
    popover.classList.add('active');
}

function closePopover() {
    const popovers = document.querySelectorAll('.popover.active');
    popovers.forEach((pop) => pop.classList.remove('active'))
}

initLayout();