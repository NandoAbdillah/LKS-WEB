document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");

  let bubbleList = [];
  let bubbleLength = 5;
  let animationId;

  canvas.addEventListener("click", () => {
    addBubbles(); // Tambahkan bubble setiap kali diklik
    if (!animationId) {
      animate();
    }
  });

  const addBubbles = () => {
    // Agar kita dapat meembuat 5 bubble baru ketika di klik maka kita harus menambahkan perulangan ini

    for (let i = 0; i < bubbleLength; i++) {
      let newBubble;
      // Mengarur maks percobaan pemeriksaan for agar tidak overlapping
      let maxRetries = 1000;
      // Variabel untuk mendifiniskan berapa banyak percobaan yang dilakukan
      let retryCount = 0;

      // melakukan perulangan do while untuk membuat bubble baru
      do {
        // Membuat objek bubble baru
        newBubble = new Bubble();
        // Menngincrease 1 percobaan
        retryCount++;

        // newBubble.isOverlapping() berarti bakal mengulangi perulang do while terus menerus selagi overlapping terus true dan retry count kurang dari ambang batas max retry, namun jika sudah lebih dari ambang batas maka akan keluar dari looping
      } while (newBubble.isOverlapping() && retryCount < maxRetries);

      // Jika percobaan kurang dari ambang batas maka objek di masukkan ke dalam list , namun jika lebih makan objek dihapus
      if (retryCount < maxRetries) {
        bubbleList.push(newBubble);
      }
    }
  };

  const animate = () => {
    //  Setiap Pergerakan kita harus membersihkan canvas
    //  Jadi canvas gerak itu beerasal dari perubahan posisi objek yang harus dihapus setiap bergerak
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Bersihkan canvas


    // Setiap bubble list yang ada kita forEach kan  unduk pergerakan lalu di gambar per bubblenya
    bubbleList.forEach((bubble, index) => {
      bubble.move();
      bubble.drawBubble();
    });


    // Mengecek agar dapat bubble yang sudah menyenth atas atau y nya 0 ,  maka akan di hapus 
    // Hapus bubble yang sudah melewati bagian atas
    bubbleList = bubbleList.filter((bubble) => bubble.y + bubble.radius >= 0);


    // Jika panjang array bubble tidak kosong maka animasi akan terus dijalankan, kita dapat memasukkan animasi ke dalam varibel agar kita dapat mendapatkan state nya apakah state animasinya atau kondisi animasinya berjalan atua tidak
    if (bubbleList.length > 0) {
      animationId = requestAnimationFrame(animate);
    } 
    // Jika sudah koson gmaka aniamationIdny di atur null
    else {
      animationId = null;
    }
  };

  // Membuat Objek untuk Bubble
  class Bubble {
    // Kontruktor yang akan berjalan ketika Bubble di definiskan atau dibuat untuk pertamakali
    constructor() {
      this.radius = Math.floor(Math.random() * 40) + 10; // Radius antara 10 - 50
      this.x = Math.random() * (canvas.width - this.radius * 2) + this.radius;
      this.y = canvas.height; // Dimulai dari bawah
      this.speed = Math.random() * 2 + 1; // Kecepatan naik 1 - 3
    }

    // Fungsi untuk menggambar bubble
    drawBubble() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = "#FFFFFF";
      ctx.fill();
    }

    // Fungsi untuk memindahkan bubble ke atas berdasarkan random speednya 

    move() {
      this.y -= this.speed; // Bergerak ke atas
    }

    // Fungsi untuk memeriksa apakah bubble ini terkena overlapping dengan bubble lain , ini returnya akan di kebalikan di while do , anda dapat melihatnya di atas jadi ini akan kembali 
    isOverlapping() {
      return bubbleList.some(
        (item) =>
            // Kita tidak boleh memeriksa diri kita sendiri
          this !== item &&
        // Ini menggembalikan true ini hasilnya overlapping karena jarak kurang dari jumlah radius, karena seharusnya jarak lebih dari jumlah radius, kit buth false untuk menghentikkan do while
          Math.hypot(this.x - item.x, this.y - item.y) <
            this.radius + item.radius
      );
    }
  }
});
