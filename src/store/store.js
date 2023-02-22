
import { userStore } from './user.store.js'
import { createStore } from 'vuex'
import { contactService } from '../services/contact.service.js'

export const store = createStore({
    strict: true,
    state() {
        return {
            contacts: [],
        }
    },
    getters: {
        contacts({ contacts }) {
            return contacts
        },
    },
    mutations: {
        setContacts(state, { contactsFromServer }) {
            state.contacts = contactsFromServer
        },
        removeContact(state, { contactId }) {
            state.contacts = state.contacts.filter((contact) => contact._id !== contactId);
        },
        addContact(state, { contact }) {
            state.contacts.push(contact)
        },
        updateContact(state, { contact }) {
            state.contacts = state.contacts.map(c => c._id != contact._id ? c : contact)
        },



    },
    actions: {
        async loadContacts({ commit }, { filterBy }) {
            try {
                let contactsFromServer = await contactService.query(filterBy);
                commit({ type: 'setContacts', contactsFromServer })
            } catch (err) {
                console.log('err', err)
            }
        },
        async removeContact({ commit }, { contactId }) {
            try {
                await contactService.remove(contactId);
                commit({ type: 'removeContact', contactId })
            } catch (err) {
                console.log('err', err)
            }
            // eventBus.emit("user-msg", msg);
        },
        async save({ commit }, { contact: contactToAdd }) {
            const type = contactToAdd._id ? 'updateContact' : 'addContact'
            try {
                const contact = await contactService.save(contactToAdd)
                commit({ type, contact })
            } catch (err) {
                console.log('err', err)
            }
        },
        async updateContactBalance({ commit }, { contactToChange, amount }) {
            contactToChange.balance = contactToChange.balance + amount
            const contact = await contactService.save(contactToChange)
            commit({ type: 'updateContact', contact })
        }
    },
    modules: {
        userStore,
    },

})

// store.subscribe((cmd, state) => {
//     console.log('------------------')
//     console.log('storeState:\n', state)
//     console.log('cmd: \n', cmd);
//     console.log('------------------')

// })