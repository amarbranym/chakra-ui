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
    setPageSize?: React.Dispatch<React.SetStateAction<string>>;
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
    const [isLoading, setLoading] = useState<boolean>(false)
    const [filterQuery, setFilterQuery] = useState<any[]>([])
    const [totalPage, setTotalPage] = useState<number>(1);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [pageSize, setPageSize] = useState<string>("50")

    const handleGetDocument = async () => {
        setLoading(true)
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
                        `&filters[${q.operatorFields}]${q.owned && `[${q.owned}]`}[${q.operator}]${q.text || q.date ? `=${q.text || q.date}` : ''}`
                )
                .join('');
            const searchParam = searchQuery ? `&_q=${encodeURIComponent(searchQuery)}` : '';

            const list = await apiFetch(baseURL +
                `/${collectionName}?${query}&pagination[page]=${currentPage}&pagination[pageSize]=${pageSize}${filterParams}${searchParam}`, options
            );
            if (collectionName === "users") {
                setData(list)

            } else {

                setData(list?.data)
            }


            setTotalPage(list?.meta?.pagination?.pageCount);
            setLoading(false)
        } catch (err) {
            console.error('Error fetching candidate list:', err);
            setLoading(false)
        }
    };

    useEffect(() => {
        handleGetDocument()
    }, [currentPage, filterQuery, searchQuery, pageSize])

    return (
        <StrapiListContext.Provider value={{ data, setData, setFilterQuery, setCurrentPage, currentPage,isLoading, filterQuery, totalPage, setSearchQuery, setPageSize }}>
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
