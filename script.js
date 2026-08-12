const pricePerNight = 3000;

const checkin = document.getElementById("checkin");
const checkout = document.getElementById("checkout");
const result = document.getElementById("booking-result");
const bookButton = document.getElementById("book-button");

const today = new Date().toISOString().split("T")[0];

checkin.min = today;
checkout.min = today;

checkin.addEventListener("change", () => {
  checkout.min = checkin.value;

  if (checkout.value && checkout.value <= checkin.value) {
    checkout.value = "";
  }

  calculatePrice();
});

checkout.addEventListener("change", calculatePrice);

function calculatePrice() {
  if (!checkin.value || !checkout.value) {
    result.textContent = "";
    return;
  }

  const start = new Date(checkin.value);
  const end = new Date(checkout.value);

  const difference = end - start;
  const nights = Math.ceil(
    difference / (1000 * 60 * 60 * 24)
  );

  if (nights <= 0) {
    result.textContent = "Пожалуйста, выберите корректные даты.";
    return;
  }

  const total = nights * pricePerNight;

  result.textContent =
    Количество ночей: ${nights}. Стоимость: ${formatPrice(total)} ₽;
}

bookButton.addEventListener("click", () => {
  if (!checkin.value || !checkout.value) {
    result.textContent =
      "Пожалуйста, выберите даты заезда и выезда.";
    return;
  }

  const start = new Date(checkin.value);
  const end = new Date(checkout.value);

  const difference = end - start;

  const nights = Math.ceil(
    difference / (1000 * 60 * 60 * 24)
  );

  if (nights <= 0) {
    result.textContent =
      "Дата выезда должна быть позже даты заезда.";
    return;
  }

  const total = nights * pricePerNight;

  openBookingModal(
    checkin.value,
    checkout.value,
    nights,
    total
  );
});

function openBookingModal(
  checkinDate,
  checkoutDate,
  nights,
  total
) {
  const modal = document.createElement("div");

  modal.className = "modal active";

  modal.innerHTML = `
    <div class="modal-content">

      <button class="modal-close" aria-label="Закрыть">
        ×
      </button>

      <h2 class="modal-title">
        Бронирование квартиры
      </h2>

      <div class="booking-info">

        <div class="booking-row">
          <span>Заезд</span>
          <strong>${formatDate(checkinDate)}</strong>
        </div>

        <div class="booking-row">
          <span>Выезд</span>
          <strong>${formatDate(checkoutDate)}</strong>
        </div>

        <div class="booking-row">
          <span>Количество ночей</span>
          <strong>${nights}</strong>
        </div>

        <div class="booking-row booking-total">
          <span>Итого</span>
          <strong>${formatPrice(total)} ₽</strong>
        </div>

      </div>

      <div class="modal-actions">

        <button class="btn btn-secondary cancel-button">
          Изменить даты
        </button>

        <button class="btn continue-button">
          Перейти к бронированию
        </button>

      </div>

    </div>
  `;

  document.body.appendChild(modal);

  const closeModal = () => {
    modal.remove();
  };

  modal
    .querySelector(".modal-close")
    .addEventListener("click", closeModal);

  modal
    .querySelector(".cancel-button")
    .addEventListener("click", closeModal);

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  modal
    .querySelector(".continue-button")
    .addEventListener("click", () => {
      closeModal();

      alert(
        "Следующим шагом добавим форму с номером телефона и подтверждением бронирования."
      );
    });
}

function formatDate(dateString) {
  const date = new Date(dateString);

  return date.toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });
}

function formatPrice(price) {
  return price.toLocaleString("ru-RU");
}