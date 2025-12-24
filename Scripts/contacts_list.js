import { Contact } from "./contact_model.js";

window.renderContactsList = renderContactsList;
let contacts = loadContacts();
window.contacts = contacts;
$(document).on("pagecreate", "#contactList", renderContactsList);
document.addEventListener("DOMContentLoaded", renderContactsList);

function renderContactsList() {
    const list = document.querySelector(".contact-list");
    if (!list) return;

    contacts = loadContacts();
    window.contacts = contacts;

    list.innerHTML = "";
    contacts.forEach((contact, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <a href="profile.html" data-ajax="false" onclick="localStorage.setItem('selectedContactIndex', ${index}); localStorage.setItem('contacts', JSON.stringify(window.contacts));">
                ${contact.name}
                <span class="ui-li-count">${contact.phone}</span>
            </a>`;
        list.appendChild(li);
    });
    $(list).listview("refresh");

    const totalEl = document.getElementById("totalContacts");
    if (totalEl) totalEl.textContent = "Total Contacts: " + contacts.length;
}

function loadContacts() {
    const storedContacts = localStorage.getItem("contacts");
    if (storedContacts) {
        const parsed = JSON.parse(storedContacts);
        return parsed.map(
            (c) => new Contact(c.name, c.phone, c.email, c.gender, c.image)
        );
    }
    return [];
}
