import React, { ReactNode } from 'react'
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
  HStack,
  InputGroup,
  InputLeftElement,
  Input,
  Avatar,
} from '@chakra-ui/react'
import {
  FiHome,
  FiMenu,
  FiSearch,
  FiUsers
} from 'react-icons/fi'
import { MdOutlineContacts } from "react-icons/md";
import { BiBuilding } from "react-icons/bi";
import { IconType } from 'react-icons'
import StrapiCMS from './icons/StrapiCMS'

interface LinkItemProps {
  name: string
  icon: IconType
}
const LinkItems: Array<LinkItemProps> = [
  { name: 'Home', icon: FiHome },
  { name: 'Companies', icon: BiBuilding },
  { name: 'Contacts', icon: MdOutlineContacts },
  { name: 'User', icon: FiUsers },
]

export default function Dashboard({ children }: { children?: React.ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
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
      <Box ml={{ base: 0, md: 60 }} >
        <Box w="full" h="100vh" p="4" pl={{ base: '4', md: "0" }}  >
          <HStack justify='space-between'   >
            <InputGroup maxW="605px" >
              <InputLeftElement pointerEvents='none'>
                <FiSearch color='gray.300' />
              </InputLeftElement>
              <Input type='text' bg="white" rounded="4" placeholder='Search' variant="outline" size="md" />
            </InputGroup>

            <Avatar name='Oshigaki Kisame' src='https://bit.ly/broken-link' size="md" />
          </HStack>
          <Box my="4" p="4" bg="white" rounded="4" minH="93%" >
            {
              children
            }
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
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  )
}

interface NavItemProps extends FlexProps {
  icon: IconType
  children: ReactNode
}
const NavItem = ({ icon, children, ...rest }: NavItemProps) => {
  return (
    <Box
      as="a"
      href="#"
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}>
      <Flex
        align="center"
        p="2"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
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
    </Box>
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