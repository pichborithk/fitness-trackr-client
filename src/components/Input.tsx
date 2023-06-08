import { Dispatch, SetStateAction } from 'react';

type Props = {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  required: boolean;
  type: string;
  name: string;
  label: string;
};

const Input = ({ value, setValue, required, name, type, label }: Props) => {
  return (
    <fieldset className='group relative flex w-full flex-col'>
      <label
        htmlFor={name}
        className={`pointer-events-none absolute left-4 top-2 bg-white px-2 transition-all duration-300 ease-in-out focus-within:text-teal-500 group-focus-within:-translate-x-1 group-focus-within:-translate-y-5 group-focus-within:text-base group-focus-within:text-teal-500  dark:bg-black dark:text-white dark:group-focus-within:text-white
    ${value && '-translate-x-1 -translate-y-5 text-base text-teal-500'}`}
      >
        {label}
      </label>
      <input
        name={name}
        type={type}
        id={name}
        required={required}
        value={value}
        onChange={event => setValue(event.target.value)}
        className='rounded-md border border-solid border-slate-500 px-4 py-2 transition-colors duration-300 ease-in-out focus:outline-teal-500 dark:bg-black dark:text-white dark:focus:outline-white'
      />
    </fieldset>
  );
};

export default Input;
