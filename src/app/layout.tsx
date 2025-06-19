import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import localFont from 'next/font/local';
import Navigation from '@/app/components/Navigation/Navigation';
import Footer from '@/app/components/Footer/Footer';
import { AuthProvider } from '@/app/context/AuthContext';
import CategoriesNav from './components/CategoriesNav/CategoriesNav';
import '@/app/styles/globals.scss';

const inter = Inter({ subsets: ['latin'] });
console.log('Текущий режим:', process.env.NODE_ENV);
export const metadata: Metadata = {
    title: 'Apex Vortex',
    description: 'The best place to buy skis and ski equipment',
    icons: {
        icon: '/images/orig.png',
    },
};

const ouvality = localFont({
    src: [
        { path: '/fonts/Ouvality.ttf', weight: '400', style: 'normal' },

    ],
    variable: '--font-ouvality',
});

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="ru">
            <body className={`${inter.className} ${ouvality.variable}`}>
                <AuthProvider>
                    <div className="layoutContainer">
                        <Navigation />
                        <CategoriesNav />
                        <main className="mainContent">{children}</main>
                        <Footer />
                    </div>
                </AuthProvider>
            </body>
        </html>
    );
}
