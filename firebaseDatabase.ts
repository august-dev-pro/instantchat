import {
  get,
  orderByChild,
  push,
  query,
  ref,
  set,
  equalTo,
  onValue,
} from "firebase/database";
import { auth, database } from "./firebaseConfig";
import { Discuss, Message, User } from "./app/ui/interfaces/interface";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { Timestamp, serverTimestamp } from "firebase/firestore/lite";
import { Elsie } from "next/font/google";

/* fonction d'inscription */
/* export async function writeUserDataContacts(userIdToUpdate: string) {
  try {
    const userId = userIdToUpdate;
    await set(ref(database, `users/${userId}/contacts`), [
      "C9mRJHaYRwRcCoQAk3EKdu3U1By2",
    ]);
    console.log("Nouvau champ contacts creer pour le utilisateur :", userId);
  } catch (error) {
    console.log(`error survienne to the pushed it is: ${error}`);
  }
} */
export async function writeUserData(
  name: string,
  email: string,
  phone: string,
  password: string
) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    const idFromAuth = user.uid;

    const userData: User = {
      username: name,
      email: email,
      phone: phone,
      contacts: [],
    };
    // Utilisation de push() pour générer un nouvel identifiant unique
    await set(ref(database, `users/${idFromAuth}`), userData);
    // Récupérer l'identifiant unique généré
    console.log("Nouvel identifiant utilisateur généré :", idFromAuth);
    window.location.assign("/login");
  } catch (error) {
    console.log(`error survienne to the pushed it is: ${error}`);
  }
}
/* fonction de connexion */
export async function signInUser(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    console.log(
      `Utilisateur connecté avec succès : uid= ${user.uid} and email=${user.email}`
    );

    window.location.assign("/");
  } catch (error: any) {
    console.error(
      `Erreur lors de la connexion de l'utilisateur: ${error.message}`
    );
  }
}

/* fonction de deconexion */
export async function SignOutUser() {
  try {
    await signOut(auth);
    window.location.assign("/");
    console.log("Utilisateur déconnecté avec succès");
  } catch (error) {
    console.error("Erreur lors de la déconnexion de l'utilisateur :", error);
  }
}
// Fonction pour lire les données utilisateur à partir de la base de données
export async function readUserData(
  userId: string | undefined
): Promise<User | null> {
  try {
    // Obtenir une référence à l'emplacement spécifié dans la base de données
    const userRef = ref(database, `users/${userId}`);

    // Lire les données à partir de cette référence
    const snapshot = await get(userRef);

    // Vérifier si des données ont été trouvées à cet emplacement
    if (snapshot.exists()) {
      // Récupérer les données lues
      const userData = snapshot.val() as User;
      return userData;
    } else {
      console.log("Aucune donnée trouvée pour cet utilisateur.");
      return null;
    }
  } catch (error) {
    console.error("Erreur lors de la lecture des données utilisateur :", error);
    return null;
  }
}
//fonction listen des données du user
export const listenForUserData = (
  setNewsData: any,
  userId: any,
  setUserContacts?: any
) => {
  const unsubscribe = onValue(
    ref(database, `users/${userId}`),
    async (snapshot) => {
      try {
        const discussions = await readUserData(userId);
        setNewsData(discussions);
        if (setUserContacts) {
          const userContacts = await getUserContacts(userId);
          setUserContacts(userContacts);
        }
        console.log("Données mises à jour en temps réel :", discussions);
      } catch (error: any) {
        console.error(
          "Erreur lors de la récupération des discussions en temps réel :",
          error.message
        );
      }
    }
  );
  // Retourne la fonction pour arrêter l'écoute des modifications en temps réel
  return unsubscribe;
};
/* fonction de recuperatuion du user connecter */

export const useRequireAuth = () => {
  const user = getAuth().currentUser;

  useEffect(() => {
    if (!user) {
      window.location.assign("/login");
    }
  }, [user]);

  return user;
};
export const userIsAuth = () => {
  const user = getAuth().currentUser;

  useEffect(() => {
    if (user) {
      window.location.assign("/");
    }
  }, [user]);
  return user;
};

export async function writeMessage(message: Message, discussId: string) {
  try {
    const messageRef = ref(database, `discussions/${discussId}/messages`);
    // Push le nouveau message
    const newMessageRef = await push(messageRef, message);

    // Récupérer l'ID généré du message
    const messageId = newMessageRef.key;
    console.log(
      `message créée avec succès. ID : ${messageId} dans la discussion id: ${discussId}`
    );
  } catch (error: any) {
    console.error(
      `Une erreur est survenue lors de la création du message : ${error.message}`
    );
  }
}

