import React from 'react';
import { useStrapiListContext } from '../../providers/StrapiListProvider';
import { Box } from '@chakra-ui/react';
interface EmptyProps {
    className?: string;
    children: React.ReactNode;
}
const Empty: React.FC<EmptyProps> = ({ children }) => {
    const { data } = useStrapiListContext();

    if (!data || data.length === 0) {
        return (
            <Box>
                {children}
            </Box>
        );
    }

    return null; // Don't render anything if there's data
};

export default Empty;
