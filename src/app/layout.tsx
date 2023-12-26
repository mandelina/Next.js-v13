import "./globals.css";
import Link from "../../node_modules/next/link";

export const metadata = {
  title: "devdevdev",
  description: "꿈빛 파티시엘 project",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const res = await fetch("http://localhost:9999/topics");
  const topics = await res.json();
  return (
    <html>
      {/* page.tsx가 return한 값을 children 자리에 가져다둠  */}
      <body>
        <h1>
          <Link href="">WEB</Link>
        </h1>
        <ol>
          <li>
            <Link href="/read/1">html</Link>
          </li>
          <li>
            <Link href="/read/2">css</Link>
          </li>
        </ol>
        {children}
        <ul>
          <li>
            <Link href="/create"> Create</Link>
          </li>
          <li>
            <Link href="/update/1">update</Link>
          </li>
          <li>
            <input type="button" value="delete" />
          </li>
        </ul>
      </body>
    </html>
  );
}
