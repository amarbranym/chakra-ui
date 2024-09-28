/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useStrapiContext } from './StrapiAdmin';
import { apiFetch } from '../utils/service';

interface StrapiListContextProps {
    data: any[];
    setData: React.Dispatch<React.SetStateAction<any[]>>;
    isLoading?: boolean;
    setFilterQuery?: React.Dispatch<React.SetStateAction<any[]>>;
    filterQuery?: any[];
    setCurrentPage?: React.Dispatch<React.SetStateAction<number>>;
    setTotalPage?: React.Dispatch<React.SetStateAction<number>>;
    currentPage?: number;
    totalPage?: number;
    setSearchQuery?: React.Dispatch<React.SetStateAction<string>>;
    searchQuery?: string
}
const StrapiListContext = createContext<StrapiListContextProps | undefined>(undefined);

export const StrapiListProvider: React.FC<{ children: ReactNode, collectionName?: string, query?: string }> = ({ children, collectionName, query }) => {
    const [data, setData] = useState<any[]>([]);
    const { baseURL, accessToken } = useStrapiContext()
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [filterQuery, setFilterQuery] = useState<any[]>([])
    const [totalPage, setTotalPage] = useState<number>(1);
    const [searchQuery, setSearchQuery] = useState<string>("")

    const handleGetDocument = async () => {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`, // Pass the token here
            },
            credentials: 'include',
        }

        try {
            const filterParams = filterQuery
                .map(
                    (q) =>
                        `&filters[${q.operatorFields}]${q.owned && `[${q.owned}]`}[${q.operator}]${q.text ? `=${q.text}` : ''}`
                )
                .join('');
            const searchParam = searchQuery ? `&_q=${encodeURIComponent(searchQuery)}` : '';

            const list = await apiFetch(baseURL +
                `/${collectionName}?${query}&pagination[page]=${currentPage}&pagination[pageSize]=10${filterParams}${searchParam}`, options
            );
            if (collectionName === "users") {
                setData(list)

            } else {

                setData(list?.data)
            }


            setTotalPage(list?.meta?.pagination?.pageCount);
        } catch (err) {
            console.error('Error fetching candidate list:', err);
        }
    };

    useEffect(() => {
        handleGetDocument()
    }, [currentPage, filterQuery, searchQuery])

    return (
        <StrapiListContext.Provider value={{ data, setData, setFilterQuery, setCurrentPage, currentPage, filterQuery, totalPage, setSearchQuery }}>
            {children}
        </StrapiListContext.Provider>
    );
};

export const useStrapiListContext = () => {
    const context = useContext(StrapiListContext);
    if (context === undefined) {
        throw new Error('useStrapiListContext must be used within a StrapiListProvider');
    }
    return context;
};
