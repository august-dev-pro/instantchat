import { Firestore, collection, addDoc, Timestamp } from "firebase/firestore";
import db from "./firebaseDatabase";

// Fonction pour ajouter des discussions à la collection "discussions"
export const addDiscussionsToFirestore = async (discussionsData: any) => {
  try {
    const discussionsCollectionRef = collection(db, "discussions");

    for (const discussion of discussionsData) {
      for (const message of discussion.messages) {
        if (message.sentTime) {
          message.sentTime = Timestamp.fromDate(new Date(message.sentTime));
        }
        if (message.receivedTime) {
          message.receivedTime = Timestamp.fromDate(
            new Date(message.receivedTime)
          );
        }
      }

      await addDoc(discussionsCollectionRef, discussion);
      console.log(`Discussion avec l'ID ${discussion.id} ajoutée avec succès.`);
    }

    console.log("Toutes les discussions ont été ajoutées avec succès.");
  } catch (error) {
    console.error("Erreur lors de l'ajout des discussions :", error);
  }
};

// Fonction pour ajouter des contacts à la collection "contacts"
export const addUsersToFirestore = async (usersData: any) => {
  try {
    const contactsCollectionRef = collection(db, "users");

    for (const user of usersData) {
      await addDoc(contactsCollectionRef, user);
      console.log(`Utilisateur ${user.name} ajouté avec succès.`);
    }

    console.log("Tous les utilisateurs ont été ajoutés avec succès.");
  } catch (error) {
    console.error("Erreur lors de l'ajout des utilisateurs :", error);
  }
};
