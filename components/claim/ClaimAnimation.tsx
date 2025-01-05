"use client";

import { CheckCircle2, Wallet, ArrowDownToLine } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface ClaimAnimationProps {
  onAnimationComplete: () => void;
}

export function ClaimAnimation({ onAnimationComplete }: ClaimAnimationProps) {
  const [stage, setStage] = useState<"claiming" | "processing" | "complete">(
    "claiming"
  );

  // Trigger the animation sequence
  useEffect(() => {
    setTimeout(() => {
      setStage("processing");
      setTimeout(() => {
        setStage("complete");
        setTimeout(onAnimationComplete, 1000);
      }, 1000);
    }, 1000);
  }, [onAnimationComplete]);

  return (
    <div className="flex flex-col items-center justify-center py-8 space-y-4">
      <div className="relative">
        <div
          className={cn(
            "w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500",
            stage === "claiming" && "bg-primary/20",
            stage === "processing" && "bg-secondary/20",
            stage === "complete" && "bg-green-500/20"
          )}
        >
          {stage === "claiming" && (
            <Wallet className="w-8 h-8 text-primary animate-pulse" />
          )}
          {stage === "processing" && (
            <ArrowDownToLine className="w-8 h-8 text-secondary animate-bounce" />
          )}
          {stage === "complete" && (
            <CheckCircle2 className="w-8 h-8 text-green-500 animate-in zoom-in" />
          )}
        </div>
      </div>
      <p className="text-lg text-muted-foreground">
        {stage === "claiming" && "Claiming your tokens..."}
        {stage === "processing" && "Processing transaction..."}
        {stage === "complete" && "Tokens claimed successfully!"}
      </p>
    </div>
  );
}
