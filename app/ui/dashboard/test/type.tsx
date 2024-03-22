export interface Message {
  id: number;
  senderId: number;
  text: string;
  status: "envoyé" | "reçu" | "nouveau"; // Ajoutez d'autres statuts au besoin
  sentTime?: string | null;
  receivedTime?: string | null;
  read: boolean;
}

export interface Discuss {
  id: number;
  contactId: number;
  messages: Message[];
}

export interface User {
  id: number;
  name: string;
  profilePic: string;
  status: string;
  phoneNumber: string;
  actu: string;
  favoriteQuote: string;
  location: string;
  // Ajoutez d'autres champs si nécessaire
}
export interface Contact {
  id: string;
  name: string;
  profilePic: string;
  status: string;
  phoneNumber: string;
  actu: string;
  favoriteQuote: string;
  location: string;
}
