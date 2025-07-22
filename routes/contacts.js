const router = require('express').Router();

const contacts = require("../controllers/contacts");


// Create a new Contact
router.post("/", contacts.createContact);

// Retrieve all Contacts
router.get("/", contacts.getAll);

// Retrieve a single Contact with id
router.get("/:id", contacts.getSingle);

// Update a Contact with id
router.put("/:id", contacts.updateContact);

// Delete a Contact with id
router.delete("/:id", contacts.deleteContact);

module.exports = router;