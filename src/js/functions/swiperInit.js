export const swiperInit = () => {
  const swiperPage = new Swiper(".heroPage", {
    grabCursor: true,
    centeredSlides: true,
    spaceBetween: 500,
    slidesPerView: 1,
    pagination: {
      el: ".swiper-pagination",
    },
    loop: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  const allNextBtns = document.querySelectorAll(".swiperNextSlide");
  allNextBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      swiperPage.slideNext();
    });
  });
};
