const fs = require("fs").promises;
const { nanoid } = require("nanoid");
const path = require("path");

const contactsPath = path.join(__dirname, "./db/contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const data = await listContacts();
  const contact = data.find((item) => item.id === contactId);
  return contact || null;
}

async function removeContact(contactId) {
  const data = await listContacts();
  const index = data.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return
  }
  const [result] = data.splice(index, 1)

  await fs.writeFile(
    contactsPath,
    JSON.stringify(data, null, 2)
  );
  return result
}

async function addContact(name, email, phone) {
  const data = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  await fs.writeFile(
    contactsPath,
    JSON.stringify(data.push(newContact), null, 2)
  );
  return newContact;
}
