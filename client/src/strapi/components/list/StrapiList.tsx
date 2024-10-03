import React from 'react';
import { StrapiListProvider } from '../../providers/StrapiListProvider';

const StrapiList: React.FC<{ collectionName?: string, query?: any, children: React.ReactNode }> = ({ collectionName, query, children }) => {
    return (
        <StrapiListProvider collectionName={collectionName} query={query}>
            {children}
        </StrapiListProvider>
    );
};

export default StrapiList;
