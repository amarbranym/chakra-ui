/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactNode, useEffect, useState } from 'react'
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  BoxProps,
  FlexProps,
  Stack,
  Container,
  Heading,
  Grid,
  MenuIcon,
} from '@chakra-ui/react'
import {
  FiMenu,
} from 'react-icons/fi'
import { IconType } from 'react-icons'
import StrapiCMS from '../strapi/icons/StrapiCMS'
import { matchRoutes, NavLink, Outlet, useLocation } from 'react-router-dom';
import { nav } from '../config/nav';
import Header from './Header'
import BreadCrumbComponent from './BreadCrumb'
import { HamburgerIcon } from '@chakra-ui/icons'




export default function Dashboard() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const location = useLocation()

  const [page, setPage] = useState<any>();

  useEffect(() => {
    const matchedRoutes = matchRoutes(nav.map((item) => ({ path: item.route, element: item.component })), location)

    const path = matchedRoutes ? matchedRoutes[0].route.path : "";

    const currentPage = nav.filter((item: any) => item.route === path)

    setPage(currentPage)

    onClose()

  }, [location])
  return (
    <>
       <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="xs">
        <DrawerContent bg="black">
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
   
      <Grid templateColumns={{base: "1fr", lg: "16rem 1fr"}} w="100vw" position={"relative"} overflowX={"hidden"} overflowY={"scroll"} h="100vh" bg="black">

        <Box position={"sticky"} top={0} h="fit-content">

          <Flex px={2} py={[2,2,4]} alignItems={"center"}>
            <IconButton display={{base: "block", lg: "none"}} onClick={onOpen} variant={"ghost"} color="white" _hover={{bg:"whiteAlpha.200"}} aria-label='Menu'><HamburgerIcon/></IconButton>
            <Heading px={2} color="white" fontFamily={"sans-serif"} size="lg">Bemployed</Heading>
          </Flex>

          <SidebarContent onClose={() => onClose} display={{ base: 'none', lg: 'block' }} />

        </Box>
        <Box position={"relative"} p={[2,2,4]} bg="white" rounded="4" h="fit-content" minH="100vh" w={{base:"100vw", lg: "calc(100vw - 16rem)"}} >
          <Stack mb={[0, 0, 4]}>
            {
              page && page[0].isParent === true ? <BreadCrumbComponent page={page && page[0]} /> :
                <Container px={[0,0, 4]} maxW={"container.xl"}>
                  <BreadCrumbComponent page={page && page[0]}  />
                </Container>
            }
          </Stack>
          <Outlet context={page && page[0]} />
          <Box h={20}></Box>
        </Box>
      </Grid>

    </>
  )
}

interface SidebarProps extends BoxProps {
  onClose: () => void
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {

  return (
    <Box
      color="white"
      p={2}
      w={"full"}
      {...rest}>
      <Flex px={2} py={4} display={{ base: 'flex', lg: 'none' }} alignItems="center" justifyContent="space-between">
        <Heading fontFamily={"sans-serif"} size="lg">Bemployed</Heading>
        <CloseButton onClick={onClose} />
      </Flex>

      {nav.filter((config) => config.isParent !== false).map((link: any) => (
        <NavItem href={link.route} key={link.name} icon={link.icon} >
          {link.title}
        </NavItem>
      ))}
    </Box>
  )
}

interface NavItemProps extends FlexProps {
  icon: IconType
  children: ReactNode,
  href: any
}
const NavItem = ({ href = "", icon, children, ...rest }: NavItemProps) => {

  return (
    <NavLink
      to={href}
      style={{ textDecoration: 'none' }}
    >
      {({ isActive }) => (
        <Flex
          align="center"
          p="2"
          my="1"
          borderRadius="lg"
          w="100%"
          role="group"
          cursor="pointer"
          bg={isActive ? "blue.400" : "transparent"}  // Active state bg color
          color={isActive ? "white" : "white"}
          _hover={{
            bg: 'blue.400',
            color: 'white',
          }}
          fontWeight={"bold"}
          {...rest}>
          {icon && (
            <Icon
              mr="4"
              fontSize="16"
              _groupHover={{
                color: 'white',
              }}
              as={icon}
            />
          )}
          {children}
        </Flex>
      )}
    </NavLink>
  )
}

