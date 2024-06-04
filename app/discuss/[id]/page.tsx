"use client";
import {
  getDiscut,
  listenForDiscussions,
  markMessagesAsRead,
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
import EmojiModal from "@/app/ui/dashboard/components/EmojiModal";
import Link from "next/link";
import VideoMessage from "@/app/ui/accessoires/videoComponent/Video";
import FileUpload from "@/app/ui/accessoires/filesUpload/FileUpload";

const Page = ({ params }: { params: { id: string } }) => {
  const discussId = params.id;
  const [discut, setDiscut] = useState<any | null>();
  const [discuss, setDiscuss] = useState<any | null>();
  const [isLoaded, setIsLoaded] = useState<boolean | null>();
  const [contact, setContact] = useState<any | null>([]);
  const [userContacts, setUserContacts] = useState<any | null>([]);
  const [user, setUser] = useState<any | null>(null);
  const [userData, setUserData] = useState<any | null>(null);
  const [message, setMessageInput] = useState<string>(""); // État pour le contenu de la zone de saisie de message
  const [emojiModalOpen, setEmojiModalOpen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null); // Référence à l'élément textarea
  const [isFileSelected, setIsFileSelected] = useState<boolean>(false);

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

  useEffect(() => {
    if (discut) {
      console.log("discut is hier....", discut);
      listenForDiscussions(setDiscuss, user?.uid, setIsLoaded);
    }
    // listenForUserData(setUserData, user?.uid);
  }, [user]);

  useEffect(() => {
    if (discut && discuss) {
      const updatedSelectedDiscuss = discuss.find(
        (d: any) => d.id === discut.id
      );
      if (updatedSelectedDiscuss) {
        Promise.all(
          updatedSelectedDiscuss.messages.map(async (message: any) => {
            if (message && !message.read && message.senderId !== user.uid) {
              await markMessagesAsRead(
                updatedSelectedDiscuss.id,
                message.id,
                user.uid
              );
            }
          })
        ).then(async () => {
          setDiscut(updatedSelectedDiscuss);
        });
      }
    }
  }, [discuss, user]);

  const onFileUpload = (url: string) => {
    console.log("file Uploaded Url is: ", url);
  };

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
                {discut &&
                  Object.values(discut.messages).map(
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
                          {message.files &&
                            message.files.map((file: any, index: number) => (
                              <div className="file" key={index}>
                                {file.type.startsWith("image/") ? (
                                  <Image
                                    src={file.url}
                                    alt="Image"
                                    width={500}
                                    height={500}
                                  />
                                ) : file.type.startsWith("video/") ? (
                                  <VideoMessage src={file.url} />
                                ) : (
                                  <a
                                    href={file.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    Download File
                                  </a>
                                )}
                              </div>
                            ))}
                          <div className="content_text">{message.content}</div>
                          <div className="time-readed inMessage">
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
            {
              <div className="message-input">
                <div className="emojo-file">
                  <div className="emojit" onClick={openEmojiModal}>
                    <label>
                      <FontAwesomeIcon icon={faSmile} />
                    </label>
                  </div>
                  <FileUpload
                    setIsFileSelected={setIsFileSelected}
                    onFileUpload={onFileUpload}
                    discussId={discussId}
                    userId={user.uid}
                  />

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
