const { program } = require("commander");
const contacts = require("./contacts");

program
  .option("-a, --action <type>")
  .option("-i, --id <type>")
  .option("-n, --name <type>")
  .option("-e, --email <type>")
  .option("-p, --phone <type>");

program.parse();

const options = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const allBooks = await contacts.listContacts();
      console.log(allBooks);
      break;
    case "get":
      const oneContact = await contacts.getContactById(id);
      console.log(oneContact);
      break;
    case "add":
      const newContact = await contacts.addContact({ name, email, phone });
      console.log(newContact);
      break;
    case "updateContact":
      const updateContact = await contacts.updateContact(id, {
        name,
        email,
        phone,
      });
      console.log(updateContact);
      break;
    case "remove":
      const deleteContact = await contacts.removeContact(id);
      console.log(deleteContact);
      break;
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

invokeAction(options);
//
