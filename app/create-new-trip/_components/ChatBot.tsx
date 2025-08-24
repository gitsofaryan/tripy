"use client"
import React, { useState } from 'react'
import axios from 'axios'
import { Textarea } from "@/components/ui/textarea"
import { Button } from '@/components/ui/button'
import { Loader, Send } from 'lucide-react'
import EmptyBoxState from '@/app/_components/EmptyBoxState'
export default function ChatBot() {

    type Message = {
        role: String,
        content: String
    }
    const [messages, setMessages] = useState<Message[]>([]);
    const [userInput, setUserInput] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const onSend = async () => {
        if (!userInput?.trim()) return;

        setUserInput('')
        setLoading(true);
        const newMsg: Message = {
            role: 'user',
            content: userInput
        }

        setMessages((prev: Message[]) => [...prev, newMsg]);

        try {
            const result = await axios.post('/api/aimodel', {
                messages: [...messages, newMsg]
            });

            if (result.data?.error) {
                console.error('API Error:', result.data.error);
                setMessages((prev: Message[]) => [...prev, {
                    role: 'assistant',
                    content: `Sorry, I encountered an error: ${result.data.error}`
                }]);
                return;
            }

            setMessages((prev: Message[]) => [...prev, {
                role: 'assistant',
                content: result?.data?.resp || 'Sorry, I didn\'t receive a proper response.'
            }]);
            console.log(result?.data);
        } catch (error) {
            console.error('Request failed:', error);
            setMessages((prev: Message[]) => [...prev, {
                role: 'assistant',
                content: 'Sorry, I\'m having trouble connecting. Please try again.'
            }]);
        } finally {
            setLoading(false);
        }
    }

    return (

        <div className='h-[80vh] flex flex-col'>
            {/* Chatbox UI */}
            {messages?.length==0&&
            <EmptyBoxState onSelectOption={(v:string)=>{setUserInput(v); onSend()}}/>}
            <section className='flex-1 overflow-y-auto p-4'>
                {messages.map((msg: Message, index)=>(
                    msg.role=='user' ? (
                        <div className="flex justify-end mt-2" key={index}>
                            <div className="max-w-lg bg-primary text-white px-4 py-2 rounded-lg">
                                {msg.content}
                            </div>
                        </div>
                    ) : (
                        <div className="flex justify-start mt-2" key={index}>
                            <div className="max-w-lg bg-gray-100 text-text-black px-4 py-2 rounded-lg">
                                {loading?<Loader className='animate-spin'/>: msg.content}
                            </div>
                        </div>
                    )
                ))}
               
            </section>

            <section className=''>
                <div className='relative border rounded-2xl p-4'>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        onSend();
                    }}>
                        <Textarea placeholder="Start Typing"
                            className='w-full h-10 bg-transparent border-none focus-visible:ring-0 shadow-none resize-none'
                            onChange={(event) => setUserInput(event.target.value)}
                            value={userInput}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    onSend();
                                }
                            }}
                        />
                        <Button type="submit" size={'icon'} className='absolute bottom-2 right-2'>
                            <Send className='h-4 w-4' />
                        </Button>
                    </form>
                </div>
            </section>
        </div>
    )
}
