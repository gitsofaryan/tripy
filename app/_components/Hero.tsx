"use client"
import React from 'react'
import { Textarea } from "@/components/ui/textarea"
import { Button } from '@/components/ui/button'
import { ArrowBigDownIcon, ArrowDown, Globe2, GlobeIcon, Landmark, Plane, Send } from 'lucide-react'
import HeroVideoDialog from "@/components/magicui/hero-video-dialog";
import { WarpBackground } from "@/components/magicui/warp-background";
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation'

export const suggestions = [
    {
        title: 'Create New Trip',
        icon: <Globe2 className='text-blue-400 h-5,w-5' />,
    },
    {
        title: 'Inspire me Where to go',
        icon: <Plane className='text-red-700 h-5,w-5' />,
    }, {
        title: 'Discover Hidden Gems',
        icon: <Landmark className='text-yellow-900 h-5,w-5' />,
    }, {
        title: 'Adventure Destination',
        icon: <GlobeIcon className='text-green-600 h-5,w-5' />,
    },
];

function Hero() {


    const { user } = useUser();
    const router = useRouter();
    const onSend = () => {

        if (!user) {
            router.push('/sign-in');
            return;
        }

    }

    return (

        <div className='mt-24 flex items-center justify-center'>
            {/* Content  */}

            <div className='max-w-3xl w-full text-center space-y-6'>
                <h1 className='text-xl md:text-5xl font-bold'>
                    Hey, I'm your Personal <span className='font-bold text-primary'>Trip Planner</span>
                </h1>
                <p className='text-lg'>Tell me where you want to go? I'll handle the rest: Flights, Hotels, Trip Planning - all in seconds</p>

                {/* Input Box  */}
                <div className='relative border rounded-2xl p-4'>
                    <Textarea placeholder="Create a trip for Paris from New York"
                        className='w-full h-10 bg-transparent border-none focus-visible:ring-0 shadow-none resize-none'
                    />
                    <Button size={'icon'} className='absolute bottom-2 right-2' onClick={() => onSend()}>
                        <Send className='h-4 w-4' />
                    </Button>
                </div>

                {/* Suggestion List  */}
                <div className='flex gap-2'>
                    {suggestions.map((suggestion, index) => {
                        return <div key={index} className='flex items-center gap-2 border rounded-full p-2 cursor-pointer hover:bg-primary hover:text-white'>
                            {suggestion.icon}
                            <h2 className='text-sm'>{suggestion.title}</h2>
                        </div>
                    })}
                </div>
                <div className='flex items-center justify-center flex-col'>

                    <h2 className='my-7 mt-5 flex gap-2 text-center '>Not Sure where to start? <strong>See how it works</strong><ArrowDown /></h2>
                    <HeroVideoDialog
                        className="block dark:hidden"
                        animationStyle="from-center"
                        videoSrc="https://www.example.com/dummy-video"
                        thumbnailSrc="http://mma.prnewswire.com/media/2401528/1_MindtripProduct.jpg?p=facebook"
                        thumbnailAlt="Dummy Video Thumbnail"
                    />
                </div>
            </div>

        </div>
    )
}

export default Hero