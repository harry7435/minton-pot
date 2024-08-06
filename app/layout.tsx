import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Minton Pot',
  description: '배드민턴 번개 모임에서 코트와 인원 관리를 위한 서비스',
  icons: {
    icon: '/minton-pot-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
