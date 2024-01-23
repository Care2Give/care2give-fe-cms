type Series = {
    time: string,
    value: number,
}

export type DetailedCampaign = {
    id: string,
    title: string,
    series: Series[]
}

export type DetailCampaignApiType = {
    donationAmount: DetailedCampaign[],
    numDonations: DetailedCampaign[]
}
