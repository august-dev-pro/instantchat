"use client";
import {
  getDiscut,
  readUserData,
  reduceMessage,
  sendMessage,
} from "@/firebaseDatabase";
import {
  faArrowLeft,
  faCheck,
  faCircle,
  faPaperPlane,
  faSmile,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getAuth } from "firebase/auth";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import "@/app/ui/dashboard/components/dashSquelette.css";
import SendFile from "@/app/ui/dashboard/components/SendFile";
import EmojiModal from "@/app/ui/dashboard/components/EmojiModal";
import Link from "next/link";

const Page = ({ params }: { params: { id: string } }) => {
  const discussId = params.id;
  const [discut, setDiscut] = useState<any | null>();
  const [contact, setContact] = useState<any | null>([]);
  const [user, setUser] = useState<any | null>(null);
  const [message, setMessageInput] = useState<string>(""); // État pour le contenu de la zone de saisie de message
  const [emojiModalOpen, setEmojiModalOpen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null); // Référence à l'élément textarea

  const handleMessageInputChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setMessageInput(event.target.value); // Mettre à jour le contenu de la zone de saisie de message
  };
  const emojiClick = (emoji: any) => {
    setMessageInput(message + emoji);
  };

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
  const isContactConnected = 1;
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const discut = await getDiscut(discussId);
        setDiscut(discut);
        // Récupérer l'ID du contact
        const contactId =
          discut.participants.user1Id === user?.uid
            ? discut.participants.user2Id
            : discut.participants.user1Id;
        const contact = await readUserData(contactId);
        setContact(contact);
        console.log("ID du contact :", contactId);
      } catch (error) {
        console.log("Erreur lors de la récupération des utilisateurs :", error);
      }
    };
    fetchUsers();
  }, []);
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth?.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <div>
      {discut && (
        <div className="discussion_show">
          {
            <div className="contact">
              <Link href={"/dashboard/discuss"}>
                <FontAwesomeIcon icon={faArrowLeft} />
              </Link>
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
                  <div className="name">{contact.userName}</div>
                  <div className="phone">phone: {contact.phone}</div>
                </div>
                <div className="status">
                  {discut.status}
                  <FontAwesomeIcon
                    className="icon"
                    icon={isContactConnected ? faCircle : faTimesCircle}
                    style={{ color: isContactConnected ? "green" : "red" }}
                  />
                </div>
              </div>
            </div>
          }
          <div className="discussion_block">
            <div className="discussion">
              <div className="discussion_content">
                {Object.values(discut.messages).map(
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
                              className={`readed ${message.read ? "read" : ""}`}
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
            {
              <div className="message-input">
                <div className="emojo-file">
                  <div className="emojit" onClick={openEmojiModal}>
                    <label>
                      <FontAwesomeIcon icon={faSmile} />
                    </label>
                  </div>
                  <SendFile />
                  {emojiModalOpen && <EmojiModal emojiClick={emojiClick} />}
                </div>

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
                        handleSendMessage(user.uid, message, discut.id);
                      }}
                    >
                      <FontAwesomeIcon icon={faPaperPlane} />
                    </div>
                  )}
                </div>
              </div>
            }
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
