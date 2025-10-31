import { useState, useEffect } from 'react'
import Image from 'next/image'

import { ImageUploadProps } from '@/app/types/types'
import { emptyFile } from '@/app/(routes)/recipes/components/recipeForm/RecipeForm'

export default function MainImageUpload({ register, setValue, previewUrl, setPreviewUrl, selectedFile, setSelectedFile }: ImageUploadProps)  {
    const [originalImg] = useState<string>(previewUrl)
    useEffect(() => {
        if (previewUrl) return
        else if(selectedFile && selectedFile.name !== 'null_img.png'){
            const objectUrl = URL.createObjectURL(selectedFile);
            setPreviewUrl(objectUrl);
            setSelectedFile(selectedFile)
        return () => URL.revokeObjectURL(objectUrl);
            } else {
            setPreviewUrl('');
        }
    },[selectedFile])
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file && file.name !== 'null_img.png') {
        setSelectedFile(file);
      } else {
        setSelectedFile(emptyFile)
      }
    }
    const handleRemoveImg = () => {
        if (originalImg == previewUrl) {
        setSelectedFile(emptyFile)
        setValue('img_link', ''); 
        setPreviewUrl('');
        } 
        else if (originalImg != previewUrl && selectedFile) {
        setPreviewUrl(originalImg);
        setSelectedFile(emptyFile)
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
              onChange={handleImageChange}
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