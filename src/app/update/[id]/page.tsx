'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useParams } from '../../../../node_modules/next/navigation';

export default function Update() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const router = useRouter();
  const prams = useParams();
  const id = prams.id;
  useEffect(() => {
    fetch('http://localhost:9999/topics/' + id)
      .then((res) => res.json())
      .then((res) => {
        setTitle(res.title);
        setBody(res.body);
      });
  }, []);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const title = e.target.title.value;
        const body = e.target.body.value;
        const option = {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title, body }),
        };
        const res = fetch('http://localhost:9999/topics/' + id, option)
          .then((res) => res.json())
          .then((res) => {
            console.log(res);
            const lastid = res.id;
            router.push(`/read/${lastid}`);
          });
      }}
    >
      <p>
        <input
          type="text"
          name="title"
          placeholder="title"
          value={title}
          onChange={(e) => {
            console.log(e.target.value);
            setTitle(e.target.value);
          }}
        />
      </p>
      <p>
        <textarea
          name="body"
          placeholder="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
      </p>
      <p>
        <input type="submit" value="update" />
      </p>
    </form>
  );
}
