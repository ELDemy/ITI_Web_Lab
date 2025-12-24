import { Contact } from "./contact_model.js";

const urlParams = new URLSearchParams(window.location.search);
const isEditMode = urlParams.get("mode") === "edit";

$(document).ready(function() {
    if (isEditMode) {
        $("#page-title").text("Edit Contact");
        $("#backBtn").attr("href", "profile.html");
        $("#cancelBtn").attr("href", "profile.html");

        const index = localStorage.getItem("selectedContactIndex");
        const contactsData = localStorage.getItem("contacts");

        if (index !== null && contactsData) {
            const contacts = JSON.parse(contactsData);
            const contact = contacts[index];

            if (contact) {
                $("#add-name").val(contact.name);
                $("#add-phone").val(contact.phone);
                $("#add-email").val(contact.email);
                
                if (contact.gender === "Female") {
                    $("#add-female").prop("checked", true);
                } else {
                    $("#add-male").prop("checked", true);
                }
                $("input[name='gender']").checkboxradio("refresh");
            }
        }
    }

    $("#addContactForm").on("submit", function(e) {
        e.preventDefault();

        const name = $("#add-name").val().trim();
        const phone = $("#add-phone").val().trim();
        const email = $("#add-email").val().trim();
        const gender = $("input[name='gender']:checked").val();
        const image = gender === "Female" ? "Images/woman_avatar.png" : "Images/man_avatar.png";

        if (!name || !phone) {
            alert("Name and Phone are required!");
            return;
        }

        let contacts = [];
        const storedContacts = localStorage.getItem("contacts");
        if (storedContacts) {
            contacts = JSON.parse(storedContacts);
        }

        if (isEditMode) {
            const index = localStorage.getItem("selectedContactIndex");
            if (index !== null) {
                contacts[index] = new Contact(name, phone, email, gender, image);
                localStorage.setItem("contacts", JSON.stringify(contacts));
                window.location.href = "profile.html";
            }
        } else {
            contacts.push(new Contact(name, phone, email, gender, image));
            localStorage.setItem("contacts", JSON.stringify(contacts));
            $("#addContactForm")[0].reset();
            window.location.href = "contacts_list.html";
        }
    });
});
