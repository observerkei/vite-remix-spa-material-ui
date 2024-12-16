import Drawer from '@/components/Drawer/Drawer';
import {
    Outlet,
} from '@remix-run/react';
import { ContactRecord } from './api/data';

export default function Home({ contacts }: { contacts: ContactRecord[] }) {
    return (
        <Drawer contacts={contacts}>
            <Outlet />
        </Drawer>
    );
}