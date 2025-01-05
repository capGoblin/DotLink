"use client";

import { useState } from "react";
import LinksList from "./LinksList";
import CreateLinkModal from "./CreateLinkModal";
import { Link } from "@/types/link";
import { mockLinks } from "@/lib/mock-data";

export default function Dashboard() {
  const [links, setLinks] = useState<Link[]>(mockLinks);

  const handleCreateLink = (data: {
    amount: number;
    expiration: number;
    linkId: string;
  }) => {
    const newLink: Link = {
      id: data.linkId,
      amount: data.amount,
      expiresAt: new Date(Date.now() + data.expiration * 1000),
      status: "active",
    };
    setLinks([newLink, ...links]);
  };

  return (
    <main className="container mx-auto px-8 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-4xl font-bold text-foreground">
            Your Transfer Links
          </h2>
          <CreateLinkModal onCreateLink={handleCreateLink} />
        </div>

        <div className="bg-card p-12 rounded-3xl shadow-lg border border-border">
          <LinksList
            links={links}
            onReclaim={(id) => {
              setLinks(links.filter((link) => link.id !== id));
            }}
          />
        </div>
      </div>
    </main>
  );
}
