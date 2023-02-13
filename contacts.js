const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const filePath = path.join(__dirname, "db/contacts.json");

async function listContacts() {
  const data = await fs.readFile(filePath);
  const contacts = JSON.parse(data);
  return contacts;
}

async function getContactById(id) {
  const contacts = await listContacts();
  const result = contacts.find((item) => Number(item.id) === id);
  if (!result) {
    return null;
  }
  return result;
}

async function removeContact(id) {
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => Number(item.id) === id);
  if (idx === -1) {
    return null;
  }
  const newContacts = contacts.filter((_, index) => index !== idx);
  await fs.writeFile(filePath, JSON.stringify(newContacts));
  return contacts[idx];
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = { name, email, phone, id: uuidv4() };
  contacts.push(newContact);
  await fs.writeFile(filePath, JSON.stringify(contacts));
  return newContact;
}

module.exports = { listContacts, addContact, getContactById, removeContact };
