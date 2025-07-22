const db = require('../models');

const Contact = db.contacts;

// Create and save a new contact

const createContact = async (req, res) => {
    // Validate request
    if(!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.birthday) {
        res.status(400).send({ message: "Content can not be empty!"});
        return;
    }
    
    const {
        firstName,
        lastName,
        email,
        favoriteColor,
        birthday,       
    } = req.body;

    //Create a new Contact
    const contact = new Contact({
        firstName: firstName,
        lastName: lastName,
        email: email,
        favoriteColor: favoriteColor,
        birthday: birthday
    });

    // Save Tutorial in the database

    await contact
    .save(contact)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: 
              err.message || "Some error occurred while creating the contact."
        });
    });
};


// Retrieve all contacts from the database.

const getAll = async (req, res) => {
    await Contact.find(
        {},
        {
            firstName: 1,
            lastName: 1,
            email: 1,
            favoriteColor: 1,
            birthday: 1,
        }
    )
    .then((data) => {
        console.log(data);
        res.send(data);
    })
    .catch((err)=> {
        res.status(500).send({
            message: err.message || 'Some error occurred while retrieving contasts',
        });
    });
};

// Retrieve a single contact with contact_id

const getSingle = async (req, res) => {
    const contact_id = req.params.contact_id;
    await Contact.find({contact_id: contact_id})
    .then((data) => {
        if(!data)
            res
               .status(404)
               .send({message: 'Not found contact with id' + contact_id });
        else res.send(data[0]);
    })
    .catch((err) => {
        res.status(500).send({
            message: 'Error retrieving contact with contact_id ' + contact_id,
        });
    });
};

//Update a contact by the contact_id in the request

const updateContact = async (req, res) => {
if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  await Contact.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Contact with id=${id}. Maybe the contact was not found!`
        });
      } else res.send({ message: "Contact was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating contact with id=" + id
      });
    });
};

// Delete a contact with the specified contact_id in the request

const deleteContact = async (req, res) => {
    const id = req.params.id;
    
    await Contact.findByIdAndDelete(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Contact with id=${id}.   Maybe Contact was not found!`
          });
        } else {
          res.send({
            message: "Contact was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Contact with id=" + id
        });
      });

};




module.exports = {getAll, getSingle, createContact, updateContact, deleteContact};