// contacts_list.js
import { Contact } from "./contact_model.js";

export let contacts = [
    new Contact(
        "Mona Abdo",
        "0123456789",
        "mona@example.com",
        "Female",
        "Images/woman_avatar.png"
    ),
    new Contact(
        "Ahmed Ali",
        "0987654321",
        "ahmed@example.com",
        "Male",
        
         "Images/man_avatar.png"
    ),
];

window.contacts = contacts;

$(document).on("pagecreate", "#contactList", function () {
    renderContactsList();
});
window.renderContactsList = renderContactsList;

document.addEventListener("DOMContentLoaded", renderContactsList);
$(document).on("pagebeforeshow", "#profile", function () {
    const index = window.selectedContactIndex;
    if (index === undefined) return;

    const contact = window.contacts[index];

    $("#profile-name").text(contact.name);
    $("#profile-phone").text(contact.phone);
    $("#profile-email").text(contact.email);
    $("#profile-gender").text(contact.gender);
    $("#profile-img").attr("src", contact.image);
});

window.showContact = function (index) {
    const contact = contacts[index];
    console.log("Show contact:", contact.name);
};

export function renderContactsList() {
    const list = document.querySelector(".contact-list");
    if (!list) return;

    list.innerHTML = "";
    window.contacts.forEach((contact, index) => {
        const li = document.createElement("li");

        li.innerHTML = `
            <a href="profile.html" data-ajax="false" onclick="localStorage.setItem('selectedContactIndex', ${index}); localStorage.setItem('contacts', JSON.stringify(window.contacts));">
                ${contact.name}
                <span class="ui-li-count">${contact.phone}</span>
            </a>`;
        list.appendChild(li);
    });
    $(list).listview("refresh");
}

