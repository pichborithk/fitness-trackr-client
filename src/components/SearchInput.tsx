import { Dispatch, SetStateAction } from 'react';

type Props = {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
};

const SearchInput = ({ value, setValue }: Props) => {
  return (
    <input
      placeholder='Search'
      value={value}
      onChange={event => setValue(event.target.value)}
      className='flex-1 border-2 border-slate-400 px-4 py-2 focus:border-dashed focus:border-teal-500 focus:outline-none'
    />
  );
};
export default SearchInput;
