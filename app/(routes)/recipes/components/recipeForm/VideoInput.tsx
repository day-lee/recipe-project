import Image from 'next/image';
import { PlusCircleIcon, TrashIcon } from '@heroicons/react/24/outline'; 

import { VideoInputProps } from '@/app/types/types'
import fallbackImg from '@/app/assets/unavailable.png'
import { extractVideoId } from '@/app/utils/utils';

export default function VideoInput ({register, resetField, getValues, video, setVideo }: VideoInputProps) {
    const videoErrorMsg = 'Please check the YouTube video URL.'
    const addThumbnail = () => {
        const videoLink = getValues("external_link")
        const id = extractVideoId(videoLink)
        if (id){
            setVideo({
                videoId: id,
                isVideoValid: true,
                errorMessage: ''
            })
        } else {
            setVideo({
                videoId: '',
                isVideoValid: false,
                errorMessage: videoErrorMsg
            })
        }
    }
    const removeThumbnail = () => {
        resetField("external_link");
        setVideo({
            videoId: '',
            isVideoValid: false,
            errorMessage: ''
        })
    }        
    return (
            <section>
                <div aria-label="video section" className='my-8 max-w-xl'>
                    <p className='font-semibold lg:text-xl'>Video</p>
                    <div className='flex flex-col justify-center border-2 border-gray-200 p-2 lg:p-4 my-4'> 
                            <div className='flex flex-col lg:flex-row'>
                            <input id="external_link" 
                                type="text"
                                {...register('external_link')}
                                className='border-2 w-full border-gray-300 pl-2 py-1 rounded-sm' placeholder="https://youtu.be/..." /> 
                            <button aria-label="add video thumbnail button" type="button" className='px-2 h-8 hover:bg-red-200 rounded-sm' onClick={addThumbnail}> 
                                <div className='flex'>
                                <PlusCircleIcon className='w-6 h-6 text-red-700 '/>Add</div></button>    
                            <button aria-label="remove video thumbnail button" type="button" className='px-2 h-8 hover:bg-red-200 rounded-sm' onClick={removeThumbnail}>  
                                <div className='flex'> <TrashIcon className="h-6 w-6 text-red-700" />  </div></button>  
                        </div>
                        <div className='flex justify-center'> 
                        { video.isVideoValid && (
                            <div className='flex flex-col items-center'>
                           <Image className="m-6" src={`https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`} 
                            alt='youtubeThumbnail' width={300} height={150}/>
                            <p className='font-medium text-sm'>YouTube video registered successfully!</p>
                            </div>
                        )}
                        {!video.isVideoValid && video.errorMessage && (
                            <div className='flex flex-col items-center'>
                             <Image className="m-6" src={fallbackImg} alt='fallbackThumbnailImg' width={200} height={150}/>
                             <p className='text-red-700 font-medium text-sm'>{video.errorMessage}</p>
                             </div>
                        )}
                        </div>
                    </div>
                </div>    
            </section>
    )
}

          