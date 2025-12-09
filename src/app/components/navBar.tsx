'use client';
import { useRouter } from 'next/navigation';

export default function NavBar({ texto }: {texto:string}) {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem('logged');
        localStorage.removeItem('userName');
        router.push('/');
    };

    return (
        <nav className="w-full bg-gray-100 shadow-md p-4 flex justify-between items-center">
            <h1 className="text-xl font-bold">{texto}</h1>
            <div className='flex gap-10 items-center'>
            <ul className='flex gap-3 items-center'>
                <li><a href="/dashboard">Dashboard</a></li>
                <li><a href="/produtos">Produtos</a></li>
                <li><a href="/estoque">Estoque</a></li>
            </ul>
            <button
                onClick={handleLogout}
                className="bg-red-600 text-white rounded hover:bg-red-500 px-4 py-2"
            >
                Sair
            </button>
            </div>
        </nav>

    );
}