import React from 'react';
import { useStrapiListContext } from '../../providers/StrapiListProvider';
import { Button, HStack, IconButton, Select, Stack, Text } from '@chakra-ui/react';
import { FiArrowLeft, FiArrowRight, } from 'react-icons/fi';

const Pagination = () => {
    const { currentPage = 1, setCurrentPage = () => { }, totalPage = 1, setPageSize = () => { } } = useStrapiListContext()

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
        <HStack w="full" justify="space-between" alignItems={"center"}>
            <HStack gap="2" w="fit-content" alignItems={"center"} >
                <Stack>

                    <Select defaultValue={"50"} onChange={(e) => setPageSize(e.target.value)}>
                        <option selected value="50">50</option>
                        <option value='100'>100</option>
                        <option value='200'>200</option>
                        <option value='500'>500</option>
                    </Select>
                </Stack>
                <Stack>
                    <Text w="fit-content" >Entries per page</Text>
                </Stack>
            </HStack>
            <Stack direction="row" gap="2" >
                <IconButton colorScheme='blue' aria-label='' variant={currentPage === 1 ? "solid" : "outline"} size="sm" icon={<FiArrowLeft />} onClick={handlePreviousPage} isDisabled={currentPage === 1} >

                </IconButton>
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
                        <Text key={index} fontSize="lg" letterSpacing="1px" fontStyle="bold">
                            {page}
                        </Text>
                    )
                )}

                <IconButton colorScheme='blue' aria-label="" size="sm" variant={currentPage === totalPage ? "solid" : "outline"} icon={<FiArrowRight />} isDisabled={currentPage === totalPage} onClick={handleNextPage}></IconButton>
            </Stack>
        </HStack>
    );
}

export default Pagination;
