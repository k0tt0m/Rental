const defaultSettings = {
  title: "Аренда квартиры в Санкт-Петербурге",
  description: "",
  pricePerNight: 3000,
  photos: ["", "", ""]
};

const titleInput = document.getElementById("apartment-title");
const descriptionInput = document.getElementById("apartment-description");
const priceInput = document.getElementById("price-per-night");
const includedGuestsInput = document.getElementById("included-guests");
const extraGuestPriceInput = document.getElementById("extra-guest-price");

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

photoInputs.forEach((input, index) => {
  input.addEventListener("input", () => {
    const url = input.value.trim();

    if (url) {
      photoPreviews[index].src = url;
    }
  });
});

saveButton.addEventListener("click", () => {
  const settings = {
    title: titleInput.value.trim(),
    description: descriptionInput.value.trim(),
    pricePerNight: Number(priceInput.value) || 0,
    photos: photoInputs.map(input => input.value.trim())
  };

  localStorage.setItem(
    "rentalSettings",
    JSON.stringify(settings)
  );

  saveMessage.textContent = "✓ Изменения сохранены";

  setTimeout(() => {
    saveMessage.textContent = "";
  }, 3000);
});

loadSettings();
