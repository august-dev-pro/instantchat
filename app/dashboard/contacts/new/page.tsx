"use client";
import {
  addNewContact,
  getUsers,
  readUserData,
  reduceMessage,
} from "@/firebaseDatabase";
import { faArrowLeft, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getAuth } from "firebase/auth";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [successContact, setSuccessContact] = useState<any[]>([]); // Utilisez un tableau pour stocker les contacts
  const [search, setsearch] = useState("");
  const [user, setUser] = useState<any | null>(null);
  const [userData, setUserData] = useState<any>([]);

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setsearch(event.target.value); // Mettre à jour le contenu de la zone de saisie de message
  };

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth?.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        const userData = await readUserData(user.uid);
        setUserData(userData);
      } else {
        setUser(null);
        setUserData(null);
      }
    });
    return () => unsubscribe();
  }, []);

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

  //add new contact
  const handleAddNewContact = async (userId: string, contactId: string) => {
    try {
      console.log("userId: ", userId);
      await addNewContact(userId, contactId);
      console.log("le contact a bien ete ajouter");
    } catch (error) {
      console.error("Erreur lors de l'enregistrement du contact :", error);
    }
  };

  return (
    <div className="addNewContactModale">
      <div className="contacts_suc">
        <div className="sec_header">
          <FontAwesomeIcon icon={faArrowLeft} />
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
            </div>
            {successContact.map((contact: any, index: number) => {
              if (
                contact.id !== user.uid &&
                !userData?.contacts?.find(
                  (elemnt: any) => elemnt === contact.id
                )
              ) {
                return (
                  <div className="contact" key={index}>
                    <div className="description">
                      <div className="contact_profil_pic">
                        <Image
                          src={"/images/contacts/maes.jpeg"}
                          alt="profil"
                          height={500}
                          width={500}
                        />
                      </div>
                      <div className="contact_des">
                        <div className="contact_name">
                          {reduceMessage(contact.username, 20)}
                        </div>
                        <div className="phone">
                          {reduceMessage(contact.phone, 17)}
                        </div>
                      </div>
                    </div>
                    <div
                      className="add"
                      onClick={() => {
                        handleAddNewContact(user.uid, contact.id);
                      }}
                    >
                      ajouter <FontAwesomeIcon icon={faPlus} />
                    </div>
                  </div>
                );
              }
              return null;
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