export async function sendMessage(
  senderId: string,
  messageContent: string,
  discussId: string
) {
  const message: Message = {
    senderId: senderId,
    content: messageContent,
    writeDate: Timestamp.now().toDate().toDateString(),
    writeTime: Timestamp.now().toDate().toTimeString(),
  };
  try {
    await writeMessage(message, discussId);
    console.log(
      `date de creation: ${message.writeDate} à ${message.writeTime}`
    );
  } catch (error) {
    console.log(`erreur survenu: ${error}`);
  }
}

export async function createDiscussion(
  currentUserId: string,
  otherUserId: string
) {
  try {
    const discussAuthors: Discuss = {
      participants: {
        user1Id: currentUserId,
        user2Id: otherUserId,
      },
      message: [],
    };
    // Push la nouvelle discussion dans la base de données
    const newDiscussionRef = await push(
      ref(database, "discussions"),
      discussAuthors
    );

    // Récupérer l'ID généré de la discussion
    const discussionId = newDiscussionRef.key;

    console.log(`Discussion créée avec succès. ID : ${discussionId}`);
  } catch (error: any) {
    console.error(
      `Une erreur est survenue lors de la création de la discussion : ${error.message}`
    );
  }
}

// fonction pour recuperer les dicussion d'un utilisateur
/* async function getDiscuss(): Promise<any[]> {
  try {
    const discussionsRef = ref(database, "discussions");

    const userDiscussSnapshot = await get(discussionsRef);

    const anyiscuss: { id: string; discuss: any }[] = [];

    userDiscussSnapshot.forEach((childSnapshot) => {
      const discussId = childSnapshot.key;
      const discussData = childSnapshot.val();
      anyiscuss.push({ id: discussId, ...discussData });
    });

    return anyiscuss;
  } catch (error: any) {
    console.error(
      `Erreur lors de la récupération des discussions : ${error.message}`
    );
    return [];
  }
} */

export async function getDiscuss(): Promise<any[]> {
  try {
    const discussionsRef = ref(database, "discussions");

    const userDiscussSnapshot = await get(discussionsRef);

    const discussionsWithMessages: any[] = [];

    userDiscussSnapshot.forEach((discussionSnapshot) => {
      const discussionId = discussionSnapshot.key;
      const discussionData = discussionSnapshot.val();

      const messagesArray: any[] = [];

      // Convertir les messages en tableau d'objets avec id inclus
      Object.keys(discussionData.messages).forEach((messageId) => {
        const messageData = discussionData.messages[messageId];
        messagesArray.push({ id: messageId, ...messageData });
      });

      const discuss = {
        id: discussionId, // Ajout de l'ID de la discussion
        participants: discussionData.participants,
        messages: messagesArray,
      };

      discussionsWithMessages.push(discuss);
    });

    return discussionsWithMessages;
  } catch (error: any) {
    console.error(
      `Erreur lors de la récupération des discussions avec messages : ${error.message}`
    );
    return [];
  }
}

// fonction pour recuperer les utilisateur
export async function getUsers(): Promise<any[]> {
  try {
    // Référence à la liste des discussions
    const usersRef = ref(database, "users");

    // Exécution de la requête
    const userSnapshot = await get(usersRef);

    const userList: { id: string; user: any }[] = [];
    // Parcourir les résultats et les ajouter à la liste
    userSnapshot.forEach((childSnapshot) => {
      const userId = childSnapshot.key;
      const userData = childSnapshot.val();
      userList.push({ id: userId, ...userData });
    });
    return userList;
  } catch (error: any) {
    console.error(
      `Erreur lors de la récupération des users : ${error.message}`
    );
    return [];
  }
}

/* export async function getUserContacts(userId: string | undefined) {
  try {
    const users = await getUsers();
    const userContact = users.filter((user) => user.id != userId);

    console.log(`les contact de l'utilisateur sont ${userContact.length}`);
    return userContact;
  } catch (error) {
    console.log(
      `erreur lors de la recuperation des contacts du user ${userId}:`,
      error
    );
  }
} */

