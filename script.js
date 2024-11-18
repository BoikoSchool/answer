document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const taskNumber = urlParams.get("task");

  // Заповнення поля, якщо taskNumber існує
  if (taskNumber) {
    const taskInputField = document.getElementById("taskInput");
    if (taskInputField) {
      taskInputField.value = taskNumber; // Без додаткового тексту
    } else {
      console.error("Поле для введення номера завдання не знайдено!");
    }
  } else {
    console.warn("Номер завдання (task) відсутній у URL.");
  }
});

const scriptURL =
  "https://script.google.com/macros/s/AKfycbwvohRERTkmqWp9Q4Ib76PdC0wI--RaXnyP-pmvHb86Vl8Ms11leZzx07UdvFHsmVzsTQ/exec";

const form = document.querySelector("form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  try {
    const response = await fetch(scriptURL, { method: "POST", body: formData });

    if (response.ok) {
      Swal.fire({
        title: "Успіх!",
        text: "Ваше повідомлення надіслано успішно!",
        icon: "success",
      });

      form.reset();
    } else {
      throw new Error(`Помилка сервера: ${response.statusText}`);
    }
  } catch (error) {
    Swal.fire({
      title: "Помилка!",
      text: `Не вдалося надіслати дані: ${error.message}`,
      icon: "error",
    });
    console.error("Помилка!", error);
  }
});
