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




export default function Dashboard() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const location = useLocation()

  const [page, setPage] = useState<any>();

  useEffect(() => {
    const matchedRoutes = matchRoutes(nav.map((item) => ({ path: item.route, element: item.component })), location)

    const path = matchedRoutes ? matchedRoutes[0].route.path : "";

    const currentPage = nav.filter((item: any) => item.route === path)

    setPage(currentPage)

  }, [location])
  console.log("page", page)
  return (
    <Box minH="100vh" bg='gray.200' overflow="hidden"   >
      <SidebarContent onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full">
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav display={{ base: 'flex', md: 'none' }} onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} position="relative" >
        <Box w="full" h="100vh" p="4" pl={{ base: '4', md: "0" }}  >
          <Header />
          <Box my="4" p="4" bg="white" rounded="4" overflowX="auto" h='full' >
            <Stack mb='6'>
              {
                page && page[0].isParent === true ? <BreadCrumbComponent /> :
                  <Container maxW={"container.xl"}>
                    <BreadCrumbComponent />
                  </Container>
              }
            </Stack>
            <Outlet context={page && page[0]} />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

interface SidebarProps extends BoxProps {
  onClose: () => void
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      bg={'grey.200'}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}>
      <Flex h="20" alignItems="center" mx="6" justifyContent="space-between">
        <Stack >
          <StrapiCMS />
        </Stack>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>

      {nav.filter((config) => config.isParent !== false).map((link: any) => (
        <NavItem href={link.route} key={link.name} icon={link.icon} >
          {link.name}
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
          mx="4"
          my="1"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          bg={isActive ? "blue.400" : "transparent"}  // Active state bg color
          color={isActive ? "white" : "black"}
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

interface MobileProps extends FlexProps {
  onOpen: () => void
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent="flex-start"
      {...rest}>
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text fontSize="2xl" ml="8" fontFamily="monospace" fontWeight="bold">
        <StrapiCMS />

      </Text>
    </Flex>
  )
}