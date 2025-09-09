'use client';
import { useRef, useState, FormEvent, ChangeEvent } from 'react';
import Image from 'next/image'
import { TrashIcon, ArrowUpOnSquareIcon } from '@heroicons/react/24/outline'; 
import fallbackImg from '../../../assets/unavailable.png'



export default function ImageFileUpload() {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const handleClick = () => {
        inputRef.current?.click(); // trigger hidden file input
      };

    const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!file) {
            console.log('Please select a file.');
            return;
        }

        const formData = new FormData();
        formData.append('image', file);

        const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Upload failed.');
        }   

        const result = await response.json();
        console.log('Server response:', result);
    }

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            const selected = e.target.files[0];
            setFile(selected);

            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(selected);
        }
      };

      const handleCancel = () => {
        setFile(null);      
        setPreview(null);   
      };
    return (
        <>
        {/* <form onSubmit={handleSubmit} className='flex flex-col items-center'> */}
        <div className='flex flex-col items-center'>
            <input type="file"  onChange={handleFileChange} accept="image/*"
                   ref={inputRef} style={{ display: "none" }}/>
            <div className='flex gap-4 items-center justify-center'>
                <button type="button" onClick={handleClick}> 
                    <div className='flex flex-col items-center'>
                        <ArrowUpOnSquareIcon className='w-8 h-8' /> 
                        Upload 
                    </div> 
                </button>
                <button type="button" onClick={handleCancel}
                    className=""> 
                    <div className='flex flex-col items-center'>
                    <TrashIcon className="h-8 w-8 text-red-600" /> 
                    Cancel
                    </div>
                </button>
            </div>
            { preview ? (
                <div className="mt-4">
                <img src={preview} alt="Preview" className="w-44 h-auto rounded border" />
                </div>
                ): 
                (<Image className="m-8" src={fallbackImg} alt='fallbackImg' width={200} height={150}/>
                )}
        {/* </form>     */}
        </div>
      </>
    )
}