'use client';
import Link from '../../node_modules/next/link';
import { useParams, useRouter } from '../../node_modules/next/navigation';

export function Control() {
  const router = useRouter();
  const prams = useParams();
  const id = prams.id; // url의 id값
  return (
    <ul>
      <li>
        <Link href="/create"> Create</Link>
      </li>
      {id ? (
        <>
          <li>
            <Link href="/update/1">update</Link>
          </li>
          <li>
            <input
              type="button"
              value="delete"
              onClick={() => {
                const option = { method: 'delete' };
                fetch('http://localhost:9999/topics/' + id, option)
                  .then((res) => res.json())
                  .then((res) => {
                    router.push('/');
                    router.refresh();
                  });
              }}
            />
          </li>
        </>
      ) : null}
    </ul>
  );
}
