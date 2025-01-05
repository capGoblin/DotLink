"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { WalletIcon } from "lucide-react";
import { useWallet } from "@/hooks/useWallet";
import { useState } from "react";
import { formatDistance } from "date-fns";
import { ClaimAnimation } from "@/components/claim/ClaimAnimation";

export default function ClaimPage() {
  const { address, connect } = useWallet();
  const [isLoading, setIsLoading] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);

  // Mock data
  const linkData = {
    senderAddress: "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY",
    amount: 50.5,
    expiresAt: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000),
  };

  const handleClaim = async () => {
    setIsLoading(true);
    setShowAnimation(true);
  };

  const handleAnimationComplete = () => {
    setShowAnimation(false);
    setIsLoading(false);
  };

  return (
    <main className="container mx-auto px-8 py-16">
      <div className="max-w-2xl mx-auto">
        <Card className="border border-border bg-card">
          <CardHeader className="p-8">
            <CardTitle className="text-4xl font-bold text-center">
              Claim Your DOT
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8 p-8">
            {showAnimation ? (
              <ClaimAnimation onAnimationComplete={handleAnimationComplete} />
            ) : (
              <>
                <div className="space-y-6">
                  <div className="space-y-3">
                    <p className="text-lg text-muted-foreground">
                      From Address
                    </p>
                    <div className="font-mono bg-secondary/20 p-4 rounded-lg overflow-hidden">
                      <p className="text-base break-all">
                        {linkData.senderAddress}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="text-lg text-muted-foreground">Amount</p>
                    <p className="text-5xl font-bold text-foreground">
                      {linkData.amount} DOT
                    </p>
                  </div>

                  <div className="space-y-3">
                    <p className="text-lg text-muted-foreground">Expires</p>
                    <p className="text-xl text-foreground">
                      {formatDistance(linkData.expiresAt, new Date(), {
                        addSuffix: true,
                      })}
                    </p>
                  </div>
                </div>

                {!address ? (
                  <Button
                    className="w-full rounded-full blob-button bg-primary text-primary-foreground text-xl py-8"
                    onClick={connect}
                  >
                    <WalletIcon className="mr-3 h-6 w-6" />
                    Connect Wallet to Claim
                  </Button>
                ) : (
                  <Button
                    className="w-full rounded-full blob-button text-xl py-8"
                    onClick={handleClaim}
                    disabled={isLoading}
                  >
                    {isLoading ? "Claiming..." : "Claim Tokens"}
                  </Button>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
