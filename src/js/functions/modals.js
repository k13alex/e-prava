/* Пример использования:
  
  <!-- Триггеры для открытия одной и той же модалки -->
  <button data-modal-target="#modal-auth">Открыть модалку 1</button>
  <button data-modal-target="#modal-auth">Открыть модалку 2</button>

  <!-- Модалка -->
  <div id="modal-auth" class="modal modal-auth">
    <div class="modal__wrapper">
      <div data-modal-content class="modal__content modal-auth__content">
        <button
          class="modal__close"
          data-close-button
          aria-label="Close modal window"
        ></button>
        <p>Содержимое модалки</p>
      </div>
    </div>
  </div>
*/

export const modals = () => {
  // Функция для открытия модалки и отключения прокрутки
  function openModal(modal) {
    if (modal) {
      closeAllModals();
      modal.classList.add("show");
      document.body.classList.add("no-scroll");
    }
  }

  // Функция для закрытия модалки и включения прокрутки
  function closeModal(modal) {
    if (modal) {
      modal.classList.remove("show");
      if (!document.querySelector(".modal.show")) {
        document.body.classList.remove("no-scroll");
      }
    }
  }

  // Функция для закрытия всех модалок
  function closeAllModals() {
    const modals = document.querySelectorAll(".modal.show");
    modals.forEach((modal) => modal.classList.remove("show"));
    document.body.classList.remove("no-scroll");
  }

  // Функция для обработки кликов на триггеры модалок
  function handleModalTriggers(event) {
    const upgradeDataCollection = event.target.closest(
      "[data-upgrade-submit-not-authorized]"
    );

    if (upgradeDataCollection) {
      const form = upgradeDataCollection.closest("[data-grade-form]");
      const formData = new FormData(form);

      // Преобразуем FormData в объект
      const formObject = {};
      formData.forEach((value, key) => {
        formObject[key] = value;
      });

      // Сохраняем объект в localStorage (преобразованный в строку JSON)
      localStorage.setItem("formData", JSON.stringify(formObject));

      // Пример: выводим сохраненные данные
      console.log(localStorage.getItem("formData"));
    }

    const trigger = event.target.closest("[data-modal-target]");
    if (trigger) {
      const modalTarget = trigger.getAttribute("data-modal-target");
      const modal = document.querySelector(modalTarget);
      openModal(modal);
    }
  }

  // Инициализация обработчиков событий
  document.addEventListener("click", (event) => {
    // Обработка открытия модалок
    handleModalTriggers(event);

    // Закрытие модалки по кнопке с атрибутом data-close-button
    if (event.target.hasAttribute("data-close-button")) {
      const modal = event.target.closest(".modal");
      closeModal(modal);
    }

    // Закрытие модалки при клике вне контента
    const modal = event.target.closest(".modal");
    const isContent = event.target.closest("[data-modal-content]");
    if (modal && !isContent) {
      closeModal(modal);
    }
  });

  // Использование MutationObserver для отслеживания новых элементов
  const observer = new MutationObserver(() => {
    // Здесь можно добавить любую логику для новых элементов,
    // но в данном случае обработчики работают глобально через делегирование
  });

  // Наблюдение за изменениями в body
  observer.observe(document.body, {
    childList: true, // Наблюдать за добавлением/удалением дочерних узлов
    subtree: true, // Наблюдать за всеми уровнями вложенности
  });
};
