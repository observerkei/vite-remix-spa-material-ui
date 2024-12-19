import { Face, FactCheck } from "@mui/icons-material";
import { stringify } from "querystring";
import invariant from "tiny-invariant";
import { console_dbg } from '@/app/api/util';


type ContactInfoType = {
    id?: string;
    name?: string;
    description: string;
    profilePictureURI?: string;
    youtubeURI?: string;
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

export async function getContacts(): Promise<ContactRecord[]> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    let contacts = await fakeContacts.getAll();
    return contacts;
}

export async function createEmptyContact(): Promise<ContactRecord> {
    const create = fakeContacts.create({})
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


const db = [
    {
        name: 'Yukinoshita Peo',
        profilePictureURI: 'https://yt3.googleusercontent.com/omCAYVwVWYejBhb2z7ateJ9OUP1UxDBuZclB1SF07av6dhhjcZsNQeTQR8W2_b1FhAPAYjBt=s160-c-k-c0x00ffffff-no-rj',
        description: 'I am a flower fairy ໒꒱\nI like chatting, streaming, studying english, playing Action game, hololive myth! ',
        youtubeURI: 'https://www.youtube.com/@YukinoshitaPeo',
        favorite: false,
    },
    {
        name: 'Shinomiya Runa',
        profilePictureURI: 'https://yt3.googleusercontent.com/nHOf1h_guQXgrCw-E3rDcEKV2r8wvOUys7_3lrvKsDWu-Fbf5VT_mBwCNglvWpaNGonWWjmcdQ=s160-c-k-c0x00ffffff-no-rj',
        description: 'はじめまして！\nぶいすぽっ！所属の 紫宮るな(shinomiya runa)です🌙\n\n一緒に楽しいことしたいです！\nよろしくお願いします🙇‍♀️',
        youtubeURI: 'https://www.youtube.com/@shinomiyaruna',
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