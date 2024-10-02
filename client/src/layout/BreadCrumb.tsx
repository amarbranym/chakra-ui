import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react'
import React from 'react'
// import { Link } from 'react-router-dom'

const BreadCrumbComponent = ({ page }: any) => {
    return (
        <Breadcrumb>
            <BreadcrumbItem>
                <BreadcrumbLink >Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage>
                <BreadcrumbLink>{page?.title}</BreadcrumbLink>
            </BreadcrumbItem>
        </Breadcrumb>
    )
}

export default BreadCrumbComponent
