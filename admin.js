const pricePerNight = 3000;

const checkin = document.getElementById("checkin");
const checkout = document.getElementById("checkout");
const guests = document.getElementById("guests");
const result = document.getElementById("booking-result");
const bookButton = document.getElementById("book-button");

if (!checkin  !checkout  !guests  !result  !bookButton) {
  console.error("Не найдены элементы формы бронирования.");
} else {
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
    const guestCount = guests.value;

    result.textContent =
      Количество ночей: ${nights}. Стоимость: ${formatPrice(total)} ₽;

    openBookingModal(
      checkin.value,
      checkout.value,
      nights,
      total,
      guestCount
    );
  });
}

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
    result.textContent =
      "Пожалуйста, выберите корректные даты.";
    return;
  }

  const total = nights * pricePerNight;

  result.textContent =
    Количество ночей: ${nights}. Стоимость: ${formatPrice(total)} ₽;
}

function openBookingModal(
  checkinDate,
  checkoutDate,
  nights,
  total,
  guestCount
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
          <span>Количество гостей</span>
          <strong>${guestCount}</strong>
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
          Изменить данные
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
[13.08.2026 0:00] Андрей Сабадаш: "Следующим шагом добавим форму с номером телефона и подтверждением бронирования."
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
[13.08.2026 0:08] Андрей Сабадаш: const pricePerNight = 3000;

const checkin = document.getElementById("checkin");
const checkout = document.getElementById("checkout");
const guests = document.getElementById("guests");
const result = document.getElementById("booking-result");
const bookButton = document.getElementById("book-button");

const today = new Date().toISOString().split("T")[0];

checkin.min = today;
checkout.min = today;

checkin.addEventListener("change", updateBookingInfo);
checkout.addEventListener("change", updateBookingInfo);

function updateBookingInfo() {
  if (!checkin.value || !checkout.value) {
    result.textContent = "";
    return;
  }

  const start = new Date(checkin.value);
  const end = new Date(checkout.value);

  const nights = Math.ceil(
    (end - start) / (1000 * 60 * 60 * 24)
  );

  if (nights <= 0) {
    result.textContent =
      "Дата выезда должна быть позже даты заезда.";
    return;
  }

  const total = nights * pricePerNight;

  result.textContent =
    Количество ночей: ${nights}. Стоимость: ${formatPrice(total)} ₽;
}

bookButton.addEventListener("click", function () {
  if (!checkin.value || !checkout.value) {
    result.textContent =
      "Пожалуйста, выберите даты заезда и выезда.";
    return;
  }

  const start = new Date(checkin.value);
  const end = new Date(checkout.value);

  const nights = Math.ceil(
    (end - start) / (1000 * 60 * 60 * 24)
  );

  if (nights <= 0) {
    result.textContent =
      "Дата выезда должна быть позже даты заезда.";
    return;
  }

  const guestCount = guests ? guests.value : "1";
  const total = nights * pricePerNight;

  openBookingModal(
    checkin.value,
    checkout.value,
    nights,
    total,
    guestCount
  );
});

function openBookingModal(
  checkinDate,
  checkoutDate,
  nights,
  total,
  guestCount
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
          <span>Количество гостей</span>
          <strong>${guestCount}</strong>
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
          Изменить данные
        </button>

        <button class="btn continue-button">
          Перейти к бронированию
        </button>

      </div>

    </div>
  `;

  document.body.appendChild(modal);

  modal
    .querySelector(".modal-close")
    .addEventListener("click", () => {
      modal.remove();
    });

  modal
    .querySelector(".cancel-button")
    .addEventListener("click", () => {
      modal.remove();
    });

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.remove();
    }
  });

  modal
    .querySelector(".continue-button")
    .addEventListener("click", () => {
      alert(
        "Здесь будет форма для имени и номера телефона."
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
[13.08.2026 0:40] Андрей Сабадаш: placeholder="Ссылка на фото"
          >
        </div>


        <div class="photo-item">
          <img
            id="preview-photo-3"
            src="https://via.placeholder.com/400x250"
            alt="Фото 3"
          >

          <input
            type="url"
            id="photo-3"
            placeholder="Ссылка на фото"
          >
        </div>

      </div>

    </section>


    <!-- СОХРАНЕНИЕ -->

    <section class="admin-card">

      <button
        class="btn"
        id="save-settings"
      >
        Сохранить изменения
      </button>

      <div
        class="save-message"
        id="save-message"
      ></div>

    </section>

  </main>


  <script src="admin.js"></script>

</body>
</html>
[13.08.2026 0:40] Андрей Сабадаш: <!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <title>Админ-панель — Аренда квартиры</title>

  <style>
    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      font-family: Arial, sans-serif;
      background: #f5f6f8;
      color: #222;
    }

    .admin-container {
      width: min(900px, 92%);
      margin: 40px auto;
    }

    .admin-header {
      margin-bottom: 30px;
    }

    .admin-header h1 {
      margin-bottom: 8px;
    }

    .admin-header p {
      color: #666;
    }

    .admin-card {
      background: white;
      padding: 30px;
      margin-bottom: 25px;
      border-radius: 20px;
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.06);
    }

    .admin-card h2 {
      margin-top: 0;
      margin-bottom: 20px;
    }

    label {
      display: block;
      margin-bottom: 8px;
      font-weight: bold;
    }

    input,
    textarea {
      width: 100%;
      padding: 14px;
      margin-bottom: 20px;
      border: 1px solid #ccc;
      border-radius: 10px;
      font-size: 16px;
      font-family: inherit;
    }

    textarea {
      min-height: 140px;
      resize: vertical;
    }

    .price-input {
      max-width: 300px;
    }

    .photo-list {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 15px;
      margin-bottom: 20px;
    }

    .photo-item {
      border: 1px solid #ddd;
      border-radius: 12px;
      padding: 10px;
      background: #fafafa;
    }

    .photo-item img {
      width: 100%;
      height: 150px;
      object-fit: cover;
      border-radius: 8px;
      margin-bottom: 10px;
    }

    .btn {
      border: none;
      border-radius: 12px;
      padding: 14px 24px;
      background: #111;
      color: white;
      font-size: 16px;
      cursor: pointer;
    }

    .btn:hover {
      opacity: 0.85;
    }

    .save-message {
      margin-top: 15px;
      font-weight: bold;
    }

    .back-link {
      display: inline-block;
      margin-bottom: 25px;
      color: #222;
      text-decoration: none;
    }

    @media (max-width: 700px) {
      .admin-card {
        padding: 22px;
      }

      .photo-list {
        grid-template-columns: 1fr;
      }
    }
  </style>
</head>

<body>

  <main class="admin-container">

    <a href="index.html" class="back-link">
      ← Вернуться на сайт
    </a>

    <header class="admin-header">
      <h1>Админ-панель</h1>
      <p>Управление квартирой</p>
    </header>


    <!-- ИНФОРМАЦИЯ О КВАРТИРЕ -->

    <section class="admin-card">

      <h2>Информация о квартире</h2>

      <label for="apartment-title">
        Заголовок
      </label>

      <input
        type="text"
        id="apartment-title"
        placeholder="Аренда квартиры в Санкт-Петербурге"
      >

      <label for="apartment-description">
        Описание
      </label>

      <textarea
        id="apartment-description"
        placeholder="Введите описание квартиры..."
      ></textarea>

    </section>


    <!-- ЦЕНА -->

    <section class="admin-card">

      <h2>Стоимость</h2>

      <label for="price-per-night">
        Цена за сутки, ₽
      </label>

      <input
        type="number"
        id="price-per-night"
        class="price-input"
        min="0"
        placeholder="3000"
      >

    </section>


    <!-- ФОТОГРАФИИ -->

    <section class="admin-card">

      <h2>Фотографии</h2>

      <p>
        Укажи ссылки на фотографии квартиры.
      </p>

      <div class="photo-list">

        <div class="photo-item">
          <img
            id="preview-photo-1"
            src="https://via.placeholder.com/400x250"
            alt="Фото 1"
          >

          <input
            type="url"
            id="photo-1"
            placeholder="Ссылка на фото"
          >
        </div>


        <div class="photo-item">
          <img
            id="preview-photo-2"
            src="https://via.placeholder.com/400x250"
            alt="Фото 2"
          >

          <input
            type="url"
            id="photo-2"
[13.08.2026 0:45] Андрей Сабадаш: const defaultSettings = {
  title: "Аренда квартиры в Санкт-Петербурге",
  description: "",
  pricePerNight: 3000,
  photos: [
    "",
    "",
    ""
  ]
};

const titleInput = document.getElementById("apartment-title");
const descriptionInput = document.getElementById("apartment-description");
const priceInput = document.getElementById("price-per-night");

const photoInputs = [
  document.getElementById("photo-1"),
  document.getElementById("photo-2"),
  document.getElementById("photo-3")
];

const photoPreviews = [
  document.getElementById("preview-photo-1"),
  document.getElementById("preview-photo-2"),
  document.getElementById("preview-photo-3")
];

const saveButton = document.getElementById("save-settings");
const saveMessage = document.getElementById("save-message");


// Загружаем сохранённые настройки
function loadSettings() {
  const savedSettings = localStorage.getItem("rentalSettings");

  const settings = savedSettings
    ? JSON.parse(savedSettings)
    : defaultSettings;

  titleInput.value = settings.title || "";
  descriptionInput.value = settings.description || "";
  priceInput.value = settings.pricePerNight || 3000;

  settings.photos.forEach((photo, index) => {
    if (photoInputs[index]) {
      photoInputs[index].value = photo || "";
    }

    if (photoPreviews[index] && photo) {
      photoPreviews[index].src = photo;
    }
  });
}


// Предпросмотр фотографий
photoInputs.forEach((input, index) => {
  input.addEventListener("input", () => {
    const url = input.value.trim();

    if (url) {
      photoPreviews[index].src = url;
    }
  });
});


// Сохраняем настройки
saveButton.addEventListener("click", () => {

  const settings = {
    title: titleInput.value.trim(),

    description: descriptionInput.value.trim(),

    pricePerNight:
      Number(priceInput.value) || 0,

    photos: photoInputs.map(input =>
      input.value.trim()
    )
  };

  localStorage.setItem(
    "rentalSettings",
    JSON.stringify(settings)
  );

  saveMessage.textContent =
    "✓ Изменения сохранены";

  setTimeout(() => {
    saveMessage.textContent = "";
  }, 3000);
});


loadSettings();
