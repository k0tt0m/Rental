const pricePerNight = 3000;

const checkin = document.getElementById("checkin");
const checkout = document.getElementById("checkout");
const result = document.getElementById("booking-result");
const bookButton = document.getElementById("book-button");

// Минимальная дата — сегодня
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
  const nights = Math.ceil(difference / (1000 * 60 * 60 * 24));

  if (nights <= 0) {
    result.textContent = "Пожалуйста, выберите корректные даты.";
    return;
  }

  const total = nights * pricePerNight;

  result.textContent =
    Количество ночей: ${nights}. Стоимость: ${total.toLocaleString("ru-RU")} ₽;
}

bookButton.addEventListener("click", () => {
  if (!checkin.value || !checkout.value) {
    result.textContent = "Пожалуйста, выберите даты заезда и выезда.";
    return;
  }

  const start = new Date(checkin.value);
  const end = new Date(checkout.value);

  const difference = end - start;
  const nights = Math.ceil(
    difference / (1000 * 60 * 60 * 24)
  );

  if (nights <= 0) {
    result.textContent = "Дата выезда должна быть позже даты заезда.";
    return;
  }

  const total = nights * pricePerNight;

  const confirmed = confirm(
    Бронирование:\n\n +
    Заезд: ${formatDate(checkin.value)}\n +
    Выезд: ${formatDate(checkout.value)}\n +
    Ночей: ${nights}\n +
    Стоимость: ${total.toLocaleString("ru-RU")} ₽\n\n +
    Продолжить бронирование?
  );

  if (confirmed) {
    alert(
      "Отлично! Следующим шагом добавим страницу подтверждения и форму с номером телефона."
    );
  }
});

function formatDate(dateString) {
  const date = new Date(dateString);

  return date.toLocaleDateString("ru-RU");
}