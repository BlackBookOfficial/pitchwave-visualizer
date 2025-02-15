
import { FileAudio, Music, Wand2 } from "lucide-react";

const features = [
  {
    icon: FileAudio,
    title: "Upload Audio",
    description: "Drag and drop or select your audio file",
  },
  {
    icon: Wand2,
    title: "Convert",
    description: "Advanced AI-powered conversion process",
  },
  {
    icon: Music,
    title: "Download MIDI",
    description: "Get your MIDI file ready to use",
  },
];

export const Features = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
      {features.map((feature, index) => (
        <div
          key={index}
          className="glass p-6 rounded-lg text-center transition-transform hover:scale-105"
        >
          <feature.icon className="w-12 h-12 mx-auto mb-4 text-primary" />
          <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
          <p className="text-muted-foreground">{feature.description}</p>
        </div>
      ))}
    </div>
  );
};
