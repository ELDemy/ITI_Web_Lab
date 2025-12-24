// contacts_list.js
import { Contact } from "./contact_model.js";

export let contacts = [
  new Contact(
    "Mona Abdo",
    "0123456789",
    "mona@example.com",
    "Female",
    "Images/man_avatar.png"
  ),
  new Contact(
    "Ahmed Ali",
    "0987654321",
    "ahmed@example.com",
    "Male",
    "Images/woman_avatar2.png"
  ),
];

// Make globally accessible
window.contacts = contacts;

$(document).on("pagecreate", "#contactList", function () {
  renderContactsList();
});

document.addEventListener("DOMContentLoaded", renderContactsList);
$(document).on("pagebeforeshow", "#profile", function () {
  const index = window.selectedContactIndex;
  if (index === undefined) return;

  const contact = window.contacts[index];

  // Inject data into the profile page elements
  $("#profile-name").text(contact.name);
  $("#profile-phone").text(contact.phone);
  $("#profile-email").text(contact.email);
  $("#profile-gender").text(contact.gender);
  $("#profile-img").attr("src", contact.image);
});

window.showContact = function (index) {
  const contact = contacts[index];
  console.log("Show contact:", contact.name);
  // Populate #contactDetails page here
};

export function renderContactsList() {
  const list = document.querySelector(".contact-list");
  if (!list) return;

  list.innerHTML = "";
  window.contacts.forEach((contact, index) => {
    const li = document.createElement("li");
    // Link to profile.html. Save index to localStorage before navigating.
    li.innerHTML = `
            <a href="profile.html" onclick="localStorage.setItem('selectedContactIndex', ${index}); localStorage.setItem('contacts', JSON.stringify(window.contacts));">
                ${contact.name}
                <span class="ui-li-count">${contact.phone}</span>
            </a>`;
    list.appendChild(li);
  });
  $(list).listview("refresh");
}

// Make globally accessible
window.renderContactsList = renderContactsList;
