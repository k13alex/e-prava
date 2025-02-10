export const updateTimer = () => {
  const now = new Date();
  const nextDay = new Date(now);
  nextDay.setHours(24, 0, 0, 0); // Устанавливаем на 00:00:00 следующего дня

  function update() {
    const now = new Date();
    const timeLeft = nextDay - now;

    const hours = String(
      Math.floor((timeLeft / (1000 * 60 * 60)) % 24)
    ).padStart(2, "0");
    const minutes = String(Math.floor((timeLeft / (1000 * 60)) % 60)).padStart(
      2,
      "0"
    );
    const seconds = String(Math.floor((timeLeft / 1000) % 60)).padStart(2, "0");

    const allCountdown = document.querySelectorAll("[data-countdown]");
    allCountdown.forEach((element) => {
      element.innerHTML = `
        <div>${hours}<span>годин</span></div>
        <span>:</span>
        <div>${minutes}<span>хвилин</span></div>
        <span>:</span>
        <div>${seconds}<span>секунд</span></div>
      `;
    });

    if (timeLeft <= 0) {
      clearInterval(interval);
      updateTimer(); // Перезапускаем таймер на новый день
    }
  }

  update(); // Обновляем сразу при загрузке
  const interval = setInterval(update, 1000);
};
