/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { useStrapiListContext } from '../../providers/StrapiListProvider';

interface CardProps {
    className?: string;
    renderItem: (item: any) => React.ReactNode;
}

const Card: React.FC<CardProps> = ({ renderItem }) => {
    const { data } = useStrapiListContext();
    if (!data || data.length === 0) {
        return null; // Or return a fallback UI if necessary
    }

    return (
        <>
        {data.map((item, index) => (
            <React.Fragment key={item.id || index}>
                {renderItem(item)}
            </React.Fragment>
        ))}
        </>
    );
};

export default Card;
