
import { DropZone } from "@/components/DropZone";
import { Features } from "@/components/Features";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col gap-16 py-16">
      <section className="text-center px-4">
        <span className="inline-block mb-4 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium">
          Audio to MIDI Conversion
        </span>
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Convert Audio to MIDI
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
          Transform your audio recordings into MIDI files with Spotify's Basic Pitch technology
        </p>
        <DropZone />
      </section>

      <section className="py-16 bg-secondary/50">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">
            How It Works
          </h2>
          <Features />
        </div>
      </section>

      <footer className="mt-auto text-center py-8 text-muted-foreground">
        <p>Powered by Basic Pitch</p>
      </footer>
    </div>
  );
};

export default Index;
