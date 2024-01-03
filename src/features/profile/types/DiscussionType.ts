export type MessageType = {
    text: string;
    user: string;
    date: string;
}

export type DiscussionType = {
    to: string;
    product: string;
    messages: MessageType[]
}