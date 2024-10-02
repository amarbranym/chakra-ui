import React from 'react'
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  DrawerHeader,
  DrawerBody,
} from '@chakra-ui/react'

export default function TriggerDrawer({
  trigger,
  children,
  title="Drawer"
}: {
  trigger: any,
  children: any,
  title?: String
}) {
  
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
      <>
        <div onClick={onOpen}>
          {trigger}
        </div>
        <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        size={{base: "full", md: "sm"}}
        // finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>{title}</DrawerHeader>
          <DrawerCloseButton />
          <DrawerBody>
            {children(onClose)}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      </>
      
  )
}
