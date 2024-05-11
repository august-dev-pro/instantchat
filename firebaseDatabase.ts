import {
  get,
  orderByChild,
  push,
  query,
  ref,
  set,
  equalTo,
  onValue,
  update,
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
import { boolean } from "zod";

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
    window.location.assign("/dashboard");
  } catch (error: any) {
    const errorMessage = error.message;
    console.error(
      `Erreur lors de la connexion de l'utilisateur: ${errorMessage}`
    );
    return errorMessage;
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
): Promise<any | null> {
  try {
    // Obtenir une référence à l'emplacement spécifié dans la base de données
    const userRef = ref(database, `users/${userId}`);

    // Lire les données à partir de cette référence
    const snapshot = await get(userRef);

    // Vérifier si des données ont été trouvées à cet emplacement
    if (snapshot.exists()) {
      // Récupérer les données lues
      const userData = snapshot.val() as User;
      const userDataCompleted = {
        id: userId,
        ...userData,
      };
      return userDataCompleted;
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
  setNewsData: any | null,
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
        console.log(
          "Données mises à jour en temps réel :",
          discussions,
          snapshot
        );
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

export async function writeMessage(message: Message, discussId: any) {
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
    read: false,
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

// Fonction pour vérifier si une discussion existe déjà entre deux utilisateurs
export function isDiscussionExists(
  discussions: any[],
  userId1: string,
  userId2: string
) {
  return discussions.find(
    (discussion) =>
      (discussion.participants.user1Id === userId1 &&
        discussion.participants.user2Id === userId2) ||
      (discussion.participants.user1Id === userId2 &&
        discussion.participants.user2Id === userId1)
  );
}

/* export async function createDiscuss(
  currentUserId: string,
  otherUserId: string
): Promise<Discuss | null> {
  try {
    const welcomeMessage: Message = {
      senderId: "RVyciryyrNbtHDFUhvZSr1RxHKz1",
      content: "Bienvenue dans votre nouvel discussion",
      writeDate: Timestamp.now().toDate().toDateString(),
      writeTime: Timestamp.now().toDate().toTimeString(),
    };
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

    // Créer un objet Discussion avec l'ID généré et les autres informations
    const newDiscussion = {
      id: discussionId,
      ...discussAuthors,
    };

    // Retourner la nouvelle discussion
    return newDiscussion;
  } catch (error: any) {
    console.error(
      `Une erreur est survenue lors de la création de la discussion : ${error.message}`
    );
    return null; // En cas d'erreur, retourner null
  }
} */

export async function createDiscuss(
  currentUserId: string,
  otherUserId: string
): Promise<Discuss | null> {
  try {
    const discussAuthors: Discuss = {
      participants: {
        user1Id: currentUserId,
        user2Id: otherUserId,
      },
      message: [],
    };

    // Pousser la nouvelle discussion dans la base de données
    const newDiscussionRef = await push(
      ref(database, "discussions"),
      discussAuthors
    );

    // Récupérer l'ID généré de la discussion
    const discussionId = newDiscussionRef.key;

    console.log(`Discussion créée avec succès. ID : ${discussionId}`);

    // Créer un objet Discussion avec l'ID généré et les autres informations
    const newDiscussion = {
      id: discussionId,
      ...discussAuthors,
    };

    // Envoyer un message de bienvenue
    const welcomeMessage: Message = {
      senderId: "system", // Un identifiant spécial pour les messages du système
      content: "Bienvenue dans votre nouvelle discussion !", // Contenu du message de bienvenue
      writeDate: new Date().toDateString(), // Date d'écriture du message
      writeTime: new Date().toTimeString(), // Heure d'écriture du message
      read: true,
    };

    // Ajouter le message de bienvenue à la discussion
    await writeMessage(welcomeMessage, discussionId);

    // Retourner la nouvelle discussion
    return newDiscussion;
  } catch (error: any) {
    console.error(
      `Une erreur est survenue lors de la création de la discussion : ${error.message}`
    );
    return null; // En cas d'erreur, retourner null
  }
}
// Fonction pour créer une nouvelle discussion si elle n'existe pas déjà
export async function createDiscussIfNotExists(
  currentUserId: string,
  otherUserId: string
) {
  try {
    const discussions = await getDiscuss();
    const discuss = isDiscussionExists(discussions, currentUserId, otherUserId);
    if (!discuss) {
      const newDiscuss = await createDiscuss(currentUserId, otherUserId);
      //setSelectedDiscuss(newDiscuss);
      return newDiscuss;
    } else {
      // setSelectedDiscuss(discuss);
      return discuss;
    }
  } catch (error: any) {
    console.error(
      `Erreur lors de la création ou de la vérification de la discussion : ${error.message}`
    );
    throw error;
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

      // Vérifier si la propriété messages existe et est définie
      if (discussionData.messages) {
        // Convertir les messages en tableau d'objets avec id inclus
        Object.keys(discussionData.messages).forEach((messageId) => {
          const messageData = discussionData.messages[messageId];
          messagesArray.push({ id: messageId, ...messageData });
        });
      }

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
/* export async function getDiscut(id: string): Promise<any> {
  try {
    const discussionRef = ref(database, `discussions/${id}`);

    const discutSnapshot = await get(discussionRef);

    const discussionsWithMessages: any[] = [];

    const discussionId = discutSnapshot.key;
    const discussionData = discutSnapshot.val();

    const messagesArray: any[] = [];

    // Vérifier si la propriété messages existe et est définie
    if (discussionData.messages) {
      // Convertir les messages en tableau d'objets avec id inclus
      Object.keys(discussionData.messages).forEach((messageId) => {
        const messageData = discussionData.messages[messageId];
        messagesArray.push({ id: messageId, ...messageData });
      });
    }

    const discuss = {
      id: discussionId, // Ajout de l'ID de la discussion
      participants: discussionData.participants,
      messages: messagesArray,
    };

    discussionsWithMessages.push(discuss);

    return discussionsWithMessages;
  } catch (error: any) {
    console.error(
      `Erreur lors de la récupération des discussions avec messages : ${error.message}`
    );
    return [];
  }
} */
export async function getDiscut(id: string): Promise<any> {
  try {
    const discussionRef = ref(database, `discussions/${id}`);
    const discutSnapshot = await get(discussionRef);

    if (!discutSnapshot.exists()) {
      throw new Error(`La discussion avec l'ID ${id} n'existe pas.`);
    }

    const discussionId = discutSnapshot.key;
    const discussionData = discutSnapshot.val();

    const discuss = {
      id: discussionId,
      participants: discussionData.participants,
      messages: discussionData.messages || [], // Assurez-vous qu'il y a toujours un tableau de messages
    };

    return discuss;
  } catch (error: any) {
    console.error(
      `Erreur lors de la récupération de la discussion : ${error.message}`
    );
    return null;
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
        console.log("user contact id: ", JSON.stringify(userContactIds));

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

/* export const listenForDiscussions = (
  setNewsData: any,
  userId: any,
  setIsLoaded: any,
  selectedDiscut: any,
  setSelectedDiscuss: any
) => {
  //console.log(`selected discut:`, selectedDiscut);
  const discussionsRef = ref(database, "discussions");
  const unsubscribe = onValue(discussionsRef, async (snapshot) => {
    try {
      const discussions = await getDiscuss();
      const userDiscussions = discussions.filter(
        (discussion: any) =>
          discussion.participants.user1Id === userId ||
          discussion.participants.user2Id === userId
      );

      if (userDiscussions.length > 0) {
        if (selectedDiscut) {
          // Marquer tous les messages de la discussion comme lus
          // console.log(`selected discut:`, selectedDiscut);
          selectedDiscut.messages.forEach(async (message: any) => {
            if (message && !message.read && message.senderId !== userId) {
              await markMessagesAsRead(selectedDiscut.id, message.id, userId);
            }
          });

          const newSelectedDiscuss = userDiscussions.find(
            (discuss: any) => discuss.id === selectedDiscut.id
          );
          setSelectedDiscuss(newSelectedDiscuss);
        }

        setNewsData(userDiscussions);
        setIsLoaded(false);
      } else if (userDiscussions.length === 0) {
        setIsLoaded(true);
      }
      setIsLoaded(false);
      console.log(
        "Données mises à jour en temps réel :",
         discussions
      );
      // console.log("snapshot snapshot :", snapshot);
    } catch (error: any) {
      console.error(
        "Erreur lors de la récupération des discussions en temps réel :",
        error.message
      );
    }
  });
  // Retourne la fonction pour arrêter l'écoute des modifications en temps réel
  return unsubscribe;
}; */

export const listenForDiscussions = (
  setNewsData: any,
  userId: any,
  setIsLoaded: any
) => {
  const discussionsRef = ref(database, "discussions");
  const unsubscribe = onValue(discussionsRef, async (snapshot) => {
    try {
      const discussions = await getDiscuss();
      const userDiscussions = discussions.filter(
        (discussion: any) =>
          discussion.participants.user1Id === userId ||
          discussion.participants.user2Id === userId
      );

      if (userDiscussions.length > 0) {
        // Mettre à jour les données de discussion et le statut de chargement
        setNewsData(userDiscussions);
        setIsLoaded(false);
      } else {
        setIsLoaded(true);
      }

      console.log("Données mises à jour en temps réel :", discussions);
    } catch (error: any) {
      console.error(
        "Erreur lors de la récupération des discussions en temps réel :",
        error.message
      );
    }
    /* console.log("selected discuss", selectedDiscut, "user:", userId);
    setIsLoaded(false); */
  });

  return unsubscribe;
};

export const listenForDiscussion = (
  setDiscussionData: any,
  discussionId: any,
  userId: any,
  setIsLoaded: any
) => {
  const discussionRef = ref(database, `discussions/${discussionId}`);
  const unsubscribe = onValue(discussionRef, async (snapshot) => {
    try {
      const discussion = snapshot.val();
      if (discussion) {
        // Vérifier si l'utilisateur est impliqué dans cette discussion
        if (
          discussion.participants.user1Id === userId ||
          discussion.participants.user2Id === userId
        ) {
          // Mettre à jour les données de discussion et le statut de chargement
          setDiscussionData(discussion);
          setIsLoaded(false);
        } else {
          console.log(
            "L'utilisateur n'est pas autorisé à accéder à cette discussion."
          );
          setIsLoaded(true);
        }
      } else {
        console.log("Discussion introuvable.");
        setIsLoaded(true);
      }
    } catch (error: any) {
      console.error(
        "Erreur lors de la récupération de la discussion en temps réel :",
        error.message
      );
    }
  });

  return unsubscribe;
};

export const listenForUser = (
  userId: string,
  setSelectedDiscutContact: any
) => {
  const usersRef = ref(database, "users");
  const unsubscribe = onValue(usersRef, async (snapshot) => {
    try {
      const usersData = snapshot.val();
      if (!usersData) {
        console.log("Aucun utilisateur trouvé.");
        return;
      }

      // Filtrer les utilisateurs pour exclure l'utilisateur actuel
      const user = Object.values(usersData).find(
        (user: any) => user.userId === userId
      );
      setSelectedDiscutContact(user);
      console.log("Utilisateur récupérés en temps réel :", user);
    } catch (error: any) {
      console.error(
        "Erreur lors de la récupération des utilisateurs en temps réel :",
        error.message
      );
    }
  });

  return unsubscribe;
};

//add new contacts
export async function addNewContact(userId: string, contactId: string) {
  try {
    // Récupérer la liste actuelle des contacts
    const contactsRef = ref(database, `users/${userId}/contacts`);
    const contactsSnapshot = await get(contactsRef);
    if (contactsSnapshot.exists()) {
      const currentContacts = contactsSnapshot.val();

      // Filtrer les éléments vides du tableau currentContacts
      const filteredContacts = currentContacts.filter(
        (contact: any) => contact
      );

      // Ajouter le nouveau contact localement
      const updatedContacts = [...filteredContacts, contactId];
      console.log("update contacts array :", filteredContacts);

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

// Fonction pour ajouter le champ 'read' à tous les messages
/* export async function addReadFieldToMessages(): Promise<void> {
  try {
    // Récupérer toutes les discussions depuis la base de données
    const discussionsRef = ref(database, "discussions");
    const discussionsSnapshot = await get(discussionsRef);

    discussionsSnapshot.forEach((discussionSnapshot) => {
      const messagesRef = ref(
        database,
        `discussions/${discussionSnapshot.key}/messages`
      );

      async () => {
        const MessagesSnapshot = await get(messagesRef);

        MessagesSnapshot.forEach((messageSnapshot) => {
          const messageRef = ref(
            database,
            `discussions/${discussionSnapshot.key}/messages/${messageSnapshot.key}`
          );
          const readValue = true;
          update(messageRef, { read: readValue })
            .then(() => {
              console.log(
                `Le champ 'read' a été ajouté au message avec ID ${messageSnapshot.key} et la valeur est ${readValue}`
              );
            })
            .catch((error) => {
              console.error(
                `Une erreur s'est produite lors de la mise à jour du message avec ID ${messageSnapshot.key} :`,
                error
              );
            });
        });
      };
    });
  } catch (error) {
    console.error(
      "Une erreur s'est produite lors de l'ajout du champ 'read' aux messages :",
      error
    );
  }
} */

// Fonction pour ajouter le champ 'read' à tous les messages
/* export async function addReadFieldToMessagess(): Promise<void> {
  try {
    // Récupérer toutes les discussions depuis la base de données
    const discussionsRef = ref(database, "discussions");
    const discussionsSnapshot = await get(discussionsRef);

    for (const discussionSnapshot of discussionsSnapshot) {
      const messagesRef = ref(
        database,
        `discussions/${discussionSnapshot.key}/messages`
      );

      const messagesSnapshot = await get(messagesRef);

      for (const messageSnapshot of messagesSnapshot) {
        const messageRef = ref(
          database,
          `discussions/${discussionSnapshot.key}/messages/${messageSnapshot.key}`
        );
        const readValue = true;
        await update(messageRef, { read: readValue });
        console.log(
          `Le champ 'read' a été ajouté au message avec ID ${messageSnapshot.key} et la valeur est ${readValue}`
        );
      }
    }
  } catch (error) {
    console.error(
      "Une erreur s'est produite lors de l'ajout du champ 'read' aux messages :",
      error
    );
  }
} */

// Fonction pour ajouter le champ 'read' à tous les messages
export async function addReadFieldToMessages(): Promise<void> {
  try {
    // Récupérer toutes les discussions depuis la base de données
    const discussionsRef = ref(database, "discussions");
    const discussionsSnapshot = await get(discussionsRef);

    discussionsSnapshot.forEach((discussionSnapshot) => {
      const messagesRef = ref(
        database,
        `discussions/${discussionSnapshot.key}/messages`
      );

      get(messagesRef).then(async (messagesSnapshot) => {
        messagesSnapshot.forEach((messageSnapshot) => {
          const messageRef = ref(
            database,
            `discussions/${discussionSnapshot.key}/messages/${messageSnapshot.key}`
          );
          const readValue = true;
          update(messageRef, { read: readValue })
            .then(() => {
              console.log(
                `Le champ 'read' a été ajouté au message avec ID ${messageSnapshot.key} et la valeur est ${readValue}`
              );
            })
            .catch((error) => {
              console.error(
                `Une erreur s'est produite lors de la mise à jour du message avec ID ${messageSnapshot.key} :`,
                error
              );
            });
        });
      });
    });
  } catch (error) {
    console.error(
      "Une erreur s'est produite lors de l'ajout du champ 'read' aux messages :",
      error
    );
  }
}

export function countUnreadMessages(messages: any[], userId: string): number {
  return messages.reduce((unreadCount, message) => {
    // Vérifier si le message n'a pas été lu par l'utilisateur
    if (message.senderId !== userId && message.read === false) {
      unreadCount++;
    }
    return unreadCount;
  }, 0);
}

export function reduceMessage(
  nomArticle: string,
  longueurLimite: number,
  noFull?: boolean
): string {
  if (nomArticle.length > longueurLimite && noFull) {
    return nomArticle.slice(0, longueurLimite);
  } else if (nomArticle.length > longueurLimite) {
    return nomArticle.slice(0, longueurLimite) + "...";
  } else {
    return nomArticle;
  }
}

/* export async function markMessagesAsReadee(
  discussionId: string,
  messageId: string
): Promise<void> {
  try {
    const messageRef = ref(
      database,
      `discussions/${discussionId}/messages/${messageId}`
    );
    await update(messageRef, { read: true });
    console.log(`Le message avec l'ID ${messageId} a été marqué comme lu.`);
  } catch (error) {
    console.error(
      `Une erreur s'est produite lors du marquage du message comme lu :`,
      error
    );
  }
} */

export async function markMessagesAsRead(
  discussionId: string,
  messageId: string,
  currentUserId: string
): Promise<void> {
  try {
    const messageRef = ref(
      database,
      `discussions/${discussionId}/messages/${messageId}`
    );

    // Récupérer les données du message
    const messageSnapshot = await get(messageRef);
    const messageData = messageSnapshot.val();

    // Vérifier si le message existe et n'est pas déjà lu et si l'utilisateur actuel n'est pas l'auteur du message
    // Vérifier si le message existe et n'est pas déjà lu et si l'utilisateur actuel n'est pas l'auteur du message

    await update(messageRef, { read: true });
    console.log(`Le message avec l'ID ${messageId} a été marqué comme lu.`);
  } catch (error) {
    console.error(
      `Une erreur s'est produite lors du marquage du message comme lu :`,
      error
    );
  }
}

export async function addStatusToUser(userId: string, lineValue: string) {
  const userStatus = {
    status: lineValue,
  };
  try {
    update(ref(database, `users/${userId}`), userStatus);
    console.log(`Status added to the user: ${userId} successfully.`);
  } catch (error) {
    console.error("Error occurred while adding status to the user:", error);
  }
}
