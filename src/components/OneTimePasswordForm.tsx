/*
Current Work-In-Progress
*/

import { useEffect, useRef } from 'react';

const OneTimePasswordForm = () => {
  const inputRefs = useRef<HTMLInputElement[]>([]);

  const handleInput = (e: React.FormEvent<HTMLInputElement>, index: number) => {
    const value = e.currentTarget.value;
    if (isNaN(Number(value)) || value.length > 1) {
      e.currentTarget.value = '';
      return;
    }

    if (value.length > 1) {
      e.currentTarget.value = value.slice(0, 1);
    }
    if (value.length === 1 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  useEffect(() => {
    inputRefs?.current[0].focus();
  }, []);

  return (
    <form className='max-w-md bg-slate-200 flex flex-col gap-4 p-6 rounded-md'>
      <div>
        <h1 className='font-semibold text-xl'>Verify your email address</h1>
        <p>Please enter the 6-digit code we sent to your email address.</p>
      </div>
      <div className='flex justify-between gap-4'>
        {Array.from({ length: 6 }, (_, index: number) => {
          return (
            <input
              key={`otp.${index}`}
              inputMode='numeric'
              maxLength={1}
              className='p-2 flex-1 w-1/6 rounded-md no-spinner text-slate-900 text-center text-xl'
              ref={el => (inputRefs.current[index] = el!)}
              onInput={e => handleInput(e, index)}
            />
          );
        })}
      </div>
      <button className='bg-neutral-950 w-full p-2 rounded-md font-semibold text-slate-50'>
        Confirm
      </button>
    </form>
  );
};

export default OneTimePasswordForm;
