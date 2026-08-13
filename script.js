[13.08.2026 3:08] Андрей Сабадаш: const defaultPricePerNight = 3000;

const savedSettings =
  JSON.parse(localStorage.getItem("rentalSettings")) || {};

const pricePerNight =
  Number(savedSettings.pricePerNight) || defaultPricePerNight;

const includedGuests =
  Number(savedSettings.includedGuests) || 1;

const extraGuestPrice =
  Number(savedSettings.extraGuestPrice) || 0;

const checkin = document.getElementById("checkin");
const checkout = document.getElementById("checkout");
const guests = document.getElementById("guests");
const guestExtraCharge =
  document.getElementById("guest-extra-charge");
const result = document.getElementById("booking-result");
const bookButton = document.getElementById("book-button");

if (
  !checkin ||
  !checkout ||
  !guests ||
  !result ||
  !bookButton
) {
  console.error("Не найдены элементы формы бронирования.");
} else {

  const today =
    new Date().toISOString().split("T")[0];

  checkin.min = today;
  checkout.min = today;

  checkin.addEventListener(
    "change",
    updateBookingInfo
  );

  checkout.addEventListener(
    "change",
    updateBookingInfo
  );

  guests.addEventListener(
    "change",
    updateBookingInfo
  );

  function updateBookingInfo() {

    const guestCount =
      Number(guests.value) || 1;

    const extraGuests =
      Math.max(
        0,
        guestCount - includedGuests
      );

    const extraCharge =
      extraGuests * extraGuestPrice;

    if (guestExtraCharge) {
      guestExtraCharge.textContent =
        extraCharge > 0
          ? Доплата за гостей: +${formatPrice(extraCharge)} ₽
          : "";
    }

    if (!checkin.value || !checkout.value) {
      result.textContent = "";
      return;
    }

    const start =
      new Date(checkin.value);

    const end =
      new Date(checkout.value);

    const nights =
      Math.ceil(
        (end - start) /
        (1000 * 60 * 60 * 24)
      );

    if (nights <= 0) {
      result.textContent =
        "Дата выезда должна быть позже даты заезда.";
      return;
    }

    const total =
      nights * pricePerNight + extraCharge;

    result.textContent =
      Количество ночей: ${nights}. Стоимость: ${formatPrice(total)} ₽;
  }


  bookButton.addEventListener(
    "click",
    function () {

      if (!checkin.value || !checkout.value) {
        result.textContent =
          "Пожалуйста, выберите даты заезда и выезда.";
        return;
      }

      const start =
        new Date(checkin.value);

      const end =
        new Date(checkout.value);

      const nights =
        Math.ceil(
          (end - start) /
          (1000 * 60 * 60 * 24)
        );

      if (nights <= 0) {
        result.textContent =
          "Дата выезда должна быть позже даты заезда.";
        return;
      }

      const guestCount =
        Number(guests.value) || 1;

      const extraGuests =
        Math.max(
          0,
          guestCount - includedGuests
        );

      const extraCharge =
        extraGuests * extraGuestPrice;

      const total =
        nights * pricePerNight + extraCharge;

      openBookingModal(
        checkin.value,
        checkout.value,
        nights,
        total,
        guestCount,
        extraCharge
      );
    }
  );
}


function openBookingModal(
  checkinDate,
  checkoutDate,
  nights,
  total,
  guestCount,
  extraCharge
) {

  const modal =
    document.createElement("div");

  modal.className =
    "modal active";

  modal.innerHTML = `
    <div class="modal-content">

      <button
        class="modal-close"
        aria-label="Закрыть"
      >
        ×
      </button>

      <h2 class="modal-title">
        Бронирование квартиры
      </h2>

      <div class="booking-info">

        <div class="booking-row">
          <span>Заезд</span>
          <strong>
            ${formatDate(checkinDate)}
          </strong>
        </div>

        <div class="booking-row">
          <span>Выезд</span>
          <strong>
            ${formatDate(checkoutDate)}
          </strong>
        </div>

        <div class="booking-row">
          <span>Количество гостей</span>
          <strong>
[13.08.2026 3:08] Андрей Сабадаш: ${guestCount}
          </strong>
        </div>

        <div class="booking-row">
          <span>Количество ночей</span>
          <strong>
            ${nights}
          </strong>
        </div>
[13.08.2026 3:08] Андрей Сабадаш: ${
          extraCharge > 0
            ? `
              <div class="booking-row">
                <span>Доплата за гостей</span>
                <strong>
                  +${formatPrice(extraCharge)} ₽
                </strong>
              </div>
            `
            : ""
        }

        <div class="booking-row booking-total">
          <span>Итого</span>
          <strong>
            ${formatPrice(total)} ₽
          </strong>
        </div>

      </div>

      <div class="modal-actions">

        <button
          class="btn btn-secondary cancel-button"
        >
          Изменить данные
        </button>

        <button
          class="btn continue-button"
        >
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
    .addEventListener(
      "click",
      closeModal
    );

  modal
    .querySelector(".cancel-button")
    .addEventListener(
      "click",
      closeModal
    );

  modal.addEventListener(
    "click",
    (event) => {
      if (event.target === modal) {
        closeModal();
      }
    }
  );

  modal
    .querySelector(".continue-button")
    .addEventListener(
      "click",
      () => {

        closeModal();

        alert(
          "Здесь будет форма для имени и номера телефона."
        );
      }
    );
}


function formatDate(dateString) {

  const date =
    new Date(dateString);

  return date.toLocaleDateString(
    "ru-RU",
    {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    }
  );
}


function formatPrice(price) {

  return price.toLocaleString("ru-RU");
}
