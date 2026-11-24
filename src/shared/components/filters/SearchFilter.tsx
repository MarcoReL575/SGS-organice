'use client'

import { IconSearch } from '@tabler/icons-react'

interface Props {
    placeholder: string;
    value: string;
    onChange: (value: string)=> void;
}

export default function ({ value, placeholder, onChange }: Props) {

  return (
    <div 
        className='w-xs flex items-center justify-between border rounded-lg p-2 cursor-text'
        onClick={() => document.getElementById('search-filter')?.focus()}
    >
        <input
            id="search-filter"
            type='text'
            value={value}
            onChange={(e)=> onChange(e.target.value)}
            placeholder={placeholder}
            className='focus:outline-none'
        />
        <IconSearch className='text-muted-forground' />
    </div>
  )
}
