import { INavbarTitle } from '@/types/models';
import React, { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useState } from 'react'

export interface AdminContextProps {
    navbarTitle?: string;
    navbarIcon?: string;
    activePage?: string;
    setNavbarTitle: Dispatch<SetStateAction<string>>
    setNavbarIcon: Dispatch<SetStateAction<string>>
    setActivePage: Dispatch<SetStateAction<string>>
}

const INITIAL_STATE: AdminContextProps = {
    navbarTitle:'',
    navbarIcon:'',
    activePage: 'Dashboard',
    setNavbarTitle: () => undefined,
    setActivePage: () => undefined,
    setNavbarIcon: () => undefined,
}

const AdminContext = createContext<AdminContextProps>(INITIAL_STATE);

const AdminProvider = ({ children }: PropsWithChildren) => {
    const [navbarTitle, setNavbarTitle] = useState<string>('Nav');
    const [navbarIcon, setNavbarIcon] = useState<string>('');

    const [activePage, setActivePage] = useState('Dashboard')

    const value: AdminContextProps = {
        navbarTitle,
        setNavbarTitle,
        activePage,
        navbarIcon,
        setNavbarIcon,
        setActivePage
    }
    return (
        <AdminContext.Provider value={value}>
            {children}
        </AdminContext.Provider>
    )
}

export default AdminProvider
export const useAdminContext = () => useContext(AdminContext);

export const useAdmin = (modifier: (adminContext: AdminContextProps) => void) => {
    modifier(useContext(AdminContext));
}
