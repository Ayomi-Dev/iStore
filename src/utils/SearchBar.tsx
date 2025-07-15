import { useState } from 'react'
import { FaSearch } from 'react-icons/fa';

export const SearchBar = () => {
  const [ searchValue, setSearchValue ] = useState<string>('');
    
    const [showInput, setShowInput] = useState<boolean>(false);

    const handleInputField = () => {
      setShowInput(!showInput) 
    }

    const handleSearch = (e: string) => {
      // console.log(e)
      setSearchValue(e)
      console.log(searchValue)
    }
  return (
    <div className='flex bg-white justify-between absolute md:relative left-0 md:mx-0 top-[80px] md:top-0 w-full md:w-40 items-center h-10 md:h-full'>
        <input type="text" 
            className={`w-full h-full md:h-3/4 outline-none bg-none border-none p-3 text-gray-400`}
            placeholder='Search here...' 
            value={searchValue}
            onChange={(event) => {
              const text = event.target.value
              handleSearch(text)
            } }
        />
        <FaSearch className="mr-3" onClick={ handleInputField } />
    </div>
  )
}
