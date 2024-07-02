export default function GroupPage({ params }: { params: { slug: string } }) {
  return (
    <>
      <h2>모임번호 : {params.slug}</h2>
    </>
  );
}
