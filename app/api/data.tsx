import { Face, FactCheck } from "@mui/icons-material";
import { stringify } from "querystring";
import invariant from "tiny-invariant";
import { console_dbg } from '@/app/api/util';


export type ContactInfoType = {
    id?: string;
    name?: string;
    description?: string;
    profilePictureURI?: string;
    descriptionURI?: string;
    favorite?: boolean;
};

export type ContactRecord = ContactInfoType & {
    id: string;
    createAt: string;
};


const fakeContacts = {
    records: {} as Record<string, ContactRecord>,
    async getAll(): Promise<ContactRecord[]> {
        return Object.keys(fakeContacts.records)
            .map((key) => fakeContacts.records[key])
            .sort((a: ContactRecord, b: ContactRecord) =>
                a.createAt.localeCompare(b.createAt))
    },
    async get(id: string): Promise<ContactRecord | null> {
        return fakeContacts.records[id] || null;
    },
    async create(value: ContactInfoType): Promise<ContactRecord> {
        const id = value.id || Math.random().toString(36).substring(2, 9);
        const createAt = new Date().toISOString();
        const newContact = { id, ...value, createAt };
        fakeContacts.records[id] = newContact;
        
        fakeContacts.fflush();
        return newContact;
    },
    async set(id: string, value: ContactInfoType): Promise<ContactRecord> {
        const contact = await fakeContacts.get(id) as ContactRecord;
        invariant(contact, `No contact found for ${id}`);
        const updateContact = { ...contact, ...value };
        fakeContacts.records[id] = updateContact;
        
        fakeContacts.fflush();
        return updateContact;
    },
    destory(id: string): null {
        delete fakeContacts.records[id];
        
        fakeContacts.fflush();
        return null;
    },
    fflush(): null {
        localStorage.setItem('contacts', JSON.stringify(fakeContacts.records));
        return null;
    }
};

export async function getContacts(query?: string | null): Promise<ContactRecord[]> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    let contacts = await fakeContacts.getAll();
    if (query) {
        contacts = contacts.filter((contact) => contact?.name?.includes(query))
        console_dbg('q contacts: ', contacts);
    }
    return contacts;
}

export async function createEmptyContact(): Promise<ContactRecord> {
    const create = fakeContacts.create({} as ContactRecord)
    return create;
}

export async function getContact(id: string): Promise<ContactRecord | null> {
    return fakeContacts.get(id);
}

export async function updateContact(id: string, update: ContactInfoType): Promise<ContactRecord> {
    const old = fakeContacts.get(id);
    if (!old) {
        throw new Error(`No contact found for ${id}`)
    }
    return fakeContacts.set(id, { ...old, ...update });
}

export async function deleteContact(id: string): Promise<null> {
    return fakeContacts.destory(id);
}

export const OPEN_DRAWER = 'openDrawer';

export function getLocalData(key: string) {
    const value = localStorage.getItem(key);
    return JSON.parse(value || '');
}

export function setLocalData(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
}


const db = [
    {
        name: 'Yukinoshita Peo',
        profilePictureURI: 'https://yt3.googleusercontent.com/omCAYVwVWYejBhb2z7ateJ9OUP1UxDBuZclB1SF07av6dhhjcZsNQeTQR8W2_b1FhAPAYjBt',
        description: 'I am a flower fairy ໒꒱\nI like chatting, streaming, studying english, playing Action game, hololive myth! ',
        descriptionURI: 'https://ko-fi.com/yukinoshitapeo/shop',
        favorite: false,
    },
    {
        name: 'Nachoneko',
        profilePictureURI: 'https://yt3.googleusercontent.com/VXeA7tz-RsePrgKKs99aYb8wz4aLSLH52lysXXpL8xH2mZt3dY65ae_0boggAy_Cy0t_3EzJ',
        description: 'Nachoneko dayo.\n(Amashiro Natsuki)',
        descriptionURI: 'https://amashiro.com/',
        favorite: false,
    }
]

export function dataInit() {
    if (Object.keys(fakeContacts.records).length === 0) {
        //localStorage.setItem('contacts', '');
        const localDB = localStorage.getItem('contacts');
        if (!localDB) {
            //console_dbg('no local')
            db.forEach((contact) => {
                fakeContacts.create({
                    ...contact,
                });
            });
            //console_dbg(fakeContacts.records)
        } else {
            //console_dbg('has local')
            const contacts: Record<string, ContactRecord> = JSON.parse(localDB);
            Object.keys(contacts)
                .map((key) => fakeContacts.create({
                    ...(contacts[key])
                }))
            //console_dbg(fakeContacts.records)
        }
    }
}