import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ROOMS, getRoom } from "@/data/rooms";
import { RoomDetail } from "@/components/rooms/RoomDetail";

export function generateStaticParams() {
  return ROOMS.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const room = getRoom((await params).slug);
  if (!room) return {};
  return { title: room.name, description: room.summary };
}

export default async function RoomPage({ params }: { params: Promise<{ slug: string }> }) {
  const room = getRoom((await params).slug);
  if (!room) notFound();
  return <RoomDetail room={room} />;
}
