export const contacts = [
  {
    id: 1,
    name: "Maitre Gims",
    profilePic: "gims",
    status: "Available",
    phoneNumber: "+1234567890",
    actu: "Toujours en studio !",
    favoriteQuote: "La vie ne tient qu'à un fil",
    location: "Paris, France",
  },
  {
    id: 2,
    name: "Mister Fall",
    profilePic: "lefa",
    status: "Busy",
    phoneNumber: "+1987654321",
    actu: "En tournée",
    favoriteQuote: "Qui ne tente rien n'a rien",
    location: "Lille, France",
  },
  {
    id: 3,
    name: "Nomen Maes",
    profilePic: "maes",
    status: "Away",
    phoneNumber: "+1122334455",
    actu: "En vacances",
    favoriteQuote: "La vie est belle",
    location: "Bruxelles, Belgique",
  },
  {
    id: 4,
    name: "Bassa didi b",
    profilePic: "didi b",
    status: "Offline",
    phoneNumber: "+1555555555",
    actu: "Absent pour le moment",
    favoriteQuote: "Chaque jour est une nouvelle chance",
    location: "Douala, Cameroun",
  },
  {
    id: 5,
    name: "Ninho jonhy",
    profilePic: "ninho",
    status: "Available",
    phoneNumber: "+1444444444",
    actu: "Prêt pour de nouvelles collaborations",
    favoriteQuote: "La persévérance est la clé du succès",
    location: "Paris, France",
  },
];

