import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/router";
import { EditStage } from "@/components/campaigns/edit/edit-stage";
import useCampaignEditorStore, {
  DonationAmountFormInput,
} from "@/stores/useCampaignEditorStore";
import { useAuth } from "@clerk/nextjs";
import httpPost from "@/lib/httpPost";
import httpPatch from "@/lib/httpPatch";
import { CampaignWithDonationAmountsPayload } from "@/types/campaigns/CampaignWithDonationAmountsPayload";
import { CampaignDonationAmountPayload } from "@/types/campaigns/CampaignDonationAmountPayload";

/**
 * Converts Donation input stored with amount to db object stored with dollars and cents
 * @param donationAmounts DonationAmountFormInput with total amount from the dollars and cents
 * @returns Donation Amounts in dollars and cents
 */
function convertDonationInputObjToDbInputObj(
  donationAmounts: DonationAmountFormInput[]
): CampaignDonationAmountPayload[] {
  return donationAmounts.map((inputObject) => {
    const dollars = Math.floor(inputObject.amount);
    const cents = Math.floor((inputObject.amount - dollars) * 100);
    return {
      dollars,
      cents,
      description: inputObject.description || "",
    };
  });
}

export function PublishDialog({
  setEditStage,
}: {
  setEditStage: (arg0: EditStage) => void;
}) {
  const router = useRouter();
  const {
    id,
    status,
    startDate,
    endDate,
    title,
    description,
    targetAmount,
    images,
    donationOptions,
  } = useCampaignEditorStore();
  const { getToken, userId } = useAuth();

  const publishCampaign = async () => {
    const campaignId = id;
    const isEdit = campaignId !== "";

    if (userId) {
      const bodyObj: CampaignWithDonationAmountsPayload = {
        status,
        startDate,
        endDate,
        title,
        description,
        currency: "SGD",
        dollars: Math.floor(targetAmount),
        cents: targetAmount - Math.floor(targetAmount),
        editedBy: userId,
        imageUrls: images.map((campaignImage) => campaignImage.url),
        createdBy: isEdit ? undefined : userId,
        donationAmounts: convertDonationInputObjToDbInputObj(donationOptions),
      };

      try {
        let res = null;
        if (isEdit) {
          res = await httpPatch(
            `${process.env.NEXT_PUBLIC_API_URL}/v1/cms/campaigns/${campaignId}`,
            await getToken(),
            JSON.stringify(bodyObj)
          );
        } else {
          res = await httpPost(
            `${process.env.NEXT_PUBLIC_API_URL}/v1/cms/campaigns`,
            await getToken(),
            JSON.stringify(bodyObj)
          );
        }
      } catch (err) {
        console.log(err);
      }
    }
    router.push("/campaigns");
  };

  return (
    <Dialog open={true} onOpenChange={() => setEditStage(EditStage.Edit)}>
      <DialogContent className="sm:max-w-[430px]">
        <DialogHeader>
          <DialogTitle>Would you like to publish the campaign?</DialogTitle>
        </DialogHeader>
        <div className="flex justify-around">
          <Button
            onClick={() => setEditStage(EditStage.Edit)}
            variant="ghost"
            className="border"
          >
            Cancel
          </Button>
          <Button onClick={publishCampaign}>Confirm</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
