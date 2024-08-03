import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Minton Pot',
  description: '배드민턴 모임 코트 모니터링 서비스',
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
