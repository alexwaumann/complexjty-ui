import Avatar from "@mui/material/Avatar";

export type Rarity = "common" | "uncommon" | "rare" | "mythic" | "artifact";

type PfpProps = {
  size?: number;
  src?: string;
  rarity?: Rarity;
};

export function Pfp({
  size = 40,
  src = "/placeholder-pfp.png",
  rarity = "artifact",
}: PfpProps) {
  return (
    <Avatar
      variant="rounded"
      src={src}
      sx={{
        width: size,
        height: size,
        border: 1,
        borderWidth: size >= 96 ? 4 : 2,
        borderColor: `rarity.${rarity}`,
      }}
    />
  );
}
