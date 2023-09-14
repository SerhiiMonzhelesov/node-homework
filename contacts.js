const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const rootPath = process.cwd();
const contactsPath = path.join(rootPath, "db", "contacts.json");

const updateContacts = async (contacts) =>
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(contacts);
};

const getContactById = async (id) => {
  const allContacts = await listContacts();
  const contact = allContacts.find((item) => item.id === id);
  return contact || null;
};

const addContact = async (data) => {
  const allContacts = await listContacts();
  const newContact = {
    id: nanoid(),
    ...data,
  };
  allContacts.push(newContact);
  await updateContacts(allContacts);

  return newContact;
};

const updateContact = async (id, data) => {
  const allContacts = await listContacts();
  const index = allContacts.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  allContacts[index] = { id, ...data };
  await updateContacts(allContacts);
  return allContacts[index];
};

const removeContact = async (id) => {
  const allContacts = await listContacts();
  const index = allContacts.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  const [result] = allContacts.splice(index, 1);
  await updateContacts(allContacts);
  return result;
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
};
