"use client";

/* React imports */
import { useState } from "react";

/* NextUI imports */
import { Button, Link } from "@nextui-org/react";

/* Icons imports */
import { IconPlayerPlay, IconPlayerPlayFilled } from "@tabler/icons-react";

export default function PlayTrailerButtonClient({ link }: { link: string }) {
  /* State for hovering on button */
  const [isHovering, setIsHovering] = useState(false);

  return (
    <Button
      as={Link}
      href={link}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      color="primary"
      className="hover:bg-secondary hover:opacity-100"
    >
      {isHovering ? <IconPlayerPlayFilled /> : <IconPlayerPlay />}
      <span className="font-bold">Play trailer</span>
    </Button>
  );
}
