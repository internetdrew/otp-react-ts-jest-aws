import { useEffect, useRef } from 'react';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

type OtpFormInputs = {
  otp: string[];
};

const schema = z.object({
  otp: z.array(z.string().length(1)).length(6),
});

const OneTimePasswordForm = () => {
  const inputRefs = useRef<HTMLInputElement[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OtpFormInputs>({
    resolver: zodResolver(schema),
  });

  const handleInput = (e: React.FormEvent<HTMLInputElement>, index: number) => {
    const value = e.currentTarget.value;
    if (isNaN(Number(value))) {
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

  const onSubmit: SubmitHandler<OtpFormInputs> = data => {
    console.log(data);
    const code = data.otp.join('');
    console.log('Send this code to your API: ', code);
  };

  useEffect(() => {
    inputRefs?.current[0].focus();
  }, []);

  return (
    <form
      className='max-w-md bg-slate-200 flex flex-col gap-4 p-6 rounded-md'
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <h1 className='font-semibold text-xl'>Verify your email address</h1>
        <p>Please enter the 6-digit code we sent to your email address.</p>
      </div>
      <div className='flex justify-between gap-4'>
        {Array.from({ length: 6 }, (_, index: number) => {
          const { ref, ...rest } = register(`otp.${index}` as const);
          return (
            <input
              key={`otp.${index}`}
              inputMode='numeric'
              maxLength={1}
              className='p-2 flex-1 w-1/6 rounded-md no-spinner text-slate-900 text-center text-xl'
              ref={el => {
                ref(el);
                inputRefs.current[index] = el!;
              }}
              onInput={e => handleInput(e, index)}
              {...rest}
            />
          );
        })}
      </div>
      {errors.otp && (
        <span className='text-red-500 text-sm'>
          All fields are required for submission.
        </span>
      )}
      <button className='bg-neutral-950 w-full p-2 rounded-md font-semibold text-slate-50'>
        Confirm
      </button>
    </form>
  );
};

export default OneTimePasswordForm;
