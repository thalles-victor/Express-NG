import { IMessagingContract, SendProps } from "./core/IMessagingContract";
import { producer } from "./producer";


export class KafkaMessaging implements IMessagingContract {
  async sendMessage({ message, topic }: SendProps) {
    await producer.send({
      topic,
      messages: [
        { value: JSON.stringify(message) }
      ]
    })
  }
}