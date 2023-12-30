import './globals.css';
import Link from '../../node_modules/next/link';
import { Control } from './Control';

export const metadata = {
  title: 'devdevdev',
  description: '꿈빛 파티시엘 project',
};
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/topics', {
    next: { revalidate: 0 },
  });
  const topics = await res.json();
  return (
    <html>
      {/* page.tsx가 return한 값을 children 자리에 가져다둠  */}
      <body>
        <ol>
          {topics.map((topic) => {
            return (
              <li key={topic.id}>
                <Link href={`read/[id]`} as={`/read/${topic.id}`}>
                  {topic.title}
                </Link>
              </li>
            );
          })}
        </ol>
        {children}
        <Control />
      </body>
    </html>
  );
}
