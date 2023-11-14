"use client";

/* React imports */
import { useState } from "react";

/* NextUI imports */
import { Button, Modal, ModalBody, ModalContent } from "@nextui-org/react";

/* Icons imports */
import { IconPlayerPlayFilled } from "@tabler/icons-react";

export default function PlayTrailerButtonClient({
  trailerLink,
}: {
  trailerLink: string;
}) {
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <>
      <Button
        onPress={() => setIsOpenModal(!isOpenModal)}
        color="primary"
        startContent={<IconPlayerPlayFilled />}
      >
        <span className="font-bold">Play trailer</span>
      </Button>

      <Modal isOpen={isOpenModal} onOpenChange={setIsOpenModal} size="2xl">
        <ModalContent>
          <ModalBody>
            <iframe
              src={trailerLink}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="h-80 w-full"
            ></iframe>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
