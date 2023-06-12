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
        className={`pointer-events-none absolute left-4 top-2 bg-slate-900 px-2 focus-within:text-primary-500 group-focus-within:-translate-x-1 group-focus-within:-translate-y-5 group-focus-within:text-base group-focus-within:text-primary-500
    ${value && '-translate-x-1 -translate-y-5 text-base text-primary-500'}`}
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
        className='rounded-md border border-slate-400 bg-inherit px-4 py-2  focus:outline-primary-500'
      />
    </fieldset>
  );
};

export default Input;
