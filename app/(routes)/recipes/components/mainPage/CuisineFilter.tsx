'use client';
import { MainFilterProps } from '@/app/types/types'

export default function CuisineFilter({onChange, selectedCuisineTag}: MainFilterProps) {
    return (
    <div className="flex items-center mx-1 my-2">
        <label htmlFor="search" className="sr-only">Cuisine Filter</label>
          <span className="font-semibold ml-1">Cuisine</span>
        <select onChange={(e) => onChange(e.target.value)} 
                value={selectedCuisineTag}
                className="border-2 border-red-700 rounded-sm ml-2 p-1">
            <option value="">All Cuisines</option>
            <option value="Korean">Korean</option>
            <option value="British">British</option>
            <option value="Chinese">Chinese</option>
            <option value="Vietnamese">Vietnamese</option>
            <option value="Thai">Thai</option>
            <option value="Italian">Italian</option>
            <option value="Spanish">Spanish</option>
            <option value="Mexican">Mexican</option>
            <option value="French">French</option>
            <option value="Middle East">Middle East</option>
        </select>
    </div>
    );
}