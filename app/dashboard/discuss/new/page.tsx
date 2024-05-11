"use client";
import "@/app/ui/dashboard/components/dashSquelette.css";
import {
  createDiscussIfNotExists,
  getUserContacts,
  listenForUserData,
  readUserData,
} from "@/firebaseDatabase";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getAuth } from "firebase/auth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [contacts, setUserContacts] = useState<any>(null);
  const [userData, setUserData] = useState<any>([]);
  const [search, setsearch] = useState("");
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth?.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        const userData = await readUserData(user.uid);
        const userCts = await getUserContacts(user.uid);
        setUserContacts(userCts);
        setUserData(userData);
      } else {
        setUser(null);
        setUserData(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleStartNewDiscuss = async (
    userId: string,
    friendUserId: string
  ) => {
    try {
      const discussion = await createDiscussIfNotExists(userId, friendUserId);
      if (discussion) {
        window.location.assign(`/discuss/${discussion.id}`);
      }
    } catch (error) {
      console.log("erreur lors de la creation de la discussion:", error);
    }
  };

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setsearch(event.target.value); // Mettre à jour le contenu de la zone de saisie de message
  };

  return (
    <div className="addNewContactModale">
      <div className="contacts_suc">
        <div className="sec_header">
          <FontAwesomeIcon icon={faArrowLeft} />
          <div className="titlte">Nouvelle Discussion</div>
        </div>

        <div className="contacts">
          <div className="search_input">
            <input
              type="text"
              className="search_user_input"
              value={search}
              onChange={handleSearchInputChange}
              placeholder="rechercher un nom ou un contact"
            />
          </div>
          {contacts && (
            <div className="conts">
              {contacts?.map((contact: any, index: number) => (
                <div
                  className="contact"
                  key={index}
                  onClick={() => {
                    handleStartNewDiscuss(user.uid, contact.id);
                  }}
                >
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
                      <div className="contact_name">{contact.username}</div>
                      <div className="phone">{contact.phone}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {contacts?.length === 0 && (
            <div className="message contact">Vous n'avez aucun contact</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
