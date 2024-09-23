import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react'
import React from 'react'

const BreadCrumbComponent = () => {
    return (
        <Breadcrumb>
            <BreadcrumbItem>
                <BreadcrumbLink href='#'>Home</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem>
                <BreadcrumbLink href='#'>Companies</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem isCurrentPage>
                <BreadcrumbLink href='#'>All Companies</BreadcrumbLink>
            </BreadcrumbItem>
        </Breadcrumb>
    )
}

export default BreadCrumbComponent
