/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';

interface StrapiContextProps {
    baseURL: string;
    apiKey: string;
    isAuthenticated?: boolean;
    accessToken?:string
}

const StrapiContext = createContext<StrapiContextProps | undefined>(undefined);

export const StrapiAdmin: React.FC<{ children: ReactNode, baseURL?: string, apiKey?: string, allowUser: any }> = ({ children, baseURL = "http://localhost:1337/api", apiKey = "", allowUser }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [currentRole, setCurrentRole] = useState("public");
    const [accessToken, setAccessToken] = useState<string>("")

    const handleUser = async (id: string | number, token: string) => {
        try {
            const response = await fetch(baseURL + `/users-permissions/roles/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }

            const result = await response.json();
            return result;
        } catch (error) {
            console.error('Error fetching user:', error);
            return null;
        }
    };

    const checkAuthStatus = async () => {
        const token = localStorage.getItem("jwt");
        setAccessToken(token || "")

        if (token) {
            setIsAuthenticated(true);
            // Optionally, decode the JWT to extract the role (if the role is encoded)
            const decodedToken = JSON.parse(atob(token.split('.')[1]));
            const id = decodedToken?.id;
            const role = await handleUser(id, token)

            if (role) setCurrentRole(role?.role?.type);
        } else {
            setIsAuthenticated(false);
            setCurrentRole("public");
        }
    };

    useEffect(() => {
        checkAuthStatus();
    }, []);



    return (
        <StrapiContext.Provider value={{ baseURL, apiKey, isAuthenticated, accessToken }}>
            {children}
        </StrapiContext.Provider>
    );
};

export const useStrapiContext = () => {
    const context = useContext(StrapiContext);
    if (context === undefined) {
        throw new Error('useStrapiContext must be used within a StrapiAdmin provider');
    }
    return context;
};
