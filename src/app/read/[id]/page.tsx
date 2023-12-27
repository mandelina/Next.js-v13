export default async function Read(props) {
  const res = await fetch(`http://localhost:9999/topics/${props.params.id}`);
  const topic = await res.json();

  return (
    <>
      <h2>{topic.title}</h2>
      <p>{topic.body}</p>
      {/* props.params.id이 pathvariable */}
      params.id : {props.params.id}
    </>
  );
}
