import { reduceMessage, sendMessage } from "@/firebaseDatabase";
import {
  faCheck,
  faCircle,
  faPaperPlane,
  faSmile,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useState } from "react";
import EmojiModal from "../dashboard/components/EmojiModal";
import SendFile from "../dashboard/components/SendFile";
import Image from "next/image";

const Discuss = (
  selectedDiscut: any,
  selectedDiscutContact: any,
  isContactConnected: any,
  isLoaded: any,
  user: any
) => {
  const [message, setMessageInput] = useState<string>("");
  const [emojiModalOpen, setEmojiModalOpen] = useState(false); // État pour le contenu de la zone de saisie de message
  const openEmojiModal = () => {
    setEmojiModalOpen(!emojiModalOpen);
  };
  const handleSendMessage = async (
    senderId: string,
    messageContent: string,
    discussId: string
  ) => {
    try {
      setMessageInput("");

      await sendMessage(senderId, messageContent, discussId);
      console.log("Message envoyé avec succès.");
    } catch (error) {
      console.error("Erreur lors de l'envoi du message :", error);
    }
  };
  const emojiClick = (emoji: any) => {
    setMessageInput(message + emoji);
  };
  const handleMessageInputChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setMessageInput(event.target.value); // Mettre à jour le contenu de la zone de saisie de message
  };
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  return (
    <div>
      {selectedDiscut && selectedDiscutContact && (
        <div className="discussion_show">
          <div className="contact">
            <div className="profil_pic">
              <div className="picture">
                <Image
                  src={"/images/contacts/maes.jpeg"}
                  alt="profil"
                  height={500}
                  width={500}
                />
              </div>
            </div>
            <div className="name_phone_status">
              <div className="name_phone">
                <div className="name">{selectedDiscutContact.userName}</div>
                <div className="phone">
                  phone: {selectedDiscutContact.phone}
                </div>
              </div>
              <div className="status">
                {selectedDiscutContact.status}
                <FontAwesomeIcon
                  className="icon"
                  icon={isContactConnected ? faCircle : faTimesCircle}
                  style={{ color: isContactConnected ? "green" : "red" }}
                />
              </div>
            </div>
          </div>
          <div className="discussion_block">
            <div className="discussion">
              <div className="discussion_content">
                {isLoaded
                  ? "chargement ..."
                  : Object.values(selectedDiscut.messages).map(
                      (message: any, index: number) => (
                        <div
                          className={`message  ${
                            message.senderId === user.uid
                              ? "sent"
                              : message.senderId === "system"
                              ? "system-message"
                              : "received"
                          }`}
                          key={index}
                        >
                          <div className="message_text">
                            {message.content}
                            <div className="time-readed">
                              {message.senderId === user.uid && (
                                <div
                                  className={`readed ${
                                    message.read ? "read" : ""
                                  }`}
                                >
                                  <FontAwesomeIcon icon={faCheck} />
                                  <FontAwesomeIcon
                                    className="deplace"
                                    icon={faCheck}
                                  />
                                </div>
                              )}
                              <div className="time">
                                {reduceMessage(message.writeTime, 5, true)}
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    )}
              </div>
            </div>
            <div className="message-input">
              <div className="emojit" onClick={openEmojiModal}>
                <label>
                  <FontAwesomeIcon icon={faSmile} />
                </label>
              </div>
              <SendFile />
              {emojiModalOpen && <EmojiModal emojiClick={emojiClick} />}
              {/* Zone de saisie de message */}
              <div className="espace-send">
                <textarea
                  className="input"
                  ref={textareaRef}
                  value={message}
                  onChange={handleMessageInputChange}
                  placeholder="Tapez votre message ici..."
                ></textarea>
                {message != "" && (
                  <div
                    className="send-btn"
                    onClick={() => {
                      handleSendMessage(user.uid, message, selectedDiscut.id);
                      //setMessageInput("");
                    }}
                  >
                    <FontAwesomeIcon icon={faPaperPlane} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Discuss;
