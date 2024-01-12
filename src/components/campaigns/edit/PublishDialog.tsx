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
import useCampaignEditorStore from "@/stores/useCampaignEditorStore";
import { useAuth } from "@clerk/nextjs";

export function PublishDialog({ setEditStage }) {
  const router = useRouter();
  const campaignEditState = useCampaignEditorStore.getState();
  const { getToken, userId } = useAuth();

  const publishCampaign = () => {
    const campaignId = campaignEditState.id;
    const isEdit = campaignId !== "";
    const bodyObj = {
      status: campaignEditState.status,
      startDate: campaignEditState.startDate.toISOString(),
      endDate: campaignEditState.endDate.toISOString(),
      title: campaignEditState.title,
      description: campaignEditState.description,
      currency: "SGD",
      dollars: Math.floor(campaignEditState.targetAmount),
      cents:
        campaignEditState.targetAmount -
        Math.floor(campaignEditState.targetAmount),
      editedBy: userId,
      // TODO change to not convert CampaignImage to just its URL when database is updated
      imageUrl: campaignEditState.images.map(
        (campaignImage) => campaignImage.url
      ),
    };

    if (!isEdit) {
      bodyObj.createdBy = userId;
    }

    getToken().then((token) => {
      fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/campaign/${
          isEdit ? campaignId : "create"
        }`,
        {
          method: isEdit ? "PATCH" : "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bodyObj),
        }
      ).then((res) => {
        if (res.ok) {
          router.push("/campaigns");
          return;
        }
      });
    });

    // TODO add functionality to create the donation amount - current missing in BE
  };

  return (
    <Dialog open={true}>
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
