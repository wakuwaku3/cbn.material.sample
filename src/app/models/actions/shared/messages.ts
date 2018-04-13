import { MessageLevel } from '../../../../lib/models/types';

export interface Message {
    text: string;
    level: MessageLevel;
}
export interface MessagesStore {
    messages: Message[];
}
