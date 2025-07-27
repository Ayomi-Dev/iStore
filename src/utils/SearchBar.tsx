import { useState } from 'react'
import { FaSearch } from 'react-icons/fa';

interface SearchBarProp {
  toggleSearchBar: boolean
  displaySearchBar: () => void
}

export const SearchBar: React.FC<SearchBarProp> = ({toggleSearchBar, displaySearchBar}) => {
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
    <div className={`${toggleSearchBar ? 'absolute left-0 z-[99] bg-white w-full flex' : 'hidden md:flex'} flex justify-between md:mx-0 md:relative md:top-0  md:w-40 items-center`}>
        <input type="text" 
            className={`w-full h-full md:h-3/4 outline-none bg-none border-none p-3 text-gray-400`}
            placeholder='Search here...' 
            value={searchValue}
            onChange={(event) => {
              const text = event.target.value
              handleSearch(text)
            } }
        />
        <FaSearch className="mr-3" onClick={() => {
          handleInputField();
          displaySearchBar();
          }} />
    </div>
  )
}
