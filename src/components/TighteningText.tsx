import SplitText from "./SplitText";

interface TextBlock {
  heading: string;
  body: string;
}

const BLOCKS: TextBlock[] = [
  {
    heading: "Crafted with Care",
    body: "Every CupShake begins its journey on a sun-drenched farm where fresh ingredients are hand-picked at the peak of ripeness. We believe that extraordinary flavour starts long before the blender spins.",
  },
  {
    heading: "Blended to Perfection",
    body: "Our master blenders combine cold-pressed fruits, premium dairy, and a whisper of natural sweetness into silky smooth shakes. The result is a drink so balanced it feels like a celebration in every sip.",
  },
  {
    heading: "Served with Soul",
    body: "From our cup to your hands, each shake is poured with intention and topped with a signature flourish. We don't just make drinks — we make moments worth savouring, one shake at a time.",
  },
];

export default function TighteningText() {
  return (
    <div className="flex flex-col gap-16 py-12 md:py-24">
      {BLOCKS.map((block, idx) => (
        <div key={idx}>
          <SplitText
            text={block.heading}
            tag="h2"
            className="text-2xl md:text-4xl font-bold text-white"
            textAlign="left"
            delay={60}
            duration={1}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-50px"
          />

          <SplitText
            text={block.body}
            tag="p"
            className="text-base md:text-lg text-white/80 leading-relaxed max-w-xl mt-4"
            textAlign="left"
            delay={15}
            duration={0.8}
            ease="power2.out"
            splitType="words"
            from={{ opacity: 0, y: 20 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-50px"
          />
        </div>
      ))}
    </div>
  );
}
