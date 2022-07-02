import { utilService } from "../../../services/util-service.js";
import { storageService } from "../../../services/async-storage-service.js";

const MAILS_KEY = "mails";
_createMails();

// const loggedinUser = {
//   email: 'user@appsus.com',
//   fullname: 'Mahatma Appsus'
//  }

export const mailService = {
  query,
  remove,
  save,
  get,
  getEmptyMail,
};

function query() {
  return storageService.query(MAILS_KEY);
}

function remove(mailId) {
  return storageService.remove(MAILS_KEY, mailId);
}

function get(mailId) {
  return storageService.get(MAILS_KEY, mailId);
}

function save(mail) {
  if (mail.id) return storageService.put(MAILS_KEY, mail);
  else return storageService.post(MAILS_KEY, mail);
}

function getEmptyMail() {
  return  {
    id: '',
    subject: '',
    body: '',
    isRead: false,
    sentAt: null,
    to: '',
    by: '',
    isDrafted: false,
    isChecked: false,
    isArchived: false
  }
}

function _createMail
(
    id = utilService.makeId(),
    subject = utilService.makeLorem(2),
    body = utilService.makeLorem(utilService.getRandomInt(15, 20)),
    isRead = false,
    sentAt = null,
    to = 'momo@momo.com',
    by = 'roniShwarzman@caMay22.com',
    isStarred = false,
    isChecked = false,
    isArchived = false,
    isSelected = false
  ) {
    return {
        id,
        subject,
        body,
        isRead,
        sentAt,
        to,
        by,
        isStarred,
        isChecked,
        isArchived,
        isSelected
    }
   
}

function _createMails() {
  let mails = utilService.loadFromStorage(MAILS_KEY);
  if (!mails || !mails.length) {
    let mails = []
    for(let i = 0; i < 15; i++) {
      mails.push(_createMail())
    }
    utilService.saveToStorage(MAILS_KEY, mails);
  }
  return mails;
}




