import OneTimePasswordForm from './components/OneTimePasswordForm';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className='h-screen flex items-center justify-center bg-neutral-950'>
      <OneTimePasswordForm />
      <Toaster />
    </div>
  );
}

export default App;
