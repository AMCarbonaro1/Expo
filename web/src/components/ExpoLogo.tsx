import { LogoSignal } from "./Logo";

export default function ExpoLogo({
  size = 28,
  color,
  textColor,
  textClass = "text-xl",
}: {
  size?: number;
  color?: string;
  textColor?: string;
  textClass?: string;
}) {
  return (
    <span className="inline-flex items-center gap-2">
      <LogoSignal size={size} color={color} />
      <span className={`${textClass} font-bold tracking-tight`} style={textColor ? { color: textColor } : undefined}>EXPO</span>
    </span>
  );
}
