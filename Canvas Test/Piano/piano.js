document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("keydown", (e) => {
    if (e.code === "Space") {
      regeneratePiano();
    }
  });

  const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");

  const lane = [0, 101, 202, 303];

  const renderCanvasLayout = () => {
    ctx.beginPath();
    ctx.font = "15px Poppins";
    ctx.fillStyle = "purple";
    ctx.textBaseline = "middle";
    ctx.fillText("Use Space to Start Games", 100, 50);
  };

  let pianoList = [];
  let animationId;
  let pianoInterval = null;
  let speedMultiplier = 1;

  const regeneratePiano = () => {
  
    if (!animationId) {
      console.log("animate again");
      addTiles();
      increaseSpeed();
      animate();
    } 
  };


  let tilesIntervalRegeneration = 1500;
  
  const addTiles = () => {
    clearInterval(pianoInterval); // ✅ Hentikan interval sebelumnya

    pianoInterval = setInterval(() => {
      pianoList.push(new Tiles()); 
    }, tilesIntervalRegeneration);
  };

  const increaseSpeed = ()=> {
    setInterval(()=> {
      speedMultiplier += 0.2

      let newInterval = 1500 - speedMultiplier * 100;
      tilesIntervalRegeneration = Math.max(newInterval, 300); // ✅ Batas minimum agar tidak terlalu cepat

      clearInterval(pianoInterval);
      addTiles();
    }, 5000);
  }

  class Tiles {
    constructor() {
      this.x = lane[Math.floor(Math.random() * lane.length)];
      this.y = -2;
      this.width = 100;
      this.height = 150;
      this.step = 2 * speedMultiplier;
    }

    draw() {
      ctx.beginPath();
      ctx.fillStyle = "black";
      ctx.fillRect(this.x, this.y, this.width, this.height);
      ctx.closePath();
    }

    isOverlapping() {}
  }

  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    createGameUI();

    pianoList.forEach((item) => {
      item.draw();
      item.y = (item.y + item.step);

      if (item.y > canvas.height) {
        pianoList.splice(pianoList.indexOf(item), 1);
      }
    });

     animationId =  requestAnimationFrame(animate);
  };

  const createGameUI = () => {
    ctx.beginPath();
    ctx.fillStyle = "rgba(120, 102, 255, 0.73)";
    lane.forEach((lane) => {
      ctx.fillRect(lane, 0, 100, canvas.offsetHeight);
    });
    ctx.closePath();

    ctx.beginPath();
    ctx.fillStyle = "black";
    let keyboardPiano = ["D", "F", "J", "K"];
    lane.forEach((lane, index) => {
      ctx.fillRect(lane, canvas.offsetHeight - 30, 100, 30);
    });
    ctx.closePath();

    ctx.beginPath();
    lane.forEach((lane, index) => {
      ctx.font = "16px Poppins";
      ctx.fillStyle = "white";
      ctx.fillText(
        keyboardPiano[index],
        lane + 45,
        canvas.offsetHeight - 15,
        100,
        10
      );
    });
    ctx.closePath();
  };

  renderCanvasLayout();
});
