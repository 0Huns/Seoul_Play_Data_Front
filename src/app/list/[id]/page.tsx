export default async function MovieDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <div>
      <h1>Movies!{id}</h1>
    </div>
  );
}
