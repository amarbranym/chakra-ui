import React from 'react';
import { useStrapiListContext } from '../../providers/StrapiListProvider';
import { Button, Stack, Text } from '@chakra-ui/react';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';



const Pagination = () => {
    const { currentPage = 1, setCurrentPage = () => { }, totalPage = 1 } = useStrapiListContext()

    const handleNextPage = (event: React.MouseEvent) => {
        event.preventDefault(); // Prevent default anchor behavior
        if (currentPage < totalPage) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = (event: React.MouseEvent) => {
        event.preventDefault(); // Prevent default anchor behavior
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // Generate page numbers with ellipsis for larger sets
    const generatePageNumbers = () => {
        const pages: Array<number | string> = [];
        const maxPagesToShow = 5; // Maximum number of page buttons to display
        const halfWindow = Math.floor(maxPagesToShow / 2);

        if (totalPage <= maxPagesToShow) {
            // Show all pages if totalPage is within the limit
            for (let i = 1; i <= totalPage; i++) {
                pages.push(i);
            }
        } else {
            // Ellipsis logic with duplicate check
            if (currentPage <= halfWindow) {
                for (let i = 1; i <= maxPagesToShow; i++) {
                    pages.push(i);
                }
                if (currentPage < totalPage - halfWindow) {
                    pages.push('...');
                }
                if (currentPage < totalPage - halfWindow + 1) {
                    pages.push(totalPage);
                }
            } else if (currentPage > totalPage - halfWindow) {
                pages.push(1);
                if (currentPage > halfWindow + 1) {
                    pages.push('...');
                }
                for (let i = totalPage - maxPagesToShow + 1; i <= totalPage; i++) {
                    pages.push(i);
                }
            } else {
                pages.push(1);
                if (currentPage > halfWindow + 1) {
                    pages.push('...');
                }
                for (let i = currentPage - halfWindow; i <= currentPage + halfWindow; i++) {
                    pages.push(i);
                }
                if (currentPage < totalPage - halfWindow) {
                    pages.push('...');
                }
                pages.push(totalPage);
            }
        }

        return pages;
    };


    const pages = generatePageNumbers();
    const handlePageClick = (page: number) => {
        if (page !== currentPage) {
            setCurrentPage(page);
        }
    };

    return (
        <Stack direction="row" gap="1" >
            <Button colorScheme='blue' variant={currentPage === 1 ? "solid" : "outline"} size="sm" leftIcon={<FiArrowLeft />} onClick={handlePreviousPage} disabled={currentPage === 1} >
                Prev
            </Button>
            {pages.map((page, index) =>
                typeof page === 'number' ? (
                    <Button
                    colorScheme='blue'
                        key={index}
                        size="sm"
                        variant={currentPage === page ? 'solid' : 'outline'}
                        onClick={() => handlePageClick(page)}
                    >
                        {page}
                    </Button>
                ) : (
                    <Text key={index} fontSize="sm">
                        {page}
                    </Text>
                )
            )}

            <Button colorScheme='blue' size="sm" variant={currentPage ===totalPage ?"solid":"outline"} rightIcon={<FiArrowRight />} disabled={currentPage === totalPage} onClick={handleNextPage}>Next</Button>
        </Stack>
    );
}

export default Pagination;
