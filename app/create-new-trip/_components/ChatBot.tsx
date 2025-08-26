"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Textarea } from "@/components/ui/textarea"
import { Button } from '@/components/ui/button'
import { Loader, Send } from 'lucide-react'
import EmptyBoxState from '@/app/_components/EmptyBoxState'
import GroupSize from '@/app/_components/GroupSize'
import BudgetList from '@/app/_components/BudgetList'
import SelectDaysUI from '@/app/_components/SelectDaysUI'
import FinalUI from '@/app/_components/FinalUI'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { useUserDetail } from '@/app/provider'
import { v4 as uuidv4 } from 'uuid';

export type TripInfo = {
    budget: string,
    groupSize: string,
    tripDuration: string,
    destination: string,
    origin: string,
    tripType: string,
    accommodationType: string,
    transportationMode: string,
    hotels: any,
    interests: string[],
    activities: string[],
    itinerary: any
}

export default function ChatBot() {

    type Message = {
        role: string,
        content: string
        ui?: string,
    }
    type TripInfo = {
        budget: string,
        groupSize: string,
        tripDuration: string,
        destination: string,
        origin: string,
        tripType: string,
        accommodationType: string,
        transportationMode: string,
        hotels: any,
        interests: string[],
        activities: string[],
        itinerary: any
    }


    const [messages, setMessages] = useState<Message[]>([]);
    const [userInput, setUserInput] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [isFinal, setFinal] = useState<boolean>(false);
    const [tripDetail, setTripDetail] = useState<TripInfo>();
    const {userDetail,setUserDetail}=useUserDetail()

    const SaveTripDetail=useMutation(api.tripDetail.CreateTrip)

    const onSend = async () => {
        if (!userInput?.trim()) return;

        const inputValue = userInput;
        setUserInput('')
        setLoading(true);
        
        // Check if this is a final trip generation request
        const isFinalRequest = inputValue.toLowerCase().includes('generate my trip plan') || 
                              inputValue.toLowerCase().includes('generate trip') ||
                              isFinal;

        const newMsg: Message = {
            role: 'user',
            content: inputValue
        }

        setMessages((prev: Message[]) => [...prev, newMsg]);

        try {
            const result = await axios.post('/api/aimodel', {
                messages: [...messages, newMsg],
                isFinal: isFinalRequest,
            });

            if (result.data?.error) {
                console.error('API Error:', result.data.error);
                !isFinalRequest && setMessages((prev: Message[]) => [...prev, {
                    role: 'assistant',
                    content: `Sorry, I encountered an error: ${result.data.error}`
                }]);
                return;
            }
            
            if (isFinalRequest) {
                setFinal(true);
                setTripDetail(result?.data?.trip_plan);
                const tripId = uuidv4();
                await SaveTripDetail({
                    tripDetail: result?.data?.trip_plan,
                    tripId: tripId,
                    userId: userDetail?._id
                });
                
                setMessages((prev: Message[]) => [...prev, {
                    role: 'assistant',
                    content: 'Perfect! Your trip plan has been generated successfully!',
                    ui: 'Final',
                }]);
            } else {
                setMessages((prev: Message[]) => [...prev, {
                    role: 'assistant',
                    content: result?.data?.resp || 'Sorry, I didn\'t receive a proper response.',
                    ui: result?.data?.ui || 'default',
                }]);
            }
            
            console.log('API Response:', result?.data);
            console.log('UI String:', result?.data?.ui);
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



    const renderGenUI = (ui: string) => {
        console.log('Rendering UI for:', ui);
        if (ui == 'budget') {
            return <BudgetList onSelectedOption={(v: string) => { setUserInput(v); onSend() }} />;
        } else if (ui == 'groupSize') {
            return <GroupSize
                onSelectedOption={(v: string) => { setUserInput(v); onSend() }}
            />
        } else if (ui == 'TripDuration' || ui == 'days') {
            return <SelectDaysUI
                onSelectedOption={(v: string) => { setUserInput(v); onSend() }}
            />
        } else if (ui == 'Final' || ui == 'final') {
            return <FinalUI 
                onSelectedOption={(v: string) => { setUserInput(v); onSend() }}
                disable={!tripDetail}
                tripDetail={tripDetail}
            />;
        }
        return null
    }


    useEffect(() => {
        const lastMessage = messages[messages.length - 1];
        if (lastMessage?.ui === 'Final' || lastMessage?.ui === 'final') {
            // Don't automatically trigger final generation - wait for user to click button
            console.log('Final UI detected, waiting for user action');
        }
    }, [messages])

    return (

        <div className='h-[80vh] flex flex-col '>
            {/* Chatbox UI */}
            {messages?.length == 0 &&
                <EmptyBoxState onSelectOption={(v: string) => { setUserInput(v); onSend() }} />}
            <section className='flex-1 overflow-y-auto p-4'>
                {messages.map((msg: Message, index) => (
                    msg.role == 'user' ? (
                        <div className="flex justify-end mt-2" key={index}>
                            <div className="max-w-lg bg-primary text-white px-4 py-2 rounded-lg">
                                {msg.content}
                            </div>
                        </div>
                    ) : (
                        <div className="flex justify-start mt-2" key={index}>
                            <div className="max-w-lg bg-gray-100 text-text-black px-4 py-2 rounded-lg">
                                {loading ? <Loader className='animate-spin' /> : msg.content}
                                {renderGenUI(msg.ui ?? '')}
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
