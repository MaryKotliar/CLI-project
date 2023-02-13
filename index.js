const contactOperations = require("./contacts.js");

const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const argv = yargs(hideBin(process.argv)).argv;
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await contactOperations.listContacts();
      console.table(contacts);
      break;

    case "get":
      const contact = await contactOperations.getContactById(id);
      if (!contact) {
        throw new Error(`Contact with id=${id} not found`);
      }
      console.log(contact);
      break;

    case "add":
      const newContact = await contactOperations.addContact(name, email, phone);
      console.log(newContact);
      break;

    case "remove":
      const removeContactbyId = await contactOperations.removeContact(id);
      console.log(removeContactbyId);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
