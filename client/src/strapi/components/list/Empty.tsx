import React from 'react';
import { useStrapiListContext } from '../../providers/StrapiListProvider';
import { Box, Center, Spinner } from '@chakra-ui/react';
interface EmptyProps {
    className?: string;
    children: React.ReactNode;
}
const Empty: React.FC<EmptyProps> = ({ children }) => {
    const { data, isLoading } = useStrapiListContext();

    if (!data || data.length === 0) {
        return (
            <Center w="100%" py={8}>
                
                {isLoading ? <Spinner/> : children}
            </Center>
        );
    }

    return null; // Don't render anything if there's data
};

export default Empty;
