import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const router = useNavigate();
  const AnonymousLogin = async () => {
    const { error } = await supabase.auth.signInAnonymously();
    if (error) {
      console.log(error);
    } else {
      router('/admin/new-form');
    }
  };
  return (
    <div className="fixed w-screen">
      <header className="flex items-center justify-between h-20 border-b-2 px-24">
        <div></div>
        <nav>
          <ul className="flex gap-3">
            <li><a href='/'>Home</a></li>
            <li>
              <a href={'/about-us'}>About</a>
            </li>
            <li>Contact</li>
          </ul>
        </nav>
        <div>
          <Button onClick={AnonymousLogin}>Get Started</Button>
        </div>
      </header>
    </div>
  );
};

export default Header;
