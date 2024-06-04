export interface User {
  username: string;
  email: string;
  phone: string;
  contacts: string[];
}

export interface Message {
  senderId: string;
  content: string;
  files?: any[];
  writeDate: any;
  writeTime: any;
  read: boolean;
}

export interface Discuss {
  participants: {
    user1Id: string;
    user2Id: string;
  };
  message: Message[];
}
