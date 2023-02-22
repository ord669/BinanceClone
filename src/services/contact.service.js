'use strict'

import { dbService } from './db.service.js'
import { storageService } from '@/services/storage.service.js'
const KEY = 'contacts'

export const contactService = {
    query,
    get,
    remove,
    save,
    getEmptyContact,
}

async function query(filterBy) {
    console.log('filterBy: ', filterBy);
    try {
        var contacts = await dbService.query(KEY)
    } catch (err) {
        console.log('err from contact service', err)
    }
    if (filterBy) {
        const regex = new RegExp(filterBy, 'i')
        contacts = contacts.filter(contact => regex.test(contact.name))
    }
    return contacts
}

async function get(id) {
    return await dbService.get(KEY, id)
}

async function remove(id) {
    return await dbService.remove(KEY, id)
}

async function save(contact) {
    if (contact._id) return await dbService.put(KEY, contact)
    else return await dbService.post(KEY, contact)
}

function getEmptyContact() {
    return {
        username: '',
        imgUrl: "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png",
    }
}

function _createContact(username) {
    return {
        username,
        imgUrl: "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png",
    }
}