export const discuss = [
  {
    id: 1,
    contactId: 1,
    messages: [
      {
        id: 1,
        senderId: 102,
        text: "Salut, comment ça va?",
        status: "nouveau",
        receivedTime: "2024-02-27T10:30:00",
        read: false,
      },
      {
        id: 2,
        senderId: 101,
        text: "Bonjour!",
        status: "envoyé",
        sentTime: "2024-02-27T10:35:00",
        read: true,
      },

      {
        id: 3,
        senderId: 101,
        text: "Ça va bien, merci. Et toi?",
        status: "envoyé",
        sentTime: "2024-02-27T10:40:00",
        read: false,
      },
      {
        id: 4,
        senderId: 102,
        text: "Je vais bien aussi, merci!",
        status: "reçu",
        receivedTime: "2024-02-27T10:45:00",
        read: true,
      },
      {
        id: 5,
        senderId: 101,
        text: "Qu'as-tu prévu pour aujourd'hui?",
        status: "envoyé",
        sentTime: "2024-02-27T10:50:00",
        read: true,
      },
      {
        id: 6,
        senderId: 102,
        text: "Rien de spécial, juste du travail.",
        status: "reçu",
        receivedTime: "2024-02-27T10:55:00",
        read: true,
      },
      {
        id: 7,
        senderId: 101,
        text: "Je comprends. Bonne journée!",
        status: "envoyé",
        sentTime: "2024-02-27T11:00:00",
        read: true,
      },
      {
        id: 8,
        senderId: 102,
        text: "Merci, à toi aussi!",
        status: "reçu",
        receivedTime: "2024-02-27T11:05:00",
        read: true,
      },
      {
        id: 9,
        senderId: 101,
        text: "Tu veux prendre un café demain?",
        status: "envoyé",
        sentTime: "2024-02-28T09:30:00",
        read: false,
      },
      {
        id: 10,
        senderId: 102,
        text: "Oui, ça me ferait plaisir. Où et quand?",
        status: "reçu",
        receivedTime: "2024-02-28T09:35:00",
        read: false,
      },
      // Ajoutez d'autres messages ici si nécessaire...
    ],
  },
  {
    id: 2,
    contactId: 2,
    messages: [
      {
        id: 1,
        senderId: 102,
        text: "Salut, comment ça va?",
        status: "envoyé",
        sentTime: "2024-02-28T09:00:00",
        read: true,
      },
      {
        id: 2,
        senderId: 101,
        text: "Bonjour! Ça va bien, merci. Et toi?",
        status: "reçu",
        receivedTime: "2024-02-28T09:05:00",
        read: true,
      },
      {
        id: 3,
        senderId: 102,
        text: "Je vais bien aussi. Qu'as-tu prévu pour aujourd'hui?",
        status: "envoyé",
        sentTime: "2024-02-28T09:10:00",
        read: true,
      },
      {
        id: 4,
        senderId: 101,
        text: "Rien de spécial pour l'instant. Peut-être une promenade plus tard.",
        status: "reçu",
        receivedTime: "2024-02-28T09:15:00",
        read: true,
      },
      {
        id: 5,
        senderId: 102,
        text: "Une promenade semble être une excellente idée par cette belle journée ensoleillée!",
        status: "envoyé",
        sentTime: "2024-02-28T09:20:00",
        read: true,
      },
      {
        id: 6,
        senderId: 101,
        text: "Oui, j'espère que le temps restera aussi agréable.",
        status: "reçu",
        receivedTime: "2024-02-28T09:25:00",
        read: true,
      },
      {
        id: 7,
        senderId: 102,
        text: "Au fait, as-tu entendu parler de ce nouveau café qui vient d'ouvrir en ville?",
        status: "envoyé",
        sentTime: "2024-02-28T09:30:00",
        read: true,
      },
      {
        id: 8,
        senderId: 101,
        text: "Non, je ne suis pas au courant. Tu veux le tester ensemble?",
        status: "reçu",
        receivedTime: "2024-02-28T09:35:00",
        read: true,
      },
      {
        id: 9,
        senderId: 102,
        text: "Ça pourrait être une bonne idée! On pourrait y aller cet après-midi.",
        status: "envoyé",
        sentTime: "2024-02-28T09:40:00",
        read: true,
      },
      {
        id: 10,
        senderId: 101,
        text: "D'accord, je suis partant. À quelle heure?",
        status: "reçu",
        receivedTime: "2024-02-28T09:45:00",
        read: true,
      },
    ],
  },
  {
    id: 3,
    contactId: 3,
    messages: [
      {
        id: 1,
        senderId: 102,
        text: "Salut! Tu as vu le match hier soir?",
        status: "envoyé",
        sentTime: "2024-02-29T09:00:00",
        read: true,
      },
      {
        id: 2,
        senderId: 101,
        text: "Salut! Oui, j'ai regardé. C'était incroyable!",
        status: "reçu",
        receivedTime: "2024-02-29T09:05:00",
        read: true,
      },
      {
        id: 3,
        senderId: 102,
        text: "Je sais! Cette dernière minute était folle. Quelle équipe soutiens-tu?",
        status: "envoyé",
        sentTime: "2024-02-29T09:10:00",
        read: true,
      },
      {
        id: 4,
        senderId: 101,
        text: "Je suis un grand fan de l'équipe locale. Et toi?",
        status: "reçu",
        receivedTime: "2024-02-29T09:15:00",
        read: true,
      },
      {
        id: 5,
        senderId: 102,
        text: "Je soutiens aussi l'équipe locale! Peut-être pourrions-nous aller ensemble à un prochain match?",
        status: "envoyé",
        sentTime: "2024-02-29T09:20:00",
        read: true,
      },
      {
        id: 6,
        senderId: 101,
        text: "Ça serait génial! Tiens-moi au courant des dates.",
        status: "reçu",
        receivedTime: "2024-02-29T09:25:00",
        read: true,
      },
      {
        id: 7,
        senderId: 102,
        text: "D'accord, je te tiendrai informé. Au fait, joues-tu au football?",
        status: "envoyé",
        sentTime: "2024-02-29T09:30:00",
        read: true,
      },
      {
        id: 8,
        senderId: 101,
        text: "Oui, je joue régulièrement avec des amis. Et toi?",
        status: "reçu",
        receivedTime: "2024-02-29T09:35:00",
        read: true,
      },
      {
        id: 9,
        senderId: 102,
        text: "Je joue aussi de temps en temps. Peut-être pourrions-nous organiser une partie un de ces jours!",
        status: "envoyé",
        sentTime: "2024-02-29T09:40:00",
        read: true,
      },
      {
        id: 10,
        senderId: 101,
        text: "Ça semble être une super idée! Je suis partant. Tiens-moi au courant.",
        status: "reçu",
        receivedTime: "2024-02-29T09:45:00",
        read: true,
      },
    ],
  },
  {
    id: 4,
    contactId: 4,
    messages: [
      {
        id: 1,
        senderId: 103,
        text: "Salut! As-tu suivi le discours du Premier Ministre hier soir?",
        status: "envoyé",
        sentTime: "2024-02-29T14:00:00",
        read: true,
      },
      {
        id: 2,
        senderId: 101,
        text: "Bonjour! Oui, j'ai regardé. Qu'en as-tu pensé?",
        status: "reçu",
        receivedTime: "2024-02-29T14:05:00",
        read: true,
      },
      {
        id: 3,
        senderId: 103,
        text: "Je pense qu'il a abordé des points importants, mais j'aurais aimé qu'il soit plus spécifique sur certaines questions.",
        status: "envoyé",
        sentTime: "2024-02-29T14:10:00",
        read: true,
      },
      {
        id: 4,
        senderId: 101,
        text: "Je suis d'accord. Il semble y avoir beaucoup de débats autour de ces sujets ces derniers temps.",
        status: "reçu",
        receivedTime: "2024-02-29T14:15:00",
        read: true,
      },
      {
        id: 5,
        senderId: 103,
        text: "Absolument. Les prochaines élections vont être cruciales.",
        status: "envoyé",
        sentTime: "2024-02-29T14:20:00",
        read: true,
      },
      {
        id: 6,
        senderId: 101,
        text: "Oui, j'ai hâte de voir comment les choses vont évoluer.",
        status: "reçu",
        receivedTime: "2024-02-29T14:25:00",
        read: true,
      },
      {
        id: 7,
        senderId: 103,
        text: "Es-tu impliqué d'une manière ou d'une autre dans la politique locale?",
        status: "envoyé",
        sentTime: "2024-02-29T14:30:00",
        read: true,
      },
      {
        id: 8,
        senderId: 101,
        text: "Pas directement, mais je suis intéressé par les enjeux locaux.",
        status: "reçu",
        receivedTime: "2024-02-29T14:35:00",
        read: true,
      },
      {
        id: 9,
        senderId: 103,
        text: "C'est bien d'être informé. Chaque voix compte.",
        status: "envoyé",
        sentTime: "2024-02-29T14:40:00",
        read: true,
      },
      {
        id: 10,
        senderId: 101,
        text: "Tout à fait. J'espère que nous verrons des changements positifs dans les années à venir.",
        status: "reçu",
        receivedTime: "2024-02-29T14:45:00",
        read: true,
      },
    ],
  },
  {
    id: 5,
    contactId: 5,
    messages: [
      {
        id: 1,
        senderId: 104,
        text: "Coucou mon amour! Comment s'est passée ta journée?",
        status: "envoyé",
        sentTime: "2024-02-29T18:00:00",
        read: true,
      },
      {
        id: 2,
        senderId: 101,
        text: "Salut mon chéri! Ma journée a été géniale, surtout parce que je te parle maintenant.",
        status: "reçu",
        receivedTime: "2024-02-29T18:05:00",
        read: true,
      },
      {
        id: 3,
        senderId: 104,
        text: "Tu es tellement adorable! Je suis tellement reconnaissant de t'avoir dans ma vie.",
        status: "envoyé",
        sentTime: "2024-02-29T18:10:00",
        read: true,
      },
      {
        id: 4,
        senderId: 101,
        text: "Toi aussi, tu me rends si heureuse! J'ai de la chance de t'avoir.",
        status: "reçu",
        receivedTime: "2024-02-29T18:15:00",
        read: true,
      },
      {
        id: 5,
        senderId: 104,
        text: "Je compte les secondes jusqu'à ce que je puisse te serrer dans mes bras à nouveau.",
        status: "envoyé",
        sentTime: "2024-02-29T18:20:00",
        read: true,
      },
      {
        id: 6,
        senderId: 101,
        text: "Moi aussi mon amour. Bientôt, nous serons ensemble et ce sera merveilleux.",
        status: "reçu",
        receivedTime: "2024-02-29T18:25:00",
        read: true,
      },
      {
        id: 7,
        senderId: 104,
        text: "Je t'aime plus que tout au monde!",
        status: "envoyé",
        sentTime: "2024-02-29T18:30:00",
        read: true,
      },
      {
        id: 8,
        senderId: 101,
        text: "Et moi donc! Tu es mon âme sœur.",
        status: "reçu",
        receivedTime: "2024-02-29T18:35:00",
        read: true,
      },
      {
        id: 9,
        senderId: 104,
        text: "Bonne nuit mon amour. Fais de beaux rêves.",
        status: "envoyé",
        sentTime: "2024-02-29T18:40:00",
        read: true,
      },
      {
        id: 10,
        senderId: 101,
        text: "Bonne nuit mon chéri. Je t'aime énormément!",
        status: "reçu",
        receivedTime: "2024-02-29T18:45:00",
        read: true,
      },
    ],
  },
];

export function getSender(id) {
  return contacts.find((contact) => contact.id === id);
}
export function getLastMessage(messages) {
  // Triez les messages par date d'envoi/reception
  const sortedMessages = messages.sort((a, b) => {
    const dateA = new Date(a.sentTime || a.receivedTime);
    const dateB = new Date(b.sentTime || b.receivedTime);
    return dateB - dateA; // Triez du plus récent au plus ancien
  });

  // Retournez le premier message (le plus récent)
  return sortedMessages[0];
}

export function reduceMessage(nomArticle, longueurLimite) {
  if (nomArticle.length > longueurLimite) {
    return nomArticle.substring(0, longueurLimite) + "...";
  }
  return nomArticle;
}

// Fonction de tri des messages
const sortMessagesByTime = (messages) => {
  return messages.sort((a, b) => {
    const timeA = a.sentTime || a.receivedTime;
    const timeB = b.sentTime || b.receivedTime;
    return new Date(timeA).getTime() - new Date(timeB).getTime();
  });
};
