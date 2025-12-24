// profile.js   

// Load contact data from localStorage when page loads
function loadContactData() {
    const index = localStorage.getItem('selectedContactIndex');
    const contactsData = localStorage.getItem('contacts');
    
    if (index === null || contactsData === null) return;
    
    const contacts = JSON.parse(contactsData);
    const contact = contacts[index];
    
    if (!contact) return;
    
    // Update Header
    document.querySelector("#profile h1").textContent = contact.name;
    // Update List fields
    document.getElementById("p-phone").textContent = contact.phone;
    document.getElementById("p-email").textContent = contact.email;
    document.getElementById("p-gender").textContent = contact.gender;

    const imgEl = document.querySelector(".contact-img");
    if (imgEl) imgEl.src = contact.image;
}

// Run immediately (module is deferred, DOM should be ready)
loadContactData();

// Use jQuery ready as backup
$(document).ready(loadContactData);

// Use jQuery Mobile pageshow event (works on navigation)
$(document).on("pageshow", "#profile", loadContactData);

// Also run on DOMContentLoaded for direct page load/refresh
document.addEventListener("DOMContentLoaded", loadContactData);

window.showContact = function(index) {
    const contactsData = localStorage.getItem('contacts');
    if (!contactsData) return;
    
    const contacts = JSON.parse(contactsData);
    const contact = contacts[index];
    // Update Header
    document.querySelector("#profile h1").textContent = contact.name;
    // Update List fields
    document.getElementById("p-phone").textContent = contact.phone;
    document.getElementById("p-email").textContent = contact.email;
    document.getElementById("p-gender").textContent = contact.gender;

    const imgEl = document.querySelector(".contact-img");
    imgEl.src = contact.image;
};

window.deleteContact = function(index) {
    window.contacts.splice(index, 1);
    if (window.renderContactsList) window.renderContactsList();
};

window.editContact = function(index, name, phone, email, gender, image) {
    const c = window.contacts[index];
    c.name = name;
    c.phone = phone;
    c.email = email;
    c.gender = gender;
    c.image = image;
    if (window.renderContactsList) window.renderContactsList();
};
