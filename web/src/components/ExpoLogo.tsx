import { LogoSignal } from "./Logo";

export default function ExpoLogo({
  size = 28,
  color,
  textClass = "text-xl",
}: {
  size?: number;
  color?: string;
  textClass?: string;
}) {
  return (
    <span className="inline-flex items-center gap-2">
      <LogoSignal size={size} color={color} />
      <span className={`${textClass} font-bold tracking-tight`}>EXPO</span>
    </span>
  );
}
