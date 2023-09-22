import { useEffect, useState } from "react";
import { useAuth } from "~/context/AuthContext";

import { useData } from "~/context/DataContext";

const MessageCard = () => {
  const { authMessage } = useAuth();
  const { dataMessage } = useData();

  const [showCard, setShowCard] = useState(false);

  useEffect(() => {
    if (dataMessage) {
      setShowCard(true);
      setTimeout(() => {
        setShowCard(false);
      }, 2500);
    }
    if (authMessage) {
      setShowCard(true);
      setTimeout(() => {
        setShowCard(false);
      }, 2500);
    }
  }, [authMessage, dataMessage]);

  return (
    <div
      className={`fixed -top-16 left-1/2 z-50 -translate-x-1/2 ${
        showCard ? "translate-y-20" : null
      } rounded-md border border-white bg-black px-4 py-2 text-center text-white transition-transform duration-200 ease-in-out`}
    >
      {authMessage ? authMessage : dataMessage ? dataMessage : null}
    </div>
  );
};

export default MessageCard;
