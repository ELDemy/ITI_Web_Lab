$(document).ready(loadContactData);
$(document).on("pageshow", "#profile", loadContactData);
document.addEventListener("DOMContentLoaded", loadContactData);
loadContactData();

function loadContactData() {
    const index = localStorage.getItem('selectedContactIndex');
    const contactsData = localStorage.getItem('contacts');

    if (index === null || contactsData === null) return;

    const contacts = JSON.parse(contactsData);
    const contact = contacts[index];

    if (!contact) return;

    document.querySelector("#profile h1").textContent = contact.name;
    document.getElementById("p-phone").textContent = contact.phone;
    document.getElementById("p-email").textContent = contact.email;
    document.getElementById("p-gender").textContent = contact.gender;

    const imgEl = document.querySelector(".contact-img");
    if (imgEl) imgEl.src = contact.image;
}

$(document).on("click", "#confirmDelete", function (e) {
    e.preventDefault();

    const index = localStorage.getItem('selectedContactIndex');
    const contactsData = localStorage.getItem('contacts');

    if (index === null || contactsData === null) return;

    const contacts = JSON.parse(contactsData);
    contacts.splice(index, 1);
    localStorage.setItem('contacts', JSON.stringify(contacts));
    window.location.href = "contacts_list.html";
});
