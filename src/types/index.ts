export interface SocketData {
  userId: string;
}
export interface ServerToClientEvents {
  [SC.Users]: (users: User[]) => void;
  [SC.UserConnected]: (user: User) => void;
  [SC.UserDisconnected]: (userId: string) => void;
  [SC.Message]: (message: string, from: string) => void;
  [SC.Session]: (sessionId: string, userId: string) => void;
}

export enum SC {
  Users = "users",
  UserConnected = "user connected",
  UserDisconnected = "user disconnected",
  Message = "message",
  Session = "session",
}

export interface ClientToServerEvents {
  [CS.Message]: (message: string, to: string) => void;
}

export enum CS {
  Message = "message",
}

export interface User {
  id: string;
  username: string;
  messages: Message[];
  hasNewMessages: boolean;
}

export interface Message {
  content: string;
  fromSelf: boolean;
}
