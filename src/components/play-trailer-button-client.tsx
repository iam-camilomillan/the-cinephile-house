"use client";

/* React imports */
import { useState } from "react";

/* NextUI imports */
import { Button, Link } from "@nextui-org/react";

/* Icons imports */
import { IconPlayerPlay, IconPlayerPlayFilled } from "@tabler/icons-react";

export default function PlayTrailerButtonClient({ link }: { link: string }) {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <Button
      as={Link}
      href={link}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="bg-red-600"
    >
      {isHovering ? <IconPlayerPlayFilled /> : <IconPlayerPlay />}
      <span className="font-bold">Play trailer</span>
    </Button>
  );
}
