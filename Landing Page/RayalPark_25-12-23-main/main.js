document.addEventListener("DOMContentLoaded", ()=> {
  const menuBtn = document.getElementById("menu-btn");
  const navLinks = document.getElementById("nav-links");
  const menuBtnIcon = menuBtn.querySelector("i");
  

  menuBtn.addEventListener("click", ()=> {
    // Toggle digunakan untuk mengubah classList
    //Apabila class open belum ada dan diklik, ia akan menambahkann kelas open
    // Kemudian jika di klik lagi, ia akan menghapus kelas open
    navLinks.classList.toggle("open");
    const isOpen = navLinks.classList.contains("open");
    menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line" );
  } )


  navLinks.addEventListener("click",()=> {
    navLinks.classList.remove("open");
    menuBtnIcon.setAttribute("class", "ri-menu-line");
  })

  const scrollRevealOption = {
    distance : "50px",
    origin : "bottom",
    duration : 1000
  }

  ScrollReveal().reveal(".header__container p" , {
    ...scrollRevealOption,
  });

  ScrollReveal().reveal(".header__container h1" , {
    ...scrollRevealOption,
    delay : 500,
  })

  // About container 
  ScrollReveal().reveal(".about__image img" , {
    ...scrollRevealOption,
    origin : "left",
  })

  ScrollReveal().reveal(".about__content .section__subheader" , {
    ...scrollRevealOption,
    delay : 500,
  })

  ScrollReveal().reveal(".about__content .section__header" , {
    ...scrollRevealOption,
    delay : 1000,
  })

  ScrollReveal().reveal(".about__content .section__description" , {
    ...scrollRevealOption,
    delay : 1500,
  })

  ScrollReveal().reveal(".about__btn" , {
    ...scrollRevealOption,
    delay : 2000,
  })

  // Room Container
  ScrollReveal().reveal(".room__card" , {
    ...scrollRevealOption,
    interval : 500,
  })

  // Service Container 
  ScrollReveal().reveal(".service__list li", {
    ...scrollRevealOption,
    interval : 500,
    origin : 'right'
  })

})

