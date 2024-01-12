import { Button } from "@/components/ui/button";
import useDonationStore from "@/stores/useDonationStore";

export default function Nric({ nric }: { nric: string | undefined }) {
  const { isNricHidden, setIsNricHidden } = useDonationStore();

  if (!nric) return null;

  return (
    <Button
      variant="ghost"
      onClick={() => setIsNricHidden(!isNricHidden)}
      className="font-normal text-left w-24"
    >
      {isNricHidden ? `XXXXX${nric.slice(5)}` : nric}
    </Button>
  );
}
