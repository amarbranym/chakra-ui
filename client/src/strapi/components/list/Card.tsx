/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { useStrapiListContext } from '../../providers/StrapiListProvider';

interface CardProps {
    className?: string;
    renderItem: (item: any, deleteDocument?: ((id: string) => void) | undefined) => React.ReactNode;
}

const Card: React.FC<CardProps> = ({ renderItem }) => {
    const { data, deleteDocument } = useStrapiListContext();
    if (!data || data.length === 0) {
        return null; // Or return a fallback UI if necessary
    }

    return (
        <>
        { data && data?.map((item, index) => (
            <React.Fragment key={item.id || index}>
                {renderItem(item, deleteDocument)}
            </React.Fragment>
        ))}
        </>
    );
};

export default Card;
