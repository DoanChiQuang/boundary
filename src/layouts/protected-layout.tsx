import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../configs/firebase-config';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

type Props = {
    children: React.ReactNode;
};

export default function ProtectedLayout({ children }: Props) {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) {
                navigate('/admin/login');
            } else {
                if (location.pathname == '/admin/login') {
                    navigate('/admin');
                }
            }
        });

        return () => unsubscribe();
    }, [navigate]);

    return children;
}
