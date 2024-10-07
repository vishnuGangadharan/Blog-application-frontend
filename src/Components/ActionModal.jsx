import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { MdDelete } from "react-icons/md";

const ActionModal = ({ icon, handleDelete }) => {
  // Use useDisclosure here to control modal open state
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <div onClick={onOpen}>{icon}</div>
      
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Delete Confirmation</ModalHeader>
              <ModalBody>
                <h1>Are you sure you want to delete this blog?</h1>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" onPress={() => { handleDelete(); onClose(); }}>
                  Confirm
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ActionModal;
