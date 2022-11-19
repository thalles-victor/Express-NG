export interface SendProps {
  topic: string;
  message: string;
}

export interface IMessagingContract {
  sendMessage(data: SendProps): Promise<void>;
}