export interface IContactsParserData {
    phone?: string[];
    email?: string[];
    web?: string[];
    skype?: string[];
    icq?: string[];
}

export function contactsParser(contacts: IContacts[] | undefined): IContactsParserData {
    const parsedContacts: IContactsParserData = {};
    if (contacts) {
        contacts.forEach(contact => {
            if (contact.contactType && contact.value) {
                const slug = (contact.contactType.slug as keyof IContactsParserData);
                if (!parsedContacts[slug]) {
                    parsedContacts[slug] = [];
                }
                (parsedContacts[slug] as string[]).push(contact.value);
            }
        });
    }
    return parsedContacts;
}
