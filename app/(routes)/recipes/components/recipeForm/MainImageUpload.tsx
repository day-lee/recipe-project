import { useState, useEffect } from 'react'
import Image from 'next/image'

import { ImageUploadProps } from '@/app/types/types'

export default function MainImageUpload({ register, watch, setValue, previewUrl, setPreviewUrl }: ImageUploadProps)  {
    const [originalImg, setOriginalImg] = useState<string>(previewUrl)
    const selectedFile = watch('img_file');
    console.log("original", originalImg, '----', "previewImg", previewUrl, "---------", "selectedFile", selectedFile)

    useEffect(() => {
        if (previewUrl) return
        else if(selectedFile && selectedFile.length === 1){
            const objectUrl = URL.createObjectURL(selectedFile[0]);
            setPreviewUrl(objectUrl); // blob:http://localhost:3005/5f001c97-699a-448e-8c9a-43956f63ea97
        return () => URL.revokeObjectURL(objectUrl);
            } else {
            setPreviewUrl('');
        }
    },[selectedFile, setPreviewUrl])

    const handleRemoveImg = () => {
        if (originalImg == previewUrl) {
        setValue('img_file', '');
        setValue('img_link', ''); 
        setPreviewUrl('');
        } 
        else if (originalImg != previewUrl && selectedFile) {
        setPreviewUrl(originalImg);
        setValue('img_file', '');
        setValue('img_link', originalImg); 
        }
    }
    return (
 <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">
        </label>
        {!previewUrl ? (
          // file select
          <div className="border-2 border-gray-300 rounded-md p-6 text-center">
            <input
              type="file"
              accept="image/*"
              {...register('img_file')}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-lg file:border-0
                file:text-sm file:font-semibold
                file:bg-red-100 file:text-red-700
                hover:file:bg-red-200 hover:cursor-pointer"
                
            />
            <p className="text-gray-500 text-sm mt-2">
              Select the image file
            </p>
          </div>
        ) : (
          // preview
          <div className="relative inline-block">
            <Image
              src={previewUrl}
              alt="Recipe preview"
              className="w-64 h-64 object-cover border"
              width={300} height={300}
            />
            <button
              type="button"
              onClick={handleRemoveImg}
              className="absolute -top-2 -right-2 bg-red-700 text-white 
                rounded-full w-8 h-8 flex items-center justify-center
                hover:bg-red-700 font-semibold"
            >
              X
            </button>
          </div>
        )}
      </div>
      {/* Hidden field for image URL */}
      <input type="hidden" {...register('img_link')} />
    </div>
          
    )
}