export async function getUserContacts(userId: string | undefined) {
  try {
    const users = await getUsers();
    // Si l'ID de l'utilisateur est défini
    if (userId) {
      // Recherchez l'utilisateur correspondant à l'ID spécifié
      const user = users.find((user) => user.id === userId);

      // Si l'utilisateur est trouvé et qu'il a des contacts
      if (user && user.contacts) {
        // Récupérer les IDs des contacts de l'utilisateur
        const userContactIds = user.contacts;

        // Filtrer les utilisateurs en fonction des IDs des contacts de l'utilisateur
        const userContacts = users.filter((user) =>
          userContactIds.includes(user.id)
        );

        console.log(
          `Les contacts de l'utilisateur sont ${userContacts.length}`
        );
        return userContacts;
      } else {
        console.log("L'utilisateur n'a pas de contacts.");
        return [];
      }
    } else {
      console.log("ID utilisateur non défini.");
      return [];
    }
  } catch (error) {
    console.log(
      `Erreur lors de la récupération des contacts de l'utilisateur ${userId}:`,
      error
    );
    return [];
  }
}

export async function getUserDiscuss(
  userId: string | null
): Promise<any | null> {
  try {
    const discuss = await getDiscuss();
    const userDiscuss = discuss.filter(
      (discussion) =>
        discussion.participants.user1Id === userId ||
        discussion.participants.user2Id === userId
    );
    if (userDiscuss.length === 0) {
      console.log(
        `ce utilisateur n'a aucune discussion pour le moment, id: ${userId}`
      );
      return userDiscuss;
    }
    console.log(`les dicussion de l'utilisateur sont ${userDiscuss.length}`);
    return userDiscuss;
  } catch (error) {
    console.log(
      `erreur lors de la recuperation des discussion du user ${userId}:`,
      error
    );
  }
}

/* export const listenForDiscussions = (setNewsData: any) => {
  const discussionsRef = ref(database, "discussions");

  const unsubscribe = onValue(discussionsRef, (snapshot) => {
    const discussions = snapshot.val();
    setNewsData(discussions);
    console.log("Données mises à jour en temps réel :", discussions);
    // Mettre à jour l'interface utilisateur avec les nouvelles discussions
    // Par exemple, vous pouvez mettre à jour l'état discuss avec les nouvelles discussions ici
  });

  // Retourne la fonction pour arrêter l'écoute des modifications en temps réel
  return unsubscribe;
}; */

// Ne modifiez pas la fonction listenForDiscussions

export const listenForDiscussions = (
  setNewsData: any,
  userId: any,
  setIsLoaded: any
) => {
  const unsubscribe = onValue(
    ref(database, "discussions"),
    async (snapshot) => {
      try {
        const discussions = await getDiscuss();
        const userDiscussions = discussions.filter(
          (discussion: any) =>
            discussion.participants.user1Id === userId ||
            discussion.participants.user2Id === userId
        );

        if (userDiscussions.length > 0) {
          setNewsData(userDiscussions);
          setIsLoaded(false);
        } else if (userDiscussions.length === 0) {
          setIsLoaded(true);
        }
        setIsLoaded(false);
        console.log("Données mises à jour en temps réel :", userDiscussions);
        // console.log("snapshot snapshot :", snapshot);
      } catch (error: any) {
        console.error(
          "Erreur lors de la récupération des discussions en temps réel :",
          error.message
        );
      }
    }
  );
  // Retourne la fonction pour arrêter l'écoute des modifications en temps réel
  return unsubscribe;
};

/* export const listenForDiscussions = (setNewsData: any) => {
  const discussionsRef = ref(database, "discussions");

  const unsubscribe = onValue(discussionsRef, (snapshot) => {
    const discussionsData = snapshot.val();
    if (!discussionsData) return;
    const userDiscussions = Object.values(discussionsData).filter(
      (discussion: any) =>
        discussion.participants.user1Id === userId ||
        discussion.participants.user2Id === userId
    );

    setNewsData(discussionsData);
    console.log("Discussions de l'utilisateur mises à jour :", discussionsData);
  });

  return unsubscribe;
}; */

//add new contacts
export async function addNewContact(userId: string, contactId: string) {
  try {
    // Récupérer la liste actuelle des contacts
    const contactsRef = ref(database, `users/${userId}/contacts`);
    const contactsSnapshot = await get(contactsRef);
    if (contactsSnapshot.exists()) {
      const currentContacts = contactsSnapshot.val();

      // Ajouter le nouveau contact localement
      const updatedContacts = [...currentContacts, contactId];

      // Mettre à jour le tableau complet dans la base de données avec la nouvelle liste
      await set(ref(database, `users/${userId}/contacts`), updatedContacts);

      console.log("Nouveau contact ajouté avec succès :", contactId);
    } else {
      // Si aucun contact existant, créer une nouvelle liste avec le nouveau contact
      await set(ref(database, `users/${userId}/contacts`), [contactId]);

      console.log("Premier contact ajouté avec succès :", contactId);
    }
  } catch (error) {
    console.error(
      "Une erreur s'est produite lors de l'ajout du nouveau contact :",
      error
    );
  }
}
