"use client";
import React, { useEffect, useRef, useState } from "react";
import "./dashSquelette.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faSmile } from "@fortawesome/free-regular-svg-icons";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";

import { User } from "../../interfaces/interface";
import { getAuth } from "firebase/auth";
import {
  addNewContact,
  getUserContacts,
  getUserDiscuss,
  getUsers,
  listenForDiscussions,
  listenForUserData,
  readUserData,
  sendMessage,
} from "@/firebaseDatabase";
import { getLastMessage } from "@/app/lib/actions";
import { reduceMessage } from "../test/data";
import {
  faComment,
  faContactBook,
  faMessage,
  faPlus,
  faSearch,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
export default function DashSquelette({
  title,
}: // contacts,
{
  title: string;
  // contacts?: any;
}) {
  /* state d'affichage */
  const [isLoaded, setIsLoaded] = useState<boolean>(true);
  const [selectedContact, setSelectedContact] = useState<any | null>(null);
  const [selectedDiscut, setSelectedDiscut] = useState<any | null>(null);
  const [selectedDiscutContact, setselectedDiscutContact] = useState<
    any | null
  >(null);
  const [message, setMessageInput] = useState<string>(""); // État pour le contenu de la zone de saisie de message
  const textareaRef = useRef<HTMLTextAreaElement>(null); // Référence à l'élément textarea

  const handleMessageInputChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setMessageInput(event.target.value); // Mettre à jour le contenu de la zone de saisie de message
  };

  // Ajuster la hauteur de la zone de saisie en fonction de son contenu
  useEffect(() => {
    if (textareaRef.current) {
      // textareaRef.current.style.height = "auto"; // Réinitialiser la hauteur à auto pour recalculer la hauteur réelle
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px"; // Ajuster la hauteur en fonction du contenu

      if (message === "") {
        textareaRef.current.style.height = "35px";
      }
    }
  }, [message]);

  // Fonction pour gérer le clic sur un contact
  const handleContactClick = (contact: any) => {
    setSelectedContact(contact); // Mettre à jour le contact sélectionné
  };

  // Fonction pour gérer le clic sur une discussion
  const handleDiscussClick = (discussion: any, contact: any) => {
    setSelectedDiscut(discussion); // Mettre à jour la discussion sélectionnée
    setselectedDiscutContact(contact); // Mettre à jour le contact de la discussion
  };

  const [userData, setUserData] = useState<User | null>(null);
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth?.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        const userData = await readUserData(user.uid);
        const userCts = await getUserContacts(user.uid);
        const userDis = await getUserDiscuss(user.uid);
        setDiscuss(userDis);
        setUserContacts(userCts);
        setUserData(userData);
      } else {
        setUser(null);
        setUserData(null);
      }
    });
    return () => unsubscribe();
  }, []);

  //listen for user data
  useEffect(() => {
    const value = listenForDiscussions(setDiscuss, user?.uid, setIsLoaded);
    console.log(value);
  }, []);

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
  const [discuss, setDiscuss] = useState<any>([]);
  const [contacts, setUserContacts] = useState<any>(null);
  //console.log(`users discuss: ${JSON.stringify(discuss)}`);

  useEffect(() => {
    listenForUserData(setUserData, user?.uid);
  }, []);

  //mise a jour de la discussion selectionné
  useEffect(() => {
    // Vérifier si selectedDiscuss est défini et s'il est présent dans les nouvelles discussions
    if (selectedDiscut && discuss) {
      const updatedSelectedDiscuss = discuss.find(
        (d: any) => d.id === selectedDiscut.id
      );
      if (updatedSelectedDiscuss) {
        setSelectedDiscut(updatedSelectedDiscuss);
      }
    }
  }, [discuss]);

  const [lastMessages, setLastMessages] = useState<{ [key: string]: string }>(
    {}
  ); // État pour stocker les derniers messages de chaque discussion

  useEffect(() => {
    // Fonction pour récupérer le dernier message de chaque discussion
    const fetchLastMessages = async () => {
      const messages: { [key: string]: string } = {};
      for (const discussion of discuss) {
        try {
          const lastMessage = await getLastMessage(discussion);
          messages[discussion.id] = lastMessage?.content || ""; // Stocker le contenu du dernier message
        } catch (error) {
          console.error("Une erreur s'est produite :", error);
        }
      }
      setLastMessages(messages); // Mettre à jour les derniers messages une fois qu'ils sont récupérés
    };

    fetchLastMessages();
  }, [discuss]);

  //console.log(`contacts: ${contacts}`);

  const [addNewContactDisplay, setAddNewContactDisplay] =
    useState<boolean>(false);
  const [successContact, setSuccessContact] = useState<any[]>([]); // Utilisez un tableau pour stocker les contacts

  const handleAddNewContactDisplay = () => {
    setAddNewContactDisplay(true);
  };

  // Récupérez les utilisateurs et mettez à jour successContact lorsque le composant est monté
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await getUsers();
        setSuccessContact(users);
      } catch (error) {
        console.log("Erreur lors de la récupération des utilisateurs :", error);
      }
    };
    fetchUsers();
  }, []);
  const [search, setsearch] = useState("");
  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setsearch(event.target.value); // Mettre à jour le contenu de la zone de saisie de message
  };

  //add new contact
  const handleAddNewContact = async (userId: string, contactId: string) => {
    try {
      await addNewContact(userId, contactId);
      console.log("le contact a bien ete ajouter");
    } catch (error) {
      console.error("Erreur lors de l'enregistrement du contact :", error);
    }
  };

  //console.log(`user is: ${JSON.stringify(contacts)}`);

  return (
    <div className={`${title} dash`}>
      <div className={`${title}_container dash_container`}>
        <div className={`${title}_content dash_content`}>
          <div className={`aside_show`}>
            <div className="aside_show_container">
              <div className="aside_show_content">
                <div className="title">{title}</div>
                <div className="aside_chields">
                  {title === "discuss" && discuss && (
                    <div className="discuss_aside">
                      <div className="discuss">
                        {discuss.map((discussion: any, index: number) => {
                          // Trouver le contact correspondant à l'utilisateur actuel dans la discussion

                          const contact = contacts?.find((contact: any) => {
                            const userId = user?.uid;
                            const user1Id = discussion.participants.user1Id;
                            const user2Id = discussion.participants.user2Id;

                            const isValidContact =
                              contact.id !== userId &&
                              (contact.id === user1Id ||
                                contact.id === user2Id) &&
                              (userId === user1Id || userId === user2Id);
                            return isValidContact;
                          });
                          //recuperation du dernier message de la discussion

                          // Afficher le contact correspondant

                          return contact ? (
                            <div
                              className={`discut chield ${
                                selectedDiscut &&
                                selectedDiscut.id === discussion.id
                                  ? "active"
                                  : ""
                              }`}
                              key={index}
                              onClick={() =>
                                handleDiscussClick(discussion, contact)
                              }
                            >
                              <div className="sender_profil picture">
                                {/*  <img
                                  src={`../../../../images/contacts/lefa.jpeg`}
                                  alt="tod_descr"
                                /> */}
                                <Image
                                  src={"/images/contacts/maes.jpeg"}
                                  alt="profil"
                                  height={500}
                                  width={500}
                                />
                              </div>
                              <div className="discuss_info description">
                                <div className="sender_name">
                                  {contact.username}
                                </div>
                                <div className="last_message">
                                  {lastMessages[discussion.id]
                                    ? reduceMessage(
                                        lastMessages[discussion.id],
                                        25
                                      )
                                    : "Aucun message"}
                                </div>
                              </div>
                            </div>
                          ) : null;
                        })}
                        {/* {discuss.map((discussion: any) => {
                          return (
                            <div key={discussion.id}>
                              <h2>
                                Discussion avec{" "}
                                {discussion.participants.user1Id}
                              </h2>
                              <ul>
                                {discussion.messages.map((message: any) => (
                                  <li key={message.id}>{message.content}</li>
                                ))}
                              </ul>
                            </div>
                          );
                        })} */}
                      </div>
                      <div className="add_btn call_action">
                        nouveau contact <FontAwesomeIcon icon={faMessage} />
                        <FontAwesomeIcon icon={faPlus} />
                      </div>
                    </div>
                  )}

                  {title === "contacts" && contacts && (
                    <div className="contacts_aside">
                      <div className="contacs">
                        {contacts.map((contact: any, index: number) => (
                          <div
                            className={`contact chield ${
                              selectedContact &&
                              selectedContact.id === contact.id
                                ? "active"
                                : ""
                            }`}
                            key={index}
                            onClick={() => handleContactClick(contact)}
                          >
                            <div className="contact_pic picture">
                              {/*  <img
                                src={`../../../../images/contacts/gims.jpeg`}
                                alt="tod_descr"
                              /> */}
                              <Image
                                src={"/images/contacts/maes.jpeg"}
                                alt="profil"
                                height={500}
                                width={500}
                              />
                            </div>
                            <div className="contact_desc description">
                              <div className="name"> {contact.username}</div>
                              <div className="contact_phone_num">
                                {contact.phone}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div
                        className="add_btn call_action"
                        onClick={handleAddNewContactDisplay}
                      >
                        nouveau contact <FontAwesomeIcon icon={faContactBook} />
                        <FontAwesomeIcon icon={faPlus} />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className={`content_show_section `}>
            {/* Contenu de la section discussion_show */}
            {selectedDiscut && selectedDiscutContact && (
              <div className="discussion_show">
                <div className="contact">
                  <div className="profil_pic">
                    <div className="picture">
                      {/* <img
                        src={`../../../../images/contacts/lefa.jpeg`}
                        alt="tod_descr"
                      /> */}
                      <Image
                        src={"/images/contacts/maes.jpeg"}
                        alt="profil"
                        height={500}
                        width={500}
                      />
                    </div>
                  </div>
                  <div className="name">{selectedDiscutContact.userName}</div>
                  <div className="phone">
                    phone: {selectedDiscutContact.phone}
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
                                className={`message ${
                                  message.senderId === user.uid
                                    ? "sent"
                                    : "received"
                                }`}
                                key={index}
                              >
                                <div className="message_text">
                                  {message.content}
                                </div>
                              </div>
                            )
                          )}
                    </div>
                  </div>
                  <div className="message-input">
                    <div className="emoji">
                      <FontAwesomeIcon icon={faSmile} />
                    </div>
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
                            handleSendMessage(
                              user.uid,
                              message,
                              selectedDiscut.id
                            );
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
            {/* Contenu de la section contact_show */}
            {selectedContact && (
              <div className="contact_show">
                <div className="show_profil_pic">
                  <div className="picture">
                    {/* <img
                      src={`../../../../images/contacts/maes.jpeg`}
                      alt="tod_descr"
                    /> */}
                    <Image
                      src={"/images/contacts/maes.jpeg"}
                      alt="profil"
                      height={500}
                      width={500}
                    />
                  </div>
                </div>
                <div className="show_contact_desc">
                  <div className="name">{selectedContact.username}</div>
                  {/* <div className="status">status: {selectedContact.status}</div> */}
                  <div className="actu-mot">
                    <div className="phone">phone: {selectedContact.phone}</div>
                    <div className="actu">{/* {selectedContact.actu} */}</div>
                  </div>
                  <div className="quote-callActions">
                    <div className="favorite-quote">
                      {/* {selectedContact.favoriteQuote} */}
                    </div>
                    <div className="callActions">
                      <div className="delete-action">
                        <FontAwesomeIcon icon={faTrash} />
                      </div>
                      <div className="send-message">
                        <FontAwesomeIcon icon={faComment} />
                      </div>
                    </div>
                  </div>
                  {/* <div className="location">{selectedContact.location}</div> */}
                </div>
              </div>
            )}
            {addNewContactDisplay === true && (
              <div className="addNewContactModale">
                <div className="contacts_suc">
                  <div className="sec_header">
                    <div className="titlte">add new contact</div>
                  </div>
                  {successContact && (
                    <div className="contacts">
                      <div className="search_input">
                        <input
                          type="text"
                          className="search_user_input"
                          value={search}
                          onChange={handleSearchInputChange}
                        />
                        <div className="handle_search_btn">
                          <FontAwesomeIcon icon={faSearch} />
                        </div>
                      </div>
                      {successContact.map((contact: any, index: number) => {
                        if (
                          contact.id !== user.uid &&
                          !userData?.contacts?.find(
                            (elemnt) => elemnt === contact.id
                          )
                        ) {
                          return (
                            <div className="contact" key={index}>
                              <div className="description">
                                <div className="contact_profil_pic">
                                  <img
                                    src={`../../../../images/contacts/maes.jpeg`}
                                    alt="tod_descr"
                                  />
                                </div>
                                <div className="contact_des">
                                  <div className="contact_name">
                                    {contact.username}
                                  </div>
                                  <div className="phone">{contact.phone}</div>
                                </div>
                              </div>
                              <div
                                className="add"
                                onClick={() => {
                                  handleAddNewContact(user?.uid, contact.id);
                                }}
                              >
                                ajouter <FontAwesomeIcon icon={faPlus} />
                              </div>
                            </div>
                          );
                        }
                        return null; // Retourner null si l'ID du contact est égal à celui de l'utilisateur actuel
                      })}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
