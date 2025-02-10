document.addEventListener('DOMContentLoaded', ()=> {

    setGame();


    let currMoleTile, currPlantTile;
    let score  =0 , gameOver = false;

   
    



    function setGame() {
        // Set up the grid for the game board in html

        for(let i=0; i<9; i++) {  // i akan loop dari 0 ke 9
            // <div id="0-8"></div>
            let tile = document.createElement('div');
            tile.id = i.toString();
            tile.addEventListener('click', selectTile);
            document.getElementById('board').appendChild(tile);
        }

        setInterval(setMole, 1000);
        setInterval(setPlant, 2000);

       
    }

    function setMole() {
        if(gameOver) {
            return;
        }


        if(currMoleTile) {
            currMoleTile.innerHTML = "";
        }


        let mole = document.createElement('img');
        mole.src = './monty-mole.png';
        
        let num = getRandomTile();
        if(currPlantTile && currPlantTile.id == num) {
            return;
        }

        currMoleTile = document.getElementById(num);
        currMoleTile.appendChild(mole);
    }

    function getRandomTile()
    {
        // Antara angka 0-8 untuk random div mana yang akan diberi gambar mole
        let num = Math.floor(Math.random() * 9);
        return num.toString();
    }

    function setPlant()
    {
        if(gameOver) {
            return;
        }

        if(currPlantTile) {
            currPlantTile.innerHTML = ""
        }

        let plant = document.createElement('img');
        plant.src = './piranha-plant.png';

        let num = getRandomTile();
        if(currMoleTile && currMoleTile.id == num) {
            return;
        }

        currPlantTile = document.getElementById(num);
        currPlantTile.appendChild(plant);
    }

    function selectTile()
    {
        if(gameOver) {
            return;
        }

        if(this == currMoleTile ) {
            score+=10;
            document.getElementById('score').innerHTML = score.toString();
        } else if(this == currPlantTile) {
            // clearInterval()
            // gameOver = true;
            // return;
            document.getElementById('score').innerHTML = 'GAME OVER ' + score.toString();
            gameOver=true;
        }
    }

})
