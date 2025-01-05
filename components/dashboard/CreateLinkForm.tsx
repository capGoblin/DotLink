"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CreateLinkAnimation } from "./CreateLinkAnimation";

interface CreateLinkFormProps {
  onCreateLink: (data: { amount: number; expiration: number }) => void;
  onClose: () => void;
}

export default function CreateLinkForm({
  onCreateLink,
  onClose,
}: CreateLinkFormProps) {
  const [amount, setAmount] = useState("");
  const [expiration, setExpiration] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [generatedLink, setGeneratedLink] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreateLink({
      amount: Number(amount),
      expiration: Number(expiration),
    });
    setIsCreating(true);
    setGeneratedLink(
      `https://cryptolink.io/claim/${Math.random().toString(36).slice(2)}`
    );
  };

  const handleAnimationComplete = () => {
    onClose();
  };

  if (isCreating) {
    return (
      <CreateLinkAnimation
        link={generatedLink}
        onAnimationComplete={handleAnimationComplete}
      />
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-3">
        <label className="text-lg font-medium">Amount (DOT)</label>
        <Input
          type="number"
          step="0.1"
          min="0"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          className="rounded-xl h-14 text-lg px-4"
        />
      </div>

      <div className="space-y-3">
        <label className="text-lg font-medium">Expiration Time</label>
        <Select value={expiration} onValueChange={setExpiration}>
          <SelectTrigger className="rounded-xl h-14 text-lg">
            <SelectValue placeholder="Select expiration time" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1" className="text-lg py-3">
              1 day
            </SelectItem>
            <SelectItem value="7" className="text-lg py-3">
              7 days
            </SelectItem>
            <SelectItem value="30" className="text-lg py-3">
              30 days
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button
        type="submit"
        size="lg"
        className="w-full rounded-xl text-lg py-6 mt-6"
      >
        Create Link
      </Button>
    </form>
  );
}
