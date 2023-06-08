import { RefObject } from 'react';

type Props = {
  checked: boolean;
  reference: RefObject<HTMLInputElement>;
  type: string;
  name: string;
  label: string;
};

const CheckInput = ({ reference, checked, type, name, label }: Props) => {
  return (
    <fieldset className='relative flex w-full'>
      <input
        className='peer mr-2 hidden'
        name={name}
        id={name}
        type={type}
        ref={reference}
        defaultChecked={checked}
      />
      <label
        htmlFor={name}
        className='dark:text-secondary flex-1 cursor-pointer select-none rounded-md  border-2 border-slate-500 px-5 py-2 peer-checked:border-teal-500 peer-checked:text-teal-500'
      >
        {label}
      </label>
      <i className='fa-solid fa-circle-check absolute right-4 top-3 hidden text-red-500 peer-checked:inline'></i>
    </fieldset>
  );
};

export default CheckInput;
