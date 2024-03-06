"use client";
import React, { useEffect, useRef, useState } from "react";
import "./dashSquelette.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowLeftLong,
  faComment,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { Contact, Discuss } from "../test/type";
import { getLastMessage, reduceMessage } from "../test/data";
import { faSmile } from "@fortawesome/free-regular-svg-icons";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import SideNav from "../sideNav/SideNav";
export default function DashSquelette({
  title,
  contacts = null,
  discuss = null,
}: {
  title: string;
  contacts?: any | null;
  discuss?: any | null;
}) {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [selectedDiscut, setSelectedDiscut] = useState<Discuss | null>(null);
  const [selectedDiscutContact, setselectedDiscutContact] =
    useState<Contact | null>(null);
  const [messageInput, setMessageInput] = useState(""); // État pour le contenu de la zone de saisie de message
  const textareaRef = useRef<HTMLTextAreaElement>(null); // Référence à l'élément textarea
  //const [isChieldSelected, setIsChieldSelected] = useState(null);
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

      if (messageInput === "") {
        textareaRef.current.style.height = "35px";
      }
    }
  }, [messageInput]);
  // Fonction pour gérer le clic sur un contact
  const handleContactClick = (contact: Contact) => {
    setSelectedContact(contact); // Mettre à jour le contact sélectionné
  };

  // Fonction pour gérer le clic sur une discussion
  const handleDiscussClick = (discussion: Discuss, contact: Contact) => {
    setSelectedDiscut(discussion); // Mettre à jour la discussion sélectionnée
    setselectedDiscutContact(contact); // Mettre à jour le contact de la discussion
  };

  return (
    <div className={`${title} dash`}>
      <div className={`${title}_container dash_container`}>
        <div className={`${title}_content dash_content`}>
          <div className={`aside_show`}>
            <div className="aside_show_container">
              <div className="aside_show_content">
                <div className="title">{title}</div>
                <div className="aside_chields">
                  {title === "discuss" &&
                    discuss &&
                    discuss.length > 0 &&
                    contacts &&
                    discuss.map((discussion: Discuss) => {
                      // Trouver le contact correspondant à cette discussion
                      const contact = contacts.find(
                        (contact: any) => contact.id === discussion.contactId
                      );

                      // Si le contact est trouvé, afficher les détails de la discussion
                      if (contact) {
                        return (
                          <div
                            className={`discut chield ${
                              selectedDiscut &&
                              selectedDiscut.id === discussion.id
                                ? "active"
                                : ""
                            }`}
                            key={discussion.id}
                            onClick={() =>
                              handleDiscussClick(discussion, contact)
                            }
                          >
                            <div className="sender_profil picture">
                              <img
                                src={`../../../../images/contacts/${contact.profilePic}.jpeg`}
                                alt="tod_descr"
                              />
                            </div>
                            <div className="discuss_info description">
                              <div className="sender_name">{contact.name}</div>
                              <div className="last_message">
                                {reduceMessage(
                                  getLastMessage(discussion.messages).text,
                                  25
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      }
                    })}

                  {title === "contacts" &&
                    contacts &&
                    contacts.length > 0 &&
                    contacts.map((contact: Contact) => (
                      <div
                        className={`contact chield ${
                          selectedContact && selectedContact.id === contact.id
                            ? "active"
                            : ""
                        }`}
                        key={contact.id}
                        onClick={() => handleContactClick(contact)}
                      >
                        <div className="contact_pic picture">
                          <img
                            src={`../../../../images/contacts/${contact.profilePic}.jpeg`}
                            alt="tod_descr"
                          />
                        </div>
                        <div className="contact_desc description">
                          <div className="name">{contact.name}</div>
                          <div className="contact_phone_num">
                            {contact.phoneNumber}
                          </div>
                        </div>
                      </div>
                    ))}
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
                      <img
                        src={`../../../../images/contacts/${selectedDiscutContact.profilePic}.jpeg`}
                        alt="tod_descr"
                      />
                    </div>
                  </div>
                  <div className="name">{selectedDiscutContact.name}</div>
                  <div className="phone">
                    phone: {selectedDiscutContact.phoneNumber}
                  </div>
                </div>
                <div className="discussion_block">
                  <div className="discussion">
                    <div className="discussion_content">
                      {selectedDiscut.messages
                        .slice()
                        .reverse()
                        .map((message, index) => (
                          <div
                            className={`message ${
                              message.status === "envoyé" ? "sent" : "received"
                            }`}
                            key={index}
                          >
                            <div className="message_text">{message.text}</div>
                          </div>
                        ))}
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
                        //value={messageInput}
                        onChange={handleMessageInputChange}
                        placeholder="Tapez votre message ici..."
                      ></textarea>
                      {messageInput != "" && (
                        <div className="send-btn">
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
                    <img
                      src={`../../../../images/contacts/${selectedContact.profilePic}.jpeg`}
                      alt="tod_descr"
                    />
                  </div>
                </div>
                <div className="show_contact_desc">
                  <div className="name">{selectedContact.name}</div>
                  {/* <div className="status">status: {selectedContact.status}</div> */}
                  <div className="actu-mot">
                    <div className="phone">
                      phone: {selectedContact.phoneNumber}
                    </div>
                    <div className="actu">{selectedContact.actu}</div>
                  </div>
                  <div className="quote-callActions">
                    <div className="favorite-quote">
                      {selectedContact.favoriteQuote}
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
          </div>
        </div>
        <div className={`screen_${title}_content screen_dash_content`}>
          <SideNav />
          {title === "contacts" &&
            contacts &&
            contacts.length > 0 &&
            !selectedContact && (
              <div className="contacts">
                {contacts.map((contact: Contact) => (
                  <div
                    className={`contact chield`}
                    key={contact.id}
                    onClick={() => handleContactClick(contact)}
                  >
                    <div className="contact_pic picture">
                      <img
                        src={`../../../../images/contacts/${contact.profilePic}.jpeg`}
                        alt="tod_descr"
                      />
                    </div>
                    <div className="contact_desc description">
                      <div className="name">{contact.name}</div>
                      <div className="contact_phone_num">
                        {contact.phoneNumber}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          {title === "discuss" &&
            discuss &&
            discuss.length > 0 &&
            contacts &&
            !selectedDiscut &&
            discuss.map((discussion: Discuss) => {
              // Trouver le contact correspondant à cette discussion
              const contact = contacts.find(
                (contact: any) => contact.id === discussion.contactId
              );

              // Si le contact est trouvé, afficher les détails de la discussion
              if (contact) {
                return (
                  <div
                    className={`discut chield`}
                    key={discussion.id}
                    onClick={() => {
                      handleDiscussClick(discussion, contact);
                      //  setIsChieldSelected(contact);
                    }}
                  >
                    <div className="sender_profil picture">
                      <img
                        src={`../../../../images/contacts/${contact.profilePic}.jpeg`}
                        alt="tod_descr"
                      />
                    </div>
                    <div className="discuss_info description">
                      <div className="sender_name">{contact.name}</div>
                      <div className="last_message">
                        {reduceMessage(
                          getLastMessage(discussion.messages).text,
                          25
                        )}
                      </div>
                    </div>
                  </div>
                );
              }
            })}

          {selectedContact && (
            <div className="contact_show">
              <div className="show_profil_pic">
                <div className="picture">
                  <img
                    src={`../../../../images/contacts/${selectedContact.profilePic}.jpeg`}
                    alt="tod_descr"
                  />
                </div>
              </div>
              <div className="show_contact_desc">
                <div className="name">{selectedContact.name}</div>
                {/* <div className="status">status: {selectedContact.status}</div> */}
                <div className="actu-mot">
                  <div className="phone">
                    phone: {selectedContact.phoneNumber}
                  </div>
                  <div className="actu">{selectedContact.actu}</div>
                </div>
                <div className="quote-callActions">
                  <div className="favorite-quote">
                    {selectedContact.favoriteQuote}
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
          {selectedDiscut && selectedDiscutContact && (
            <div className="discussion_show">
              <div className="contact">
                <div className="back_action">
                  <FontAwesomeIcon icon={faArrowLeftLong} />
                </div>
                <div className="profil_pic">
                  <div className="picture">
                    <img
                      src={`../../../../images/contacts/${selectedDiscutContact.profilePic}.jpeg`}
                      alt="tod_descr"
                    />
                  </div>
                </div>
                <div className="contact-des">
                  <div className="name">{selectedDiscutContact.name}</div>
                  <div className="phone">
                    phone: {selectedDiscutContact.phoneNumber}
                  </div>
                </div>
              </div>
              <div className="discussion_block">
                <div className="discussion">
                  <div className="discussion_content">
                    {selectedDiscut.messages
                      .slice()
                      .reverse()
                      .map((message, index) => (
                        <div
                          className={`message ${
                            message.status === "envoyé" ? "sent" : "received"
                          }`}
                          key={index}
                        >
                          <div className="message_text">{message.text}</div>
                        </div>
                      ))}
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
                      //value={messageInput}
                      onChange={handleMessageInputChange}
                      placeholder="Tapez votre message ici..."
                    ></textarea>
                    {messageInput != "" && (
                      <div className="send-btn">
                        <FontAwesomeIcon icon={faPaperPlane} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
