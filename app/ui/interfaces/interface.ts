export interface User {
  username: string;
  email: string;
  phone: string;
  contacts: string[];
}

export interface Message {
  senderId: string;
  content: string;
  writeDate: any;
  writeTime: any;
<<<<<<< HEAD
  read: boolean;
=======
>>>>>>> 9937075649020d8a8c8b604984dfa54dac61ec43
}

export interface Discuss {
  participants: {
    user1Id: string;
    user2Id: string;
  };
  message: Message[];
}
